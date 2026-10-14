const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const files = [
  'index.html',
  'about.html',
  'services.html',
  'rooms.html',
  'sport.html',
  'pool.html',
  'palazzetto.html',
  'corporate.html',
  'newsletter.html',
  'contatti.html',
  'Tursport Hotel Residence.html'
];

files.forEach(fileName => {
  const filePath = path.join(ROOT, fileName);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace header logo
  content = content.replace(
    /<a class="logo" href="index\.html" aria-label="Tursport, Home">TURSPORT<\/a>/,
    `<a class="logo" href="index.html" aria-label="Tursport Hotel Residence, Home"><img src="logotursportesteso.svg" alt="Tursport Hotel Residence" class="logo__img"></a>`
  );

  // Replace footer logo
  content = content.replace(
    /<a class="logo" href="index\.html" aria-label="Tursport, Home">TURSPORT<\/a>/,
    `<a class="logo logo--footer" href="index.html" aria-label="Tursport Hotel Residence, Home"><img src="logotursportesteso.svg" alt="Tursport Hotel Residence" class="logo__img"></a>`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated logo in ${fileName}`);
});

console.log('Logo replacement completed in all HTML files.');
