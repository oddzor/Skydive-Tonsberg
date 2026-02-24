/* eslint-disable @typescript-eslint/no-require-imports */
const https = require('https');
const fs = require('fs');
const path = require('path');

const CMS_FILE = path.join(__dirname, '../public/cms-content.json');
const OUT_DIR  = path.join(__dirname, '../public/thumbnails');

function extractVideoIds(obj, ids = new Set()) {
  if (!obj || typeof obj !== 'object') return ids;
  for (const [key, val] of Object.entries(obj)) {
    if ((key === 'videoUrl' || key === 'videoId') && typeof val === 'string' && val.trim()) {
      ids.add(val.trim());
    } else {
      extractVideoIds(val, ids);
    }
  }
  return ids;
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
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
    }).on('error', (err) => {
      fs.unlinkSync(dest);
      reject(err);
    });
  });
}

async function fetchThumbnail(videoId) {
  const dest = path.join(OUT_DIR, `${videoId}.jpg`);
  const qualities = ['maxresdefault', 'sddefault', 'hqdefault'];
  for (const q of qualities) {
    try {
      const url = `https://img.youtube.com/vi/${videoId}/${q}.jpg`;
      await download(url, dest);

      const { size } = fs.statSync(dest);
      if (size < 5000) {
        fs.unlinkSync(dest);
        continue;
      }
      console.log(`✓ ${videoId} (${q}) → ${dest}`);
      return;
    } catch {
    }
  }
  console.warn(`✗ Could not fetch thumbnail for ${videoId}`);
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const cms = JSON.parse(fs.readFileSync(CMS_FILE, 'utf-8'));
  const ids = extractVideoIds(cms);

  if (ids.size === 0) {
    console.log('No video IDs found in cms-content.json');
    return;
  }

  console.log(`Found ${ids.size} video ID(s): ${[...ids].join(', ')}`);
  await Promise.all([...ids].map(fetchThumbnail));
  console.log('Done.');
}

main().catch((err) => { console.error(err); process.exit(1); });
