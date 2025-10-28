/**
 * M3U8 Streaming Platform - Main App
 * Aplicación principal que coordina todos los componentes
 */

import { VideoPlayer } from './player.js';
import { PlaylistLoader } from './playlist-loader.js';

class StreamingApp {
    constructor() {
        // Control Parental
        this.adultoDesbloqueado = localStorage.getItem('adultUnlocked') === 'true';
        this.PIN_CORRECTO = '1818';

        // Categorías
        this.categoryTitles = {
            "deportes": "⚽ Deportes",
            "peliculas": "🎬 Películas",
            "series & shows": "📺 Series & Shows",
            "nacionales": "🇨🇴 Canales Nacionales",
            "peru": "🇵🇪 Canales Perú",
            "colombia": "🇨🇴 Colombia",
            "espana": "🇪🇸 España",
            "internacional": "🌍 Internacional",
            "infantil": "👶 Infantil",
            "documentales": "🌍 Documentales",
            "novelas": "💕 Novelas",
            "musica": "🎵 Música",
            "religioso": "✝️ Religioso",
            "gourmet": "🍽️ Gourmet",
            "24/7": "📡 24/7",
            "noticias": "📰 Noticias",
            "premium": "⭐ Premium",
            "entretenimiento": "🎭 Entretenimiento",
            "adulto": "🔞 Contenido Adulto"
        };

        // Estado
        this.channels = typeof CANALES_STREAMING !== 'undefined' ? CANALES_STREAMING : [];
        this.expandedCategories = new Set();
        this.categorizedChannels = null;

        // Inicializar componentes
        this.player = new VideoPlayer(
            document.getElementById('videoPlayer'),
            document.getElementById('videoModal'),
            document.getElementById('loadingIndicator')
        );

        this.playlistLoader = new PlaylistLoader((loadedChannels) => {
            this.mergeChannels(loadedChannels);
        });

        // Inicializar UI
        this.init();
    }

    init() {
        // Actualizar contador
        document.getElementById('totalChannels').textContent = this.channels.length;
        
        // Renderizar canales
        this.renderChannels();
        this.actualizarBotonParental();
        
        // Event Listeners
        this.setupEventListeners();
        
        // Ocultar loading screen
        setTimeout(() => {
            document.getElementById('loadingPage').classList.add('hidden');
        }, 500);

        // Service Worker
        this.registerServiceWorker();
    }

    setupEventListeners() {
        // Búsqueda
        const searchInput = document.getElementById('searchInput');
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const searchTerm = e.target.value.toLowerCase().trim();
                
                if (searchTerm === '') {
                    this.renderChannels();
                } else {
                    const filtered = this.channels.filter(channel => 
                        channel.name.toLowerCase().includes(searchTerm) ||
                        channel.category.toLowerCase().includes(searchTerm)
                    );
                    this.renderChannels(filtered);
                }
            }, 300);
        });

        // Cerrar modal con Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.player.close();
                this.closePlaylistModal();
            }
        });

        // Código secreto para control parental
        let codigoSecreto = '';
        let timeoutCodigo;
        
        document.addEventListener('keydown', (e) => {
            codigoSecreto += e.key;
            
            clearTimeout(timeoutCodigo);
            timeoutCodigo = setTimeout(() => {
                codigoSecreto = '';
            }, 2000);
            
            if (codigoSecreto.toLowerCase().includes('adulto') || codigoSecreto.includes('1818')) {
                codigoSecreto = '';
                if (this.adultoDesbloqueado) {
                    this.bloquearAdulto();
                } else {
                    this.desbloquearAdulto();
                }
            }
        });

        // Cerrar modal de playlist al hacer clic fuera
        document.getElementById('playlistModal').addEventListener('click', (e) => {
            if (e.target.id === 'playlistModal') {
                this.closePlaylistModal();
            }
        });
    }

    categorizeChannels() {
        if (this.categorizedChannels) return this.categorizedChannels;
        
        const filtered = this.adultoDesbloqueado ? 
            this.channels : 
            this.channels.filter(ch => ch.category !== 'adulto');
        
        this.categorizedChannels = filtered.reduce((acc, channel) => {
            if (!acc[channel.category]) {
                acc[channel.category] = [];
            }
            acc[channel.category].push(channel);
            return acc;
        }, {});
        
        return this.categorizedChannels;
    }

    renderChannels(filteredChannels = null) {
        const container = document.getElementById('channelsContainer');
        const noResults = document.getElementById('noResults');
        container.innerHTML = '';

        if (!filteredChannels) {
            filteredChannels = this.channels;
        }

        // Filtrar contenido adulto si no está desbloqueado
        if (!this.adultoDesbloqueado) {
            filteredChannels = filteredChannels.filter(ch => ch.category !== 'adulto');
        }

        if (filteredChannels.length === 0) {
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';

        // Agrupar por categoría
        const categoryGroups = filteredChannels.reduce((acc, channel) => {
            if (!acc[channel.category]) {
                acc[channel.category] = [];
            }
            acc[channel.category].push(channel);
            return acc;
        }, {});

        // Renderizar categorías
        Object.entries(categoryGroups).forEach(([category, channels]) => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'category';
            categoryDiv.id = `category-${category}`;

            // Header
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header';
            categoryHeader.innerHTML = `
                <span class="collapse-icon">▼</span>
                <span>${this.categoryTitles[category] || category}</span>
                <span class="category-badge">${channels.length}</span>
            `;

            // Grid
            const channelsGrid = document.createElement('div');
            channelsGrid.className = 'channels-grid';
            channelsGrid.style.display = 'none';

            // Toggle collapse
            categoryHeader.addEventListener('click', () => {
                const icon = categoryHeader.querySelector('.collapse-icon');
                if (channelsGrid.style.display === 'none') {
                    // Expandir y cargar canales (lazy loading)
                    if (channelsGrid.children.length === 0) {
                        this.renderChannelCards(channels, channelsGrid);
                    }
                    channelsGrid.style.display = 'grid';
                    icon.textContent = '▲';
                } else {
                    // Colapsar
                    channelsGrid.style.display = 'none';
                    icon.textContent = '▼';
                }
            });

            categoryDiv.appendChild(categoryHeader);
            categoryDiv.appendChild(channelsGrid);
            container.appendChild(categoryDiv);
        });
    }

    renderChannelCards(channels, container) {
        channels.forEach(channel => {
            const card = document.createElement('div');
            card.className = 'channel-card';
            card.innerHTML = `
                <img src="${channel.logo}" alt="${channel.name}" class="channel-logo" 
                     onerror="this.src='assets/icons/favicon.svg'">
                <div class="channel-name">${channel.name}</div>
                <button class="play-button">▶ Ver</button>
            `;
            card.addEventListener('click', () => {
                this.player.play(channel.url, channel.name);
            });
            container.appendChild(card);
        });
    }

    // Control Parental
    toggleControlParental() {
        if (this.adultoDesbloqueado) {
            if (confirm('¿Deseas bloquear el contenido adulto?')) {
                this.bloquearAdulto();
            }
        } else {
            this.desbloquearAdulto();
        }
    }

    desbloquearAdulto() {
        const pin = prompt('🔒 Control Parental\n\nIngresa el PIN de 4 dígitos:');
        
        if (pin === null) return;
        
        if (pin === this.PIN_CORRECTO) {
            this.adultoDesbloqueado = true;
            localStorage.setItem('adultUnlocked', 'true');
            alert('✅ Contenido adulto desbloqueado');
            this.actualizarBotonParental();
            this.categorizedChannels = null;
            this.renderChannels();
        } else {
            alert('❌ PIN incorrecto');
        }
    }

    bloquearAdulto() {
        this.adultoDesbloqueado = false;
        localStorage.setItem('adultUnlocked', 'false');
        alert('🔒 Contenido adulto bloqueado');
        this.actualizarBotonParental();
        this.categorizedChannels = null;
        this.renderChannels();
    }

    actualizarBotonParental() {
        const btn = document.getElementById('parentalBtn');
        if (btn) {
            btn.textContent = this.adultoDesbloqueado ? '🔓' : '🔒';
            btn.title = this.adultoDesbloqueado ? 
                'Contenido adulto visible (click para bloquear)' : 
                'Control Parental (click para desbloquear)';
        }
    }

    // Categorías expand/collapse
    expandAllCategories() {
        document.querySelectorAll('.category-header').forEach(header => {
            const grid = header.nextElementSibling;
            if (grid && grid.style.display === 'none') {
                header.click();
            }
        });
    }

    collapseAllCategories() {
        document.querySelectorAll('.category-header').forEach(header => {
            const grid = header.nextElementSibling;
            if (grid && grid.style.display !== 'none') {
                header.click();
            }
        });
    }

    // Playlist Modal
    openPlaylistModal() {
        document.getElementById('playlistModal').classList.add('active');
    }

    closePlaylistModal() {
        document.getElementById('playlistModal').classList.remove('active');
        this.clearStatusMessages();
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        event.target.classList.add('active');
        document.getElementById('tab-' + tabName).classList.add('active');
        
        this.clearStatusMessages();
    }

    clearStatusMessages() {
        ['urlStatus', 'fileStatus', 'repoStatus'].forEach(id => {
            const elem = document.getElementById(id);
            elem.className = 'status-message';
            elem.textContent = '';
        });
    }

    showStatus(elementId, message, type) {
        const elem = document.getElementById(elementId);
        elem.className = 'status-message ' + type;
        elem.textContent = message;
    }

    // Cargar playlists
    async loadFromURL() {
        const urlInput = document.getElementById('urlInput').value.trim();
        const category = document.getElementById('urlCategory').value.trim() || 'general';
        
        if (!urlInput) {
            this.showStatus('urlStatus', '⚠️ Por favor ingresa una URL', 'error');
            return;
        }

        this.showStatus('urlStatus', '⏳ Descargando lista...', 'info');

        try {
            const result = await this.playlistLoader.loadFromURL(urlInput, category);
            this.showStatus('urlStatus', `✅ ${result.count} canales cargados correctamente`, 'success');
            document.getElementById('urlInput').value = '';
            setTimeout(() => this.closePlaylistModal(), 2000);
        } catch (error) {
            this.showStatus('urlStatus', `❌ Error: ${error.message}. Verifica que la URL sea correcta y permita CORS`, 'error');
        }
    }

    updateFileName() {
        const fileInput = document.getElementById('fileInput');
        const fileName = document.getElementById('fileName');
        
        if (fileInput.files.length > 0) {
            fileName.textContent = '📄 ' + fileInput.files[0].name;
        } else {
            fileName.textContent = '📄 Click para seleccionar archivo';
        }
    }

    async loadFromFile() {
        const fileInput = document.getElementById('fileInput');
        const category = document.getElementById('fileCategory').value.trim() || 'general';
        
        if (!fileInput.files.length) {
            this.showStatus('fileStatus', '⚠️ Por favor selecciona un archivo', 'error');
            return;
        }

        this.showStatus('fileStatus', '⏳ Leyendo archivo...', 'info');

        try {
            const result = await this.playlistLoader.loadFromFile(fileInput.files[0], category);
            this.showStatus('fileStatus', `✅ ${result.count} canales cargados correctamente`, 'success');
            fileInput.value = '';
            this.updateFileName();
            setTimeout(() => this.closePlaylistModal(), 2000);
        } catch (error) {
            this.showStatus('fileStatus', `❌ Error al procesar el archivo: ${error.message}`, 'error');
        }
    }

    selectRepoFile(filePath) {
        document.querySelectorAll('.repo-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        event.currentTarget.classList.add('selected');
        document.getElementById('selectedRepoFile').value = filePath;
        document.getElementById('repoLoadBtn').disabled = false;
    }

    async loadFromRepo() {
        const filePath = document.getElementById('selectedRepoFile').value;
        
        if (!filePath) {
            this.showStatus('repoStatus', '⚠️ Por favor selecciona un archivo', 'error');
            return;
        }

        this.showStatus('repoStatus', '⏳ Cargando lista...', 'info');

        try {
            const result = await this.playlistLoader.loadFromRepo(filePath);
            this.showStatus('repoStatus', `✅ ${result.count} canales cargados correctamente`, 'success');
            setTimeout(() => this.closePlaylistModal(), 2000);
        } catch (error) {
            this.showStatus('repoStatus', `❌ Error: ${error.message}`, 'error');
        }
    }

    mergeChannels(loadedChannels) {
        // Combinar canales originales con los cargados dinámicamente
        const allChannels = [...CANALES_STREAMING, ...loadedChannels];
        
        // Eliminar duplicados por nombre y URL
        const uniqueChannels = allChannels.reduce((acc, channel) => {
            const key = `${channel.name}-${channel.url}`;
            if (!acc.has(key)) {
                acc.set(key, channel);
            }
            return acc;
        }, new Map());

        // Actualizar la variable global channels
        this.channels = Array.from(uniqueChannels.values());
        
        // Resetear cache de categorización
        this.categorizedChannels = null;
        
        // Re-renderizar
        this.renderChannels();
        
        // Actualizar contador
        document.getElementById('totalChannels').textContent = this.channels.length;
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('./public/sw.js')
                    .then(registration => {
                        console.log('Service Worker registrado:', registration.scope);
                    })
                    .catch(error => {
                        console.log('Error al registrar Service Worker:', error);
                    });
            });
        }
    }
}

// Inicializar aplicación cuando el DOM esté listo
let app;
window.addEventListener('DOMContentLoaded', () => {
    app = new StreamingApp();
});

// Exportar funciones globales para compatibilidad con onclick
window.closeVideo = () => app.player.close();
window.expandAllCategories = () => app.expandAllCategories();
window.collapseAllCategories = () => app.collapseAllCategories();
window.toggleControlParental = () => app.toggleControlParental();
window.openPlaylistModal = () => app.openPlaylistModal();
window.closePlaylistModal = () => app.closePlaylistModal();
window.switchTab = (tabName) => app.switchTab(tabName);
window.loadFromURL = () => app.loadFromURL();
window.updateFileName = () => app.updateFileName();
window.loadFromFile = () => app.loadFromFile();
window.selectRepoFile = (filePath) => app.selectRepoFile(filePath);
window.loadFromRepo = () => app.loadFromRepo();
