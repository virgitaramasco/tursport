const fs = require('fs');
const path = require('path');
const sharp = require(path.join(__dirname, 'node_modules', 'sharp'));

const ROOT = path.resolve(__dirname, '..');
const SITO_DIR = path.join(ROOT, 'sito', 'sito');
const BACKUP_DIR = path.join(ROOT, '_originals_backup');

async function main() {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }

  const files = fs.readdirSync(SITO_DIR);
  console.log(`Found ${files.length} items in ${SITO_DIR}`);

  let totalOriginalSize = 0;
  let totalWebpSize = 0;

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const inputPath = path.join(SITO_DIR, file);
    const backupPath = path.join(BACKUP_DIR, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(SITO_DIR, `${baseName}.webp`);

    const inStat = fs.statSync(inputPath);
    totalOriginalSize += inStat.size;

    // Backup original
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }

    try {
      await sharp(inputPath)
        .rotate() // auto-orient based on EXIF
        .resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 4 })
        .toFile(outputPath);

      const outStat = fs.statSync(outputPath);
      totalWebpSize += outStat.size;

      console.log(`Converted: ${file} (${(inStat.size/1024/1024).toFixed(2)} MB) -> ${baseName}.webp (${(outStat.size/1024).toFixed(1)} KB)`);

      // Remove original JPG from sito/sito so only webp remains
      fs.unlinkSync(inputPath);
    } catch (err) {
      console.error(`Error converting ${file}:`, err.message);
    }
  }

  console.log(`\nConversion complete!`);
  console.log(`Total original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total WebP size: ${(totalWebpSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Saved: ${(100 - (totalWebpSize / totalOriginalSize * 100)).toFixed(1)}% space!`);

  // Update HTML and JS references
  const htmlFiles = [
    'index.html', 'about.html', 'services.html', 'rooms.html',
    'sport.html', 'pool.html', 'palazzetto.html', 'corporate.html',
    'convention.html', 'coworking.html', 'newsletter.html', 'contatti.html',
    'main.js',
    path.join('scratch', 'generate_multipage.js')
  ];

  for (const relPath of htmlFiles) {
    const fullPath = path.join(ROOT, relPath);
    if (!fs.existsSync(fullPath)) continue;

    let content = fs.readFileSync(fullPath, 'utf8');
    // Replace sito/sito/xxx.(JPG|jpg|jpeg|png) with sito/sito/xxx.webp
    const updated = content.replace(/(sito\/sito\/[^"'\s<>()]+?)\.(?:jpe?g|png)/gi, '$1.webp');
    if (content !== updated) {
      fs.writeFileSync(fullPath, updated, 'utf8');
      console.log(`Updated image references in ${relPath}`);
    }
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
