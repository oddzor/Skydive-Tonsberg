const CAMERA_BASE = 'http://79.161.215.227/Cam2/';

export async function GET(request: Request) {
  const path = new URL(request.url).searchParams.get('path') ?? '';
  const url = path.startsWith('http') ? path : `${CAMERA_BASE}${path}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    const ct = res.headers.get('content-type') ?? 'image/jpeg';
    return new Response(res.body, {
      headers: { 'Content-Type': ct, 'Cache-Control': 'no-store' },
    });
  } catch {
    return new Response(null, { status: 503 });
  }
}
