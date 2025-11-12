/**
 * Playlist Loader
 * Maneja la carga de listas M3U/M3U8 desde múltiples fuentes
 */

import { M3UParser } from './m3u-parser.js';
import { Xtream } from './xtream.js';

export class PlaylistLoader {
    constructor(onChannelsLoaded) {
        this.onChannelsLoaded = onChannelsLoaded;
        this.loadedChannels = [];
    }

    /**
     * Carga playlist desde URL
     */
    async loadFromURL(url, defaultCategory = 'general') {
        try {
            const response = await fetch(url, {
                mode: 'cors',
                headers: {
                    'Accept': 'application/x-mpegURL, application/vnd.apple.mpegurl, text/plain, */*'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const content = await response.text();
            
            if (!content || content.trim().length === 0) {
                throw new Error('La URL devolvió contenido vacío');
            }

            // Validar que sea un archivo M3U/M3U8 válido
            if (!M3UParser.isValid(content)) {
                throw new Error('El archivo no tiene un formato M3U/M3U8 válido');
            }

            const newChannels = M3UParser.parse(content, defaultCategory);

            if (newChannels.length === 0) {
                throw new Error('No se encontraron canales válidos en la lista M3U/M3U8');
            }

            this.loadedChannels.push(...newChannels);
            this.onChannelsLoaded(this.loadedChannels);

            return { success: true, count: newChannels.length };
        } catch (error) {
            console.error('Error al cargar desde URL:', error);
            
            // Mensajes de error más específicos
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                throw new Error('No se pudo conectar con la URL. Verifica que sea accesible y permita CORS');
            }
            
            throw error;
        }
    }

    /**
     * Carga playlist desde archivo local
     */
    async loadFromFile(file, defaultCategory = 'general') {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    const newChannels = M3UParser.parse(content, defaultCategory);

                    if (newChannels.length === 0) {
                        reject(new Error('No se encontraron canales en el archivo'));
                        return;
                    }

                    this.loadedChannels.push(...newChannels);
                    this.onChannelsLoaded(this.loadedChannels);

                    resolve({ success: true, count: newChannels.length });
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = () => {
                reject(new Error('Error al leer el archivo'));
            };

            reader.readAsText(file);
        });
    }

    /**
     * Carga playlist desde repositorio
     */
    async loadFromRepo(filePath) {
        try {
            const response = await fetch(filePath);

            if (!response.ok) {
                throw new Error(`Error al cargar el archivo: ${response.status}`);
            }

            const content = await response.text();
            const newChannels = M3UParser.parse(content);

            if (newChannels.length === 0) {
                throw new Error('No se encontraron canales en el archivo');
            }

            this.loadedChannels.push(...newChannels);
            this.onChannelsLoaded(this.loadedChannels);

            return { success: true, count: newChannels.length };
        } catch (error) {
            console.error('Error al cargar desde repositorio:', error);
            throw error;
        }
    }

    /**
     * Carga lista desde credenciales Xtream Codes
     * @param {string} server
     * @param {string} username
     * @param {string} password
     * @param {string} defaultCategory
     */
    async loadFromXtream(server, username, password, defaultCategory = 'general') {
        try {
            const newChannels = await Xtream.getChannels(server, username, password, defaultCategory);

            if (!Array.isArray(newChannels) || newChannels.length === 0) {
                throw new Error('No se encontraron canales en el servidor Xtream');
            }

            this.loadedChannels.push(...newChannels);
            this.onChannelsLoaded(this.loadedChannels);

            return { success: true, count: newChannels.length };
        } catch (error) {
            console.error('Error al cargar desde Xtream:', error);

            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                throw new Error('No se pudo conectar con el servidor Xtream. Verifica la URL y CORS.');
            }

            throw error;
        }
    }

    /**
     * Obtiene canales cargados
     */
    getLoadedChannels() {
        return this.loadedChannels;
    }

    /**
     * Limpia canales cargados
     */
    clear() {
        this.loadedChannels = [];
    }
}
