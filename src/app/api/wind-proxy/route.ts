export async function GET() {
  try {
    const res = await fetch('http://norwegiandonuts.asuscomm.com:8080/wind/wind10.php', {
      cache: 'no-store',
    })

    const contentType = res.headers.get('content-type') ?? ''
    const buffer = await res.arrayBuffer()

    if (contentType.startsWith('image/')) {
      const base64 = Buffer.from(buffer).toString('base64')
      const dataUri = `data:${contentType.split(';')[0]};base64,${base64}`
      const html = `<!DOCTYPE html>
<html><head>
  <meta charset="utf-8">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#0f172a;display:flex;align-items:center;justify-content:center;min-height:100vh;padding:16px}
    img{max-width:100%;height:auto;display:block}
  </style>
</head><body>
  <img src="${dataUri}" alt="Wind data" />
</body></html>`
      return new Response(html, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=120, stale-while-revalidate=30',
        },
      })
    }
    const charsetMatch = contentType.match(/charset=([^\s;]+)/i)
    const charset = charsetMatch?.[1] ?? 'iso-8859-1'
    const html = new TextDecoder(charset).decode(buffer)
    const patched = html.includes('<head>')
      ? html.replace('<head>', '<head><base href="http://norwegiandonuts.asuscomm.com:8080/">')
      : html
    return new Response(patched, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=120, stale-while-revalidate=30',
      },
    })
  } catch {
    return new Response(
      '<p style="font-family:sans-serif;padding:1.5rem;color:#94a3b8;">Wind data unavailable</p>',
      { status: 503, headers: { 'Content-Type': 'text/html' } },
    )
  }
}
