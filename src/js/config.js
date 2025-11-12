/**
 * Configuration file for Free IPTV Player
 * 
 * The Vercel proxy URL is injected at build time via environment variables
 * Set VITE_VERCEL_PROXY_URL in GitHub Secrets for production
 */

export const CONFIG = {
    // Vercel proxy URL from environment variable or fallback
    // This will be replaced during build by GitHub Actions
    VERCEL_PROXY_URL: import.meta.env?.VITE_VERCEL_PROXY_URL || 
                     window.__VERCEL_PROXY_URL__ || 
                     'https://free-iptv-player.vercel.app/api/xtream',
    
    // Local proxy URL for development
    LOCAL_PROXY_URL: 'http://localhost:4000/api/xtream',
    
    // Auto-detect environment
    isProduction: () => {
        return window.location.hostname !== 'localhost' && 
               window.location.hostname !== '127.0.0.1';
    },
    
    // Get the appropriate proxy URL based on environment
    getProxyUrl: function() {
        return this.isProduction() ? this.VERCEL_PROXY_URL : this.LOCAL_PROXY_URL;
    }
};
