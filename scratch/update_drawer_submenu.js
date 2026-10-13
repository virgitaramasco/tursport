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
  'convention.html',
  'coworking.html',
  'newsletter.html',
  'contatti.html',
  'Tursport Hotel Residence.html'
];

const subpages = [
  { file: 'services.html', key: 'nav_services_all', label: 'Tutti i servizi' },
  { file: 'rooms.html', key: 'nav_rooms', label: 'Rooms / Apartments' },
  { file: 'sport.html', key: 'nav_sport', label: 'Sport' },
  { file: 'pool.html', key: 'nav_pool', label: 'Pool Club' },
  { file: 'palazzetto.html', key: 'nav_palazzetto', label: 'Eventi palazzetto' },
  { file: 'corporate.html', key: 'nav_corporate', label: 'Eventi aziendali' },
  { file: 'convention.html', key: 'nav_convention', label: 'Convention' },
  { file: 'coworking.html', key: 'nav_coworking', label: 'Co-work Spaces' }
];

function generateNav(currentFile) {
  const isServicesOrSub = subpages.some(s => s.file === currentFile);

  const subItemsHtml = subpages.map(sub => {
    const isCur = sub.file === currentFile;
    const attrs = isCur ? 'aria-current="page" class="is-active" ' : '';
    return `          <li><a href="${sub.file}" ${attrs}data-i18n="${sub.key}">${sub.label}</a></li>`;
  }).join('\n');

  return `<nav>
    <ul>
      <li><a href="index.html" ${currentFile === 'index.html' || currentFile === 'Tursport Hotel Residence.html' ? 'aria-current="page" class="is-active" ' : ''}data-i18n="nav_home">Home</a></li>
      <li><a href="about.html" ${currentFile === 'about.html' ? 'aria-current="page" class="is-active" ' : ''}data-i18n="nav_about">About Us</a></li>
      <li class="drawer__item--has-sub">
        <button type="button" class="drawer__sub-toggle${isServicesOrSub ? ' is-parent-active' : ''}" id="drawerServicesToggle" aria-expanded="${isServicesOrSub ? 'true' : 'false'}" aria-controls="drawerServicesSub">
          <span class="drawer__sub-toggle-left">
            <span data-i18n="nav_services">Services</span>
          </span>
          <svg class="drawer__arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M2.5 4.5L6 8L9.5 4.5"/>
          </svg>
        </button>
        <ul class="drawer__sub${isServicesOrSub ? ' is-open' : ''}" id="drawerServicesSub">
${subItemsHtml}
        </ul>
      </li>
      <li><a href="newsletter.html" ${currentFile === 'newsletter.html' ? 'aria-current="page" class="is-active" ' : ''}data-i18n="nav_newsletter">Newsletter</a></li>
      <li><a href="contatti.html" ${currentFile === 'contatti.html' ? 'aria-current="page" class="is-active" ' : ''}data-i18n="nav_contact">Contact Us</a></li>
      <li><a href="https://instagram.com" target="_blank" rel="noopener">Instagram &#x2197;</a></li>
    </ul>
  </nav>`;
}

files.forEach(fileName => {
  const filePath = path.join(ROOT, fileName);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping missing file: ${fileName}`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const navRegex = /<nav>[\s\S]*?<\/nav>/;
  if (!navRegex.test(content)) {
    console.error(`Could not find <nav> in ${fileName}`);
    return;
  }
  const newNav = generateNav(fileName);
  content = content.replace(navRegex, newNav);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated drawer nav in ${fileName}`);
});

console.log('Done updating drawer in all HTML files.');
