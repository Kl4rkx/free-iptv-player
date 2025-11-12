// Vercel Serverless Function - Stream Proxy
// Convierte streams HTTP a HTTPS para evitar Mixed Content en GitHub Pages

export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Range, Content-Type');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Missing url parameter' });
    }

    try {
        // Fetch stream from HTTP source
        const headers = {};
        
        // Forward Range header for HLS segments
        if (req.headers.range) {
            headers['Range'] = req.headers.range;
        }

        const streamRes = await fetch(url, { headers });
        
        if (!streamRes.ok) {
            return res.status(streamRes.status).json({ 
                error: 'Stream not available', 
                status: streamRes.status 
            });
        }

        // Forward response headers
        const contentType = streamRes.headers.get('content-type');
        if (contentType) {
            res.setHeader('Content-Type', contentType);
        }

        const contentLength = streamRes.headers.get('content-length');
        if (contentLength) {
            res.setHeader('Content-Length', contentLength);
        }

        const acceptRanges = streamRes.headers.get('accept-ranges');
        if (acceptRanges) {
            res.setHeader('Accept-Ranges', acceptRanges);
        }

        const contentRange = streamRes.headers.get('content-range');
        if (contentRange) {
            res.setHeader('Content-Range', contentRange);
        }

        // Cache control for streaming
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

        // Stream the response
        const buffer = await streamRes.arrayBuffer();
        res.status(streamRes.status).send(Buffer.from(buffer));

    } catch (error) {
        console.error('Stream proxy error:', error);
        return res.status(500).json({ 
            error: 'Failed to fetch stream', 
            details: error.message 
        });
    }
}
