const fs = require('fs');
const html = fs.readFileSync('Tursport Hotel Residence.html', 'utf8');

console.log('court symbol:', html.includes('id="court"'));
console.log('wave symbol:', html.includes('id="wave-a"'));
console.log('wave elements:', html.includes('class="wave"'));
console.log('sec band:', html.includes('sec band'));
console.log('band class in HTML:', html.match(/class="[^"]*\bband\b[^"]*"/g));
console.log('court svg in HTML:', html.match(/<svg[^>]*court[^>]*>/g));
console.log('Total length:', html.length);
