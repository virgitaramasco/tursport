const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 1. Update index.html and Tursport Hotel Residence.html
const targetHtmlFiles = ['index.html', 'Tursport Hotel Residence.html'];

const oldHeroRegex = /<section class="page-hero">[\s\S]*?<\/section>\s*<section class="sec" style="padding-top:0" aria-label="Sezioni della homepage">/m;

const newHeroHtml = `<section class="page-hero page-hero--video">
  <div class="hero-video-bg" aria-hidden="true">
    <video class="hero-video-bg__media" autoplay muted loop playsinline poster="hero-video-poster.webp">
      <source src="herovideo.mp4" type="video/mp4">
    </video>
    <div class="hero-video-bg__overlay"></div>
  </div>

  <div class="wrap page-hero__content">
    <h1 class="h1-page reveal">
      <span><span data-i18n="hero_title_1">Tursport</span></span>
      <span><span data-i18n="hero_title_2">Hotel Residence</span></span>
    </h1>
    <div class="page-hero__cols">
      <p class="lead page-hero__lead reveal reveal-delay-1" data-i18n="hero_lead">
        A Capo San Vito, tra il verde di Taranto, Tursport Hotel Residence è una struttura a quattro stelle a circa 600 metri dal mare e 7 km dal centro città.
      </p>
      <div class="page-hero__more reveal reveal-delay-2">
        <p data-i18n="hero_p1">Interpreta una nuova idea di ospitalità che riunisce soggiorni, attività sportive, business ed eventi in un'unica realtà.</p>
        <p data-i18n="hero_p2">Una storia che continua a evolversi, mantenendo al centro il piacere dell'accoglienza e la possibilità di vivere il Tursport in modi diversi.</p>
      </div>
    </div>
  </div>
</section>

<section class="sec" aria-label="Sezioni della homepage">`;

targetHtmlFiles.forEach(file => {
  const filePath = path.join(ROOT, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (oldHeroRegex.test(content)) {
      content = content.replace(oldHeroRegex, newHeroHtml);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${file} with video hero.`);
    } else {
      console.log(`Pattern not matched in ${file}`);
    }
  }
});

// 2. Update style.css
const stylePath = path.join(ROOT, 'style.css');
let styleContent = fs.readFileSync(stylePath, 'utf8');

const videoHeroCss = `
/* ---------- Page Hero with Video Background (Homepage) ---------- */
.page-hero--video {
  position: relative;
  min-height: clamp(580px, 90vh, 960px);
  min-height: clamp(580px, 90svh, 960px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: calc(var(--head-h) + clamp(2rem, 5vw, 4rem));
  padding-bottom: clamp(3rem, 6vw, 5.5rem);
  background: #14110e;
  overflow: hidden;
}

.hero-video-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

.hero-video-bg__media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.hero-video-bg__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.20);
  z-index: 2;
  pointer-events: none;
}

.page-hero--video .page-hero__content {
  position: relative;
  z-index: 3;
  width: 100%;
}

.page-hero--video .h1-page {
  color: #ffffff;
  text-shadow: 0 2px 16px rgba(0, 0, 0, 0.5), 0 1px 3px rgba(0, 0, 0, 0.7);
}

.page-hero--video .page-hero__cols {
  margin-bottom: 0;
}

.page-hero--video .page-hero__lead,
.page-hero--video .lead {
  color: #f6f2e1;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.85);
}

.page-hero--video .page-hero__more p {
  color: #f6f2e1;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.6), 0 1px 3px rgba(0, 0, 0, 0.85);
}
`;

if (!styleContent.includes('.page-hero--video')) {
  // Insert right before .bleed-media
  styleContent = styleContent.replace('.bleed-media {', `${videoHeroCss}\n.bleed-media {`);

  // Responsive additions
  styleContent = styleContent.replace(
    '.split-bleed { grid-template-columns: 1fr; min-height: auto; }',
    `.page-hero--video { min-height: clamp(520px, 86vh, 760px); padding-top: calc(var(--head-h) + 2rem); padding-bottom: 2.5rem; }\n  .split-bleed { grid-template-columns: 1fr; min-height: auto; }`
  );

  styleContent = styleContent.replace(
    '.header__in { gap: 0.5rem; }',
    `.header__in { gap: 0.5rem; }\n  .page-hero--video { min-height: clamp(520px, 92svh, 720px); padding-top: calc(var(--head-h) + 1.25rem); padding-bottom: 2rem; }\n  .page-hero--video .page-hero__cols { gap: 0.85rem; }`
  );

  fs.writeFileSync(stylePath, styleContent, 'utf8');
  console.log('style.css updated with .page-hero--video rules.');
} else {
  console.log('style.css already has .page-hero--video rules.');
}

// 3. Update main.js to ensure video plays programmatically
const mainJsPath = path.join(ROOT, 'main.js');
let mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
if (!mainJsContent.includes('hero-video-bg__media')) {
  const videoPlayCode = `
  /* ---------- Background Video Auto-play Robustness ---------- */
  var bgVideo = document.querySelector('.hero-video-bg__media');
  if (bgVideo) {
    bgVideo.muted = true;
    var playProm = bgVideo.play();
    if (playProm !== undefined) {
      playProm.catch(function(){ /* autoplay prevented or power saving */ });
    }
  }
`;
  mainJsContent = mainJsContent.replace('/* ---------- Scroll Reveal (Slide Up) ---------- */', `${videoPlayCode}\n  /* ---------- Scroll Reveal (Slide Up) ---------- */`);
  fs.writeFileSync(mainJsPath, mainJsContent, 'utf8');
  console.log('main.js updated with video play robustness.');
}
