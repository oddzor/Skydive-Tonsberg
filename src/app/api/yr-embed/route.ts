import { type NextRequest } from 'next/server';

const LOCATION_ID = '1-46887'; // Jarlsberg/Tønsberg flyplass

function cloudBase(tempC: number, dewPointC: number, lang: string): { label: string; color: string } {
  const ft = Math.max(0, (tempC - dewPointC) * 400);
  if (ft < 3000) return { label: lang === 'en' ? 'Low'    : 'Lav',    color: '#ef4444' };
  if (ft < 6000) return { label: lang === 'en' ? 'Medium' : 'Middels', color: '#eab308' };
  return             { label: lang === 'en' ? 'High'   : 'Høy',    color: '#22c55e' };
}

function toKnots(ms: number) {
  return Math.round(ms * 1.944);
}

function toCardinal(deg: number) {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

function cloudBar(pct: number) {
  const filled = Math.round(pct / 10);
  return `<span style="font-size:0.7em;letter-spacing:-1px;color:#64748b">${'█'.repeat(filled)}${'░'.repeat(10 - filled)}</span> ${pct}%`;
}

export async function GET(req: NextRequest) {
  try {
    const lang = req.nextUrl.searchParams.get('lang') === 'en' ? 'en' : 'nb';

    const res = await fetch(
      `https://www.yr.no/api/v0/locations/${LOCATION_ID}/forecast`,
      {
        cache: 'no-store',
        headers: { 'User-Agent': 'Mozilla/5.0' },
      },
    );

    if (!res.ok) throw new Error(`YR returned ${res.status}`);

    const data = await res.json();
    const intervals: {
      start: string;
      temperature: { value: number };
      dewPoint: { value: number };
      wind: { speed: number; direction: number; gust: number };
      cloudCover: { value: number };
      precipitation: { value: number; probability: number };
    }[] = data.shortIntervals ?? [];

    const now = new Date();
    const upcoming = intervals
      .filter((iv) => new Date(iv.start) >= now)
      .slice(0, 10);

    const rowsHtml = upcoming
      .map((iv) => {
        const start = new Date(iv.start);
        const timeStr = start.toLocaleTimeString('nb-NO', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/Oslo',
        });
        const tempRaw = iv.temperature?.value ?? 0;
        const dewPointRaw = iv.dewPoint?.value ?? 0;
        const temp = Math.round(tempRaw);
        const windKt = toKnots(iv.wind?.speed ?? 0);
        const gustKt = toKnots(iv.wind?.gust ?? 0);
        const windDir = Math.round(iv.wind?.direction ?? 0);
        const cloud = Math.round(iv.cloudCover?.value ?? 0);
        const precip = iv.precipitation?.value ?? 0;
        const precipProb = iv.precipitation?.probability ?? 0;
        const tempColor = temp <= 0 ? '#93c5fd' : temp >= 20 ? '#f97316' : '#e2e8f0';
        const base = cloudBase(tempRaw, dewPointRaw, lang);

        return `<tr style="border-bottom:1px solid #1e293b">
          <td style="padding:9px 12px;color:#64748b;font-size:0.85rem;white-space:nowrap">${timeStr}</td>
          <td style="padding:9px 12px;font-weight:700;color:${tempColor}">${temp > 0 ? '+' : ''}${temp}°</td>
          <td style="padding:9px 12px;color:#e2e8f0;white-space:nowrap">${windKt}<span style="color:#64748b;font-size:0.8em"> kt</span> <span style="color:#94a3b8;font-size:0.8em">(${gustKt})</span> ${toCardinal(windDir)}</td>
          <td style="padding:9px 12px">${cloudBar(cloud)}</td>
          <td style="padding:9px 12px;color:${base.color};white-space:nowrap">${base.label}</td>
          <td style="padding:9px 12px;color:${precip > 0 ? '#60a5fa' : '#334155'};white-space:nowrap">${precip > 0 ? `${precip.toFixed(1)}mm` : '–'}${precipProb > 10 ? `<span style="color:#475569;font-size:0.75em"> ${precipProb}%</span>` : ''}</td>
        </tr>`;
      })
      .join('');

    const nowStr = now.toLocaleTimeString('nb-NO', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Oslo',
    });
    const labels = lang === 'en'
      ? { title: 'Weather', time: 'Time', temp: 'Temp', wind: 'Wind (gust)', cloud: 'Cloud Coverage', base: 'Estimated Cloud Base', rain: 'Rain' }
      : { title: 'Vær', time: 'Tid', temp: 'Temp', wind: 'Vind (kast)', cloud: 'Skydekke', base: 'Estimert Skybase', rain: 'Nedbør' };

    const html = `<!DOCTYPE html>
<html lang="${lang}"><head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#0f172a;color:#e2e8f0;font-family:system-ui,-apple-system,sans-serif;padding:16px;min-height:100vh}
    h2{font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;color:#475569;margin-bottom:14px}
    .dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#3b82f6;margin-right:6px;vertical-align:middle}
    table{width:100%;border-collapse:collapse}
    th{padding:6px 12px;text-align:left;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.06em;color:#475569;border-bottom:1px solid #334155}
    tr:hover{background:#1e293b}
    .footer{font-size:0.7rem;color:#334155;margin-top:14px}
  </style>
</head><body>
  <h2><span class="dot"></span>${labels.title} – Jarlsberg ${nowStr}</h2>
  <table>
    <thead><tr>
      <th>${labels.time}</th><th>${labels.temp}</th><th>${labels.wind}</th><th>${labels.cloud}</th><th>${labels.base}</th><th>${labels.rain}</th>
    </tr></thead>
    <tbody>${rowsHtml}</tbody>
  </table>
  <p class="footer">Yr.no · Next 10 hours</p>
</body></html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch {
    return new Response(
      '<p style="font-family:sans-serif;padding:1.5rem;color:#94a3b8;">Weather unavailable</p>',
      { status: 503, headers: { 'Content-Type': 'text/html' } },
    );
  }
}
