const LAT = 59.19;
const LON = 10.26;
const EXIT_FT = 12500;
const PRESSURE_LEVELS = [
  { hPa: 1000, altFt: 364 },
  { hPa: 975,  altFt: 978 },
  { hPa: 950,  altFt: 1640 },
  { hPa: 925,  altFt: 2493 },
  { hPa: 900,  altFt: 3281 },
  { hPa: 875,  altFt: 4101 },
  { hPa: 850,  altFt: 4921 },
  { hPa: 825,  altFt: 5774 },
  { hPa: 800,  altFt: 6562 },
  { hPa: 775,  altFt: 7415 },
  { hPa: 750,  altFt: 8202 },
  { hPa: 700,  altFt: 9842 },
  { hPa: 650,  altFt: 11483 },
  { hPa: 600,  altFt: 13123 },
];

const DISPLAY_FT = [2000, 4000, 6000, 8000, 10000, EXIT_FT, 15000];

function toUV(speed: number, dir: number): [number, number] {
  const r = (dir * Math.PI) / 180;
  return [-speed * Math.sin(r), -speed * Math.cos(r)];
}

function fromUV(u: number, v: number): { speed: number; dir: number } {
  const speed = Math.sqrt(u * u + v * v);
  const dir = ((Math.atan2(-u, -v) * 180) / Math.PI + 360) % 360;
  return { speed, dir };
}

function interpolateAt(
  hourly: Record<string, number[]>,
  targetFt: number,
  i: number,
): { speed: number; dir: number } {
  if (targetFt === 0) {
    return { speed: hourly['wind_speed_10m'][i], dir: hourly['wind_direction_10m'][i] };
  }

  const below = [...PRESSURE_LEVELS].reverse().find((l) => l.altFt <= targetFt);
  const above = PRESSURE_LEVELS.find((l) => l.altFt > targetFt);

  const getLvl = (hPa: number) => ({
    speed: hourly[`wind_speed_${hPa}hPa`][i],
    dir: hourly[`wind_direction_${hPa}hPa`][i],
  });

  if (!above && below) return getLvl(below.hPa);
  if (!below && above) return getLvl(above.hPa);
  if (!below || !above) return { speed: 0, dir: 0 };

  const w1 = getLvl(below.hPa);
  const w2 = getLvl(above.hPa);
  const t = (targetFt - below.altFt) / (above.altFt - below.altFt);

  const [u1, v1] = toUV(w1.speed, w1.dir);
  const [u2, v2] = toUV(w2.speed, w2.dir);

  return fromUV(u1 + (u2 - u1) * t, v1 + (v2 - v1) * t);
}

function interpolateTempAt(
  hourly: Record<string, number[]>,
  targetFt: number,
  i: number,
): number {
  if (targetFt === 0) return hourly['temperature_2m'][i];

  const below = [...PRESSURE_LEVELS].reverse().find((l) => l.altFt <= targetFt);
  const above = PRESSURE_LEVELS.find((l) => l.altFt > targetFt);

  if (!above && below) return hourly[`temperature_${below.hPa}hPa`][i];
  if (!below && above) return hourly[`temperature_${above.hPa}hPa`][i];
  if (!below || !above) return 0;

  const t1 = hourly[`temperature_${below.hPa}hPa`][i];
  const t2 = hourly[`temperature_${above.hPa}hPa`][i];
  const factor = (targetFt - below.altFt) / (above.altFt - below.altFt);
  return t1 + (t2 - t1) * factor;
}

function toKnots(ms: number) {
  return Math.round(ms * 1.944);
}

function toCardinal(deg: number) {
  const dirs = ['N','NNE','NE','ENE','E','ESE','SE','SSE','S','SSW','SW','WSW','W','WNW','NW','NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

function driftArrow(fromDir: number) {
  const to = (fromDir + 180) % 360;
  return `<span style="display:inline-block;transform:rotate(${to}deg);line-height:1">↑</span>`;
}

function tempColor(c: number): string {
  if (c <= -20) return '#93c5fd';
  if (c <= -10) return '#7dd3fc';
  if (c <= 0)   return '#bae6fd';
  if (c <= 10)  return '#e2e8f0';
  if (c <= 20)  return '#fcd34d';
  return '#f97316';
}

export async function GET() {
  try {
    const hourlyParams = [
      'wind_speed_10m',
      'wind_direction_10m',
      'temperature_2m',
      ...PRESSURE_LEVELS.flatMap((l) => [
        `wind_speed_${l.hPa}hPa`,
        `wind_direction_${l.hPa}hPa`,
        `temperature_${l.hPa}hPa`,
      ]),
    ].join(',');

    const url = new URL('https://api.open-meteo.com/v1/forecast');
    url.searchParams.set('latitude', String(LAT));
    url.searchParams.set('longitude', String(LON));
    url.searchParams.set('hourly', hourlyParams);
    url.searchParams.set('wind_speed_unit', 'ms');
    url.searchParams.set('forecast_days', '1');
    url.searchParams.set('timezone', 'Europe/Oslo');

    const res = await fetch(url.toString(), { cache: 'no-store' });
    const data = await res.json();
    const now = new Date();
    const currentHourStr = now.toISOString().slice(0, 13);
    const times: string[] = data.hourly.time;
    const i = Math.max(0, times.findIndex((t: string) => t >= currentHourStr));

    const hourly = data.hourly as Record<string, number[]>;

    const rowsHtml = DISPLAY_FT.map((ft) => {
      const { speed, dir } = interpolateAt(hourly, ft, i);
      const tempC = Math.round(interpolateTempAt(hourly, ft, i));
      const kt = toKnots(speed);
      const isExit = ft === EXIT_FT;
      const label = ft === 0 ? 'SFC' : `${ft.toLocaleString('en')} ft`;
      const bg = isExit ? 'background:#172554;' : '';
      const altColor = isExit ? '#93c5fd' : '#94a3b8';
      const badge = isExit
        ? '<span style="font-size:0.6rem;background:#1d4ed8;color:#bfdbfe;padding:1px 6px;border-radius:4px;margin-left:6px;vertical-align:middle">EXIT</span>'
        : '';
      const tColor = tempColor(tempC);
      const tSign = tempC > 0 ? '+' : '';

      return `<tr style="${bg}border-bottom:1px solid #1e293b">
        <td style="padding:10px 14px;font-weight:600;color:${altColor};white-space:nowrap">${label}${badge}</td>
        <td style="padding:10px 14px;font-weight:700;color:#f8fafc;font-size:1.05rem">${kt} kt</td>
        <td style="padding:10px 14px;color:#cbd5e1">${driftArrow(dir)} ${Math.round(dir)}° ${toCardinal(dir)}</td>
        <td style="padding:10px 14px;font-weight:600;color:${tColor}">${tSign}${tempC}°C</td>
      </tr>`;
    }).join('');

    const timeStr = now.toLocaleTimeString('nb-NO', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Oslo',
    });

    const html = `<!DOCTYPE html>
<html lang="nb"><head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{background:#0f172a;color:#e2e8f0;font-family:system-ui,-apple-system,sans-serif;padding:16px;min-height:100vh;display:flex;flex-direction:column;justify-content:center}
    h2{font-size:0.75rem;text-transform:uppercase;letter-spacing:0.08em;color:#475569;margin-bottom:14px}
    table{width:100%;border-collapse:collapse}
    th{padding:6px 14px;text-align:left;font-size:0.7rem;text-transform:uppercase;letter-spacing:0.06em;color:#475569;border-bottom:1px solid #334155}
    tr:hover{background:#1e293b}
    .footer{font-size:0.7rem;color:#334155;margin-top:14px}
    .dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#3b82f6;margin-right:6px;vertical-align:middle}
  </style>
</head><body>
  <h2><span class="dot"></span>Høydevind — Jarlsberg ${timeStr}</h2>
  <table>
    <thead><tr>
      <th>Altitude</th><th>Speed</th><th>Direction (drift)</th><th>Temp</th>
    </tr></thead>
    <tbody>${rowsHtml}</tbody>
  </table>
  <p class="footer">Open-Meteo ECMWF · Interpolated · Arrows show drift direction</p>
</body></html>`;

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, stale-while-revalidate=300',
      },
    });
  } catch {
    return new Response(
      '<p style="font-family:sans-serif;padding:1.5rem;color:#666;">Winds aloft unavailable</p>',
      { status: 503, headers: { 'Content-Type': 'text/html' } },
    );
  }
}
