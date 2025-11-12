/**
 * Configuration file for Free IPTV Player
 * 
 * The Vercel proxy URL is injected at build time via environment variables
 * Set VITE_VERCEL_PROXY_URL in GitHub Secrets for production
 */

export const CONFIG = {
    // Local proxy URL for development
    LOCAL_PROXY_URL: 'http://localhost:4000/api/xtream',

    // Auto-detect environment
    isProduction: () => {
        return window.location.hostname !== 'localhost' &&
               window.location.hostname !== '127.0.0.1';
    },

    // Detect if running on a Vercel domain
    isVercel: () => /\.vercel\.app$/i.test(window.location.hostname),

    // Resolve proxy URL for production environments
    resolveVercelProxyUrl: function() {
        // 1) If we are on a Vercel domain, use the same origin
        if (this.isVercel()) {
            return `${window.location.origin}/api/xtream`;
        }
        // 2) Prefer runtime-injected URL (GitHub Actions for GitHub Pages)
        if (window.__VERCEL_PROXY_URL__ && typeof window.__VERCEL_PROXY_URL__ === 'string' && window.__VERCEL_PROXY_URL__.trim()) {
            return window.__VERCEL_PROXY_URL__;
        }
        // 3) Fallback (can be overridden later by secrets)
        return 'https://free-iptv-player.vercel.app/api/xtream';
    },

    // Get the appropriate proxy URL based on environment
    getProxyUrl: function() {
        return this.isProduction() ? this.resolveVercelProxyUrl() : this.LOCAL_PROXY_URL;
    }
};
