const fs = require('fs');
const content = fs.readFileSync('Tursport Hotel Residence.backup.html', 'utf8');
const regex = /<img[^>]+src=["']([^"']+)["'][^>]*alt=["']([^"']*)["']/g;
let m;
const found = [];
while ((m = regex.exec(content)) !== null) {
  found.push({ src: m[1], alt: m[2] });
}
console.log(JSON.stringify(found, null, 2));
