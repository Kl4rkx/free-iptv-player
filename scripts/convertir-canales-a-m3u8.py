#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Convertidor de canales.js a formato M3U8
Convierte el archivo JavaScript con canales a formato M3U8 estándar
"""

import re
import json

def extract_channels_from_js(js_file_path):
    """Extrae los canales del archivo JavaScript"""
    with open(js_file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Encontrar el array CANALES_STREAMING
    match = re.search(r'const CANALES_STREAMING = \[(.*?)\];', content, re.DOTALL)
    if not match:
        print("Error: No se pudo encontrar CANALES_STREAMING")
        return []
    
    array_content = match.group(1)
    
    # Parsear los objetos del array
    channels = []
    # Buscar todos los objetos { ... }
    pattern = r'\{\s*name:\s*"([^"]*)",\s*logo:\s*"([^"]*)",\s*url:\s*"([^"]*)",\s*category:\s*"([^"]*)"\s*\}'
    
    for match in re.finditer(pattern, array_content):
        channel = {
            'name': match.group(1),
            'logo': match.group(2),
            'url': match.group(3),
            'category': match.group(4)
        }
        channels.append(channel)
    
    return channels

def normalize_category(category):
    """Normaliza los nombres de categorías para M3U8"""
    category_map = {
        'general': 'General',
        'musica': 'Música',
        'documentales': 'Documentales',
        'noticias': 'Noticias',
        'internacional': 'Internacional',
        'peliculas': 'Películas',
        'deportes': 'Deportes',
        'entrenimiento': 'Entretenimiento',
        'colombia': 'Colombia',
        'series': 'Series',
        'infantil': 'Infantil',
        'adulto': 'Adulto',
        'religioso': 'Religioso',
        'educativo': 'Educativo',
        'peru': 'Perú',
        'espana': 'España',
        'mexico': 'México',
        'argentina': 'Argentina',
        'chile': 'Chile',
        '24/7': '24/7',
        'premium': 'Premium'
    }
    return category_map.get(category.lower(), category.capitalize())

def channels_to_m3u8(channels, output_file):
    """Convierte los canales a formato M3U8"""
    with open(output_file, 'w', encoding='utf-8') as f:
        # Escribir el encabezado M3U8
        f.write('#EXTM3U\n')
        f.write('#EXTINF:-1 tvg-id="" tvg-name="" tvg-logo="" group-title="INFO",Free IPTV Player - By Kl4rkx\n')
        f.write('https://github.com/Kl4rkx/free-iptv-player\n')
        
        # Contar canales por categoría
        total_channels = len(channels)
        adult_channels = len([ch for ch in channels if ch['category'].lower() == 'adulto'])
        
        print(f"\n📊 Estadísticas:")
        print(f"   Total de canales: {total_channels}")
        print(f"   Canales adultos: {adult_channels}")
        print(f"   Canales normales: {total_channels - adult_channels}")
        
        # Escribir cada canal
        for i, channel in enumerate(channels, 1):
            name = channel['name'].replace('"', "'")
            logo = channel['logo']
            url = channel['url']
            category = normalize_category(channel['category'])
            
            # Formato M3U8 Extended
            f.write(f'#EXTINF:-1 tvg-id="" tvg-name="{name}" tvg-logo="{logo}" group-title="{category}",{name}\n')
            f.write(f'{url}\n')
            
            # Progreso
            if i % 1000 == 0:
                print(f"   Procesados: {i}/{total_channels} canales...")
    
    print(f"\n✅ Archivo M3U8 generado: {output_file}")
    print(f"   Total de entradas: {total_channels}")

def main():
    input_file = 'data/canales.js'
    output_file = 'data/listam3u8.m3u8'
    
    print("🚀 Convertidor canales.js → M3U8")
    print("=" * 50)
    print(f"📂 Archivo de entrada: {input_file}")
    print(f"💾 Archivo de salida: {output_file}")
    print("\n⏳ Procesando...")
    
    # Extraer canales
    channels = extract_channels_from_js(input_file)
    
    if not channels:
        print("❌ Error: No se pudieron extraer canales")
        return
    
    # Convertir a M3U8
    channels_to_m3u8(channels, output_file)
    
    print("\n🎉 Conversión completada exitosamente!")
    print(f"\n📝 Notas importantes:")
    print(f"   • Los canales con category='adulto' están incluidos")
    print(f"   • El formato es compatible con tu app web")
    print(f"   • El control parental funcionará con group-title='Adulto'")

if __name__ == '__main__':
    main()
