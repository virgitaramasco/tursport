const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const files = [
  'index.html', 'about.html', 'services.html', 'rooms.html',
  'sport.html', 'pool.html', 'palazzetto.html', 'corporate.html',
  'convention.html', 'coworking.html', 'newsletter.html', 'contatti.html'
];

files.forEach(f => {
  const fp = path.join(ROOT, f);
  if (!fs.existsSync(fp)) return;
  let content = fs.readFileSync(fp, 'utf8');

  // Drawer nav
  content = content.replace(/(data-i18n="nav_palazzetto">)Palazzetti Events(<\/a>)/g, '$1Eventi palazzetto$2');
  content = content.replace(/(data-i18n="nav_corporate">)Corporate Events(<\/a>)/g, '$1Eventi aziendali$2');

  // Services tiles
  if (f === 'services.html') {
    content = content.replace(/(data-i18n="srv_palazzetto">)Palazzetti Events(<\/h3>)/g, '$1Eventi palazzetto$2');
    content = content.replace(/(data-i18n="srv_corporate">)Corporate Events(<\/h3>)/g, '$1Eventi aziendali$2');
  }

  // Titles
  if (f === 'palazzetto.html') {
    content = content.replace('<title>Palazzetti Events | Tursport Hotel Residence</title>', '<title>Eventi palazzetto | Tursport Hotel Residence</title>');
    content = content.replace('href="contatti.html?motivo=Palazzetto"', 'href="contatti.html?motivo=Eventi%20palazzetto"');
  }
  if (f === 'corporate.html') {
    content = content.replace('<title>Corporate Events | Tursport Hotel Residence</title>', '<title>Eventi aziendali | Tursport Hotel Residence</title>');
  }

  // Contatti select
  if (f === 'contatti.html') {
    content = content.replace('<option value="Palazzetto" data-i18n="form_reason_opt3">Palazzetto</option>', '<option value="Eventi palazzetto" data-i18n="form_reason_opt3">Eventi palazzetto</option>');
  }

  fs.writeFileSync(fp, content, 'utf8');
  console.log(`Updated ${f}`);
});
