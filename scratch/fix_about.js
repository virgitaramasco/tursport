const fs = require('fs');
let content = fs.readFileSync('about.html', 'utf8');

// Normalize line endings temporarily or use regex
content = content.replace(/\r\n/g, '\n');

const needle = `      </div>
    </div>
        <div class="g2"><div class="ph" data-gallery-idx="1"><img src="sito/sito/foto1.webp" alt="Tursport" loading="lazy"></div></div>
        <div class="g3"><div class="ph" data-gallery-idx="2"><img src="sito/sito/DSCF0705.webp" alt="Tursport" loading="lazy"></div></div>
        <div class="g4"><div class="ph" data-gallery-idx="3"><img src="sito/sito/DSCF1403.webp" alt="Tursport" loading="lazy"></div></div>
        <div class="g5"><div class="ph" data-gallery-idx="4"><img src="sito/sito/DSCF1011.webp" alt="Tursport" loading="lazy"></div></div>
      </div>
    </div>`;

const replacement = `      </div>
    </div>`;

if (content.includes(needle)) {
  content = content.replace(needle, replacement);
  fs.writeFileSync('about.html', content, 'utf8');
  console.log('Successfully cleaned about.html!');
} else {
  console.log('Needle not found in about.html');
}
