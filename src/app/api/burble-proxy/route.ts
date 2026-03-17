const BURBLE_URL = 'https://dzm.burblesoft.com/jumper_manifest_public?dz_id=551';
const BURBLE_BASE = 'https://dzm.burblesoft.com';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36';

export async function GET() {
  try {
    const step1 = await fetch(BURBLE_URL, {
      cache: 'no-store',
      redirect: 'manual',
      headers: { 'User-Agent': UA },
    });

    const setCookies = step1.headers.getSetCookie?.() ?? [];
    const cookieHeader = setCookies.map((c) => c.split(';')[0]).join('; ');
    const sessionEntry = setCookies.find((c) => c.startsWith('burblesoft='));
    const sessionToken = sessionEntry ? sessionEntry.split(';')[0].split('=')[1] : '';

    let rawHtml: string;

    if (step1.ok) {
      rawHtml = await step1.text();
    } else if (step1.status >= 300 && step1.status < 400) {
      const location = step1.headers.get('location') ?? BURBLE_BASE;
      const step2 = await fetch(location, {
        cache: 'no-store',
        headers: {
          'User-Agent': UA,
          ...(cookieHeader ? { Cookie: cookieHeader } : {}),
        },
      });
      if (!step2.ok) {
        return new Response(placeholder(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8' },
        });
      }
      rawHtml = await step2.text();
    } else {
      return new Response(placeholder(), {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }

    const burbleDataBase = sessionToken
      ? `/api/burble-data/${sessionToken}/`
      : '/api/burble-data/';

    // Block all ajax_ network calls after 8s post-load; also clear any intervals
    const noAutoRefresh = `<script>(function(){var _si=window.setInterval,_fe=window.fetch,_op=XMLHttpRequest.prototype.open,_se=XMLHttpRequest.prototype.send,ids=[],block=false;window.setInterval=function(fn,ms){var id=_si.call(window,fn,ms);ids.push(id);return id;};window.fetch=function(url,opts){if(block&&String(url).indexOf('ajax_')!==-1)return Promise.resolve(new Response('{}',{status:200}));return _fe.apply(this,arguments);};XMLHttpRequest.prototype.open=function(m,u){this._u=u;return _op.apply(this,arguments);};XMLHttpRequest.prototype.send=function(){if(block&&this._u&&String(this._u).indexOf('ajax_')!==-1)return;return _se.apply(this,arguments);};window.addEventListener('load',function(){setTimeout(function(){block=true;ids.forEach(clearInterval);},8000);});}());<\/script>`;

    let patched = rawHtml.includes('<head>')
      ? rawHtml.replace('<head>', `<head><base href="${burbleDataBase}">${noAutoRefresh}`)
      : rawHtml;

    patched = patched.replace(/https:\/\/dzm\.burblesoft\.com\//g, burbleDataBase);

    return new Response(patched, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new Response(placeholder(), {
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
}

function placeholder() {
  return `<!DOCTYPE html>
<html><head>
  <meta charset="utf-8">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#0f172a;color:#e2e8f0;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:24px;text-align:center}
    .card{max-width:320px}
    p{color:#64748b;font-size:0.9rem;line-height:1.6;margin-bottom:20px}
    a{display:inline-block;padding:10px 20px;background:#1d4ed8;color:#fff;border-radius:8px;text-decoration:none;font-size:0.9rem;font-weight:600}
    a:hover{background:#2563eb}
    .icon{font-size:2rem;margin-bottom:12px}
  </style>
</head><body>
  <div class="card">
    <div class="icon">📋</div>
    <p>Manifest unavailable right now.</p>
    <a href="https://dzm.burblesoft.com/jumper_manifest_public?dz_id=551" target="_blank" rel="noopener">Open Burble ↗</a>
  </div>
</body></html>`;
}
