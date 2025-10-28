/**
 * M3U/M3U8 Parser
 * Analiza archivos M3U/M3U8 y extrae información de canales
 */

export class M3UParser {
    /**
     * Analiza contenido M3U/M3U8 y devuelve array de canales
     * @param {string} content - Contenido del archivo M3U/M3U8
     * @param {string} defaultCategory - Categoría por defecto si no se especifica
     * @returns {Array} Array de objetos de canal
     */
    static parse(content, defaultCategory = 'general') {
        const lines = content.split('\n').map(line => line.trim()).filter(line => line);
        const parsedChannels = [];
        let currentChannel = {};

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Línea de información del canal (#EXTINF)
            if (line.startsWith('#EXTINF:')) {
                currentChannel = {};
                
                // Extraer nombre del canal
                const nameMatch = line.match(/,(.+)$/);
                if (nameMatch) {
                    currentChannel.name = nameMatch[1].trim();
                }

                // Extraer logo si existe (tvg-logo)
                const logoMatch = line.match(/tvg-logo="([^"]+)"/i);
                if (logoMatch) {
                    currentChannel.logo = logoMatch[1];
                }

                // Extraer categoría si existe (group-title)
                const categoryMatch = line.match(/group-title="([^"]+)"/i);
                if (categoryMatch) {
                    currentChannel.category = categoryMatch[1].toLowerCase().trim();
                } else {
                    currentChannel.category = defaultCategory;
                }
            }
            // Línea de URL del stream
            else if (line.startsWith('http://') || line.startsWith('https://')) {
                if (currentChannel.name) {
                    currentChannel.url = line;
                    
                    // Asignar logo por defecto si no existe
                    if (!currentChannel.logo) {
                        currentChannel.logo = 'assets/icons/favicon.svg';
                    }
                    
                    parsedChannels.push({...currentChannel});
                    currentChannel = {};
                }
            }
        }

        return parsedChannels;
    }

    /**
     * Valida si un contenido tiene formato M3U/M3U8 válido
     * @param {string} content - Contenido a validar
     * @returns {boolean}
     */
    static isValid(content) {
        return content.includes('#EXTINF') || content.includes('#EXTM3U');
    }
}
