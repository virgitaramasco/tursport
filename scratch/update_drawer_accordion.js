const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

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

const subpages = ['rooms.html', 'sport.html', 'pool.html', 'palazzetto.html', 'corporate.html'];

// 1. Update HTML files
pages.forEach(file => {
  const filePath = path.join(ROOT, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Match the Services link in drawer__item--has-sub
  // <li class="drawer__item--has-sub">\s*<a href="services.html"[^>]*>Services</a>
  const isServices = (file === 'services.html');
  const isSub = subpages.includes(file);

  let extraClasses = '';
  let ariaCurrent = '';
  if (isServices) {
    extraClasses = ' is-active';
    ariaCurrent = ' aria-current="page"';
  } else if (isSub) {
    extraClasses = ' is-parent-active';
  }

  const newToggleHtml = `<a href="services.html" class="drawer__services-toggle${extraClasses}" id="servicesToggle" role="button" aria-expanded="false" aria-controls="drawerSub"${ariaCurrent}><svg class="drawer__arrow" viewBox="0 0 10 10" width="10" height="10" aria-hidden="true" focusable="false"><polygon points="5,1.5 9,8.5 1,8.5" fill="currentColor"/></svg><span data-i18n="nav_services">Services</span></a>`;

  // Regex targeting the link under <li class="drawer__item--has-sub">
  const regex = /(<li class="drawer__item--has-sub">\s*)<a href="services\.html"[^>]*>Services<\/a>(\s*<ul class="drawer__sub"[^>]*>)/i;

  if (regex.test(content)) {
    content = content.replace(regex, `$1${newToggleHtml}$2`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated drawer Services toggle in ${file}`);
  } else {
    console.log(`Pattern not matched in ${file}`);
  }
});

// 2. Update style.css
const stylePath = path.join(ROOT, 'style.css');
let styleContent = fs.readFileSync(stylePath, 'utf8');

const oldSubCssRegex = /\/\* Submenu annidato sotto Services \*\/[\s\S]*?\.drawer nav \.drawer__sub a\.is-active \{\s*font-weight: 600;\s*opacity: 1;\s*\}/m;

const newSubCss = `/* Servizi toggle con freccina triangolare */
.drawer nav a.drawer__services-toggle {
  cursor: pointer;
  user-select: none;
}
.drawer nav a.drawer__services-toggle::before {
  display: none !important;
}
.drawer__arrow {
  display: inline-block;
  width: 0.54rem;
  height: 0.54rem;
  margin-right: 0.15rem;
  flex: none;
  color: currentColor;
  transform-origin: 50% 50%;
  transition: transform 0.28s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform: rotate(0deg); /* punta in su (chiuso) */
}
.drawer__item--has-sub.is-expanded .drawer__arrow,
.drawer__services-toggle[aria-expanded="true"] .drawer__arrow {
  transform: rotate(180deg); /* punta in giù (aperto) */
}

/* Submenu collassabile sotto Services */
.drawer__sub {
  list-style: none;
  display: grid;
  gap: 0.12rem;
  margin: 0 0 0 0.4rem;
  padding-left: 1rem;
  border-left: 1.5px solid var(--line);
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: max-height 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
              opacity 0.25s ease,
              margin 0.35s ease,
              visibility 0.35s ease;
}
.drawer__item--has-sub.is-expanded .drawer__sub {
  max-height: 280px;
  opacity: 1;
  visibility: visible;
  margin: 0.35rem 0 0.55rem 0.4rem;
}
.drawer nav .drawer__sub a {
  font-size: clamp(0.88rem, 1.3vw, 0.98rem);
  font-weight: 500;
  line-height: 1.3;
  padding: 0.2rem 0;
  color: var(--ink);
  opacity: 0.82;
  gap: 0.5rem;
}
.drawer nav .drawer__sub a:hover {
  opacity: 1;
  transform: translateX(0.25rem);
}
.drawer nav .drawer__sub a::before {
  width: 0.35rem;
  height: 0.35rem;
}
.drawer nav .drawer__sub a[aria-current="page"],
.drawer nav .drawer__sub a.is-active {
  font-weight: 600;
  opacity: 1;
}`;

if (oldSubCssRegex.test(styleContent)) {
  styleContent = styleContent.replace(oldSubCssRegex, newSubCss);
  fs.writeFileSync(stylePath, styleContent, 'utf8');
  console.log('style.css updated with accordion and arrow styles.');
} else {
  console.log('oldSubCssRegex did not match style.css');
}

// 3. Update main.js
const mainPath = path.join(ROOT, 'main.js');
let mainContent = fs.readFileSync(mainPath, 'utf8');

if (!mainContent.includes('servicesToggle')) {
  const accordionJs = `
  /* ---------- Drawer Services Accordion Toggle ---------- */
  var servicesToggle = document.getElementById('servicesToggle');
  var servicesItem = document.querySelector('.drawer__item--has-sub');
  if (servicesToggle && servicesItem) {
    servicesToggle.addEventListener('click', function(e) {
      e.preventDefault();
      var isExpanded = servicesItem.classList.toggle('is-expanded');
      servicesToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });
  }
`;
  mainContent = mainContent.replace(
    '/* ---------- Scroll Reveal (Slide Up) ---------- */',
    `${accordionJs}\n  /* ---------- Scroll Reveal (Slide Up) ---------- */`
  );
  fs.writeFileSync(mainPath, mainContent, 'utf8');
  console.log('main.js updated with accordion toggle logic.');
} else {
  console.log('main.js already contains servicesToggle.');
}
