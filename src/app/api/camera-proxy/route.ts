const CAMERA_URL = 'http://79.161.215.227/Cam2/ENJB01.htm';
const CAMERA_ORIGIN = 'http://79.161.215.227';
const IMG_PROXY = '/api/camera-proxy/image?path=';

function rewriteUrl(raw: string): string {
  if (raw.startsWith('data:') || raw.startsWith(IMG_PROXY)) return raw;
  return IMG_PROXY + encodeURIComponent(raw);
}

const INTERCEPT_SCRIPT = `<script>
(function(){
  var PROXY='${IMG_PROXY}';
  var CAM='${CAMERA_ORIGIN}';
  var d=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,'src');
  if(!d)return;
  Object.defineProperty(HTMLImageElement.prototype,'src',{
    set:function(v){
      if(typeof v==='string'&&v&&!v.startsWith('data:')&&!v.startsWith(PROXY)){
        if(v.indexOf(CAM)!==-1||(!v.startsWith('/')&&!v.startsWith('http'))){
          v=PROXY+encodeURIComponent(v);
        }
      }
      d.set.call(this,v);
    },
    get:d.get,
    configurable:true
  });
})();
</script>`;

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
        headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
      });
    }

    const charsetMatch = contentType.match(/charset=([^\s;]+)/i);
    const charset = charsetMatch?.[1] ?? 'iso-8859-1';
    let html = new TextDecoder(charset).decode(buffer);

    html = html.replace(/<base[^>]*>/gi, '');

    html = html.replace(/\ssrc="([^"]+)"/gi, (_, url: string) => ` src="${rewriteUrl(url)}"`);
    html = html.replace(/\ssrc='([^']+)'/gi, (_, url: string) => ` src='${rewriteUrl(url)}'`);

    html = html.includes('</head>')
      ? html.replace('</head>', `${INTERCEPT_SCRIPT}</head>`)
      : INTERCEPT_SCRIPT + html;

    return new Response(html, {
      headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  } catch {
    return new Response(
      '<p style="font-family:sans-serif;padding:1.5rem;color:#94a3b8;">Camera unavailable</p>',
      { status: 503, headers: { 'Content-Type': 'text/html' } },
    );
  }
}
