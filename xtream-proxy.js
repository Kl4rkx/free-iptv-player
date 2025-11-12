// Backend proxy básico para Xtream Codes
// Uso: node xtream-proxy.js
// Requiere: npm install express node-fetch cors

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoint principal: recibe credenciales Xtream y devuelve M3U o JSON
app.post('/api/xtream', async (req, res) => {
    const { server, username, password, format } = req.body;
    if (!server || !username || !password) {
        return res.status(400).json({ error: 'Faltan datos: server, username, password' });
    }
    // Normalizar URL
    let base = server.trim();
    if (!/^https?:\/\//i.test(base)) base = 'http://' + base;
    base = base.replace(/\/+$/g, '');

    // 1) Intentar get.php (M3U)
    try {
        const m3uUrl = `${base}/get.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&type=m3u_plus`;
        const m3uRes = await fetch(m3uUrl);
        if (!m3uRes.ok) throw new Error('No se pudo obtener M3U');
        const m3uText = await m3uRes.text();
        if (format === 'json') {
            // Opcional: parsear M3U y devolver JSON (simple)
            const channels = m3uText.split('\n').filter(l => l.startsWith('#EXTINF')).map((l, i, arr) => {
                const name = l.split(',')[1] || `Canal ${i+1}`;
                return { name };
            });
            return res.json({ channels });
        }
        return res.type('text/plain').send(m3uText);
    } catch (err) {
        // 2) Intentar player_api.php (JSON)
        try {
            const apiUrl = `${base}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&action=get_live_streams`;
            const apiRes = await fetch(apiUrl);
            if (!apiRes.ok) throw new Error('No se pudo obtener player_api.php');
            const apiJson = await apiRes.json();
            return res.json({ channels: apiJson });
        } catch (err2) {
            return res.status(500).json({ error: 'No se pudo conectar al servidor Xtream', details: err2.message });
        }
    }
});

app.get('/', (req, res) => {
    res.send('Xtream Proxy activo. POST /api/xtream con server, username, password.');
});

app.listen(PORT, () => {
    console.log(`Xtream Proxy escuchando en puerto ${PORT}`);
});
