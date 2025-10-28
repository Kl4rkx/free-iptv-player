@echo off
REM ============================================
REM Free IPTV Player - Quick Start (Windows)
REM ============================================

title Free IPTV Player - Starting Server...

echo.
echo ========================================
echo   Free IPTV Player - Quick Start
echo ========================================
echo.

REM Puerto por defecto
set PORT=8080

REM Detectar Python
where python >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Python encontrado
    echo [*] Iniciando servidor en puerto %PORT%...
    echo.
    echo [i] Presiona Ctrl+C para detener el servidor
    echo [i] Abriendo navegador en http://localhost:%PORT%
    echo.
    
    REM Abrir navegador después de 2 segundos
    start "" "http://localhost:%PORT%"
    
    REM Iniciar servidor Python
    python -m http.server %PORT%
    goto :end
)

REM Si no hay Python, intentar con Python3
where python3 >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Python3 encontrado
    echo [*] Iniciando servidor en puerto %PORT%...
    echo.
    echo [i] Presiona Ctrl+C para detener el servidor
    echo [i] Abriendo navegador en http://localhost:%PORT%
    echo.
    
    REM Abrir navegador después de 2 segundos
    start "" "http://localhost:%PORT%"
    
    REM Iniciar servidor Python3
    python3 -m http.server %PORT%
    goto :end
)

REM Si no hay Python, intentar con Node.js
where node >nul 2>nul
if %errorlevel% equ 0 (
    echo [OK] Node.js encontrado
    where npx >nul 2>nul
    if %errorlevel% equ 0 (
        echo [*] Iniciando servidor con http-server en puerto %PORT%...
        echo.
        echo [i] Presiona Ctrl+C para detener el servidor
        echo [i] Abriendo navegador en http://localhost:%PORT%
        echo.
        
        REM Abrir navegador
        start "" "http://localhost:%PORT%"
        
        REM Iniciar servidor Node
        npx http-server -p %PORT% -o
        goto :end
    ) else (
        echo [X] Error: npx no esta disponible
        echo [i] Instala http-server: npm install -g http-server
        pause
        exit /b 1
    )
)

REM Si no se encontró nada
echo [X] ERROR: No se encontro Python ni Node.js
echo.
echo Por favor instala uno de los siguientes:
echo   - Python 3: https://www.python.org/downloads/
echo   - Node.js: https://nodejs.org/
echo.
pause
exit /b 1

:end
pause
