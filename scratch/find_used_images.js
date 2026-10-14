const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') || f.endsWith('.js'));
const used = new Set();
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const m = content.match(/sito\/sito\/[^"'\s>]+\.webp/g);
  if (m) m.forEach(x => used.add(x.replace('sito/sito/', '')));
});
console.log('Currently used images (' + used.size + '):', Array.from(used));

const all = fs.readdirSync('sito/sito').filter(f => f.endsWith('.webp'));
const unused = all.filter(f => !used.has(f));
console.log('Unused images (' + unused.length + '):', unused);
