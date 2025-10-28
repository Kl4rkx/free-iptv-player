// ====================================
// EJEMPLO DE ESTRUCTURA DE CANALES
// Este archivo muestra cómo debe estructurarse canales.js
// ====================================

const CANALES_STREAMING = [
    // Ejemplo de canal de deportes
    { 
        name: "ESPN HD", 
        logo: "/posters/canales/espn.png", 
        url: "http://ejemplo.com/espn/playlist.m3u8", 
        category: "deportes" 
    },
    
    // Ejemplo de canal de películas
    { 
        name: "HBO", 
        logo: "/posters/canales/hbo.png", 
        url: "http://ejemplo.com/hbo/playlist.m3u8", 
        category: "peliculas" 
    },
    
    // Ejemplo de canal de series
    { 
        name: "AXN", 
        logo: "/posters/canales/axn.png", 
        url: "http://ejemplo.com/axn/playlist.m3u8", 
        category: "series" 
    },
    
    // Ejemplo de canal infantil
    { 
        name: "Disney Channel", 
        logo: "/posters/canales/disney.png", 
        url: "http://ejemplo.com/disney/playlist.m3u8", 
        category: "infantil" 
    },
    
    // Agrega más canales aquí siguiendo el mismo formato...
];

// Exportar para uso en index.html
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CANALES_STREAMING;
}

/* 
 * CATEGORÍAS DISPONIBLES:
 * - deportes
 * - peliculas
 * - series
 * - nacionales
 * - peru
 * - colombia
 * - espana
 * - internacional
 * - infantil
 * - documentales
 * - novelas
 * - musica
 * - religioso
 * - gourmet
 * - 24/7
 * - noticias
 * - premium
 * - entretenimiento
 */
