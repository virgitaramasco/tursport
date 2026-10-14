const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 1. Shared CSS (style.css)
const cssContent = `/* ---------- Font Face: Times New Roman Condensed (Titoli) & Helvetica Neue (Testi) ---------- */
@font-face {
  font-family: 'Times New Roman Condensed';
  src: url('Times New Roman MT Std Condensed Italic.otf') format('opentype'),
       url('Times New Roman MT Std Condensed Italic/Times New Roman MT Std Condensed Italic.otf') format('opentype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Times New Roman Condensed';
  src: url('Times New Roman MT Std Condensed Italic.otf') format('opentype'),
       url('Times New Roman MT Std Condensed Italic/Times New Roman MT Std Condensed Italic.otf') format('opentype');
  font-weight: 100 900;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'Helvetica Neue Custom';
  src: url('Helvetica-Neue-65-Medium.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

/* ---------- Palette: Sfondo Chiaro (#f6f2e1) & Testi Scuri (#2a1f15) ---------- */
:root {
  color-scheme: light;
  --bg: #f6f2e1;
  --tint: #ede8d4;
  --ink: #2a1f15;
  --muted: #6e6255;
  --line: rgba(42, 31, 21, 0.15);
  --line-strong: rgba(42, 31, 21, 0.35);
  --ph: #ede8d4;
  --ph-ink: #6e6255;
  --btn: #2a1f15;
  --btn-ink: #f6f2e1;
  --btn-hover: #463423;
  --focus: #2a1f15;

  --gutter: clamp(1.25rem, 4.5vw, 4.5rem);
  --space: clamp(3.5rem, 8vw, 6.5rem);
  --head-h: 4rem;
  --font-display: 'Helvetica Neue Custom', "Helvetica Neue", Helvetica, Arial, sans-serif;
  --font-text: 'Helvetica Neue Custom', "Helvetica Neue", Helvetica, Arial, sans-serif;
  --letter-spacing-body: -0.04em;

  box-sizing: border-box;
  padding-top: env(safe-area-inset-top, 0px);
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

/* ---------- Base Reset ---------- */
*, *::before, *::after { box-sizing: border-box; }
html {
  background: var(--bg);
  scroll-behavior: smooth;
  scroll-padding-top: calc(var(--head-h) + env(safe-area-inset-top, 0px) + 1rem);
  -webkit-text-size-adjust: 100%;
  overflow-x: hidden;
}
body {
  margin: 0;
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-text);
  letter-spacing: var(--letter-spacing-body);
  font-size: clamp(0.85rem, 0.2vw + 0.8rem, 0.94rem);
  line-height: 1.55;
  overflow-x: hidden;
}
h1, h2, h3, p, ul, dl, dd, figure { margin: 0; }
h1, h2, h3 {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--ink);
}
ul { padding: 0; list-style: none; }
a { color: inherit; }
p {
  max-width: 58ch;
  font-family: var(--font-text);
  letter-spacing: var(--letter-spacing-body);
  font-size: 0.92rem;
  line-height: 1.55;
  color: var(--ink);
}
p + p { margin-top: 0.85em; }
:focus-visible { outline: 2px solid var(--focus); outline-offset: 3px; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

.wrap { width: min(100% - 2*var(--gutter), 84rem); margin-inline: auto; }
.sec { padding-block: var(--space); position: relative; background: var(--bg); }
.sec--tint { background: var(--tint); }
.tint { background: var(--tint); }
.muted { color: var(--muted); }

/* Titoli & Tipografia */
.h1-page {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(2.2rem, 5.5vw, 4.8rem);
  line-height: 0.95;
  letter-spacing: -0.03em;
  margin-bottom: clamp(1.2rem, 3vw, 2.2rem);
  color: var(--ink);
  text-transform: none;
}
.h2 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1.45rem, 2.4vw, 2.2rem);
  line-height: 1.08;
  letter-spacing: -0.02em;
  text-wrap: balance;
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
  max-width: 24ch;
  color: var(--ink);
}
.h3 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(1rem, 1.3vw, 1.25rem);
  line-height: 1.15;
  letter-spacing: -0.015em;
  color: var(--ink);
}
.lead {
  font-family: var(--font-text);
  letter-spacing: var(--letter-spacing-body);
  font-size: clamp(1rem, 0.4vw + 0.88rem, 1.15rem);
  line-height: 1.45;
  max-width: 38ch;
  color: var(--ink);
}

/* ---------- Immagini: Al vivo e senza stondature ---------- */
img {
  display: block;
  max-width: 100%;
  border-radius: 0 !important;
}
.ph {
  background: var(--ph);
  color: var(--ph-ink);
  aspect-ratio: var(--ar, 4/3);
  width: 100%;
  display: block;
  position: relative;
  overflow: hidden;
  border-radius: 0 !important;
  padding: 0 !important;
  margin: 0;
  border: 0;
}
.ph img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 0 !important;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* ---------- Animazione Slide Up allo scroll ---------- */
.reveal {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: opacity, transform;
}
.reveal.is-revealed {
  opacity: 1;
  transform: translateY(0);
}
.reveal-delay-1 { transition-delay: 0.08s; }
.reveal-delay-2 { transition-delay: 0.16s; }
.reveal-delay-3 { transition-delay: 0.24s; }
.reveal-delay-4 { transition-delay: 0.32s; }
.reveal-delay-5 { transition-delay: 0.40s; }

/* ---------- Bottoni ---------- */
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  min-height: 2.45rem; padding: 0.55rem 1.35rem;
  border-radius: 999px;
  background: var(--btn); color: var(--btn-ink);
  font-family: var(--font-text);
  font-weight: 600;
  font-size: 0.82rem;
  line-height: 1.1;
  letter-spacing: var(--letter-spacing-body);
  text-decoration: none;
  border: 1.5px solid var(--btn);
  cursor: pointer;
  transition: transform 0.25s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.btn:hover { transform: translateY(-2px); background: var(--btn-hover); border-color: var(--btn-hover); }
.btn--ghost { background: transparent; color: var(--ink); border-color: var(--ink); }
.btn--ghost:hover { background: var(--ink); color: var(--bg); }
.actions { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1.5rem; }

/* ---------- Header & IT | ENG Switcher ---------- */
.header {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  padding-top: env(safe-area-inset-top, 0px);
  height: calc(var(--head-h) + env(safe-area-inset-top, 0px));
  background: rgba(246, 242, 225, 0.94);
  -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}
.header__in {
  height: var(--head-h); padding-inline: var(--gutter);
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 1rem;
}
.menu-btn {
  justify-self: start; display: inline-flex; align-items: center; gap: 0.65rem;
  min-height: 2.4rem; padding: 0; background: none; border: 0; color: var(--ink); cursor: pointer;
  font-family: var(--font-text); font-weight: 600; font-size: 0.85rem; line-height: 1;
  letter-spacing: var(--letter-spacing-body);
}
.menu-btn__icon { display: grid; gap: 5px; width: 1.4rem; }
.menu-btn__icon i { display: block; height: 2px; background: currentColor; transition: transform 0.35s ease, width 0.35s ease; }
.menu-btn__icon i:last-child { width: 70%; }
.menu-btn:hover .menu-btn__icon i:last-child { width: 100%; }
.logo {
  justify-self: center; text-decoration: none;
  font-family: var(--font-text); font-weight: 700;
  font-size: clamp(1.05rem, 1.8vw, 1.35rem); line-height: 1;
  letter-spacing: 0.12em; display: inline-flex; align-items: center; gap: 0.45rem;
  color: var(--ink);
}
.logo::after {
  content: ""; width: 0.4em; height: 0.4em; border-radius: 50%;
  background: var(--ink); box-shadow: 0 0 0 1px var(--bg);
}
.header__right {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: clamp(0.55rem, 1.4vw, 1rem);
}
.book { min-height: 2.35rem; padding-inline: 1.15rem; font-size: 0.82rem; }

/* Language toggle button IT | ENG */
.lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--font-text);
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: var(--letter-spacing-body);
  user-select: none;
}
.lang-btn {
  background: none;
  border: 0;
  padding: 0.2rem 0.25rem;
  font: inherit;
  color: var(--muted);
  cursor: pointer;
  line-height: 1;
  transition: color 0.2s ease;
}
.lang-btn:hover { color: var(--ink); }
.lang-btn.is-active {
  color: var(--ink);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.lang-sep { color: var(--line); font-weight: 300; }

/* ---------- Menu laterale (Drawer Chiaro) ---------- */
.scrim { position: fixed; inset: 0; z-index: 55; background: rgba(42, 31, 21, 0.35); opacity: 0; pointer-events: none; transition: opacity 0.45s ease; }
.scrim.is-open { opacity: 1; pointer-events: auto; }
.drawer {
  position: fixed; top: 0; bottom: 0; left: 0; z-index: 60; width: min(26rem, 90vw);
  background: var(--bg); color: var(--ink);
  padding: calc(1.25rem + env(safe-area-inset-top, 0px)) clamp(1.5rem, 4vw, 2.5rem) calc(1.5rem + env(safe-area-inset-bottom, 0px));
  display: flex; flex-direction: column; gap: 1.25rem; overflow-y: auto;
  transform: translateX(-102%); visibility: hidden;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), visibility 0s linear 0.6s;
  border-radius: 0 !important;
  border-right: 1px solid var(--line);
  box-shadow: 4px 0 30px rgba(42, 31, 21, 0.08);
}
.drawer.is-open { transform: none; visibility: visible; transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), visibility 0s; }
.drawer__top { display: flex; justify-content: space-between; align-items: center; }
.drawer__close {
  background: none; border: 0; color: var(--ink); cursor: pointer; min-height: 2.4rem; padding: 0;
  font-family: var(--font-text); font-weight: 600; font-size: 0.88rem; line-height: 1;
  letter-spacing: var(--letter-spacing-body);
}
.drawer nav > ul { display: grid; gap: 0.2rem; }
.drawer nav a {
  display: flex; align-items: center; gap: 0.65rem; padding: 0.25rem 0; text-decoration: none;
  font-family: var(--font-text); font-weight: 600;
  font-size: clamp(1.02rem, 1.6vw, 1.25rem); line-height: 1.25;
  letter-spacing: var(--letter-spacing-body);
  color: var(--ink);
  transition: transform 0.35s ease, color 0.2s ease, opacity 0.2s ease;
}
.drawer nav a:hover { transform: translateX(0.35rem); }
.drawer nav a::before {
  content: ""; width: 0.45rem; height: 0.45rem; border-radius: 50%;
  background: var(--ink); transform: scale(0); transition: transform 0.35s ease; flex: none;
}
.drawer nav a[aria-current="page"]::before,
.drawer nav a.is-active::before { transform: scale(1); }
.drawer nav a[aria-current="page"],
.drawer nav a.is-active { font-weight: 700; }
.drawer nav a.is-parent-active { font-weight: 700; }

/* Submenu annidato sotto Services */
.drawer__sub {
  list-style: none;
  display: grid;
  gap: 0.12rem;
  margin: 0.35rem 0 0.55rem 0.4rem;
  padding-left: 1rem;
  border-left: 1.5px solid var(--line);
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
}
.drawer__lang {
  border-top: 1px solid var(--line);
  padding-top: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.drawer__lang-label { font-size: 0.82rem; color: var(--muted); }
.lang-switch--drawer .lang-btn { color: var(--muted); }
.lang-switch--drawer .lang-btn:hover,
.lang-switch--drawer .lang-btn.is-active { color: var(--ink); }
.lang-switch--drawer .lang-sep { color: var(--line); }
.drawer__contact { border-top: 1px solid var(--line); padding-top: 1rem; font-size: 0.85rem; line-height: 1.6; color: var(--ink); }
.drawer__contact p { font-size: 0.85rem; color: var(--ink); }
.drawer__contact a { text-underline-offset: 0.2em; }
.drawer__ig { border-top: 1px solid var(--line); padding-top: 0.85rem; font-size: 0.85rem; color: var(--ink); }

/* ---------- Page Hero Header ---------- */
.page-hero {
  padding-top: calc(var(--head-h) + clamp(1.5rem, 4vw, 3.5rem));
  padding-bottom: clamp(2rem, 5vw, 4rem);
  background: var(--bg);
}
.page-hero__cols {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1.5rem var(--gutter);
  margin-bottom: clamp(2rem, 4vw, 3rem);
}
.page-hero__lead { grid-column: 1 / span 7; }
.page-hero__more { grid-column: 9 / span 4; align-self: end; }

/* Immagine al vivo da bordo a bordo */
.bleed-media {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  max-width: 100vw;
  overflow: hidden;
  border-radius: 0 !important;
}
.bleed-media .ph {
  width: 100%;
  height: clamp(360px, 58vh, 650px);
  aspect-ratio: auto;
  border-radius: 0 !important;
}

/* ---------- Layout Split AL VIVO (50% testo / 50% foto a filo) ---------- */
.split-bleed {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  min-height: clamp(460px, 62vh, 650px);
  align-items: stretch;
  width: 100%;
  margin: 0;
  padding: 0;
}
.split-bleed .split__text {
  padding: clamp(2.5rem, 5vw, 5rem) clamp(1.5rem, 4.5vw, 4.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 38rem;
  margin-inline: auto;
  width: 100%;
}
.split-bleed .split__media {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 380px;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.split-bleed .split__media .ph {
  width: 100%;
  height: 100%;
  aspect-ratio: auto;
  position: absolute;
  inset: 0;
  border-radius: 0 !important;
}
.split-bleed .split__media .ph img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 !important;
}
.split-bleed .split__media--dual {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.split-bleed .split__media--dual .ph {
  position: relative;
  height: 100%;
}
.split-bleed--rev .split__text { order: 2; }
.split-bleed--rev .split__media { order: 1; }

/* ---------- Homepage Index List ---------- */
.index { border-top: 1px solid var(--line); }
.index a {
  display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr) minmax(6rem, 14rem);
  gap: 0.5rem var(--gutter); align-items: center;
  padding: 1.2rem 0; border-bottom: 1px solid var(--line); text-decoration: none;
  transition: padding 0.45s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.index a:hover { padding-inline: 1rem; }
.index h3 {
  font-family: var(--font-display); font-weight: 700;
  font-size: clamp(1.15rem, 1.6vw, 1.45rem); line-height: 1; letter-spacing: -0.02em;
}
.index p { color: var(--muted); font-family: var(--font-text); letter-spacing: var(--letter-spacing-body); font-size: 0.85rem; }
.index .ph {
  --ar: 16/9; border-radius: 0 !important;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
  transform-origin: right center;
}
.index a:hover .ph { transform: scale(1.04); }

/* ---------- About & Page Head Grid ---------- */
.about__head {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1.5rem var(--gutter);
  margin-bottom: clamp(2.5rem, 5vw, 4.5rem);
}
.about__head .h1-page, .about__head .h2 {
  grid-column: 1 / span 12;
  margin-bottom: clamp(0.75rem, 2vw, 1.5rem);
}
.about__lead { grid-column: 1 / span 5; }
.about__body { grid-column: 7 / span 5; }

/* ---------- Galleria AL VIVO ---------- */
.gallery { margin-top: clamp(3rem, 6vw, 5.5rem); }
.gallery__head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 1.5rem 3rem; margin-bottom: 2rem; }
.gallery__grid--bleed {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  max-width: 100vw;
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 3px;
  background: var(--line);
}
.gallery__grid--bleed .ph {
  border-radius: 0 !important;
  cursor: zoom-in;
}
.g1 { grid-column: span 5; } .g1 .ph { --ar: 4/5; }
.g2 { grid-column: span 7; } .g2 .ph { --ar: 7/5; }
.g3, .g4, .g5 { grid-column: span 4; } .g3 .ph, .g4 .ph, .g5 .ph { --ar: 1/1; }

/* ---------- Fullscreen Lightbox Gallery ---------- */
.gallery-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(20, 15, 10, 0.96);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.35s ease, visibility 0.35s ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 1rem;
}
.gallery-modal.is-open {
  opacity: 1;
  visibility: visible;
}
.gallery-modal__stage {
  position: relative;
  max-width: 90vw;
  max-height: 86vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
}
.gallery-modal__stage img {
  max-width: 88vw;
  max-height: 76vh;
  width: auto;
  height: auto;
  object-fit: contain;
  box-shadow: 0 16px 50px rgba(0,0,0,0.6);
  border-radius: 0 !important;
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.gallery-modal__caption {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  color: rgba(246, 242, 225, 0.7);
  font-family: var(--font-text);
  font-size: 0.85rem;
  letter-spacing: var(--letter-spacing-body);
}
.gallery-modal__counter {
  color: rgba(246, 242, 225, 0.7);
  font-size: 0.85rem;
  white-space: nowrap;
}
.gallery-modal__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(246, 242, 225, 0.12);
  color: #f6f2e1;
  border: 1px solid rgba(246, 242, 225, 0.28);
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background 0.25s, transform 0.25s, color 0.25s;
  z-index: 1010;
  outline: none;
}
.gallery-modal__nav:hover {
  background: #f6f2e1;
  color: #2a1f15;
  transform: translateY(-50%) scale(1.08);
}
.gallery-modal__prev { left: clamp(0.75rem, 2.5vw, 2.5rem); }
.gallery-modal__next { right: clamp(0.75rem, 2.5vw, 2.5rem); }
.gallery-modal__close {
  position: absolute;
  top: clamp(0.75rem, 2.5vw, 2rem);
  right: clamp(0.75rem, 2.5vw, 2rem);
  background: rgba(246, 242, 225, 0.12);
  color: #f6f2e1;
  border: 1px solid rgba(246, 242, 225, 0.28);
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  transition: background 0.25s, color 0.25s;
  z-index: 1020;
  outline: none;
}
.gallery-modal__close:hover {
  background: #f6f2e1;
  color: #2a1f15;
}

/* ---------- Community & Newsletter Box ---------- */
.community {
  margin-top: clamp(3rem, 6vw, 5.5rem);
  padding-top: clamp(2rem, 4vw, 3rem);
  border-top: 1px solid var(--line);
  display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 2rem var(--gutter);
}
.community__text { grid-column: 1 / span 5; }
.community form { grid-column: 7 / span 6; align-self: end; }

/* ---------- Services Tiles ---------- */
.tiles { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: clamp(1.2rem, 2.5vw, 2rem) var(--gutter); }
.tiles li { grid-column: span 4; }
.tiles li:nth-child(1), .tiles li:nth-child(2), .tiles li:nth-child(6), .tiles li:nth-child(7) { grid-column: span 6; }
.tiles a { display: block; text-decoration: none; }
.tiles .ph { --ar: 4/3; border-radius: 0 !important; }
.tiles li:nth-child(1) .ph, .tiles li:nth-child(2) .ph { --ar: 16/10; }
.tiles a:hover .ph img { transform: scale(1.04); }
.tiles .h3 { margin-top: 0.75rem; }

/* ---------- Facilities Sport ---------- */
.facilities { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: var(--gutter); margin-top: clamp(2rem, 4vw, 3.5rem); }
.facilities .ph { --ar: 3/4; border-radius: 0 !important; }
.facilities li:nth-child(even) { margin-top: clamp(1rem, 3.5vw, 2.5rem); }
.facilities .h3 { margin-top: 0.75rem; }

/* ---------- Badge & Specifics ---------- */
.soon {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  width: fit-content;
  max-width: fit-content;
  margin-bottom: 1.2rem;
  padding: 0.35rem 0.95rem;
  border: 1.5px solid var(--ink);
  border-radius: 999px;
  font-family: var(--font-text);
  font-weight: 600;
  font-size: 0.82rem;
  line-height: 1.2;
  letter-spacing: var(--letter-spacing-body);
  color: var(--ink);
}
.contacts-inline { margin-top: 1.5rem; display: grid; gap: 0.35rem; font-family: var(--font-text); font-weight: 500; font-size: 0.88rem; letter-spacing: var(--letter-spacing-body); }
.contacts-inline a { text-underline-offset: 0.2em; }
.facts { margin-top: 1.5rem; border-top: 1px solid var(--line); }
.facts div { display: grid; grid-template-columns: minmax(6rem, 1fr) 2fr; gap: 1rem; padding: 0.75rem 0; border-bottom: 1px solid var(--line); }
.facts dt { font-family: var(--font-text); font-weight: 600; font-size: 0.88rem; line-height: 1.4; letter-spacing: var(--letter-spacing-body); color: var(--ink); }
.facts dd { font-family: var(--font-text); font-size: 0.88rem; letter-spacing: var(--letter-spacing-body); color: var(--ink); }

/* ---------- Form ---------- */
.form { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.2rem 1.4rem; }
.field { display: grid; gap: 0.15rem; }
.field--full { grid-column: 1 / -1; }
.field label { font-family: var(--font-text); font-weight: 600; font-size: 0.85rem; line-height: 1.3; letter-spacing: var(--letter-spacing-body); color: var(--ink); }
.field input:not([type="checkbox"]), .field select, .field textarea {
  width: 100%; background: transparent; color: var(--ink); border: 0; border-bottom: 1.5px solid var(--ink); border-radius: 0;
  padding: 0.55rem 0; font: inherit; font-size: 0.88rem; letter-spacing: var(--letter-spacing-body);
}
.field textarea { min-height: 6rem; resize: vertical; }
.field input::placeholder, .field textarea::placeholder { color: var(--ink); opacity: 0.55; }
.consent { display: flex; gap: 0.65rem; align-items: flex-start; font-size: 0.82rem; line-height: 1.45; letter-spacing: var(--letter-spacing-body); color: var(--ink); }
.consent input { margin-top: 0.2rem; width: 1rem; height: 1rem; accent-color: var(--ink); flex: none; }
.form__status { min-height: 1.4rem; font-family: var(--font-text); font-weight: 600; font-size: 0.88rem; line-height: 1.4; letter-spacing: var(--letter-spacing-body); color: var(--ink); }

/* Contatti & Recapiti */
.contact__grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 2.5rem var(--gutter); }
.contact__info { grid-column: 1 / span 5; }
.contact__form { grid-column: 7 / span 6; }
.recapiti { margin-top: 1.5rem; border-top: 1px solid var(--line); }
.recapiti div { display: grid; grid-template-columns: minmax(5.5rem, 1fr) 2.2fr; gap: 1rem; padding: 0.75rem 0; border-bottom: 1px solid var(--line); }
.recapiti dt { font-family: var(--font-text); font-weight: 600; font-size: 0.88rem; line-height: 1.4; letter-spacing: var(--letter-spacing-body); color: var(--ink); }
.recapiti dd { font-family: var(--font-text); font-size: 0.88rem; letter-spacing: var(--letter-spacing-body); color: var(--ink); }

/* Mappa AL VIVO */
.map-bleed {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  max-width: 100vw;
  height: clamp(340px, 45vh, 480px);
  margin-top: clamp(3rem, 6vw, 5rem);
  border-radius: 0 !important;
  overflow: hidden;
}
.map-bleed iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  filter: grayscale(100%) contrast(105%);
}

/* ---------- Footer ---------- */
.footer {
  background: var(--bg);
  color: var(--ink);
  padding-block: clamp(3rem, 6vw, 5rem);
  font-size: 0.82rem;
  border-top: 1px solid var(--line);
}
.footer p { color: var(--ink); font-size: 0.82rem; }
.footer a { color: inherit; text-decoration: none; transition: opacity 0.2s ease; }
.footer a:hover { opacity: 0.7; }
.footer__grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 2rem var(--gutter); }
.footer__brand { grid-column: 1 / span 5; }
.footer__col { grid-column: span 2; }
.footer__col h2 { font-family: var(--font-text); font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 1rem; }
.footer__col ul { display: grid; gap: 0.5rem; }
.footer__bottom {
  margin-top: clamp(2.5rem, 5vw, 4rem);
  padding-top: 1.5rem;
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
  color: var(--muted);
  font-size: 0.78rem;
}

/* ---------- Responsive ---------- */
@media (max-width: 72rem) {
  .index a { grid-template-columns: 1fr 1fr; }
  .index a > div.ph { display: none; }
  .facilities { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .facilities li:nth-child(even) { margin-top: 0; }
  .tiles li { grid-column: span 6; }
  .tiles li:nth-child(7) { grid-column: 1 / -1; }
  .footer__col { grid-column: span 4; }
  .footer__brand { grid-column: 1 / -1; }
}
@media (max-width: 56rem) {
  .page-hero__lead, .page-hero__more,
  .about__head .h1-page, .about__lead, .about__body,
  .community__text, .community form,
  .contact__info, .contact__form { grid-column: 1 / -1; }
  .g1, .g2 { grid-column: span 12; }
  .g3, .g4, .g5 { grid-column: span 6; }
  .g5 { grid-column: span 12; } .g5 .ph { --ar: 16/9; }
  .index a {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
    gap: 0.75rem var(--gutter);
    align-items: baseline;
    padding: 1.1rem 0;
  }
  .index a > .ph, .index a > div.ph { display: none !important; }
  .index a:hover { padding-inline: 0; }
  .index h3 { font-size: clamp(1.05rem, 1.4vw, 1.25rem); }
  .index p { font-size: 0.85rem; line-height: 1.4; }
  
  .facilities {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 1.25rem 1rem !important;
  }
  .facilities li, .facilities li:nth-child(even) { margin-top: 0 !important; }
  
  .split-bleed { grid-template-columns: 1fr; min-height: auto; }
  .split-bleed .split__media { height: 360px; min-height: 300px; order: 0 !important; }
  .split-bleed .split__text { order: 1 !important; padding: 2.5rem var(--gutter); }
}
@media (max-width: 36rem) {
  .form { grid-template-columns: 1fr; }
  .index a {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr);
    gap: 0.6rem 0.85rem;
    align-items: baseline;
    padding: 1rem 0;
  }
  .index a > .ph, .index a > div.ph { display: none !important; }
  .index h3 { font-size: 1.05rem; }
  .index p { font-size: 0.82rem; line-height: 1.35; }
  
  .facilities {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 1.25rem 0.85rem !important;
  }
  .facilities li, .facilities li:nth-child(even) { margin-top: 0 !important; }
  
  .footer__col { grid-column: 1 / -1; }
  .menu-btn__label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .tiles li, .tiles li:nth-child(n) { grid-column: 1 / -1; }
  .header__right { gap: 0.4rem; }
  .book { padding-inline: 0.8rem; min-height: 2.2rem; font-size: 0.78rem; }
  .lang-switch { font-size: 0.76rem; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
}
`;

fs.writeFileSync(path.join(ROOT, 'style.css'), cssContent, 'utf8');
console.log('style.css updated.');

// 2. Shared JavaScript (main.js)
const jsContent = `(function(){
  var translations = {
    it: {
      page_title: "Tursport Hotel Residence | Capo San Vito, Taranto",
      menu_btn: "Menu",
      menu_close: "Chiudi \\u2715",
      book_btn: "Book",
      nav_home: "Home",
      nav_about: "About Us",
      nav_services: "Services",
      nav_rooms: "Rooms / Apartments",
      nav_sport: "Sport",
      nav_pool: "Pool Club",
      nav_palazzetto: "Eventi palazzetto",
      nav_corporate: "Eventi aziendali",
      nav_convention: "Convention",
      nav_coworking: "Co-work Spaces",
      nav_newsletter: "Newsletter",
      nav_contact: "Contact Us",
      
      hero_title_1: "Tursport",
      hero_title_2: "Hotel Residence",
      hero_lead: "A Capo San Vito, tra il verde di Taranto, Tursport Hotel Residence è una struttura a quattro stelle a circa 600 metri dal mare e 7 km dal centro città.",
      hero_p1: "Interpreta una nuova idea di ospitalità che riunisce soggiorni, attività sportive, business ed eventi in un'unica realtà.",
      hero_p2: "Una storia che continua a evolversi, mantenendo al centro il piacere dell'accoglienza e la possibilità di vivere il Tursport in modi diversi.",
      
      idx_rooms_title: "Camere & Appartamenti",
      idx_rooms_desc: "Il piacere di sentirsi nel posto giusto.",
      idx_sport_title: "Sport",
      idx_sport_desc: "Lo spazio per mettersi in gioco.",
      idx_pool_title: "Pool Club",
      idx_pool_desc: "Il piacere di una pausa a bordo piscina.",
      idx_events_title: "Eventi",
      idx_events_desc: "Incontrarsi e condividere nuove idee.",
      idx_cowork_title: "Co-working",
      idx_cowork_desc: "Un luogo in cui dare spazio al lavoro.",
      
      about_h2: "Dal 1980, un punto d’incontro.",
      about_lead: "Ci sono luoghi che nascono per accogliere. Altri, con il tempo, entrano a far parte della storia di una città.",
      about_p1: "Tursport nasce nel 1980 a San Vito, alle porte di Taranto, con una vocazione che va oltre l’ospitalità. Negli anni ha accolto personalità di spicco del panorama italiano e internazionale, diventando un punto di riferimento per lo sport, la cultura e la vita del territorio.",
      about_p2: "Una storia costruita attraverso le persone, le passioni e le occasioni di condivisione.",
      about_p3: "Oggi Tursport continua a evolversi, in Un luogo che accoglie storie diverse e ne scrive di nuove.",
      
      gallery_h2: "Gli spazi, da vicino.",
      gallery_desc: "Scopri gli ambienti e i luoghi che compongono il mondo Tursport.",
      gallery_btn: "Esplora la galleria",
      
      comm_h2: "Resta in contatto con Tursport.",
      comm_desc: "Novità, eventi e nuove occasioni da vivere. Lascia il tuo indirizzo email per ricevere gli aggiornamenti.",
      comm_label: "La tua email",
      comm_ph: "nome@esempio.it",
      comm_consent: "Ho letto l'<a href='contatti.html'>informativa privacy</a> e acconsento al trattamento dei dati per ricevere aggiornamenti.",
      comm_btn: "Entra nella community",
      
      srv_h2: "Tutto ciò che rende unico il tuo soggiorno.",
      srv_lead: "Ospitalità, sport, business ed eventi si incontrano in una visione contemporanea dell’accoglienza.",
      srv_p1: "Al Tursport Hotel Residence, camere e appartamenti si affiancano a spazi dedicati al benessere, allo sport, al lavoro e agli incontri, per adattarsi a esigenze e ritmi diversi.",
      srv_p2: "Scopri tutto ciò che Tursport ha da offrire.",
      
      srv_rooms: "Camere & Appartamenti",
      srv_sport: "Sport",
      srv_pool: "Pool Club",
      srv_palazzetto: "Eventi palazzetto",
      srv_corporate: "Eventi aziendali",
      srv_convention: "Convention",
      srv_coworking: "Co-work Spaces",
      
      rooms_h2: "Il tuo spazio, il tuo soggiorno.",
      rooms_p1: "Al Tursport, l’ospitalità prende forma in camere e appartamenti indipendenti, distribuiti all’interno del residence. Sono ambienti pensati per soggiorni di piacere e viaggi di lavoro, con attenzione al comfort e alla libertà di vivere il proprio tempo.",
      rooms_p2: "Gli appartamenti portano il nome delle piante presenti nella struttura, un dettaglio che ne riflette il legame con il paesaggio circostante.",
      rooms_p3: "Scopri le sistemazioni e trova il tuo spazio al Tursport.",
      rooms_btn_discover: "Scopri le sistemazioni",
      rooms_btn_book: "Prenota il tuo soggiorno",
      
      sport_h2: "Lo sport fa parte della nostra storia.",
      sport_lead: "La vocazione sportiva è una parte importante dell'identità Tursport.",
      sport_p1: "Campi da tennis, superfici per il beach tennis e beach volley, palazzetto per il basket, piscina per il nuoto: ogni impianto è un’occasione per coltivare la propria passione e trovare il proprio modo di mettersi in gioco.",
      fac_tennis: "Campi da tennis",
      fac_beachtennis: "Beach tennis",
      fac_beachvolley: "Beach volley",
      fac_basket: "Palazzetto per il basket",
      sport_p2: "Scopri gli impianti e trova lo spazio per il tuo prossimo match.",
      sport_btn: "Scopri gli impianti",
      
      pool_badge: "coming soon",
      pool_h2: "La tua estate, a bordo piscina.",
      pool_desc: "Un'oasi di serenità e relax a Capo San Vito: l'ampia piscina olimpionica immersa nel verde con solarium attrezzato, zona lounge e drink a bordo vasca.",
      pool_cta: "Rimani aggiornato",
      
      events_arena_h2: "Porta la tua squadra, o la tua idea.",
      events_arena_p1: "Il palazzetto del Tursport è uno spazio dedicato allo sport e alle attività che prendono forma intorno ad esso. Pensato anche per il basket, può essere riservato per allenamenti, iniziative sportive ed eventi.",
      events_arena_p2: "Raccontaci cosa hai in mente: valuteremo insieme disponibilità e modalità di utilizzo.",
      events_arena_btn: "Richiedi un preventivo",
      
      events_corp_h2: "Le idee prendono spazio.",
      events_corp_p1: "Ogni incontro è un’occasione per condividere visioni e sviluppare nuove idee. Tursport offre spazi dedicati a riunioni, meeting aziendali e momenti di lavoro in team, con la possibilità di integrare servizi di ristorazione e coffee break.",
      events_corp_p2: "Ambienti e servizi possono essere organizzati in base alle caratteristiche dell’incontro, per dare forma a un’esperienza di lavoro funzionale e curata.",
      events_corp_btn: "Organizza il tuo evento",
      
      events_conv_h2_1: "Incontrarsi.",
      events_conv_h2_2: "Condividere.",
      events_conv_h2_3: "Costruire nuove prospettive.",
      events_conv_p1: "Per convention, incontri aziendali e appuntamenti professionali, Tursport offre la possibilità di combinare gli spazi dedicati agli eventi con le soluzioni di soggiorno della struttura.",
      events_conv_p2: "Una formula che permette di riunire in un unico luogo momenti di lavoro, ospitalità e servizi complementari, semplificando l'organizzazione dell'incontro.",
      events_conv_side: "Contattaci per costruire una proposta in linea con il tuo evento.",
      events_conv_btn: "Progetta la tua convention",
      
      cw_h2: "Cambia spazio. Mantieni il tuo ritmo.",
      cw_p1: "Al Tursport puoi dedicarti al lavoro in uno spazio pensato per studiare, concentrarti e portare avanti i tuoi progetti, anche fuori dal tuo ambiente abituale.",
      cw_p2: "Le postazioni di co-working sono gratuite e prenotabili entro il giorno precedente. Durante la giornata puoi inoltre usufruire del bar, secondo gli orari del servizio.",
      cw_p3: "Un'alternativa pratica per lavorare in un ambiente diverso, con la libertà di organizzare il tuo tempo.",
      cw_fact1_dt: "Postazioni",
      cw_fact1_dd: "Gratuite",
      cw_fact2_dt: "Prenotazione",
      cw_fact2_dd: "Entro il giorno precedente",
      cw_fact3_dt: "Bar",
      cw_fact3_dd: "Secondo gli orari del servizio",
      cw_btn: "Prenota una postazione",
      
      nl_h2: "Le novità del mondo Tursport.",
      nl_p1: "Nuovi appuntamenti, iniziative ed esperienze da scoprire. La newsletter Tursport ti aggiorna su ciò che accade nella struttura e sulle prossime occasioni da vivere.",
      nl_p2: "Lascia il tuo indirizzo email per restare in contatto con noi.",
      nl_label: "Inserisci la tua email",
      nl_ph: "Inserisci la tua email",
      nl_consent: "Ho letto l'<a href='contatti.html'>informativa privacy</a> e acconsento al trattamento dei dati per l'iscrizione alla newsletter.",
      nl_btn: "Iscriviti alla newsletter",
      
      contact_h2: "Il tuo soggiorno comincia da qui.",
      contact_p1: "Che tu stia organizzando una vacanza o un viaggio di lavoro, Tursport è pronto ad accoglierti. Siamo a disposizione per accompagnarti nella scelta della sistemazione e offrirti tutte le informazioni necessarie per vivere al meglio il tuo soggiorno.",
      contact_p2: "Per richieste e prenotazioni, contattaci. Ti aspettiamo al Tursport.",
      contact_addr_dt: "Indirizzo",
      contact_tel_dt: "Telefono",
      contact_wa_dt: "WhatsApp",
      contact_email_dt: "Email",
      contact_ig_dt: "Instagram",
      contact_ig_dd: "Profilo ufficiale",
      
      form_name_label: "Nome",
      form_email_label: "Email",
      form_tel_label: "Telefono (facoltativo)",
      form_reason_label: "Motivo della richiesta",
      form_reason_select: "Seleziona",
      form_reason_opt1: "Camere e appartamenti",
      form_reason_opt2: "Sport e impianti",
      form_reason_opt3: "Eventi palazzetto",
      form_reason_opt4: "Eventi aziendali",
      form_reason_opt5: "Convention",
      form_reason_opt6: "Co-working",
      form_reason_opt7: "Altro",
      form_msg_label: "Messaggio",
      form_consent: "Ho letto l'<a href='#'>informativa privacy</a> e acconsento al trattamento dei dati per rispondere alla mia richiesta.",
      form_submit: "Invia la richiesta",
      form_success: "Grazie, abbiamo ricevuto i tuoi dati.",
      
      footer_desc: "Hotel Residence a Capo San Vito, Taranto.",
      footer_col_contact: "Contatti",
      footer_col_follow: "Seguici",
      footer_col_info: "Informazioni",
      footer_privacy: "Privacy policy",
      footer_cookie: "Cookie policy",
      footer_copy: "\\u00a9 2026 Tursport Hotel Residence. Tutti i diritti riservati.",
      footer_location: "Capo San Vito \\u00b7 Taranto \\u00b7 Puglia"
    },
    en: {
      page_title: "Tursport Hotel Residence | Capo San Vito, Taranto",
      menu_btn: "Menu",
      menu_close: "Close \\u2715",
      book_btn: "Book",
      nav_home: "Home",
      nav_about: "About Us",
      nav_services: "Services",
      nav_rooms: "Rooms / Apartments",
      nav_sport: "Sport",
      nav_pool: "Pool Club",
      nav_palazzetto: "Sports Events",
      nav_corporate: "Corporate Events",
      nav_convention: "Convention",
      nav_coworking: "Co-work Spaces",
      nav_newsletter: "Newsletter",
      nav_contact: "Contact Us",
      
      hero_title_1: "Tursport",
      hero_title_2: "Hotel Residence",
      hero_lead: "In Capo San Vito, surrounded by the green of Taranto, Tursport Hotel Residence is a four-star venue just 600 meters from the sea and 7 km from the city center.",
      hero_p1: "It embodies a fresh concept of hospitality combining accommodation, sports facilities, business and events in a single destination.",
      hero_p2: "A heritage that continuously evolves, cherishing authentic welcome and offering diverse ways to experience Tursport.",
      
      idx_rooms_title: "Rooms & Apartments",
      idx_rooms_desc: "The pleasure of feeling in the right place.",
      idx_sport_title: "Sport",
      idx_sport_desc: "Space to play, compete and recharge.",
      idx_pool_title: "Pool Club",
      idx_pool_desc: "The joy of relaxing poolside.",
      idx_events_title: "Events",
      idx_events_desc: "Spaces to connect and share new ideas.",
      idx_cowork_title: "Co-working",
      idx_cowork_desc: "A dedicated environment for focused work.",
      
      about_h2: "Since 1980, a gathering point.",
      about_lead: "Some places are born to welcome. Others gradually become woven into the story of a city.",
      about_p1: "Tursport was established in 1980 in San Vito, near Taranto, with an ambition transcending mere hospitality. Over four decades, it has welcomed distinguished Italian and international guests, standing as a benchmark for regional sport, culture and social life.",
      about_p2: "A history shaped by people, shared passions, and memorable occasions.",
      about_p3: "Today, Tursport continues to evolve as a living venue that embraces multifaceted stories and fosters new ones.",
      
      gallery_h2: "Our spaces, up close.",
      gallery_desc: "Explore the settings and atmospheres that define the Tursport experience.",
      gallery_btn: "Explore gallery",
      
      comm_h2: "Stay connected with Tursport.",
      comm_desc: "News, upcoming events, and fresh experiences. Leave your email address to receive curated updates.",
      comm_label: "Your email",
      comm_ph: "name@example.com",
      comm_consent: "I have read the <a href='contatti.html'>privacy policy</a> and consent to data processing for updates.",
      comm_btn: "Join the community",
      
      srv_h2: "Everything that makes your stay unique.",
      srv_lead: "Hospitality, sport, business and gatherings meet in a contemporary vision of hospitality.",
      srv_p1: "At Tursport Hotel Residence, rooms and apartments sit alongside spaces dedicated to well-being, active sports, focused work and conferences. A versatile offering answering varied rhythms and aspirations.",
      srv_p2: "Discover everything Tursport has in store for you.",
      
      srv_rooms: "Rooms & Apartments",
      srv_sport: "Sport",
      srv_pool: "Pool Club",
      srv_palazzetto: "Arena Events",
      srv_corporate: "Corporate Events",
      srv_convention: "Conventions",
      srv_coworking: "Co-work Spaces",
      
      rooms_h2: "Your space, your stay.",
      rooms_p1: "At Tursport, hospitality takes shape in private rooms and independent apartments spread throughout the residence. Designed for leisure retreats and business travels alike, prioritizing comfort and freedom.",
      rooms_p2: "Each apartment bears the name of plants found across the resort grounds, celebrating our close connection with Mediterranean nature.",
      rooms_p3: "Explore our accommodations and discover your space at Tursport.",
      rooms_btn_discover: "Explore accommodations",
      rooms_btn_book: "Book your stay",
      
      sport_h2: "Sport is part of our heritage.",
      sport_lead: "An active sports vocation lies at the core of Tursport's identity.",
      sport_p1: "At Tursport, sport is an integral lifestyle. From tennis clay courts to beach tennis and beach volley sand grounds, to the indoor basketball arena, every facility invites you to pursue your passions and challenge yourself.",
      fac_tennis: "Tennis courts",
      fac_beachtennis: "Beach tennis",
      fac_beachvolley: "Beach volley",
      fac_basket: "Basketball arena",
      sport_p2: "Explore our courts and book your next match.",
      sport_btn: "Discover facilities",
      
      pool_badge: "coming soon",
      pool_h2: "Your summer, poolside.",
      pool_desc: "An oasis of tranquility and relaxation in Capo San Vito: the large Olympic-size pool immersed in lush greenery, featuring an equipped solarium, lounge area and poolside drinks.",
      pool_cta: "Stay updated",
      
      events_arena_h2: "The space for your game.",
      events_arena_p1: "The Tursport arena is dedicated to sport and dynamic team activities. Equipped for basketball, it can be reserved for training sessions, tournaments and private events, with full-day rental options available.",
      events_arena_p2: "Share your project with us: we will review schedules and tailored solutions together.",
      events_arena_btn: "Request a quote",
      
      events_corp_h2: "Ideas find their space.",
      events_corp_p1: "Every meeting is an opportunity to exchange perspectives and develop new visions. Tursport offers modular rooms for executive boards, corporate workshops, and team gatherings, enriched with catering and coffee breaks.",
      events_corp_p2: "Spaces and amenities can be organized around your specific requirements, delivering a seamless professional experience.",
      events_corp_btn: "Plan your event",
      
      events_conv_h2_1: "Gather.",
      events_conv_h2_2: "Share.",
      events_conv_h2_3: "Build new perspectives.",
      events_conv_p1: "For conventions, company summits and professional assemblies, Tursport combines comprehensive meeting halls with on-site accommodation packages.",
      events_conv_p2: "A convenient formula bringing business sessions, hospitality and leisure under one roof, streamlining your event coordination.",
      events_conv_side: "Contact us to formulate a proposal tailored to your convention.",
      events_conv_btn: "Design your convention",
      
      cw_h2: "Change scenery. Keep your pace.",
      cw_p1: "At Tursport, immerse yourself in work within a bright setting tailored for studying, deep focus, and project development beyond your usual routine.",
      cw_p2: "Co-working desks are complimentary with reservations made at least one day in advance. Access our bar services throughout the day during operating hours.",
      cw_p3: "A practical alternative to work in an inspiring atmosphere, with total autonomy over your schedule.",
      cw_fact1_dt: "Workstations",
      cw_fact1_dd: "Complimentary",
      cw_fact2_dt: "Booking",
      cw_fact2_dd: "By prior day",
      cw_fact3_dt: "Bar service",
      cw_fact3_dd: "During operating hours",
      cw_btn: "Reserve a desk",
      
      nl_h2: "Updates from the Tursport world.",
      nl_p1: "New dates, seasonal initiatives, and experiences to look forward to. The Tursport newsletter keeps you informed on resort happenings.",
      nl_p2: "Enter your email address to remain connected.",
      nl_label: "Enter your email",
      nl_ph: "Enter your email",
      nl_consent: "I have read the <a href='contatti.html'>privacy policy</a> and consent to data processing for the newsletter.",
      nl_btn: "Subscribe to newsletter",
      
      contact_h2: "Your stay starts right here.",
      contact_p1: "Whether organizing a relaxing holiday or a corporate trip, Tursport is delighted to welcome you. Our team is at your disposal to assist in selecting accommodations and provide details for your stay.",
      contact_p2: "For bookings and inquiries, reach out below. We look forward to seeing you.",
      contact_addr_dt: "Address",
      contact_tel_dt: "Phone",
      contact_wa_dt: "WhatsApp",
      contact_email_dt: "Email",
      contact_ig_dt: "Instagram",
      contact_ig_dd: "Official profile",
      
      form_name_label: "Full Name",
      form_email_label: "Email Address",
      form_tel_label: "Phone (optional)",
      form_reason_label: "Inquiry Reason",
      form_reason_select: "Please select",
      form_reason_opt1: "Rooms & Apartments",
      form_reason_opt2: "Sport & Facilities",
      form_reason_opt3: "Arena / Palazzetto",
      form_reason_opt4: "Corporate Events",
      form_reason_opt5: "Conventions",
      form_reason_opt6: "Co-working",
      form_reason_opt7: "Other",
      form_msg_label: "Message",
      form_consent: "I have read the <a href='#'>privacy policy</a> and consent to data processing to handle my inquiry.",
      form_submit: "Send inquiry",
      form_success: "Thank you! Your inquiry has been received.",
      
      footer_desc: "Hotel Residence in Capo San Vito, Taranto.",
      footer_col_contact: "Contact",
      footer_col_follow: "Follow Us",
      footer_col_info: "Information",
      footer_privacy: "Privacy policy",
      footer_cookie: "Cookie policy",
      footer_copy: "\\u00a9 2026 Tursport Hotel Residence. All rights reserved.",
      footer_location: "Capo San Vito \\u00b7 Taranto \\u00b7 Apulia, Italy"
    }
  };

  var currentLang = 'it';

  function applyLanguage(lang){
    if(!translations[lang]) return;
    currentLang = lang;
    document.documentElement.setAttribute('lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(function(el){
      var key = el.getAttribute('data-i18n');
      if(translations[lang][key] !== undefined){
        if(key.indexOf('consent') !== -1 || key.indexOf('title_') !== -1){
          el.innerHTML = translations[lang][key];
        } else {
          el.textContent = translations[lang][key];
        }
      }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      var key = el.getAttribute('data-i18n-ph');
      if(translations[lang][key] !== undefined){
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    document.querySelectorAll('.lang-btn').forEach(function(b){
      var isActive = (b.getAttribute('data-lang') === lang);
      b.classList.toggle('is-active', isActive);
      b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    try { localStorage.setItem('tursport_lang', lang); } catch(e){}
    
    // Update active modal slide caption if open
    if(typeof updateGallerySlideCaption === 'function'){
      updateGallerySlideCaption();
    }
  }

  document.querySelectorAll('.lang-btn').forEach(function(btn){
    btn.addEventListener('click', function(){
      var l = this.getAttribute('data-lang');
      applyLanguage(l);
    });
  });

  try {
    var saved = localStorage.getItem('tursport_lang');
    if(saved && translations[saved]){
      applyLanguage(saved);
    }
  } catch(e) {}

  /* ---------- Scroll Reveal (Slide Up) ---------- */
  if('IntersectionObserver' in window){
    var revealObserver = new IntersectionObserver(function(entries, observer){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },{
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.05
    });

    document.querySelectorAll('.reveal').forEach(function(el){
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function(el){
      el.classList.add('is-revealed');
    });
  }

  /* ---------- Drawer Menu ---------- */
  var drawer = document.getElementById('drawer');
  var scrim = document.getElementById('scrim');
  var openBtn = document.getElementById('menuBtn');
  var closeBtn = document.getElementById('menuClose');

  function setMenu(open){
    if(!drawer || !scrim) return;
    drawer.classList.toggle('is-open', open);
    scrim.classList.toggle('is-open', open);
    if(openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if(open && closeBtn){ closeBtn.focus(); } else if(openBtn){ openBtn.focus({preventScroll:true}); }
  }
  if(openBtn) openBtn.addEventListener('click', function(){ setMenu(true); });
  if(closeBtn) closeBtn.addEventListener('click', function(){ setMenu(false); });
  if(scrim) scrim.addEventListener('click', function(){ setMenu(false); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && drawer && drawer.classList.contains('is-open')){ setMenu(false); }
  });

  /* Highlight active page in drawer nav */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  if(drawer){
    drawer.querySelectorAll('nav a').forEach(function(a){
      var href = a.getAttribute('href');
      if(href === currentPath || (currentPath === '' && href === 'index.html')){
        a.setAttribute('aria-current', 'page');
        a.classList.add('is-active');
        var parentSub = a.closest('.drawer__sub');
        if(parentSub){
          var parentLi = parentSub.closest('li');
          if(parentLi){
            var parentA = parentLi.querySelector(':scope > a');
            if(parentA){
              parentA.classList.add('is-parent-active');
            }
          }
        }
      }
    });
  }

  /* URL query parameter pre-selection for contact form */
  var urlParams = new URLSearchParams(window.location.search);
  var motivoParam = urlParams.get('motivo');
  var motivoSelect = document.getElementById('c-motivo');
  if(motivoSelect && motivoParam){
    for(var i = 0; i < motivoSelect.options.length; i++){
      if(motivoSelect.options[i].value.toLowerCase() === motivoParam.toLowerCase()){
        motivoSelect.selectedIndex = i;
        break;
      }
    }
  }

  /* Form Submission feedback */
  document.querySelectorAll('form[data-form]').forEach(function(f){
    f.addEventListener('submit', function(e){
      e.preventDefault();
      var s = f.querySelector('.form__status');
      if(s){ s.textContent = translations[currentLang].form_success; }
      f.reset();
    });
  });

  /* ---------- Fullscreen Lightbox Gallery Controller ---------- */
  var galleryImages = [
    { src: "sito/sito/DSCF1194.webp" },
    { src: "sito/sito/foto1.webp" },
    { src: "sito/sito/DSCF0705.webp" },
    { src: "sito/sito/DSCF1403.webp" },
    { src: "sito/sito/DSCF1011.webp" }
  ];

  var currentGalleryIdx = 0;
  var modal = document.getElementById('galleryModal');
  var modalImg = document.getElementById('galleryModalImg');
  var modalCounter = document.getElementById('galleryModalCounter');
  var modalPrev = document.getElementById('galleryPrev');
  var modalNext = document.getElementById('galleryNext');
  var modalClose = document.getElementById('galleryClose');

  function updateGallerySlideCaption(){
    if(!modal) return;
    if(modalCounter){
      modalCounter.textContent = (currentGalleryIdx + 1) + ' / ' + galleryImages.length;
    }
  }

  function updateGallerySlide(idx){
    if(!modal) return;
    currentGalleryIdx = (idx + galleryImages.length) % galleryImages.length;
    var item = galleryImages[currentGalleryIdx];
    if(modalImg){
      modalImg.style.opacity = '0';
      modalImg.style.transform = 'scale(0.97)';
      setTimeout(function(){
        modalImg.src = item.src;
        modalImg.alt = "Tursport Gallery";
        modalImg.style.opacity = '1';
        modalImg.style.transform = 'scale(1)';
      }, 120);
    }
    updateGallerySlideCaption();
  }

  function openGallery(idx){
    if(!modal) return;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    updateGallerySlide(idx || 0);
  }

  function closeGallery(){
    if(!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  var triggerBtn = document.getElementById('openGalleryBtn');
  if(triggerBtn){
    triggerBtn.addEventListener('click', function(e){
      e.preventDefault();
      openGallery(0);
    });
  }

  document.querySelectorAll('[data-gallery-idx]').forEach(function(el){
    el.addEventListener('click', function(){
      var idx = parseInt(this.getAttribute('data-gallery-idx'), 10);
      openGallery(isNaN(idx) ? 0 : idx);
    });
  });

  if(modalClose){ modalClose.addEventListener('click', closeGallery); }
  if(modalPrev){ modalPrev.addEventListener('click', function(){ updateGallerySlide(currentGalleryIdx - 1); }); }
  if(modalNext){ modalNext.addEventListener('click', function(){ updateGallerySlide(currentGalleryIdx + 1); }); }
  if(modal){
    modal.addEventListener('click', function(e){
      if(e.target === modal){ closeGallery(); }
    });
  }
  document.addEventListener('keydown', function(e){
    if(modal && modal.classList.contains('is-open')){
      if(e.key === 'Escape'){ closeGallery(); }
      else if(e.key === 'ArrowLeft'){ updateGallerySlide(currentGalleryIdx - 1); }
      else if(e.key === 'ArrowRight'){ updateGallerySlide(currentGalleryIdx + 1); }
    }
  });
})();
`;

fs.writeFileSync(path.join(ROOT, 'main.js'), jsContent, 'utf8');
console.log('main.js updated with lightbox.');

// 3. Shared Header & Drawer HTML components
function getHeader(activePage) {
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
      <li><a href="index.html" ${activePage === 'home' ? 'aria-current="page" class="is-active"' : ''} data-i18n="nav_home">Home</a></li>
      <li><a href="about.html" ${activePage === 'about' ? 'aria-current="page" class="is-active"' : ''} data-i18n="nav_about">About Us</a></li>
      <li class="drawer__item--has-sub">
        <a href="services.html" ${activePage === 'services' ? 'aria-current="page" class="is-active"' : (['rooms','sport','pool','palazzetto','corporate'].includes(activePage) ? 'class="is-parent-active"' : '')} data-i18n="nav_services">Services</a>
        <ul class="drawer__sub">
          <li><a href="rooms.html" ${activePage === 'rooms' ? 'aria-current="page" class="is-active"' : ''} data-i18n="nav_rooms">Rooms / Apartments</a></li>
          <li><a href="sport.html" ${activePage === 'sport' ? 'aria-current="page" class="is-active"' : ''} data-i18n="nav_sport">Sport</a></li>
          <li><a href="pool.html" ${activePage === 'pool' ? 'aria-current="page" class="is-active"' : ''} data-i18n="nav_pool">Pool Club</a></li>
          <li><a href="palazzetto.html" ${activePage === 'palazzetto' ? 'aria-current="page" class="is-active"' : ''} data-i18n="nav_palazzetto">Eventi palazzetto</a></li>
          <li><a href="corporate.html" ${activePage === 'corporate' ? 'aria-current="page" class="is-active"' : ''} data-i18n="nav_corporate">Eventi aziendali</a></li>
        </ul>
      </li>
      <li><a href="newsletter.html" ${activePage === 'newsletter' ? 'aria-current="page" class="is-active"' : ''} data-i18n="nav_newsletter">Newsletter</a></li>
      <li><a href="contatti.html" ${activePage === 'contatti' ? 'aria-current="page" class="is-active"' : ''} data-i18n="nav_contact">Contact Us</a></li>
    </ul>
  </nav>
</aside>`;
}

// 4. Shared Footer HTML component
function getFooter() {
  return `<!-- ================= FOOTER ================= -->
<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div class="footer__brand">
        <a class="logo" href="index.html" aria-label="Tursport, Home">TURSPORT</a>
        <p style="margin-top:.85rem" data-i18n="footer_desc">Hotel Residence a Capo San Vito, Taranto.</p>
      </div>
      <div class="footer__col">
        <h2 data-i18n="footer_col_contact">Contatti</h2>
        <ul>
          <li>Via del Faro, 58<br>74122 San Vito – Taranto</li>
          <li><a href="tel:+390997330111">+39 099 733 0111</a></li>
          <li><a href="mailto:booking@tursport.it">booking@tursport.it</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h2 data-i18n="footer_col_follow">Seguici</h2>
        <ul>
          <li><a href="https://www.instagram.com/tursport.hotel/" target="_blank" rel="noopener">Instagram</a></li>
          <li><a href="https://wa.me/393926283171">WhatsApp</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h2 data-i18n="footer_col_info">Informazioni</h2>
        <ul>
          <li><a href="contatti.html" data-i18n="footer_privacy">Privacy policy</a></li>
          <li><a href="contatti.html" data-i18n="footer_cookie">Cookie policy</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <span data-i18n="footer_copy">&copy; 2026 Tursport Hotel Residence. Tutti i diritti riservati.</span>
      <span data-i18n="footer_location">Capo San Vito &middot; Taranto &middot; Puglia</span>
    </div>
  </div>
</footer>
<script src="main.js"></script>`;
}

// Helper page wrapper
function createPage(title, desc, activePage, mainContent) {
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎾</text></svg>">
<link rel="stylesheet" href="style.css">
</head>
<body>
${getHeader(activePage)}
<main id="main">
${mainContent}
</main>
${getFooter()}
</body>
</html>`;
}

// -------------------------------------------------------------
// PAGE 1: HOME (index.html)
// Title in normal capitalization (NOT all caps)
// -------------------------------------------------------------
const homeContent = `
<section class="page-hero">
  <div class="wrap">
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

  <div class="bleed-media reveal reveal-delay-2">
    <div class="ph">
      <img src="sito/sito/DSCF1550.webp" alt="Tursport Hotel Residence - Capo San Vito, Taranto" loading="eager">
    </div>
  </div>
</section>

<section class="sec" style="padding-top:0" aria-label="Sezioni della homepage">
  <div class="wrap">
    <ul class="index">
      <li class="reveal">
        <a href="rooms.html">
          <h3 data-i18n="idx_rooms_title">Rooms &amp; Apartments</h3>
          <p data-i18n="idx_rooms_desc">Il piacere di sentirsi nel posto giusto.</p>
          <div class="ph"><img src="sito/sito/foto2.webp" alt="Rooms &amp; Apartments" loading="lazy"></div>
        </a>
      </li>
      <li class="reveal reveal-delay-1">
        <a href="sport.html">
          <h3 data-i18n="idx_sport_title">Sport</h3>
          <p data-i18n="idx_sport_desc">Lo spazio per mettersi in gioco.</p>
          <div class="ph"><img src="sito/sito/DSCF1240.webp" alt="Sport" loading="lazy"></div>
        </a>
      </li>
      <li class="reveal reveal-delay-2">
        <a href="pool.html">
          <h3 data-i18n="idx_pool_title">Pool Club</h3>
          <p data-i18n="idx_pool_desc">Il piacere di una pausa a bordo piscina.</p>
          <div class="ph"><img src="sito/sito/DSCF1194.webp" alt="Pool Club" loading="lazy"></div>
        </a>
      </li>
      <li class="reveal reveal-delay-3">
        <a href="palazzetto.html">
          <h3 data-i18n="idx_events_title">Events</h3>
          <p data-i18n="idx_events_desc">Spazi per incontrarsi e condividere nuove idee.</p>
          <div class="ph"><img src="sito/sito/DSCF0744.webp" alt="Events" loading="lazy"></div>
        </a>
      </li>
      <li class="reveal reveal-delay-4">
        <a href="coworking.html">
          <h3 data-i18n="idx_cowork_title">Co-working</h3>
          <p data-i18n="idx_cowork_desc">Un luogo in cui dare spazio al lavoro.</p>
          <div class="ph"><img src="sito/sito/DSCF0954.webp" alt="Co-working" loading="lazy"></div>
        </a>
      </li>
    </ul>
  </div>
</section>
`;
fs.writeFileSync(path.join(ROOT, 'index.html'), createPage(
  "Tursport Hotel Residence | Capo San Vito, Taranto",
  "Tursport Hotel Residence, struttura a quattro stelle a Capo San Vito, Taranto: soggiorni, sport, business ed eventi in un'unica realtà.",
  "home",
  homeContent
), 'utf8');
fs.writeFileSync(path.join(ROOT, 'Tursport Hotel Residence.html'), createPage(
  "Tursport Hotel Residence | Capo San Vito, Taranto",
  "Tursport Hotel Residence, struttura a quattro stelle a Capo San Vito, Taranto: soggiorni, sport, business ed eventi in un'unica realtà.",
  "home",
  homeContent
), 'utf8');
console.log('index.html updated (lowercase title).');

// -------------------------------------------------------------
// PAGE 2: ABOUT US (about.html)
// Fullscreen navigable lightbox gallery added!
// -------------------------------------------------------------
const aboutContent = `
<section class="sec" style="padding-top:calc(var(--head-h) + 1.5rem)">
  <div class="wrap">
    <div class="about__head reveal">
      <h1 class="h1-page" data-i18n="about_h2">Dal 1980, un punto d’incontro.</h1>
      <p class="lead about__lead" data-i18n="about_lead">Ci sono luoghi che nascono per accogliere. E altri che, nel tempo, diventano parte della storia di una città.</p>
      <div class="about__body">
        <p data-i18n="about_p1">Tursport nasce nel 1980 a San Vito, alle porte di Taranto, con una vocazione che va oltre l’ospitalità. Nel corso degli anni, ha accolto personalità di spicco del panorama italiano e internazionale, diventando un punto di riferimento per lo sport, la cultura e la vita del territorio.</p>
        <p data-i18n="about_p2">Una storia costruita attraverso le persone, le passioni e le occasioni di condivisione.</p>
        <p data-i18n="about_p3">Oggi Tursport continua a evolversi, in Un luogo che accoglie storie diverse e continua a crearne di nuove.</p>
      </div>
    </div>

    <!-- Sezione Gallery -->
    <div class="gallery" id="gallery">
      <div class="gallery__head reveal">
        <div>
          <h2 class="h2" style="margin-bottom:.8rem" data-i18n="gallery_h2">Gli spazi, da vicino.</h2>
          <p data-i18n="gallery_desc">Scopri gli ambienti e i luoghi che compongono il mondo Tursport.</p>
        </div>
        <button type="button" class="btn" id="openGalleryBtn" data-i18n="gallery_btn">Esplora la gallery</button>
      </div>
      
      <!-- Galleria Fotografica AL VIVO con trigger Lightbox -->
      <div class="gallery__grid--bleed reveal reveal-delay-1">
        <div class="g1"><div class="ph" data-gallery-idx="0"><img src="sito/sito/DSCF1194.webp" alt="Tursport" loading="lazy"></div></div>
        <div class="g2"><div class="ph" data-gallery-idx="1"><img src="sito/sito/foto1.webp" alt="Tursport" loading="lazy"></div></div>
        <div class="g3"><div class="ph" data-gallery-idx="2"><img src="sito/sito/DSCF0705.webp" alt="Tursport" loading="lazy"></div></div>
        <div class="g4"><div class="ph" data-gallery-idx="3"><img src="sito/sito/DSCF1403.webp" alt="Tursport" loading="lazy"></div></div>
        <div class="g5"><div class="ph" data-gallery-idx="4"><img src="sito/sito/DSCF1011.webp" alt="Tursport" loading="lazy"></div></div>
      </div>
    </div>

    <!-- Modal Galleria Fullscreen Navigabile -->
    <div id="galleryModal" class="gallery-modal" aria-hidden="true" role="dialog" aria-label="Galleria a schermo intero">
      <button class="gallery-modal__close" id="galleryClose" aria-label="Chiudi galleria">&#x2715;</button>
      <button class="gallery-modal__nav gallery-modal__prev" id="galleryPrev" aria-label="Immagine precedente">&#x276E;</button>
      <div class="gallery-modal__stage">
        <img id="galleryModalImg" src="sito/sito/DSCF1194.webp" alt="Galleria Tursport">
        <div class="gallery-modal__caption">
          <span id="galleryModalCounter" class="gallery-modal__counter">1 / 5</span>
        </div>
      </div>
      <button class="gallery-modal__nav gallery-modal__next" id="galleryNext" aria-label="Immagine successiva">&#x276F;</button>
    </div>

    <!-- Sezione Community -->
    <div class="community reveal">
      <div class="community__text">
        <h2 class="h2" style="margin-bottom:.8rem" data-i18n="comm_h2">Resta in contatto con Tursport.</h2>
        <p data-i18n="comm_desc">Novità, eventi e nuove occasioni da vivere. Lascia il tuo indirizzo email per ricevere gli aggiornamenti.</p>
      </div>
      <form class="form" data-form>
        <div class="field field--full">
          <label for="comm-email" data-i18n="comm_label">La tua email</label>
          <input id="comm-email" name="email" type="email" autocomplete="email" placeholder="nome@esempio.it" data-i18n-ph="comm_ph" required>
        </div>
        <label class="consent field--full">
          <input type="checkbox" required>
          <span data-i18n="comm_consent">Ho letto l'<a href="contatti.html">informativa privacy</a> e acconsento al trattamento dei dati per ricevere aggiornamenti.</span>
        </label>
        <div class="field--full"><button class="btn" type="submit" data-i18n="comm_btn">Entra nella community</button></div>
        <p class="form__status field--full" role="status" aria-live="polite" style="grid-column:1/-1"></p>
      </form>
    </div>
  </div>
</section>
`;
fs.writeFileSync(path.join(ROOT, 'about.html'), createPage(
  "About Us | Tursport Hotel Residence",
  "Tursport nasce nel 1980 a Capo San Vito, Taranto: una storia di accoglienza, sport e territorio.",
  "about",
  aboutContent
), 'utf8');
console.log('about.html updated (fullscreen lightbox).');

// -------------------------------------------------------------
// PAGE 3: SERVICES (services.html)
// Unified header and text layout matching about.html & others!
// -------------------------------------------------------------
const servicesContent = `
<section class="sec" style="padding-top:calc(var(--head-h) + 1.5rem)">
  <div class="wrap">
    <div class="about__head reveal">
      <h1 class="h1-page" data-i18n="srv_h2">Tutto ciò che rende unico il tuo soggiorno.</h1>
      <p class="lead about__lead" data-i18n="srv_lead">Ospitalità, sport, business ed eventi si incontrano in una visione contemporanea dell’accoglienza.</p>
      <div class="about__body">
        <p data-i18n="srv_p1">Al Tursport Hotel Residence, camere e appartamenti si affiancano a spazi dedicati al benessere, all’attività sportiva, al lavoro e agli incontri. Un’offerta articolata che apre a possibilità diverse, adattandosi a esigenze e ritmi differenti.</p>
        <p data-i18n="srv_p2">Scopri tutto ciò che Tursport ha da offrire.</p>
      </div>
    </div>
    
    <ul class="tiles">
      <li class="reveal">
        <a href="rooms.html">
          <div class="ph"><img src="sito/sito/foto2.webp" alt="Rooms &amp; Apartments" loading="lazy"></div>
          <h3 class="h3" data-i18n="srv_rooms">Rooms &amp; Apartments</h3>
        </a>
      </li>
      <li class="reveal reveal-delay-1">
        <a href="sport.html">
          <div class="ph"><img src="sito/sito/DSCF1240.webp" alt="Sport" loading="lazy"></div>
          <h3 class="h3" data-i18n="srv_sport">Sport</h3>
        </a>
      </li>
      <li class="reveal reveal-delay-2">
        <a href="pool.html">
          <div class="ph"><img src="sito/sito/DSCF1194.webp" alt="Pool Club" loading="lazy"></div>
          <h3 class="h3" data-i18n="srv_pool">Pool Club</h3>
        </a>
      </li>
      <li class="reveal">
        <a href="palazzetto.html">
          <div class="ph"><img src="sito/sito/DSCF0744.webp" alt="Palazzetto" loading="lazy"></div>
          <h3 class="h3" data-i18n="srv_palazzetto">Eventi palazzetto</h3>
        </a>
      </li>
      <li class="reveal reveal-delay-1">
        <a href="corporate.html">
          <div class="ph"><img src="sito/sito/DSCF0786.webp" alt="Eventi aziendali" loading="lazy"></div>
          <h3 class="h3" data-i18n="srv_corporate">Eventi aziendali</h3>
        </a>
      </li>
      <li class="reveal reveal-delay-2">
        <a href="convention.html">
          <div class="ph"><img src="sito/sito/DSCF0771.webp" alt="Convention" loading="lazy"></div>
          <h3 class="h3" data-i18n="srv_convention">Convention</h3>
        </a>
      </li>
      <li class="reveal">
        <a href="coworking.html">
          <div class="ph"><img src="sito/sito/DSCF0954.webp" alt="Co-working" loading="lazy"></div>
          <h3 class="h3" data-i18n="srv_coworking">Co-work Spaces</h3>
        </a>
      </li>
    </ul>
  </div>
</section>
`;
fs.writeFileSync(path.join(ROOT, 'services.html'), createPage(
  "Services | Tursport Hotel Residence",
  "Scopri tutti i servizi Tursport: ospitalità, sport, piscina olimpionica, business ed eventi a Taranto.",
  "services",
  servicesContent
), 'utf8');
console.log('services.html updated (unified layout).');

// -------------------------------------------------------------
// PAGE 4: ROOMS & APARTMENTS (rooms.html)
// -------------------------------------------------------------
const roomsContent = `
<section class="sec" style="padding-top:calc(var(--head-h) + 1.5rem); padding-bottom:0">
  <div class="split-bleed">
    <div class="split__text reveal">
      <h1 class="h1-page" data-i18n="rooms_h2">Il tuo spazio, il tuo soggiorno.</h1>
      <p data-i18n="rooms_p1">Al Tursport, l’ospitalità prende forma in camere e appartamenti indipendenti, distribuiti all’interno del residence. Ambienti pensati per accogliere soggiorni di piacere e viaggi di lavoro, con un’attenzione al comfort e alla libertà di vivere il proprio tempo.</p>
      <p data-i18n="rooms_p2">Gli appartamenti portano il nome delle piante presenti nella struttura, un dettaglio che ne riflette il legame con il paesaggio circostante.</p>
      <p data-i18n="rooms_p3">Scopri le sistemazioni e trova il tuo spazio al Tursport.</p>
      <div class="actions">
        <a class="btn" href="contatti.html?motivo=Camere%20e%20appartamenti" data-i18n="rooms_btn_discover">Scopri le sistemazioni</a>
        <a class="btn btn--ghost" href="contatti.html?motivo=Camere%20e%20appartamenti" data-i18n="rooms_btn_book">Prenota il tuo soggiorno</a>
      </div>
    </div>
    <div class="split__media split__media--dual reveal reveal-delay-1">
      <div class="ph">
        <img src="sito/sito/foto2.webp" alt="Camera Tursport Hotel" loading="lazy">
      </div>
      <div class="ph">
        <img src="sito/sito/foto3.webp" alt="Appartamento Tursport Residence" loading="lazy">
      </div>
    </div>
  </div>
</section>
`;
fs.writeFileSync(path.join(ROOT, 'rooms.html'), createPage(
  "Rooms & Apartments | Tursport Hotel Residence",
  "Camere confortevoli e appartamenti indipendenti a Capo San Vito, Taranto.",
  "rooms",
  roomsContent
), 'utf8');

// -------------------------------------------------------------
// PAGE 5: SPORT (sport.html)
// -------------------------------------------------------------
const sportContent = `
<section class="sec sport" style="padding-top:calc(var(--head-h) + 1.5rem)">
  <div class="wrap">
    <div class="sport__top reveal">
      <h1 class="h1-page" data-i18n="sport_h2">Lo sport fa parte della nostra storia.</h1>
      <div>
        <p class="lead" style="margin-bottom:1rem" data-i18n="sport_lead">La vocazione sportiva è una parte importante dell'identità Tursport.</p>
        <p data-i18n="sport_p1">Al Tursport, lo sport è un modo di vivere gli spazi e condividere nuove energie. Dai campi da tennis alle superfici dedicate al beach tennis e al beach volley, fino al palazzetto per il basket, ogni impianto offre l’opportunità di coltivare la propria passione e trovare il proprio modo di mettersi in gioco.</p>
      </div>
    </div>
    <ul class="facilities">
      <li class="reveal">
        <div class="ph"><img src="sito/sito/DSCF1240.webp" alt="Campi da tennis" loading="lazy"></div>
        <h3 class="h3" data-i18n="fac_tennis">Campi da tennis</h3>
      </li>
      <li class="reveal reveal-delay-1">
        <div class="ph"><img src="sito/sito/DSCF0801.webp" alt="Beach tennis e fitness" loading="lazy"></div>
        <h3 class="h3" data-i18n="fac_beachtennis">Beach tennis</h3>
      </li>
      <li class="reveal reveal-delay-2">
        <div class="ph"><img src="sito/sito/DSCF1244.webp" alt="Beach volley" loading="lazy"></div>
        <h3 class="h3" data-i18n="fac_beachvolley">Beach volley</h3>
      </li>
      <li class="reveal reveal-delay-3">
        <div class="ph"><img src="sito/sito/DSCF0744.webp" alt="Palazzetto basket" loading="lazy"></div>
        <h3 class="h3" data-i18n="fac_basket">Palazzetto per il basket</h3>
      </li>
    </ul>
    <div style="margin-top:clamp(2.5rem, 5vw, 4rem)" class="reveal">
      <p data-i18n="sport_p2">Scopri gli impianti e trova lo spazio per il tuo prossimo match.</p>
      <div class="actions">
        <a class="btn" href="contatti.html?motivo=Sport%20e%20impianti" data-i18n="sport_btn">Scopri gli impianti</a>
      </div>
    </div>
  </div>
</section>
`;
fs.writeFileSync(path.join(ROOT, 'sport.html'), createPage(
  "Sport | Tursport Hotel Residence",
  "Impianti sportivi d'eccellenza a Taranto: tennis, beach tennis, beach volley e palasport.",
  "sport",
  sportContent
), 'utf8');

// -------------------------------------------------------------
// PAGE 6: POOL CLUB (pool.html)
// -------------------------------------------------------------
const poolContent = `
<section class="sec" style="padding-top:calc(var(--head-h) + 1.5rem); padding-bottom:0">
  <div class="split-bleed split-bleed--rev">
    <div class="split__text reveal">
      <span class="soon" data-i18n="pool_badge">coming soon</span>
      <h1 class="h1-page" data-i18n="pool_h2">La tua estate, a bordo piscina.</h1>
      <p data-i18n="pool_desc">Un'oasi di serenità e relax a Capo San Vito: l'ampia piscina olimpionica immersa nel verde con solarium attrezzato, zona lounge e drink a bordo vasca.</p>
      <div class="actions">
        <a class="btn" href="newsletter.html" data-i18n="pool_cta">Rimani aggiornato</a>
      </div>
    </div>
    <div class="split__media reveal reveal-delay-1">
      <div class="ph">
        <img src="sito/sito/DSCF1194.webp" alt="Pool Club Tursport" loading="lazy">
      </div>
    </div>
  </div>
</section>
`;
fs.writeFileSync(path.join(ROOT, 'pool.html'), createPage(
  "Pool Club | Tursport Hotel Residence",
  "Piscina olimpionica e solarium immersi nel verde a Capo San Vito, Taranto.",
  "pool",
  poolContent
), 'utf8');

// -------------------------------------------------------------
// PAGE 7: EVENTI PALAZZETTO (palazzetto.html)
// -------------------------------------------------------------
const palazzettoContent = `
<section class="sec" style="padding-top:calc(var(--head-h) + 1.5rem); padding-bottom:0">
  <div class="split-bleed">
    <div class="split__text reveal">
      <h1 class="h1-page" data-i18n="events_arena_h2">Lo spazio per il tuo gioco.</h1>
      <p data-i18n="events_arena_p1">Il palazzetto Tursport è uno spazio dedicato allo sport e alle attività che prendono forma intorno ad esso. Pensato anche per il basket, può essere riservato per allenamenti, iniziative sportive ed eventi, con la possibilità di disporre dell’impianto per un’intera giornata.</p>
      <p data-i18n="events_arena_p2">Raccontaci cosa hai in mente: valuteremo insieme disponibilità e modalità di utilizzo.</p>
      <div class="actions">
        <a class="btn" href="contatti.html?motivo=Eventi%20palazzetto" data-i18n="events_arena_btn">Richiedi un preventivo</a>
      </div>
      <div class="contacts-inline">
        <span>Email: <a href="mailto:booking@tursport.it">booking@tursport.it</a></span>
        <span>Telefono / WhatsApp: <a href="https://wa.me/393926283171">+39 392 628 3171</a></span>
      </div>
    </div>
    <div class="split__media reveal reveal-delay-1">
      <div class="ph">
        <img src="sito/sito/DSCF0744.webp" alt="Palazzetto dello sport" loading="lazy">
      </div>
    </div>
  </div>
</section>
`;
fs.writeFileSync(path.join(ROOT, 'palazzetto.html'), createPage(
  "Eventi palazzetto | Tursport Hotel Residence",
  "Spazio coperto per basket, tornei, allenamenti ed eventi sportivi a Taranto.",
  "palazzetto",
  palazzettoContent
), 'utf8');

// -------------------------------------------------------------
// PAGE 8: EVENTI AZIENDALI (corporate.html)
// -------------------------------------------------------------
const corporateContent = `
<section class="sec" style="padding-top:calc(var(--head-h) + 1.5rem); padding-bottom:0">
  <div class="split-bleed split-bleed--rev">
    <div class="split__text reveal">
      <h1 class="h1-page" data-i18n="events_corp_h2">Le idee prendono spazio.</h1>
      <p data-i18n="events_corp_p1">Ogni incontro è un’occasione per condividere visioni e sviluppare nuove idee. Tursport offre spazi dedicati a riunioni, meeting aziendali e momenti di lavoro in team, con la possibilità di integrare servizi di ristorazione e coffee break.</p>
      <p data-i18n="events_corp_p2">Ambienti e servizi possono essere organizzati in base alle caratteristiche dell’incontro, per dare forma a un’esperienza di lavoro funzionale e curata.</p>
      <div class="actions">
        <a class="btn" href="contatti.html?motivo=Eventi%20aziendali" data-i18n="events_corp_btn">Organizza il tuo evento</a>
      </div>
    </div>
    <div class="split__media reveal reveal-delay-1">
      <div class="ph">
        <img src="sito/sito/DSCF0823.webp" alt="Sala meeting aziendali e coffee break" loading="lazy">
      </div>
    </div>
  </div>
</section>
`;
fs.writeFileSync(path.join(ROOT, 'corporate.html'), createPage(
  "Eventi aziendali | Tursport Hotel Residence",
  "Sale meeting e spazi per riunioni aziendali, team building e workshop a Taranto.",
  "corporate",
  corporateContent
), 'utf8');

// -------------------------------------------------------------
// PAGE 9: CONVENTION (convention.html)
// -------------------------------------------------------------
const conventionContent = `
<section class="sec" style="padding-top:calc(var(--head-h) + 1.5rem); padding-bottom:0">
  <div class="split-bleed">
    <div class="split__text reveal">
      <h1 class="h1-page">
        <span data-i18n="events_conv_h2_1">Incontrarsi.</span>
        <span data-i18n="events_conv_h2_2">Condividere.</span>
        <span data-i18n="events_conv_h2_3">Costruire nuove prospettive.</span>
      </h1>
      <p data-i18n="events_conv_p1">Per convention, incontri aziendali e appuntamenti professionali, Tursport offre la possibilità di combinare gli spazi dedicati agli eventi con le soluzioni di soggiorno della struttura.</p>
      <p data-i18n="events_conv_p2">Una formula che permette di riunire in un unico luogo momenti di lavoro, ospitalità e servizi complementari, semplificando l'organizzazione dell'incontro.</p>
      <p data-i18n="events_conv_side" style="margin-top:1rem">Contattaci per costruire una proposta in linea con il tuo evento.</p>
      <div class="actions">
        <a class="btn" href="contatti.html?motivo=Convention" data-i18n="events_conv_btn">Progetta la tua convention</a>
      </div>
    </div>
    <div class="split__media reveal reveal-delay-1">
      <div class="ph">
        <img src="sito/sito/DSCF0771.webp" alt="Auditorium Convention Tursport" loading="lazy">
      </div>
    </div>
  </div>
</section>
`;
fs.writeFileSync(path.join(ROOT, 'convention.html'), createPage(
  "Convention | Tursport Hotel Residence",
  "Convention, congressi e incontri professionali integrati con ospitalità a Taranto.",
  "convention",
  conventionContent
), 'utf8');

// -------------------------------------------------------------
// PAGE 10: SPAZIO DI CO-WORKING (coworking.html)
// -------------------------------------------------------------
const coworkingContent = `
<section class="sec" style="padding-top:calc(var(--head-h) + 1.5rem); padding-bottom:0">
  <div class="split-bleed split-bleed--rev">
    <div class="split__text reveal">
      <h1 class="h1-page" data-i18n="cw_h2">Cambia spazio. Mantieni il tuo ritmo.</h1>
      <p data-i18n="cw_p1">Al Tursport puoi dedicarti al lavoro in uno spazio pensato per studiare, concentrarti e portare avanti i tuoi progetti, anche fuori dal tuo ambiente abituale.</p>
      <p data-i18n="cw_p2">Le postazioni di co-working sono gratuite e prenotabili entro il giorno precedente. Durante la giornata puoi inoltre usufruire del bar, secondo gli orari del servizio.</p>
      <p data-i18n="cw_p3">Un'alternativa pratica per lavorare in un ambiente diverso, con la libertà di organizzare il tuo tempo.</p>
      <dl class="facts">
        <div><dt data-i18n="cw_fact1_dt">Postazioni</dt><dd data-i18n="cw_fact1_dd">Gratuite</dd></div>
        <div><dt data-i18n="cw_fact2_dt">Prenotazione</dt><dd data-i18n="cw_fact2_dd">Entro il giorno precedente</dd></div>
        <div><dt data-i18n="cw_fact3_dt">Bar</dt><dd data-i18n="cw_fact3_dd">Secondo gli orari del servizio</dd></div>
      </dl>
      <div class="actions">
        <a class="btn" href="contatti.html?motivo=Co-working" data-i18n="cw_btn">Prenota una postazione</a>
      </div>
    </div>
    <div class="split__media reveal reveal-delay-1">
      <div class="ph">
        <img src="sito/sito/DSCF0954.webp" alt="Spazio Co-working Tursport" loading="lazy">
      </div>
    </div>
  </div>
</section>
`;
fs.writeFileSync(path.join(ROOT, 'coworking.html'), createPage(
  "Co-work Spaces | Tursport Hotel Residence",
  "Postazioni gratuite per studiare, concentrarsi e lavorare nel verde di Capo San Vito.",
  "coworking",
  coworkingContent
), 'utf8');

// -------------------------------------------------------------
// PAGE 11: NEWSLETTER (newsletter.html)
// -------------------------------------------------------------
const newsletterContent = `
<section class="sec" style="padding-top:calc(var(--head-h) + 1.5rem); padding-bottom:0">
  <div class="split-bleed">
    <div class="split__text reveal">
      <h1 class="h1-page" data-i18n="nl_h2">Le novità del mondo Tursport.</h1>
      <p data-i18n="nl_p1">Nuovi appuntamenti, iniziative ed esperienze da scoprire. La newsletter Tursport ti aggiorna su ciò che accade nella struttura e sulle prossime occasioni da vivere.</p>
      <p data-i18n="nl_p2">Lascia il tuo indirizzo email per restare in contatto con noi.</p>
      <form class="form" style="margin-top:1.5rem" data-form>
        <div class="field field--full">
          <label for="nl-email" data-i18n="nl_label">Inserisci la tua email</label>
          <input id="nl-email" name="email" type="email" autocomplete="email" placeholder="Inserisci la tua email" data-i18n-ph="nl_ph" required>
        </div>
        <label class="consent field--full">
          <input type="checkbox" required>
          <span data-i18n="nl_consent">Ho letto l'<a href="contatti.html">informativa privacy</a> e acconsento al trattamento dei dati per l'iscrizione alla newsletter.</span>
        </label>
        <div class="field--full"><button class="btn" type="submit" data-i18n="nl_btn">Iscriviti alla newsletter</button></div>
        <p class="form__status field--full" role="status" aria-live="polite"></p>
      </form>
    </div>
    <div class="split__media reveal reveal-delay-1">
      <div class="ph">
        <img src="sito/sito/DSCF1403.webp" alt="Natura e parco Tursport" loading="lazy">
      </div>
    </div>
  </div>
</section>
`;
fs.writeFileSync(path.join(ROOT, 'newsletter.html'), createPage(
  "Newsletter | Tursport Hotel Residence",
  "Iscriviti alla newsletter Tursport per ricevere aggiornamenti, eventi e novità.",
  "newsletter",
  newsletterContent
), 'utf8');

// -------------------------------------------------------------
// PAGE 12: CONTATTACI (contatti.html)
// -------------------------------------------------------------
const contattiContent = `
<section class="sec" style="padding-top:calc(var(--head-h) + 1.5rem); padding-bottom:0">
  <div class="wrap">
    <div class="contact__grid">
      <div class="contact__info reveal">
        <h1 class="h1-page" data-i18n="contact_h2">Il tuo soggiorno comincia da qui.</h1>
        <p data-i18n="contact_p1">Che tu stia organizzando una vacanza o un viaggio di lavoro, Tursport è pronto ad accoglierti. Siamo a disposizione per accompagnarti nella scelta della sistemazione e offrirti tutte le informazioni necessarie per vivere al meglio il tuo soggiorno.</p>
        <p data-i18n="contact_p2">Per richieste e prenotazioni, contattaci. Ti aspettiamo al Tursport.</p>
        
        <h3 class="h3" style="margin-top:2rem">Recapiti</h3>
        <dl class="recapiti">
          <div><dt data-i18n="contact_addr_dt">Indirizzo</dt><dd>Via del Faro, 58, 74122 San Vito – Taranto</dd></div>
          <div><dt data-i18n="contact_tel_dt">Telefono</dt><dd><a href="tel:+390997330111">+39 099 733 0111</a></dd></div>
          <div><dt data-i18n="contact_wa_dt">WhatsApp</dt><dd><a href="https://wa.me/393926283171">+39 392 628 3171</a></dd></div>
          <div><dt data-i18n="contact_email_dt">Email</dt><dd><a href="mailto:booking@tursport.it">booking@tursport.it</a></dd></div>
          <div><dt data-i18n="contact_ig_dt">Instagram</dt><dd><a href="https://instagram.com" target="_blank" rel="noopener" data-i18n="contact_ig_dd">Profilo ufficiale</a></dd></div>
        </dl>
      </div>

      <form class="contact__form form reveal reveal-delay-1" data-form id="contactForm">
        <h3 class="h3 field--full" style="margin-bottom:.5rem">Modulo di contatto</h3>
        <div class="field">
          <label for="c-nome" data-i18n="form_name_label">Nome</label>
          <input id="c-nome" name="nome" type="text" autocomplete="name" required>
        </div>
        <div class="field">
          <label for="c-email" data-i18n="form_email_label">Email</label>
          <input id="c-email" name="email" type="email" autocomplete="email" required>
        </div>
        <div class="field">
          <label for="c-tel" data-i18n="form_tel_label">Telefono (facoltativo)</label>
          <input id="c-tel" name="telefono" type="tel" autocomplete="tel">
        </div>
        <div class="field">
          <label for="c-motivo" data-i18n="form_reason_label">Motivo della richiesta</label>
          <select id="c-motivo" name="motivo" required>
            <option value="" data-i18n="form_reason_select">Seleziona</option>
            <option value="Camere e appartamenti" data-i18n="form_reason_opt1">Camere e appartamenti</option>
            <option value="Sport e impianti" data-i18n="form_reason_opt2">Sport e impianti</option>
            <option value="Eventi palazzetto" data-i18n="form_reason_opt3">Eventi palazzetto</option>
            <option value="Eventi aziendali" data-i18n="form_reason_opt4">Eventi aziendali</option>
            <option value="Convention" data-i18n="form_reason_opt5">Convention</option>
            <option value="Co-working" data-i18n="form_reason_opt6">Co-working</option>
            <option value="Altro" data-i18n="form_reason_opt7">Altro</option>
          </select>
        </div>
        <div class="field field--full">
          <label for="c-msg" data-i18n="form_msg_label">Messaggio</label>
          <textarea id="c-msg" name="messaggio" required></textarea>
        </div>
        <label class="consent field--full">
          <input type="checkbox" required>
          <span data-i18n="form_consent">Ho letto l'<a href="#">informativa privacy</a> e acconsento al trattamento dei dati per rispondere alla mia richiesta.</span>
        </label>
        <div class="field--full"><button class="btn" type="submit" data-i18n="form_submit">Invia la richiesta</button></div>
        <p class="form__status field--full" role="status" aria-live="polite"></p>
      </form>
    </div>
  </div>

  <!-- Mappa al vivo da bordo a bordo -->
  <div class="map-bleed reveal" aria-label="Mappa posizione Tursport">
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.2618991206684!2d17.228965976527015!3d40.40306135649987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13471dfc888d3637%3A0xe55677054f2cf771!2sTursport%20Hotel%20Residence!5e0!3m2!1sit!2sit!4v1710000000000!5m2!1sit!2sit" width="100%" height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Mappa Tursport"></iframe>
  </div>
</section>
`;
fs.writeFileSync(path.join(ROOT, 'contatti.html'), createPage(
  "Contact Us | Tursport Hotel Residence",
  "Contattaci per informazioni e prenotazioni di soggiorni, sport ed eventi a Capo San Vito, Taranto.",
  "contatti",
  contattiContent
), 'utf8');

console.log('All updates successfully generated!');
