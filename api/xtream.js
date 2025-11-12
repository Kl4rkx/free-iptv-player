// Vercel Serverless Function for Xtream Codes Proxy
// Deployment: Deploy to Vercel, this will be available at /api/xtream

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { server, username, password } = req.body;

    if (!server || !username || !password) {
        return res.status(400).json({ error: 'Faltan datos: server, username, password' });
    }

    // Normalize URL
    let base = server.trim();
    if (!/^https?:\/\//i.test(base)) base = 'http://' + base;
    base = base.replace(/\/+$/g, '');

    try {
        // 1) Try get.php (M3U)
        const m3uUrl = `${base}/get.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&type=m3u_plus`;
        const m3uRes = await fetch(m3uUrl);
        
        if (m3uRes.ok) {
            const m3uText = await m3uRes.text();
            if (m3uText && m3uText.trim().length > 0) {
                return res.setHeader('Content-Type', 'text/plain').status(200).send(m3uText);
            }
        }

        // 2) Try player_api.php (JSON)
        const apiUrl = `${base}/player_api.php?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&action=get_live_streams`;
        const apiRes = await fetch(apiUrl);
        
        if (!apiRes.ok) {
            throw new Error('No se pudo conectar al servidor Xtream');
        }
        
        const apiJson = await apiRes.json();
        return res.status(200).json({ channels: apiJson });
        
    } catch (error) {
        console.error('Xtream proxy error:', error);
        return res.status(500).json({ 
            error: 'No se pudo conectar al servidor Xtream', 
            details: error.message 
        });
    }
}
