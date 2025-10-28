# 📥 Cargar Listas M3U/M3U8

Esta funcionalidad te permite cargar listas de canales M3U/M3U8 desde múltiples fuentes directamente en la aplicación web.

## 🌟 Características

- **Carga desde URL**: Importa listas M3U/M3U8 desde cualquier URL web
- **Carga desde Archivo Local**: Sube archivos M3U/M3U8 desde tu computadora
- **Carga desde Repositorio**: Accede rápidamente a las listas almacenadas en el directorio `data/`

## 📖 Cómo usar

### 1. Abrir el modal de carga

Haz clic en el botón **"📥 Cargar Lista M3U"** en la barra de controles.

### 2. Seleccionar fuente de carga

El modal tiene 3 pestañas:

#### 🌐 Desde URL

1. Ingresa la URL de la lista M3U/M3U8
   - Ejemplo: `https://ejemplo.com/canales.m3u8`
2. (Opcional) Especifica una categoría por defecto
   - Si los canales en la lista no tienen categoría, se les asignará esta
3. Haz clic en **"⬇️ Cargar desde URL"**

**Nota**: La URL debe permitir CORS para poder ser cargada desde el navegador.

#### 📁 Archivo Local

1. Haz clic en el área de selección de archivo
2. Selecciona un archivo `.m3u` o `.m3u8` de tu computadora
3. (Opcional) Especifica una categoría por defecto
4. Haz clic en **"⬇️ Cargar desde archivo"**

#### 📂 Repositorio

1. Selecciona una de las listas disponibles en el repositorio:
   - `canales-tv.m3u8` - TV en vivo
   - `listam3u8.m3u8` - Lista principal
   - `canales.m3u` - Canales generales
   - `mascanales.m3u` - Canales adicionales
2. Haz clic en **"⬇️ Cargar lista seleccionada"**

## 📝 Formato de archivos M3U/M3U8

La aplicación puede parsear archivos M3U/M3U8 con el siguiente formato:

```m3u
#EXTM3U
#EXTINF:-1 tvg-logo="https://ejemplo.com/logo.png" group-title="Deportes",ESPN HD
http://ejemplo.com/stream.m3u8
#EXTINF:-1 tvg-logo="https://ejemplo.com/logo2.png" group-title="Películas",HBO
http://ejemplo.com/stream2.m3u8
```

### Atributos soportados

- `tvg-logo`: URL del logo del canal (opcional)
- `group-title`: Categoría del canal (opcional)
- Nombre del canal después de la última coma

## ✨ Características avanzadas

### Fusión inteligente de canales

- Los canales cargados se fusionan automáticamente con los existentes
- Se eliminan duplicados basándose en nombre y URL
- La lista se actualiza en tiempo real sin recargar la página

### Categorías automáticas

Si un canal no tiene categoría especificada:
1. Se usa la categoría por defecto que ingresaste
2. Si no ingresaste ninguna, se asigna "general"

### Persistencia

- Los canales cargados dinámicamente **NO** se guardan permanentemente
- Al recargar la página, solo estarán disponibles los canales originales de `canales.js`
- Para agregar canales permanentemente, edita el archivo `data/canales.js`

## 🔧 Solución de problemas

### Error: "No se encontraron canales"

- Verifica que el archivo tenga el formato correcto
- Asegúrate de que las líneas `#EXTINF` tengan URLs válidas debajo

### Error de CORS al cargar desde URL

- El servidor que aloja la lista debe permitir CORS
- Intenta descargar el archivo y cargarlo localmente
- Contacta al administrador del servidor para habilitar CORS

### La lista no se carga desde el repositorio

- Verifica que el archivo exista en la carpeta `data/`
- Asegúrate de estar ejecutando la app con un servidor (no `file://`)

## 💡 Consejos

1. **Organiza por categorías**: Usa categorías descriptivas para facilitar la navegación
2. **Verifica los logos**: Asegúrate de que las URLs de los logos sean accesibles
3. **Prueba las URLs**: Antes de cargar una lista, verifica que las URLs de streams funcionen
4. **Combina fuentes**: Puedes cargar múltiples listas de diferentes fuentes

## 📚 Categorías recomendadas

- `deportes` - Canales deportivos
- `peliculas` - Películas y cine
- `series` - Series y shows
- `noticias` - Canales de noticias
- `infantil` - Contenido para niños
- `documentales` - Documentales
- `musica` - Canales de música
- `internacional` - Canales internacionales
- `nacional` - Canales nacionales

## 🚀 Ejemplo completo

```m3u
#EXTM3U
#EXTINF:-1 tvg-logo="http://logo.com/espn.png" group-title="deportes",ESPN
http://stream.com/espn.m3u8
#EXTINF:-1 tvg-logo="http://logo.com/cnn.png" group-title="noticias",CNN
http://stream.com/cnn.m3u8
#EXTINF:-1 tvg-logo="http://logo.com/disney.png" group-title="infantil",Disney Channel
http://stream.com/disney.m3u8
```

## ⚖️ Consideraciones legales

**Importante**: Esta funcionalidad es solo para uso educativo. Asegúrate de:
- Tener los derechos necesarios para transmitir el contenido
- Respetar las leyes de copyright de tu país
- Usar solo contenido legal y autorizado
