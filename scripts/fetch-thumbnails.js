/* eslint-disable @typescript-eslint/no-require-imports */
const https = require('https');
const fs    = require('fs');
const path  = require('path');

const OUT_DIR    = path.join(__dirname, '../public/thumbnails');
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const TOKEN      = process.env.SANITY_API_READ_TOKEN;

function sanityFetch(query) {
  return new Promise((resolve, reject) => {
    if (!PROJECT_ID || PROJECT_ID === 'your-project-id') {
      return resolve([]);
    }
    const encoded = encodeURIComponent(query);
    const url = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encoded}`;
    const opts = { headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {} };
    https.get(url, opts, (res) => {
      let data = '';
      res.on('data', (c) => data += c);
      res.on('end', () => {
        try { resolve(JSON.parse(data).result ?? []); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        file.close();
        fs.unlinkSync(dest);
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => { fs.unlinkSync(dest); reject(err); });
  });
}

async function fetchThumbnail(videoId) {
  const dest = path.join(OUT_DIR, `${videoId}.jpg`);
  if (fs.existsSync(dest)) {
    console.log(`  ✓ ${videoId}.jpg already exists`);
    return;
  }
  for (const quality of ['maxresdefault', 'sddefault', 'hqdefault']) {
    try {
      const url = `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
      await download(url, dest);
      if (fs.statSync(dest).size < 5000) { fs.unlinkSync(dest); continue; }
      console.log(`  ↓ ${videoId}.jpg (${quality})`);
      return;
    } catch { /* try next quality */ }
  }
  console.warn(`  ✗ Could not fetch thumbnail for ${videoId}`);
}
async function main() {
  if (!PROJECT_ID || PROJECT_ID === 'your-project-id') {
    console.log('Skipping thumbnail fetch: NEXT_PUBLIC_SANITY_PROJECT_ID not set');
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const rows = await sanityFetch(
    `*[_type in ["tandemInfo","courseInfo","forHoppereInfo"] && defined(videoUrl) && videoUrl != ""]{ videoUrl }`
  );

  const ids = [...new Set(rows.map((r) => r.videoUrl).filter(Boolean))];

  if (ids.length === 0) {
    console.log('No video IDs found in Sanity');
    return;
  }

  console.log(`Fetching thumbnails for ${ids.length} video ID(s): ${ids.join(', ')}`);
  await Promise.all(ids.map(fetchThumbnail));
  console.log('Done.');
}

main().catch((err) => { console.error(err); process.exit(1); });
