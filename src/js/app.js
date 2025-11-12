/**
 * M3U8 Streaming Platform - Main App
 * Aplicación principal que coordina todos los componentes
 */

import { VideoPlayer } from './player.js';
import { PlaylistLoader } from './playlist-loader.js';
import { CONFIG } from './config.js';

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
    this.channels = typeof CANALES_STREAMING !== 'undefined' ? this.sanitizeChannels(CANALES_STREAMING) : [];
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
        
        // Renderizar canales o mensaje de bienvenida
        if (this.channels.length === 0) {
            console.warn('⚠️ No channels loaded - showing welcome message');
            this.showWelcomeMessage();
        } else {
            this.renderChannels();
        }
        
        this.actualizarBotonParental();
        
        // Event Listeners
        this.setupEventListeners();
        
        // Ocultar loading screen - asegurar que siempre se oculte
        this.hideLoadingScreen();

        // Service Worker
        this.registerServiceWorker();
    }

    hideLoadingScreen() {
        const loadingPage = document.getElementById('loadingPage');
        if (loadingPage) {
            setTimeout(() => {
                loadingPage.classList.add('hidden');
                console.log('✅ Loading screen hidden');
            }, 500);
        }
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
            categoryDiv.className = 'category mb-6 bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl border border-white/10 transition-all duration-300 hover:shadow-2xl';
            categoryDiv.id = `category-${category}`;

            // Header
            const categoryHeader = document.createElement('div');
            categoryHeader.className = 'category-header text-2xl sm:text-3xl font-bold p-6 uppercase border-b-2 border-white/20 transition-all duration-300 flex items-center gap-4 cursor-pointer hover:bg-white/5';
            categoryHeader.innerHTML = `
                <span class="collapse-icon inline-block text-base transition-transform duration-300 min-w-[20px]">▼</span>
                <span>${this.categoryTitles[category] || category}</span>
                <span class="category-badge inline-block bg-primary/30 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-semibold ml-auto border border-primary/50">${channels.length}</span>
            `;

            // Grid
            const channelsGrid = document.createElement('div');
            channelsGrid.className = 'channels-grid grid gap-5 p-6 sm:p-8';
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
                    categoryDiv.classList.remove('collapsed');
                } else {
                    // Colapsar
                    channelsGrid.style.display = 'none';
                    icon.textContent = '▼';
                    categoryDiv.classList.add('collapsed');
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
            card.className = 'channel-card bg-white/10 backdrop-blur-sm rounded-xl p-5 text-center transition-all duration-300 cursor-pointer border-2 border-transparent hover:bg-white/20 hover:-translate-y-2 hover:border-white/40 hover:shadow-xl active:scale-95';
            card.innerHTML = `
                <img src="${channel.logo}" alt="${channel.name}" class="channel-logo w-20 h-20 object-contain mb-4 rounded-lg bg-white/90 p-2 mx-auto shadow-md" 
                     onerror="this.src='assets/icons/favicon.svg'">
                <div class="channel-name text-sm sm:text-base font-bold mb-3 min-h-[60px] flex items-center justify-center text-center leading-tight px-1 overflow-hidden" title="${channel.name}">
                    <span class="line-clamp-3">${channel.name}</span>
                </div>
                <button class="play-button bg-green-500 hover:bg-green-600 text-white border-none px-5 py-2.5 rounded-full cursor-pointer text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50">▶ Ver</button>
            `;
            card.addEventListener('click', () => {
                // Bloquear reproducción HTTP en contexto HTTPS para evitar Mixed Content
                if (location.protocol === 'https:' && channel.url && channel.url.startsWith('http://')) {
                    alert('Este canal usa HTTP y está bloqueado en HTTPS. Intenta abrir el sitio por HTTP o usa una fuente HTTPS.');
                    return;
                }
                this.player.play(channel.url, channel.name);
            });
            container.appendChild(card);
        });
    }

    // Normaliza y sanea canales para producción
    sanitizeChannels(list) {
        return (list || []).map(ch => {
            const c = { ...ch };
            // categoría estandarizada
            c.category = (c.category || 'general').toLowerCase().trim();
            // evitar solicitudes HTTP de logos en HTTPS
            if (c.logo && typeof c.logo === 'string' && c.logo.startsWith('http://')) {
                c.logo = 'assets/icons/favicon.svg';
            }
            // logo por defecto
            if (!c.logo) c.logo = 'assets/icons/favicon.svg';
            return c;
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

    // Switch between tabs in the playlist modal
    // Handles tab activation, content visibility, and ARIA attributes
    switchTab(evt, tabName) {
        // Reset all tabs to inactive state
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        // Hide all tab content panels
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
            content.classList.add('hidden');
        });
        
        // Activate the clicked tab button
        if (evt && evt.currentTarget) {
            evt.currentTarget.classList.add('active');
            evt.currentTarget.setAttribute('aria-selected', 'true');
        }
        
        // Show the selected tab content
        const targetTab = document.getElementById('tab-' + tabName);
        if (targetTab) {
            targetTab.classList.add('active');
            targetTab.classList.remove('hidden');
        }
        
        // Clear any previous status messages
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
            console.error('Error loading from URL:', error);
            this.showStatus('urlStatus', `❌ Error: ${error.message}`, 'error');
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

    selectRepoFile(evt, filePath) {
        document.querySelectorAll('.repo-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        if (evt && evt.currentTarget) {
            evt.currentTarget.classList.add('selected');
        }
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

        async loadFromXtream() {
            const xtreamServer = document.getElementById('xtreamServer').value.trim(); // URL Xtream real
            const xtreamUser = document.getElementById('xtreamUser').value.trim();
            const xtreamPass = document.getElementById('xtreamPass').value.trim();
            const xtreamCategory = document.getElementById('xtreamCategory').value.trim() || 'general';

            if (!xtreamServer || !xtreamUser || !xtreamPass) {
                this.showStatus('xtreamStatus', '⚠️ Completa servidor, usuario y contraseña', 'error');
                return;
            }

            this.showStatus('xtreamStatus', '⏳ Conectando al servidor Xtream...', 'info');
            console.log('🔄 Intentando conectar a Xtream:', { server: xtreamServer, username: xtreamUser });

            // Obtener URL del proxy según el entorno
            const proxyUrl = CONFIG.getProxyUrl();
            const isProduction = CONFIG.isProduction();

            console.log('📡 Usando proxy:', proxyUrl, isProduction ? '(Producción)' : '(Desarrollo)');

            try {
                // Verificar si el proxy está disponible
                const res = await fetch(proxyUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        server: xtreamServer,
                        username: xtreamUser,
                        password: xtreamPass
                    })
                }).catch(err => {
                    console.error('❌ Error de conexión al proxy:', err);
                    if (isProduction) {
                        throw new Error('No se pudo conectar al servidor proxy. Contacta al administrador.');
                    } else {
                        throw new Error('No se pudo conectar al proxy local (puerto 4000). ¿Está ejecutando "node xtream-proxy.js"?');
                    }
                });

                console.log('📡 Respuesta del proxy:', res.status, res.statusText);

                if (!res.ok) {
                    let errorMsg = 'Error al conectar con el servidor Xtream';
                    try {
                        const err = await res.json();
                        errorMsg = err.error || errorMsg;
                        if (err.details) errorMsg += ` (${err.details})`;
                    } catch (e) {
                        const text = await res.text();
                        console.error('❌ Error del servidor:', text);
                    }
                    throw new Error(errorMsg);
                }

                const contentType = res.headers.get('content-type');
                console.log('📄 Tipo de contenido:', contentType);
                
                let loadedChannels = [];
                if (contentType && contentType.includes('text/plain')) {
                    // Respuesta M3U
                    const m3u = await res.text();
                    console.log('📝 M3U recibido, longitud:', m3u.length);
                    loadedChannels = this.playlistLoader.parseM3U(m3u, xtreamCategory);
                    console.log('✅ Canales parseados desde M3U:', loadedChannels.length);
                } else {
                    // Respuesta JSON
                    const data = await res.json();
                    console.log('📦 JSON recibido:', data);
                    if (Array.isArray(data.channels)) {
                        loadedChannels = this.playlistLoader.parseXtreamJson(data.channels, xtreamCategory);
                        console.log('✅ Canales parseados desde JSON:', loadedChannels.length);
                    } else {
                        throw new Error('Respuesta inesperada del proxy Xtream');
                    }
                }

                if (!loadedChannels.length) {
                    this.showStatus('xtreamStatus', '❌ No se encontraron canales válidos. Verifica tus credenciales.', 'error');
                    this.hideLoadingScreen();
                    document.getElementById('xtreamErrorBackBtn').classList.remove('hidden');
                    return;
                }

                console.log('🎉 Canales cargados exitosamente:', loadedChannels.length);
                this.mergeChannels(loadedChannels);
                this.showStatus('xtreamStatus', `✅ ${loadedChannels.length} canales cargados correctamente`, 'success');
                document.getElementById('xtreamPass').value = '';
                setTimeout(() => {
                    this.closePlaylistModal();
                    this.hideLoadingScreen();
                }, 2000);
            } catch (error) {
                console.error('❌ Error completo:', error);
                this.showStatus('xtreamStatus', `❌ Error: ${error.message}`, 'error');
                this.hideLoadingScreen();
                document.getElementById('xtreamErrorBackBtn').classList.remove('hidden');
            }
        }

    mergeChannels(loadedChannels) {
        // Combinar canales originales con los cargados dinámicamente
        const originalChannels = typeof CANALES_STREAMING !== 'undefined' ? this.sanitizeChannels(CANALES_STREAMING) : [];
        const allChannels = [...originalChannels, ...this.sanitizeChannels(loadedChannels)];
        
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
                navigator.serviceWorker.register('./sw.js')
                    .then(registration => {
                        console.log('Service Worker registrado:', registration.scope);
                    })
                    .catch(error => {
                        console.log('Error al registrar Service Worker:', error);
                    });
            });
        }
    }

    showWelcomeMessage() {
        const channelContainer = document.getElementById('channelsContainer');
        channelContainer.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                min-height: 60vh;
                text-align: center;
                padding: 2rem;
                gap: 2rem;
            ">
                <div style="font-size: 4rem;">🎬</div>
                <h2 style="font-size: 2rem; margin: 0; color: var(--text-color);">
                    Welcome to Free IPTV Player
                </h2>
                <p style="font-size: 1.2rem; color: var(--text-secondary); max-width: 600px; margin: 0;">
                    No channels loaded. Load your M3U/M3U8 playlist to get started!
                </p>
                <button 
                    onclick="openPlaylistModal()" 
                    style="
                        padding: 1rem 2rem;
                        font-size: 1.1rem;
                        background: linear-gradient(135deg, #667eea, #764ba2);
                        color: white;
                        border: none;
                        border-radius: 12px;
                        cursor: pointer;
                        font-weight: 700;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                        transition: all 0.3s ease;
                    "
                    onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.6)'"
                    onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.4)'"
                >
                    📥 Load Playlist
                </button>
                <div style="margin-top: 2rem;">
                    <p style="color: var(--text-secondary); margin-bottom: 0.5rem;">
                        <strong>Supported formats:</strong>
                    </p>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center;">
                        <span style="background: rgba(102, 126, 234, 0.2); padding: 0.5rem 1rem; border-radius: 8px;">
                            📄 M3U
                        </span>
                        <span style="background: rgba(118, 75, 162, 0.2); padding: 0.5rem 1rem; border-radius: 8px;">
                            📄 M3U8
                        </span>
                        <span style="background: rgba(102, 126, 234, 0.2); padding: 0.5rem 1rem; border-radius: 8px;">
                            🌐 HLS
                        </span>
                    </div>
                </div>
            </div>
        `;
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
// Pass event object to maintain proper tab state
window.switchTab = (evt, tabName) => app.switchTab(evt, tabName);
window.loadFromURL = () => app.loadFromURL();
window.updateFileName = () => app.updateFileName();
window.loadFromFile = () => app.loadFromFile();
window.selectRepoFile = (evt, filePath) => app.selectRepoFile(evt, filePath);
window.loadFromRepo = () => app.loadFromRepo();
window.loadFromXtream = () => app.loadFromXtream();
