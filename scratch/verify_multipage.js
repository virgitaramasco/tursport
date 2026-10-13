const http = require('http');

const pages = [
  '/',
  '/index.html',
  '/about.html',
  '/services.html',
  '/rooms.html',
  '/sport.html',
  '/pool.html',
  '/palazzetto.html',
  '/corporate.html',
  '/convention.html',
  '/coworking.html',
  '/newsletter.html',
  '/contatti.html',
  '/style.css',
  '/main.js'
];

async function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + url, (res) => {
      resolve({ url, status: res.statusCode, ok: res.statusCode === 200 });
    }).on('error', (err) => {
      resolve({ url, status: 'ERROR: ' + err.message, ok: false });
    });
  });
}

(async () => {
  console.log('Verifying multipage routes on http://localhost:3000...');
  let allOk = true;
  for (const p of pages) {
    const res = await checkUrl(p);
    console.log(`[${res.ok ? 'OK' : 'FAIL'}] ${res.url} -> ${res.status}`);
    if (!res.ok) allOk = false;
  }
  console.log(allOk ? 'ALL 15 ENDPOINTS 200 OK!' : 'SOME ENDPOINTS FAILED');
})();
