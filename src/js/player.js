/**
 * Video Player Manager
 * Maneja la reproducción de streams HLS/M3U8
 */

export class VideoPlayer {
    constructor(videoElement, modalElement, loadingElement) {
        this.video = videoElement;
        this.modal = modalElement;
        this.loading = loadingElement;
        this.hls = null;
    }

    /**
     * Reproduce un canal
     * @param {string} url - URL del stream
     * @param {string} name - Nombre del canal
     */
    play(url, name) {
        // Mostrar indicador de carga
        this.loading.classList.add('active');
        
        // Detener cualquier reproducción anterior
        this.stop();
        
        // Abrir modal
        this.modal.classList.add('active');
        document.title = `${name} - Streaming`;
        
        // Verificar si el navegador soporta HLS nativamente (Safari, móviles)
        if (this.video.canPlayType('application/vnd.apple.mpegurl')) {
            this.playNative(url);
        } 
        // Usar HLS.js para navegadores que no soportan HLS nativamente
        else if (typeof Hls !== 'undefined' && Hls.isSupported()) {
            this.playWithHLS(url);
        } else {
            this.showError('Tu navegador no soporta la reproducción de este contenido');
        }
    }

    /**
     * Reproduce usando soporte nativo HLS
     */
    playNative(url) {
        this.video.src = url;
        this.video.load();
        
        this.video.addEventListener('loadedmetadata', () => {
            this.loading.classList.remove('active');
            this.video.play().catch(e => {
                console.log('Error al reproducir:', e);
                this.showError('Error al reproducir. Intenta de nuevo.');
            });
        }, { once: true });
        
        this.video.addEventListener('error', (e) => {
            console.error('Error de video:', e);
            this.showError('Error al cargar el stream');
        }, { once: true });
    }

    /**
     * Reproduce usando HLS.js
     */
    playWithHLS(url) {
        const hlsConfig = {
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90,
            maxBufferLength: 30,
            maxMaxBufferLength: 60,
            maxBufferSize: 60 * 1000 * 1000,
            maxBufferHole: 0.5,
            highBufferWatchdogPeriod: 2,
            nudgeOffset: 0.1,
            nudgeMaxRetry: 3,
            maxFragLookUpTolerance: 0.25,
            liveSyncDurationCount: 3,
            liveMaxLatencyDurationCount: 10,
            liveDurationInfinity: false,
            enableSoftwareAES: true,
            manifestLoadingTimeOut: 10000,
            manifestLoadingMaxRetry: 3,
            manifestLoadingRetryDelay: 1000,
            levelLoadingTimeOut: 10000,
            levelLoadingMaxRetry: 4,
            levelLoadingRetryDelay: 1000,
            fragLoadingTimeOut: 20000,
            fragLoadingMaxRetry: 6,
            fragLoadingRetryDelay: 1000,
            startFragPrefetch: true,
            testBandwidth: true,
            progressive: false,
            autoStartLoad: true,
            startPosition: -1,
            debug: false
        };
        
        this.hls = new Hls(hlsConfig);
        
        this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            console.log('Video y HLS.js unidos');
        });
        
        this.hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
            console.log('Manifest parseado, niveles disponibles:', data.levels.length);
            this.loading.classList.remove('active');
            
            this.video.play().catch(e => {
                console.log('Error al reproducir:', e);
                this.showInteractivePlay();
            });
        });
        
        this.hls.on(Hls.Events.ERROR, (event, data) => {
            console.error('HLS Error:', data);
            if (data.fatal) {
                this.handleFatalError(data);
            }
        });
        
        this.hls.loadSource(url);
        this.hls.attachMedia(this.video);
    }

    /**
     * Maneja errores fatales de HLS
     */
    handleFatalError(data) {
        switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
                console.log('Error de red, intentando recuperar...');
                this.hls.startLoad();
                break;
            case Hls.ErrorTypes.MEDIA_ERROR:
                console.log('Error de media, intentando recuperar...');
                this.hls.recoverMediaError();
                break;
            default:
                this.showError('Error fatal al reproducir el stream');
                this.stop();
                break;
        }
    }

    /**
     * Muestra botón para reproducir manualmente
     */
    showInteractivePlay() {
        this.loading.textContent = '▶️ Click para reproducir';
        this.loading.style.cursor = 'pointer';
        this.loading.onclick = () => {
            this.video.play().then(() => {
                this.loading.classList.remove('active');
                this.loading.onclick = null;
            });
        };
    }

    /**
     * Muestra mensaje de error
     */
    showError(message) {
        this.loading.textContent = `⚠️ ${message}`;
        this.loading.classList.add('active');
    }

    /**
     * Detiene la reproducción
     */
    stop() {
        if (this.hls) {
            this.hls.destroy();
            this.hls = null;
        }
        
        this.video.pause();
        this.video.removeAttribute('src');
        this.video.load();
    }

    /**
     * Cierra el reproductor
     */
    close() {
        this.stop();
        this.modal.classList.remove('active');
        this.loading.classList.remove('active');
        this.loading.textContent = '⏳ Cargando stream...';
        this.loading.style.cursor = 'default';
        this.loading.onclick = null;
        document.title = 'Canales de Streaming';
    }
}
