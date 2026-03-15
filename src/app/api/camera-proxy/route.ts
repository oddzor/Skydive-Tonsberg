const CAMERA_URL = 'http://79.161.215.227/Cam2/ENJB01.htm';
const CAMERA_BASE = 'http://79.161.215.227/Cam2/';

export async function GET() {
  try {
    const res = await fetch(CAMERA_URL, { cache: 'no-store' });
    const contentType = res.headers.get('content-type') ?? '';
    const buffer = await res.arrayBuffer();

    if (contentType.startsWith('image/')) {
      const base64 = Buffer.from(buffer).toString('base64');
      const dataUri = `data:${contentType.split(';')[0]};base64,${base64}`;
      const html = `<!DOCTYPE html>
<html><head>
  <meta charset="utf-8">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#0f172a;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:16px}
    img{max-width:100%;height:auto;display:block}
  </style>
</head><body>
  <img src="${dataUri}" alt="Camera" />
</body></html>`;
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      });
    }

    const charsetMatch = contentType.match(/charset=([^\s;]+)/i);
    const charset = charsetMatch?.[1] ?? 'iso-8859-1';
    const html = new TextDecoder(charset).decode(buffer);
    const patched = html.includes('<head>')
      ? html.replace('<head>', `<head><base href="${CAMERA_BASE}">`)
      : html;
    return new Response(patched, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new Response(
      '<p style="font-family:sans-serif;padding:1.5rem;color:#94a3b8;">Camera unavailable</p>',
      { status: 503, headers: { 'Content-Type': 'text/html' } },
    );
  }
}
