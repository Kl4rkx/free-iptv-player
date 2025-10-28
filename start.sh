#!/bin/bash

# ============================================
# Free IPTV Player - Quick Start (Linux/Mac)
# ============================================

echo "========================================"
echo "  Free IPTV Player - Quick Start"
echo "========================================"
echo ""

# Detectar sistema operativo
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="mac"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
else
    OS="unknown"
fi

# Puerto por defecto
PORT=8080

echo "[*] Sistema operativo detectado: $OS"
echo "[*] Puerto: $PORT"
echo ""

# Función para abrir navegador
open_browser() {
    URL="http://localhost:$PORT"
    echo "[i] Abriendo navegador en $URL..."
    
    if [[ "$OS" == "mac" ]]; then
        open "$URL"
    elif [[ "$OS" == "linux" ]]; then
        xdg-open "$URL" 2>/dev/null || sensible-browser "$URL" 2>/dev/null || x-www-browser "$URL" 2>/dev/null
    fi
}

# Verificar si Python está disponible
if command -v python3 &> /dev/null; then
    echo "[OK] Python 3 encontrado"
    echo "[*] Iniciando servidor..."
    echo ""
    echo "[i] Presiona Ctrl+C para detener el servidor"
    echo ""
    
    # Esperar 2 segundos y abrir navegador
    (sleep 2 && open_browser) &
    
    # Iniciar servidor
    python3 -m http.server $PORT
    
elif command -v python &> /dev/null; then
    echo "[OK] Python encontrado"
    echo "[*] Iniciando servidor..."
    echo ""
    echo "[i] Presiona Ctrl+C para detener el servidor"
    echo ""
    
    # Esperar 2 segundos y abrir navegador
    (sleep 2 && open_browser) &
    
    # Iniciar servidor
    python -m http.server $PORT
    
# Verificar si Node.js está disponible
elif command -v node &> /dev/null; then
    echo "[OK] Node.js encontrado"
    
    if command -v npx &> /dev/null; then
        echo "[*] Iniciando servidor con http-server..."
        echo ""
        echo "[i] Presiona Ctrl+C para detener el servidor"
        echo ""
        
        # Esperar 2 segundos y abrir navegador
        (sleep 2 && open_browser) &
        
        # Iniciar servidor
        npx http-server -p $PORT
    else
        echo "[X] Error: npx no está disponible"
        echo "[i] Instala http-server: npm install -g http-server"
        exit 1
    fi
else
    echo "[X] ERROR: No se encontró Python ni Node.js"
    echo ""
    echo "Por favor instala uno de los siguientes:"
    echo "  - Python 3: https://www.python.org/downloads/"
    echo "  - Node.js: https://nodejs.org/"
    exit 1
fi
