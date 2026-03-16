import { type NextRequest } from 'next/server';

const BURBLE_BASE = 'https://dzm.burblesoft.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36';

const TOKEN_RE = /^[a-z0-9]{32}$/;

async function proxy(req: NextRequest, pathSegments: string[], method: string, body?: BodyInit) {
  const hasToken = TOKEN_RE.test(pathSegments[0] ?? '');
  const sessionToken = hasToken
    ? pathSegments[0]
    : (req.cookies.get('bs')?.value ?? '');
  const actualPath = hasToken ? pathSegments.slice(1) : pathSegments;

  const pathStr = actualPath.join('/');
  const search = req.nextUrl.search;
  const targetUrl = `${BURBLE_BASE}/${pathStr}${search}`;

  const res = await fetch(targetUrl, {
    method,
    body,
    cache: 'no-store',
    headers: {
      'User-Agent': UA,
      ...(req.headers.get('content-type')
        ? { 'Content-Type': req.headers.get('content-type')! }
        : {}),
      ...(sessionToken ? { Cookie: `burblesoft=${sessionToken}` } : {}),
    },
  });

  const contentType = res.headers.get('content-type') ?? 'application/octet-stream';

  const burbleDataBase = sessionToken
    ? `/api/burble-data/${sessionToken}/`
    : '/api/burble-data/';

  if (pathStr.startsWith('ajax_')) {
    const text = await res.text();
    const patched = text.replace(
      /"baseUrl"\s*:\s*"https:\\?\/\\?\/dzm\.burblesoft\.com\\?\/"/g,
      `"baseUrl":"${burbleDataBase}"`,
    );
    return new Response(patched, {
      status: res.status,
      headers: { 'Content-Type': contentType, 'Cache-Control': 'no-store' },
    });
  }

  const isText = contentType.startsWith('text/') || contentType.includes('javascript');
  if (isText) {
    const text = await res.text();
    const patched = text.replace(/https:\/\/dzm\.burblesoft\.com\//g, burbleDataBase);
    return new Response(patched, {
      status: res.status,
      headers: { 'Content-Type': contentType, 'Cache-Control': 'private, max-age=3600' },
    });
  }

  const data = await res.arrayBuffer();
  return new Response(data, {
    status: res.status,
    headers: { 'Content-Type': contentType, 'Cache-Control': 'private, max-age=3600' },
  });
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  return proxy(req, path, 'GET');
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const body = await req.text();
  return proxy(req, path, 'POST', body);
}
