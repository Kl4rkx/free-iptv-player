
/**
 * Xtream Codes helper
 * Intenta obtener una lista de canales desde un servidor Xtream.
 * Estrategia:
 * 1) Intentar descargar el M3U via /get.php?username=...&password=...&type=m3u_plus
 * 2) Si falla, intentar autenticar y leer player_api.php para validar credenciales
 * 3) Devolver array de canales compatibles con el resto de la app: { name, url, logo, category }
 *
 * Nota sobre CORS: muchos servidores Xtream no permiten solicitudes desde navegadores (CORS).
 * En ese caso la app mostrará un error con sugerencias (usar proxy CORS o transformar las credenciales en un enlace M3U fuera de la app).
 */

import { M3UParser } from './m3u-parser.js';

export class Xtream {
    /**
     * Normaliza la URL base del servidor (sin barra final)
     */
    static normalizeServer(url) {
        if (!url) return '';
        url = url.trim();
        // Añadir protocolo por defecto si falta (no recomendable, pero útil para UX)
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }
        // Eliminar barra final de forma segura (evitar ReDoS)
        while (url.endsWith('/')) {
            url = url.slice(0, -1);
        }
        return url;
    }

    /**
     * Intenta obtener un M3U completo usando get.php
     */
    static async fetchM3UFromGet(server, username, password) {
        const base = Xtream.normalizeServer(server);
        const url = `${base}/get.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&type=m3u_plus`;
        const res = await fetch(url, { mode: 'cors' });
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} al solicitar M3U via get.php`);
        }
        const text = await res.text();
        if (!text || text.trim().length === 0) {
            throw new Error('M3U vacío desde get.php');
        }
        return text;
    }

    /**
     * Intenta leer player_api.php para validar credenciales y obtener streams en JSON
     */
    static async fetchFromPlayerAPI(server, username, password) {
        const base = Xtream.normalizeServer(server);
        const url = `${base}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&action=get_live_streams`;
        const res = await fetch(url, { mode: 'cors' });
        if (!res.ok) {
            throw new Error(`HTTP ${res.status} al solicitar player_api.php`);
        }
        const json = await res.json();
        if (!Array.isArray(json)) {
            // Algunos servidores devuelven un objeto con error
            if (json && json.error) throw new Error(json.error);
            throw new Error('Respuesta inesperada desde player_api.php');
        }
        return json;
    }

    /**
     * Construye una URL reproducible para un stream usando player.php (posible en muchos servidores Xtream)
     * Este enfoque no es 100% universal, pero funciona en muchas instalaciones.
     */
    static buildPlayerUrl(server, username, password, streamId) {
        const base = Xtream.normalizeServer(server);
        // player.php es usado por muchos paneles; si no funciona, el fallback fue parsear el M3U completo
        return `${base}/player.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&stream=${encodeURIComponent(streamId)}`;
    }

    /**
     * Obtiene canales desde Xtream: intenta get.php (M3U) y si no está disponible usa player_api.php
     * Retorna array de canales: { name, url, logo, category }
     */
    static async getChannels(server, username, password, defaultCategory = 'general') {
        if (!server || !username || !password) {
            throw new Error('Servidor, usuario y contraseña son requeridos');
        }

        // 1) Intentar get.php -> M3U
        try {
            const m3u = await Xtream.fetchM3UFromGet(server, username, password);
            // Reusar parser existente
            const parsed = M3UParser.parse(m3u, defaultCategory);
            if (parsed.length > 0) return parsed;
            // Si parse no devuelve nada, continuar con player_api.php
        } catch (err) {
            // Si hay error, lo guardamos pero continuamos a player_api.php
            console.warn('get.php M3U failed:', err.message);
        }

        // 2) Intentar player_api.php
        try {
            const list = await Xtream.fetchFromPlayerAPI(server, username, password);
            const channels = list.map(item => {
                const name = item.name || item.stream_name || item.title || `Canal ${item.stream_id || item.id || ''}`;
                const logo = item.stream_icon || item.logo || '';
                // Intentar categorías si vienen en la respuesta
                const category = (item.category && item.category.name) ? item.category.name : (item.category_name || defaultCategory);
                const streamId = item.stream_id || item.stream_id || item.id || item.tv_archive || '';
                const url = Xtream.buildPlayerUrl(server, username, password, streamId);
                return {
                    name: name,
                    url: url,
                    logo: logo || 'assets/icons/favicon.svg',
                    category: (category || defaultCategory).toLowerCase().trim()
                };
            });

            if (channels.length === 0) {
                throw new Error('No se encontraron canales vía player_api.php');
            }

            return channels;
        } catch (err) {
            // Si falla por CORS o credenciales, normalizar mensaje
            if (err instanceof TypeError && err.message.includes('Failed to fetch')) {
                throw new Error('No se pudo conectar al servidor Xtream desde el navegador (posible bloqueo CORS). Considera usar un proxy CORS o generar un enlace M3U fuera de la app.');
            }
            throw err;
        }
    }
}
