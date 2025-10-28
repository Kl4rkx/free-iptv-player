#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Servidor HTTP optimizado para Android TV / Xiaomi TV
Características:
- CORS habilitado para streaming
- Compresión gzip automática
- Cache optimizado
- MIME types correctos para M3U8/HLS
- Detección automática de IP local
- Compatible con navegadores básicos de TV
"""

import http.server
import socketserver
import socket
import os
import sys
import gzip
import io
from pathlib import Path
from urllib.parse import unquote

# Configuración
PORT = 8080
BUFFER_SIZE = 65536  # 64KB para streaming suave

# MIME types optimizados para TV y streaming
MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf',
    '.m3u': 'audio/x-mpegurl',
    '.m3u8': 'application/vnd.apple.mpegurl',
    '.ts': 'video/mp2t',
    '.mp4': 'video/mp4',
    '.webm': 'video/webm',
}


class OptimizedTVHandler(http.server.SimpleHTTPRequestHandler):
    """Handler HTTP optimizado para Android TV"""
    
    # Aumentar buffer para streaming
    rbufsize = BUFFER_SIZE
    wbufsize = BUFFER_SIZE
    
    def __init__(self, *args, **kwargs):
        # Cambiar al directorio raíz del proyecto
        project_root = Path(__file__).parent.parent
        os.chdir(project_root)
        super().__init__(*args, **kwargs)
    
    def end_headers(self):
        """Headers optimizados para TV y streaming"""
        # CORS - permitir todo (necesario para HLS.js)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        
        # Cache estratégico
        path = self.path.lower()
        if any(ext in path for ext in ['.m3u8', '.ts', '.m3u']):
            # Streaming: sin cache
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        elif any(ext in path for ext in ['.js', '.css', '.jpg', '.png', '.svg']):
            # Assets estáticos: cache largo
            self.send_header('Cache-Control', 'public, max-age=31536000')
        else:
            # HTML: cache corto
            self.send_header('Cache-Control', 'public, max-age=3600')
        
        # Compresión para archivos de texto grandes
        if hasattr(self, '_compressed_body'):
            self.send_header('Content-Encoding', 'gzip')
        
        # Headers adicionales para compatibilidad TV
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Accept-Ranges', 'bytes')
        
        super().end_headers()
    
    def do_GET(self):
        """GET request mejorado con compresión y mejor manejo de errores"""
        # Decodificar URL
        self.path = unquote(self.path)
        
        # Redirigir / a /index.html
        if self.path == '/':
            self.path = '/index.html'
        
        # Log de request
        print(f"[GET] {self.path}")
        
        # Obtener ruta del archivo
        file_path = self.translate_path(self.path)
        
        try:
            # Verificar si el archivo existe
            if not os.path.exists(file_path):
                self.send_error_page(404, "Archivo no encontrado")
                return
            
            if os.path.isdir(file_path):
                self.send_error_page(403, "Acceso denegado a directorios")
                return
            
            # Obtener extensión y MIME type
            ext = os.path.splitext(file_path)[1].lower()
            content_type = MIME_TYPES.get(ext, 'application/octet-stream')
            
            # Leer archivo
            with open(file_path, 'rb') as f:
                content = f.read()
            
            # Comprimir archivos grandes de texto (>1KB)
            should_compress = (
                len(content) > 1024 and 
                ext in ['.html', '.css', '.js', '.json', '.svg', '.m3u']
            )
            
            if should_compress:
                # Comprimir con gzip
                out = io.BytesIO()
                with gzip.GzipFile(fileobj=out, mode='wb', compresslevel=6) as gz:
                    gz.write(content)
                content = out.getvalue()
                self._compressed_body = True
            
            # Enviar respuesta
            self.send_response(200)
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Length', str(len(content)))
            self.end_headers()
            self.wfile.write(content)
            
            # Log exitoso
            size_kb = len(content) / 1024
            compressed = " (gzip)" if should_compress else ""
            print(f"  └─ 200 OK | {size_kb:.1f}KB{compressed} | {content_type}")
        
        except Exception as e:
            print(f"  └─ ERROR: {str(e)}")
            self.send_error_page(500, f"Error del servidor: {str(e)}")
    
    def do_OPTIONS(self):
        """Manejar preflight CORS requests"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Content-Length', '0')
        self.end_headers()
    
    def send_error_page(self, code, message):
        """Página de error personalizada para TV"""
        html = f"""<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{code} - Error</title>
    <style>
        * {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        body {{
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
        }}
        .container {{
            text-align: center;
            max-width: 600px;
            background: rgba(0, 0, 0, 0.3);
            padding: 60px 40px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }}
        h1 {{
            font-size: 120px;
            font-weight: 900;
            margin-bottom: 20px;
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            line-height: 1;
        }}
        p {{
            font-size: 28px;
            margin-bottom: 30px;
            opacity: 0.9;
        }}
        a {{
            display: inline-block;
            color: #fff;
            background: rgba(255, 255, 255, 0.2);
            padding: 15px 40px;
            text-decoration: none;
            font-size: 22px;
            border-radius: 50px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s ease;
            margin-top: 20px;
        }}
        a:hover, a:focus {{
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }}
        .icon {{
            font-size: 80px;
            margin-bottom: 20px;
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">📺</div>
        <h1>{code}</h1>
        <p>{message}</p>
        <a href="/">← Volver al inicio</a>
    </div>
</body>
</html>"""
        
        content = html.encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', str(len(content)))
        self.end_headers()
        self.wfile.write(content)
        print(f"  └─ {code} {message}")
    
    def log_message(self, format, *args):
        """Desactivar logs automáticos (usamos los nuestros)"""
        pass


def get_local_ip():
    """Obtener IP local de la red"""
    try:
        # Crear socket temporal para obtener IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        s.close()
        return local_ip
    except Exception:
        return "localhost"


def print_banner(ip, port):
    """Banner de inicio con información de acceso"""
    banner = f"""
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║       📺  SERVIDOR TV - M3U8 STREAMING PLATFORM         ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝

🌐 ACCESO DESDE TV (Xiaomi / Fire TV):
   └─ http://{ip}:{port}

🔗 PLAYLIST M3U8 PARA APPS IPTV (SIN ADULTOS):
   └─ http://{ip}:{port}/data/canales-tv.m3u8
   └─ 11,669 canales organizados por categorías

📱 APPS RECOMENDADAS:
   ├─ Android TV: IPTV Smarters Pro ⭐, TiviMate
   └─ Fire TV: IPTV Smarters Pro, Kodi

🎯 NAVEGADORES TV:
   ├─ Xiaomi TV: Puffin TV Browser, TV Bro
   ├─ Versión optimizada: http://{ip}:{port}/index-tv.html
   └─ Fire TV: Silk Browser, Firefox

⚙️  OPTIMIZACIONES ACTIVAS:
   ✓ Compresión gzip automática
   ✓ Cache inteligente (streaming sin cache)
   ✓ CORS habilitado para HLS.js
   ✓ Buffer 64KB para streaming suave
   ✓ MIME types optimizados M3U8/HLS
   ✓ Compatible con navegadores básicos

⚠️  IMPORTANTE:
   1. Asegúrate de estar en la misma red WiFi
   2. Usa el control remoto de tu TV para navegar
   3. Para mejor experiencia, usa app IPTV nativa

💡 CONFIGURACIÓN APPS IPTV:
   1. Instala IPTV Smarters Pro en tu TV
   2. "Load Playlist" → "M3U URL"
   3. Pega: http://{ip}:{port}/data/canales-tv.m3u8
   4. ¡Listo! Ver guía: docs/CONFIGURACION-IPTV.md

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Servidor iniciado ✓
Presiona Ctrl+C para detener

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""
    print(banner)


def main():
    """Función principal"""
    try:
        # Obtener IP local
        local_ip = get_local_ip()
        
        # Configurar servidor
        handler = OptimizedTVHandler
        socketserver.TCPServer.allow_reuse_address = True
        
        with socketserver.TCPServer(("", PORT), handler) as httpd:
            # Mostrar banner
            print_banner(local_ip, PORT)
            
            # Iniciar servidor
            httpd.serve_forever()
    
    except KeyboardInterrupt:
        print("\n\n⏹️  Servidor detenido por el usuario")
        sys.exit(0)
    
    except OSError as e:
        if e.errno == 98 or e.errno == 48:  # Puerto en uso
            print(f"\n❌ ERROR: El puerto {PORT} ya está en uso")
            print(f"💡 Solución: Cierra el otro servidor o usa otro puerto\n")
        else:
            print(f"\n❌ ERROR: {str(e)}\n")
        sys.exit(1)
    
    except Exception as e:
        print(f"\n❌ ERROR INESPERADO: {str(e)}\n")
        sys.exit(1)


if __name__ == "__main__":
    main()
