#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generador de playlist M3U8 optimizada para IPTV
Características:
- Categorías con group-title (compatibles con todas las apps IPTV)
- Sin canales adultos (filtrado automático)
- Logos incluidos (tvg-logo)
- EPG ID opcional (tvg-id)
- Formato estándar M3U8 Extended
- Compatible con: IPTV Smarters Pro, TiviMate, Perfect Player, Kodi, VLC
"""

import re
import json
from pathlib import Path
from datetime import datetime

# Configuración
INPUT_FILE = Path(__file__).parent.parent / 'data' / 'canales.js'
OUTPUT_FILE = Path(__file__).parent.parent / 'data' / 'canales-tv.m3u8'

# Mapeo de categorías a nombres amigables para TV
CATEGORY_NAMES = {
    'deportes': 'Deportes',
    'peliculas': 'Películas',
    'series': 'Series',
    'documentales': 'Documentales',
    'infantil': 'Infantil',
    'noticias': 'Noticias',
    'internacional': 'Internacional',
    'musica': 'Música',
    'novelas': 'Novelas',
    'entretenimiento': 'Entretenimiento',
    'general': 'General',
    'otros': 'Otros',
    'religion': 'Religión',
    'compras': 'Compras',
    'cocina': 'Cocina',
    'lifestyle': 'Estilo de Vida',
    'ciencia': 'Ciencia y Tecnología',
    'naturaleza': 'Naturaleza',
    'adulto': 'Adulto'  # Se filtrará
}

def clean_channel_name(name):
    """Limpiar nombre del canal (quitar caracteres especiales problemáticos)"""
    # Quitar comillas y caracteres que puedan romper el M3U
    name = name.replace('"', '').replace("'", "").replace('\n', ' ').replace('\r', '')
    # Quitar espacios múltiples
    name = re.sub(r'\s+', ' ', name).strip()
    return name

def clean_url(url):
    """Limpiar y validar URL"""
    url = url.strip()
    # Asegurar que la URL esté correctamente formateada
    if not url.startswith('http://') and not url.startswith('https://'):
        return None
    return url

def generate_tvg_id(name):
    """Generar ID único para EPG (compatibilidad futura)"""
    # Convertir nombre a ID válido (sin espacios, solo alfanumérico)
    tvg_id = re.sub(r'[^a-zA-Z0-9]', '', name.lower())
    return tvg_id[:50]  # Máximo 50 caracteres

def parse_canales_js():
    """Parsear archivo canales.js y extraer información"""
    print(f"📖 Leyendo {INPUT_FILE}...")
    
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Buscar el array de canales
    match = re.search(r'const\s+CANALES_STREAMING\s*=\s*(\[[\s\S]*?\]);', content)
    if not match:
        raise Exception("No se pudo encontrar CANALES_STREAMING en el archivo")
    
    # Parsear manualmente cada canal usando regex
    js_array = match.group(1)
    
    # Extraer objetos individuales { ... }
    channel_pattern = r'\{\s*name:\s*"([^"]*)",\s*logo:\s*"([^"]*)",\s*url:\s*"([^"]*)",\s*category:\s*"([^"]*)"(?:,\s*isAdult:\s*(true|false))?\s*\}'
    
    canales = []
    for match in re.finditer(channel_pattern, js_array):
        name, logo, url, category, is_adult = match.groups()
        canales.append({
            'name': name,
            'logo': logo,
            'url': url,
            'category': category,
            'isAdult': is_adult == 'true' if is_adult else False
        })
    
    return canales

def filter_and_categorize(canales):
    """Filtrar canales adultos y organizar por categorías"""
    print("🔍 Filtrando canales...")
    
    filtered_channels = []
    adult_count = 0
    invalid_count = 0
    
    for channel in canales:
        # Filtrar canales adultos
        category = channel.get('category', 'general').lower()
        is_adult = channel.get('isAdult', False) or category == 'adulto'
        
        if is_adult:
            adult_count += 1
            continue
        
        # Validar campos requeridos
        name = channel.get('name', '').strip()
        url = channel.get('url', '').strip()
        
        if not name or not url:
            invalid_count += 1
            continue
        
        # Limpiar URL
        clean_url_val = clean_url(url)
        if not clean_url_val:
            invalid_count += 1
            continue
        
        # Agregar canal válido
        filtered_channels.append({
            'name': clean_channel_name(name),
            'url': clean_url_val,
            'logo': channel.get('logo', '').strip(),
            'category': category,
            'tvg_id': generate_tvg_id(name)
        })
    
    print(f"  ✓ {len(filtered_channels)} canales válidos")
    print(f"  ✗ {adult_count} canales adultos excluidos")
    print(f"  ✗ {invalid_count} canales inválidos excluidos")
    
    return filtered_channels

def sort_by_category(channels):
    """Ordenar canales por categoría y nombre"""
    # Orden de categorías preferido
    category_order = [
        'deportes', 'peliculas', 'series', 'documentales', 'infantil',
        'noticias', 'internacional', 'musica', 'novelas', 'entretenimiento',
        'general', 'otros'
    ]
    
    def get_sort_key(channel):
        category = channel['category']
        try:
            cat_index = category_order.index(category)
        except ValueError:
            cat_index = 999  # Categorías no listadas van al final
        return (cat_index, channel['name'].lower())
    
    return sorted(channels, key=get_sort_key)

def generate_m3u8(channels):
    """Generar contenido M3U8"""
    print("📝 Generando M3U8...")
    
    # Header M3U8 Extended
    lines = ['#EXTM3U']
    
    # Agregar metadata global
    lines.append('#EXTINF:-1 tvg-id="" tvg-name="INFO" tvg-logo="" group-title="INFO",')
    lines.append('# Playlist M3U8 - Streaming Platform')
    lines.append(f'# Total Canales: {len(channels)}')
    lines.append(f'# Generado: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}')
    lines.append(f'# Sin contenido adulto')
    lines.append('')
    
    # Agrupar por categoría para estadísticas
    categories = {}
    for channel in channels:
        cat = channel['category']
        categories[cat] = categories.get(cat, 0) + 1
    
    # Agregar cada canal
    for channel in channels:
        category_name = CATEGORY_NAMES.get(channel['category'], channel['category'].title())
        
        # Línea EXTINF con todos los atributos
        extinf_parts = ['#EXTINF:-1']
        
        # tvg-id (para EPG futuro)
        extinf_parts.append(f'tvg-id="{channel["tvg_id"]}"')
        
        # tvg-name (nombre del canal)
        extinf_parts.append(f'tvg-name="{channel["name"]}"')
        
        # tvg-logo (logo del canal)
        if channel['logo']:
            extinf_parts.append(f'tvg-logo="{channel["logo"]}"')
        
        # group-title (categoría)
        extinf_parts.append(f'group-title="{category_name}"')
        
        # Nombre del canal al final
        extinf_line = ' '.join(extinf_parts) + f',{channel["name"]}'
        lines.append(extinf_line)
        
        # URL del stream
        lines.append(channel['url'])
        lines.append('')  # Línea vacía entre canales
    
    return '\n'.join(lines)

def save_m3u8(content):
    """Guardar archivo M3U8"""
    print(f"💾 Guardando {OUTPUT_FILE}...")
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
    
    # Obtener tamaño del archivo
    size_bytes = OUTPUT_FILE.stat().st_size
    size_kb = size_bytes / 1024
    size_mb = size_kb / 1024
    
    if size_mb >= 1:
        size_str = f"{size_mb:.2f} MB"
    else:
        size_str = f"{size_kb:.2f} KB"
    
    print(f"  ✓ Archivo guardado: {size_str}")

def print_statistics(channels):
    """Imprimir estadísticas por categoría"""
    print("\n📊 ESTADÍSTICAS POR CATEGORÍA:")
    print("=" * 60)
    
    # Agrupar por categoría
    categories = {}
    for channel in channels:
        cat = channel['category']
        cat_name = CATEGORY_NAMES.get(cat, cat.title())
        categories[cat_name] = categories.get(cat_name, 0) + 1
    
    # Ordenar por cantidad (descendente)
    sorted_categories = sorted(categories.items(), key=lambda x: x[1], reverse=True)
    
    total = sum(count for _, count in sorted_categories)
    
    for category, count in sorted_categories:
        percentage = (count / total * 100) if total > 0 else 0
        bar_length = int(percentage / 2)  # 50 chars = 100%
        bar = '█' * bar_length + '░' * (50 - bar_length)
        print(f"{category:20s} │ {bar} │ {count:5d} ({percentage:5.1f}%)")
    
    print("=" * 60)
    print(f"{'TOTAL':20s} │ {' ' * 50} │ {total:5d} (100.0%)")
    print()

def main():
    """Función principal"""
    print("\n" + "=" * 60)
    print("   📺 GENERADOR DE PLAYLIST M3U8 PARA IPTV")
    print("=" * 60)
    print()
    
    try:
        # 1. Parsear canales.js
        canales = parse_canales_js()
        print(f"  ✓ {len(canales)} canales encontrados en total\n")
        
        # 2. Filtrar y categorizar
        filtered_channels = filter_and_categorize(canales)
        print()
        
        # 3. Ordenar por categoría y nombre
        sorted_channels = sort_by_category(filtered_channels)
        
        # 4. Generar M3U8
        m3u8_content = generate_m3u8(sorted_channels)
        
        # 5. Guardar archivo
        save_m3u8(m3u8_content)
        
        # 6. Mostrar estadísticas
        print_statistics(sorted_channels)
        
        print("✅ PLAYLIST M3U8 GENERADA EXITOSAMENTE")
        print()
        print("📍 UBICACIÓN:")
        print(f"   {OUTPUT_FILE}")
        print()
        print("🔗 URL PARA APPS IPTV:")
        print(f"   http://[TU-IP]:8080/data/canales-tv.m3u8")
        print()
        print("📱 APPS COMPATIBLES:")
        print("   • IPTV Smarters Pro")
        print("   • TiviMate")
        print("   • Perfect Player")
        print("   • Kodi (PVR IPTV Simple Client)")
        print("   • VLC Media Player")
        print()
        print("=" * 60)
        print()
        
    except Exception as e:
        print(f"\n❌ ERROR: {str(e)}\n")
        return 1
    
    return 0

if __name__ == "__main__":
    exit(main())
