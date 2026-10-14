const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// List of all active pages
const pages = [
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

const subpages = [
  { file: 'rooms.html', key: 'nav_rooms', label: 'Rooms / Apartments' },
  { file: 'sport.html', key: 'nav_sport', label: 'Sport' },
  { file: 'pool.html', key: 'nav_pool', label: 'Pool Club' },
  { file: 'palazzetto.html', key: 'nav_palazzetto', label: 'Eventi palazzetto' },
  { file: 'corporate.html', key: 'nav_corporate', label: 'Eventi aziendali' }
];

function buildHeaderAndDrawer(currentFile) {
  const isServices = currentFile === 'services.html';
  const isSub = subpages.some(s => s.file === currentFile);

  let servicesAttrs = 'data-i18n="nav_services"';
  if (isServices) {
    servicesAttrs = 'aria-current="page" class="is-active" data-i18n="nav_services"';
  } else if (isSub) {
    servicesAttrs = 'class="is-parent-active" data-i18n="nav_services"';
  }

  const subHtml = subpages.map(sub => {
    const isCur = sub.file === currentFile;
    const attrs = isCur ? 'aria-current="page" class="is-active" ' : '';
    return `          <li><a href="${sub.file}" ${attrs}data-i18n="${sub.key}">${sub.label}</a></li>`;
  }).join('\n');

  return `<!-- ================= HEADER ================= -->
<header class="header">
  <div class="header__in">
    <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="drawer">
      <span class="menu-btn__icon" aria-hidden="true"><i></i><i></i></span>
      <span class="menu-btn__label" data-i18n="menu_btn">Menu</span>
    </button>
    <a class="logo" href="index.html" aria-label="Tursport, Home">TURSPORT</a>
    <div class="header__right">
      <div class="lang-switch" role="group" aria-label="Selezione lingua / Language selection">
        <button type="button" class="lang-btn is-active" id="langIt" data-lang="it" aria-pressed="true">IT</button>
        <span class="lang-sep" aria-hidden="true">|</span>
        <button type="button" class="lang-btn" id="langEn" data-lang="en" aria-pressed="false">ENG</button>
      </div>
      <a class="btn book" href="https://booking.tursport.it" target="_blank" rel="noopener" data-i18n="book_btn">Book</a>
    </div>
  </div>
</header>

<div class="scrim" id="scrim"></div>
<aside class="drawer" id="drawer" aria-label="Menu principale">
  <div class="drawer__top">
    <span class="h3">Tursport</span>
    <button class="drawer__close" id="menuClose" aria-label="Chiudi menu" data-i18n="menu_close">Chiudi &#x2715;</button>
  </div>
  <nav>
    <ul>
      <li><a href="index.html" ${currentFile === 'index.html' || currentFile === 'Tursport Hotel Residence.html' ? 'aria-current="page" class="is-active" ' : ''}data-i18n="nav_home">Home</a></li>
      <li><a href="about.html" ${currentFile === 'about.html' ? 'aria-current="page" class="is-active" ' : ''}data-i18n="nav_about">About Us</a></li>
      <li class="drawer__item--has-sub">
        <a href="services.html" ${servicesAttrs}>Services</a>
        <ul class="drawer__sub">
${subHtml}
        </ul>
      </li>
      <li><a href="newsletter.html" ${currentFile === 'newsletter.html' ? 'aria-current="page" class="is-active" ' : ''}data-i18n="nav_newsletter">Newsletter</a></li>
      <li><a href="contatti.html" ${currentFile === 'contatti.html' ? 'aria-current="page" class="is-active" ' : ''}data-i18n="nav_contact">Contact Us</a></li>
    </ul>
  </nav>
</aside>`;
}

// 1. Process Header & Drawer on all pages, and update Instagram in footer
pages.forEach(file => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace header and drawer
  const headerDrawerRegex = /<!-- ================= HEADER ================= -->[\s\S]*?<\/aside>/;
  if (headerDrawerRegex.test(content)) {
    content = content.replace(headerDrawerRegex, buildHeaderAndDrawer(file));
  } else {
    console.warn(`Could not find header/drawer regex in ${file}`);
  }

  // Update Instagram URL in footer
  content = content.replace(/href="https:\/\/instagram\.com"/g, 'href="https://www.instagram.com/tursport.hotel/"');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated header, drawer & footer Instagram in ${file}`);
});

// 2. Specific updates for index.html: prominent buttons & new service photos
let indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const indexSecRegex = /<ul class="index">[\s\S]*?<\/ul>/;
const newIndexUl = `<ul class="index">
      <li class="reveal">
        <a href="rooms.html">
          <div class="index__info">
            <h3 data-i18n="idx_rooms_title">Camere &amp; Appartamenti</h3>
            <p data-i18n="idx_rooms_desc">Il piacere di sentirsi nel posto giusto.</p>
          </div>
          <div class="ph"><img src="sito/sito/DSCF1011.webp" alt="Camere &amp; Appartamenti" loading="lazy"></div>
          <div class="index__action">
            <span class="btn btn--index" data-i18n="btn_discover">Scopri &#x2197;</span>
          </div>
        </a>
      </li>
      <li class="reveal reveal-delay-1">
        <a href="sport.html">
          <div class="index__info">
            <h3 data-i18n="idx_sport_title">Sport</h3>
            <p data-i18n="idx_sport_desc">Lo spazio per mettersi in gioco.</p>
          </div>
          <div class="ph"><img src="sito/sito/DSCF0801.webp" alt="Sport" loading="lazy"></div>
          <div class="index__action">
            <span class="btn btn--index" data-i18n="btn_discover">Scopri &#x2197;</span>
          </div>
        </a>
      </li>
      <li class="reveal reveal-delay-2">
        <a href="pool.html">
          <div class="index__info">
            <h3 data-i18n="idx_pool_title">Pool Club</h3>
            <p data-i18n="idx_pool_desc">Il piacere di una pausa a bordo piscina.</p>
          </div>
          <div class="ph"><img src="sito/sito/DSCF1199.webp" alt="Pool Club" loading="lazy"></div>
          <div class="index__action">
            <span class="btn btn--index" data-i18n="btn_discover">Scopri &#x2197;</span>
          </div>
        </a>
      </li>
      <li class="reveal reveal-delay-3">
        <a href="corporate.html">
          <div class="index__info">
            <h3 data-i18n="idx_events_title">Eventi</h3>
            <p data-i18n="idx_events_desc">Incontrarsi e condividere nuove idee.</p>
          </div>
          <div class="ph"><img src="sito/sito/DSCF0823.webp" alt="Eventi" loading="lazy"></div>
          <div class="index__action">
            <span class="btn btn--index" data-i18n="btn_discover">Scopri &#x2197;</span>
          </div>
        </a>
      </li>
    </ul>`;

indexHtml = indexHtml.replace(indexSecRegex, newIndexUl);
fs.writeFileSync(path.join(ROOT, 'index.html'), indexHtml, 'utf8');
console.log('Updated index.html with prominent CTA buttons and fresh photos');

// Also update Tursport Hotel Residence.html with same index
let tursportHtml = fs.readFileSync(path.join(ROOT, 'Tursport Hotel Residence.html'), 'utf8');
tursportHtml = tursportHtml.replace(indexSecRegex, newIndexUl);
fs.writeFileSync(path.join(ROOT, 'Tursport Hotel Residence.html'), tursportHtml, 'utf8');
console.log('Updated Tursport Hotel Residence.html with prominent CTA buttons and fresh photos');

// 3. Specific updates for about.html: 20 photos in gallery, remove second photo (foto1.webp)
let aboutHtml = fs.readFileSync(path.join(ROOT, 'about.html'), 'utf8');
const galleryGridRegex = /<div class="gallery__grid--bleed[\s\S]*?<\/div>(?=\s*<\/div>\s*<!-- Modal)/;
const newGalleryGrid = `<div class="gallery__grid--bleed reveal reveal-delay-1">
        <div class="g-span-7"><div class="ph" data-gallery-idx="0"><img src="sito/sito/DSCF1194.webp" alt="Piscina principale Tursport" loading="lazy"></div></div>
        <div class="g-span-5"><div class="ph" data-gallery-idx="1"><img src="sito/sito/DSCF0705.webp" alt="Colazione a bordo piscina" loading="lazy"></div></div>
        <div class="g-span-4"><div class="ph" data-gallery-idx="2"><img src="sito/sito/DSCF1403.webp" alt="Parco e verde mediterraneo" loading="lazy"></div></div>
        <div class="g-span-4"><div class="ph" data-gallery-idx="3"><img src="sito/sito/DSCF1011.webp" alt="Camere e design" loading="lazy"></div></div>
        <div class="g-span-4"><div class="ph" data-gallery-idx="4"><img src="sito/sito/DSCF1550.webp" alt="Architettura Tursport Hotel Residence" loading="lazy"></div></div>
        <div class="g-span-3"><div class="ph" data-gallery-idx="5"><img src="sito/sito/DSCF1240.webp" alt="Campi da tennis in terra rossa" loading="lazy"></div></div>
        <div class="g-span-3"><div class="ph" data-gallery-idx="6"><img src="sito/sito/DSCF1202.webp" alt="Piscina e solarium" loading="lazy"></div></div>
        <div class="g-span-3"><div class="ph" data-gallery-idx="7"><img src="sito/sito/DSCF0744.webp" alt="Palazzetto dello sport" loading="lazy"></div></div>
        <div class="g-span-3"><div class="ph" data-gallery-idx="8"><img src="sito/sito/DSCF0786.webp" alt="Lounge e spazi meeting" loading="lazy"></div></div>
        <div class="g-span-6"><div class="ph" data-gallery-idx="9"><img src="sito/sito/DSCF0801.webp" alt="Campi da beach tennis e fitness" loading="lazy"></div></div>
        <div class="g-span-6"><div class="ph" data-gallery-idx="10"><img src="sito/sito/DSCF0823.webp" alt="Sala meeting ed eventi aziendali" loading="lazy"></div></div>
        <div class="g-span-4"><div class="ph" data-gallery-idx="11"><img src="sito/sito/DSCF1418.webp" alt="Giardini e vegetazione curata" loading="lazy"></div></div>
        <div class="g-span-4"><div class="ph" data-gallery-idx="12"><img src="sito/sito/DSCF1051.webp" alt="Sistemazioni indipendenti" loading="lazy"></div></div>
        <div class="g-span-4"><div class="ph" data-gallery-idx="13"><img src="sito/sito/DSCF1017.webp" alt="Dettagli e comfort" loading="lazy"></div></div>
        <div class="g-span-3"><div class="ph" data-gallery-idx="14"><img src="sito/sito/DSCF0843.webp" alt="Atmosfere serali" loading="lazy"></div></div>
        <div class="g-span-3"><div class="ph" data-gallery-idx="15"><img src="sito/sito/DSCF1244.webp" alt="Campi da beach volley" loading="lazy"></div></div>
        <div class="g-span-3"><div class="ph" data-gallery-idx="16"><img src="sito/sito/DSCF1460.webp" alt="Viali del resort" loading="lazy"></div></div>
        <div class="g-span-3"><div class="ph" data-gallery-idx="17"><img src="sito/sito/DSCF1538.webp" alt="Hall e accoglienza" loading="lazy"></div></div>
        <div class="g-span-5"><div class="ph" data-gallery-idx="18"><img src="sito/sito/DSCF1558.webp" alt="Panoramica dall'alto del Tursport" loading="lazy"></div></div>
        <div class="g-span-7"><div class="ph" data-gallery-idx="19"><img src="sito/sito/foto2.webp" alt="Camera residence" loading="lazy"></div></div>
      </div>
    </div>`;

aboutHtml = aboutHtml.replace(galleryGridRegex, newGalleryGrid);
aboutHtml = aboutHtml.replace('1 / 5', '1 / 20');
fs.writeFileSync(path.join(ROOT, 'about.html'), aboutHtml, 'utf8');
console.log('Updated about.html with 20 photos gallery');

// 4. Specific updates for services.html: remove convention & cowork, new photos for all services
let servicesHtml = fs.readFileSync(path.join(ROOT, 'services.html'), 'utf8');
const tilesRegex = /<ul class="tiles">[\s\S]*?<\/ul>/;
const newTiles = `<ul class="tiles">
      <li class="reveal">
        <a href="rooms.html">
          <div class="ph"><img src="sito/sito/DSCF1011.webp" alt="Rooms &amp; Apartments" loading="lazy"></div>
          <h3 class="h3" data-i18n="srv_rooms">Camere &amp; Appartamenti</h3>
        </a>
      </li>
      <li class="reveal reveal-delay-1">
        <a href="sport.html">
          <div class="ph"><img src="sito/sito/DSCF0801.webp" alt="Sport" loading="lazy"></div>
          <h3 class="h3" data-i18n="srv_sport">Sport</h3>
        </a>
      </li>
      <li class="reveal reveal-delay-2">
        <a href="pool.html">
          <div class="ph"><img src="sito/sito/DSCF1199.webp" alt="Pool Club" loading="lazy"></div>
          <h3 class="h3" data-i18n="srv_pool">Pool Club</h3>
        </a>
      </li>
      <li class="reveal">
        <a href="palazzetto.html">
          <div class="ph"><img src="sito/sito/DSCF0741.webp" alt="Palazzetto" loading="lazy"></div>
          <h3 class="h3" data-i18n="srv_palazzetto">Eventi palazzetto</h3>
        </a>
      </li>
      <li class="reveal reveal-delay-1">
        <a href="corporate.html">
          <div class="ph"><img src="sito/sito/DSCF0823.webp" alt="Eventi aziendali" loading="lazy"></div>
          <h3 class="h3" data-i18n="srv_corporate">Eventi aziendali</h3>
        </a>
      </li>
    </ul>`;

servicesHtml = servicesHtml.replace(tilesRegex, newTiles);
fs.writeFileSync(path.join(ROOT, 'services.html'), servicesHtml, 'utf8');
console.log('Updated services.html with 5 services and new photos');

// 5. Update rooms.html book link
let roomsHtml = fs.readFileSync(path.join(ROOT, 'rooms.html'), 'utf8');
roomsHtml = roomsHtml.replace(
  'href="contatti.html?motivo=Camere%20e%20appartamenti" data-i18n="rooms_btn_book"',
  'href="https://booking.tursport.it" target="_blank" rel="noopener" data-i18n="rooms_btn_book"'
);
fs.writeFileSync(path.join(ROOT, 'rooms.html'), roomsHtml, 'utf8');
console.log('Updated rooms.html booking CTA');

// 6. Update contatti.html dropdown options (remove convention & coworking)
let contattiHtml = fs.readFileSync(path.join(ROOT, 'contatti.html'), 'utf8');
const optionsRegex = /<option value="Convention"[\s\S]*?<option value="Co-working"[^>]*>Co-working<\/option>\s*/;
contattiHtml = contattiHtml.replace(optionsRegex, '');
contattiHtml = contattiHtml.replace(
  '<dd><a href="https://instagram.com" target="_blank" rel="noopener" data-i18n="contact_ig_dd">Profilo ufficiale</a></dd>',
  '<dd><a href="https://www.instagram.com/tursport.hotel/" target="_blank" rel="noopener" data-i18n="contact_ig_dd">Profilo ufficiale</a></dd>'
);
fs.writeFileSync(path.join(ROOT, 'contatti.html'), contattiHtml, 'utf8');
console.log('Updated contatti.html dropdown options and official IG link');

// 7. Redirect pages for convention.html and coworking.html
const redirectConvention = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=corporate.html">
<title>Reindirizzamento | Tursport</title>
<link rel="canonical" href="corporate.html">
</head>
<body>
<p>Reindirizzamento a <a href="corporate.html">Eventi aziendali</a>...</p>
</body>
</html>`;
fs.writeFileSync(path.join(ROOT, 'convention.html'), redirectConvention, 'utf8');

const redirectCoworking = `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=services.html">
<title>Reindirizzamento | Tursport</title>
<link rel="canonical" href="services.html">
</head>
<body>
<p>Reindirizzamento a <a href="services.html">Servizi</a>...</p>
</body>
</html>`;
fs.writeFileSync(path.join(ROOT, 'coworking.html'), redirectCoworking, 'utf8');
// 8. Update favicon to official LogoTursportsingolo.svg across all pages
pages.forEach(file => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/<link rel="icon"[^>]+>/, '<link rel="icon" href="LogoTursportsingolo.svg" type="image/svg+xml">');
  fs.writeFileSync(filePath, content, 'utf8');
});
console.log('Updated favicons to LogoTursportsingolo.svg');

console.log('All revisions applied successfully!');

