const fs = require('fs');
const path = require('path');
const sharp = require(path.join(__dirname, 'node_modules', 'sharp'));

async function main() {
  const dir = path.resolve(__dirname, '..', 'sito', 'sito');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.webp'));

  const data = [];
  for (const f of files) {
    const meta = await sharp(path.join(dir, f)).metadata();
    const stats = await sharp(path.join(dir, f)).stats();
    // Dominant / mean color channel
    const r = Math.round(stats.channels[0].mean);
    const g = Math.round(stats.channels[1].mean);
    const b = Math.round(stats.channels[2].mean);
    data.push({
      file: f,
      width: meta.width,
      height: meta.height,
      ratio: meta.width > meta.height ? 'landscape' : 'portrait',
      color: `rgb(${r},${g},${b})`
    });
  }

  fs.writeFileSync(path.join(__dirname, 'image_data.json'), JSON.stringify(data, null, 2));
  console.log('Saved image_data.json with', data.length, 'images');
}

main().catch(console.error);
