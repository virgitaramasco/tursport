const fs = require('fs');
const html = fs.readFileSync('Tursport Hotel Residence.html', 'utf8');

const regex = /src=["']([^"']+)["']/g;
let match;
const notFound = [];
const found = [];
while ((match = regex.exec(html)) !== null) {
  const src = match[1];
  if (src.startsWith('http') || src.startsWith('data:')) continue;
  if (!fs.existsSync(src)) {
    notFound.push(src);
  } else {
    found.push(src);
  }
}

console.log('Found ' + found.length + ' local assets:');
found.forEach(f => console.log('  ✓ ' + f));

if (notFound.length > 0) {
  console.error('NOT FOUND (' + notFound.length + '):');
  notFound.forEach(f => console.error('  ✗ ' + f));
  process.exit(1);
} else {
  console.log('All local asset paths are valid and exist!');
}
