const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

// 1. UPDATE main.js
let mainJs = fs.readFileSync(path.join(ROOT, 'main.js'), 'utf8');

// IT translations update
const itUpdates = {
  idx_rooms_title: 'Camere & Appartamenti',
  idx_rooms_desc: 'Il piacere di sentirsi nel posto giusto.',
  idx_sport_title: 'Sport',
  idx_sport_desc: 'Lo spazio per mettersi in gioco.',
  idx_pool_title: 'Pool Club',
  idx_pool_desc: 'Il piacere di una pausa a bordo piscina.',
  idx_events_title: 'Eventi',
  idx_events_desc: 'Incontrarsi e condividere nuove idee.',

  about_h2: 'Dal 1980, un punto d’incontro.',
  about_lead: 'Ci sono luoghi che nascono per accogliere. Altri, con il tempo, entrano a far parte della storia di una città.',
  about_p1: 'Tursport nasce nel 1980 a San Vito, alle porte di Taranto, con una vocazione che va oltre l’ospitalità. Negli anni ha accolto personalità di spicco del panorama italiano e internazionale, diventando un punto di riferimento per lo sport, la cultura e la vita del territorio.',
  about_p2: 'Una storia costruita attraverso le persone, le passioni e le occasioni di condivisione.',
  about_p3: 'Oggi Tursport continua a evolversi, in Un luogo che accoglie storie diverse e ne scrive di nuove.',
  gallery_h2: 'Gli spazi, da vicino.',
  gallery_desc: 'Scopri gli ambienti e i luoghi che compongono il mondo Tursport.',
  gallery_btn: 'Esplora la galleria',
  comm_h2: 'Resta in contatto con Tursport.',
  comm_desc: 'Novità, eventi e nuove occasioni da vivere. Lascia il tuo indirizzo email per ricevere gli aggiornamenti.',
  comm_label: 'La tua email',
  comm_btn: 'Entra nella community',

  srv_h2: 'Tutto ciò che rende unico il tuo soggiorno.',
  srv_lead: 'Ospitalità, sport, business ed eventi si incontrano in una visione contemporanea dell’accoglienza.',
  srv_p1: 'Al Tursport Hotel Residence, camere e appartamenti si affiancano a spazi dedicati al benessere, allo sport, al lavoro e agli incontri, per adattarsi a esigenze e ritmi diversi.',
  srv_p2: 'Scopri tutto ciò che Tursport ha da offrire.',
  srv_rooms: 'Camere & Appartamenti',

  rooms_h2: 'Il tuo spazio, il tuo soggiorno.',
  rooms_p1: 'Al Tursport, l’ospitalità prende forma in camere e appartamenti indipendenti, distribuiti all’interno del residence. Sono ambienti pensati per soggiorni di piacere e viaggi di lavoro, con attenzione al comfort e alla libertà di vivere il proprio tempo.',
  rooms_p2: 'Gli appartamenti portano il nome delle piante presenti nella struttura, un dettaglio che ne riflette il legame con il paesaggio circostante.',
  rooms_p3: 'Scopri le sistemazioni e trova il tuo spazio al Tursport.',
  rooms_btn_discover: 'Scopri le sistemazioni',
  rooms_btn_book: 'Prenota il tuo soggiorno',

  sport_h2: 'Lo sport fa parte della nostra storia.',
  sport_lead: 'La vocazione sportiva è una parte importante dell\'identità Tursport.',
  sport_p1: 'Campi da tennis, superfici per il beach tennis e beach volley, palazzetto per il basket, piscina per il nuoto: ogni impianto è un’occasione per coltivare la propria passione e trovare il proprio modo di mettersi in gioco.',
  sport_p2: 'Scopri gli impianti e trova lo spazio per il tuo prossimo match.',
  sport_btn: 'Scopri gli impianti',

  pool_badge: 'coming soon',
  pool_h2: 'La tua estate, a bordo piscina.',

  events_arena_h2: 'Porta la tua squadra, o la tua idea.',
  events_arena_sub: 'Dall\'allenamento all\'evento, a modo tuo.',
  events_arena_p1: 'Il palazzetto del Tursport è uno spazio dedicato allo sport e alle attività che prendono forma intorno ad esso. Pensato anche per il basket, può essere riservato per allenamenti, iniziative sportive ed eventi.',
  events_arena_p2: 'Raccontaci cosa hai in mente: valuteremo insieme disponibilità e modalità di utilizzo.',
  events_arena_btn: 'Richiedi un preventivo',

  events_corp_h2: 'Le idee prendono spazio.',
  events_corp_sub: 'Il tuo incontro, organizzato con cura.',
  events_corp_p1: 'Ogni incontro è un’occasione per condividere visioni e sviluppare nuove idee. Tursport offre spazi dedicati a riunioni, meeting aziendali e momenti di lavoro in team, con la possibilità di integrare servizi di ristorazione e coffee break.',
  events_corp_p2: 'Ambienti e servizi possono essere organizzati in base alle caratteristiche dell’incontro, per un’esperienza di lavoro funzionale e curata.',
  events_corp_btn: 'Organizza il tuo evento',

  events_conv_h2: 'Incontrarsi. Condividere. Costruire nuove prospettive.',
  events_conv_sub: 'Dall\'arrivo all\'ultimo intervento, nello stesso posto.',
  events_conv_p1: 'Per convention, incontri aziendali e appuntamenti professionali, Tursport permette di abbinare gli spazi dedicati agli eventi con le soluzioni di soggiorno della struttura.',
  events_conv_p2: 'Una formula che permette di riunire in un unico luogo momenti di lavoro, ospitalità e servizi complementari, semplificando l\'organizzazione dell\'incontro.',
  events_conv_side: 'Contattaci per costruire una proposta in linea con il tuo evento.',
  events_conv_btn: 'Progetta la tua convention',

  nl_h2: 'Le novità del mondo Tursport.',
  nl_p1: 'Nuovi appuntamenti, iniziative ed esperienze da scoprire. La newsletter Tursport ti aggiorna su ciò che accade nella struttura e sulle prossime occasioni da vivere.',
  nl_p2: 'Lascia il tuo indirizzo email per restare in contatto con noi.',
  nl_label: 'Inserisci la tua email',
  nl_ph: 'Inserisci la tua email',
  nl_btn: 'Iscriviti alla newsletter',

  contact_h2: 'Il tuo soggiorno comincia da qui.',
  contact_p1: 'Che tu stia organizzando una vacanza o un viaggio di lavoro, Tursport è pronto ad accoglierti. Siamo a disposizione per accompagnarti nella scelta della sistemazione e offrirti tutte le informazioni necessarie per vivere al meglio il tuo soggiorno.',
  contact_p2: 'Per richieste e prenotazioni, contattaci. Ti aspettiamo al Tursport.'
};

const enUpdates = {
  idx_events_desc: 'Connecting and sharing new ideas.',
  about_lead: 'Some places are born to welcome. Others, with time, become woven into the story of a city.',
  about_p1: 'Tursport was established in 1980 in San Vito, near Taranto, with an ambition transcending mere hospitality. Over four decades, it has welcomed distinguished Italian and international guests, standing as a benchmark for regional sport, culture and social life.',
  about_p3: 'Today, Tursport continues to evolve as a living venue that embraces multifaceted stories and writes new ones.',
  srv_p1: 'At Tursport Hotel Residence, rooms and apartments sit alongside spaces dedicated to well-being, sport, work and gatherings, adapting to diverse rhythms and needs.',
  rooms_p1: 'At Tursport, hospitality takes shape in private rooms and independent apartments spread throughout the residence. Thoughtfully designed for leisure getaways and business trips, with dedicated attention to comfort and freedom.',
  sport_p1: 'Tennis clay courts, beach tennis and beach volley sand grounds, basketball arena, swimming pool: every facility is an opportunity to cultivate your passion and find your own way to play.',
  events_arena_h2: 'Bring your team, or your vision.',
  events_arena_sub: 'From training to events, your way.',
  events_arena_p1: 'The Tursport arena is a dedicated space for sports and activities that take shape around them. Designed also for basketball, it can be reserved for training sessions, sporting initiatives and events.',
  events_arena_p2: 'Tell us what you have in mind: we will assess availability and options together.',
  events_corp_sub: 'Your meeting, thoughtfully organized.',
  events_corp_p2: 'Spaces and services can be tailored to the specific characteristics of your gathering, delivering a functional and refined work experience.',
  events_conv_sub: 'From arrival to the final session, all in one place.',
  events_conv_p1: 'For conventions, company summits and professional assemblies, Tursport allows combining event venues with on-site accommodation packages.'
};

for (const [k, v] of Object.entries(itUpdates)) {
  const re = new RegExp(`(${k}:\\s*")[^"]*(")`);
  if (re.test(mainJs)) {
    mainJs = mainJs.replace(re, `$1${v}$2`);
  }
}

for (const [k, v] of Object.entries(enUpdates)) {
  // Update in the en block
  const enStart = mainJs.indexOf('en: {');
  if (enStart !== -1) {
    const pre = mainJs.slice(0, enStart);
    let post = mainJs.slice(enStart);
    const re = new RegExp(`(${k}:\\s*")[^"]*(")`);
    if (re.test(post)) {
      post = post.replace(re, `$1${v}$2`);
      mainJs = pre + post;
    }
  }
}

fs.writeFileSync(path.join(ROOT, 'main.js'), mainJs, 'utf8');
console.log('main.js updated with new copy.');

// 2. UPDATE index.html
let indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const newIndexUl = `<ul class="index">
      <li class="reveal">
        <a href="rooms.html">
          <h3 data-i18n="idx_rooms_title">Camere &amp; Appartamenti</h3>
          <p data-i18n="idx_rooms_desc">Il piacere di sentirsi nel posto giusto.</p>
          <div class="ph"><img src="sito/sito/foto2.webp" alt="Camere &amp; Appartamenti" loading="lazy"></div>
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
        <a href="corporate.html">
          <h3 data-i18n="idx_events_title">Eventi</h3>
          <p data-i18n="idx_events_desc">Incontrarsi e condividere nuove idee.</p>
          <div class="ph"><img src="sito/sito/DSCF0786.webp" alt="Eventi" loading="lazy"></div>
        </a>
      </li>
    </ul>`;

indexHtml = indexHtml.replace(/<ul class="index">[\s\S]*?<\/ul>/, newIndexUl);
fs.writeFileSync(path.join(ROOT, 'index.html'), indexHtml, 'utf8');
console.log('index.html updated.');

// 3. UPDATE about.html
let aboutHtml = fs.readFileSync(path.join(ROOT, 'about.html'), 'utf8');
aboutHtml = aboutHtml.replace(
  /<p class="lead about__lead" data-i18n="about_lead">[\s\S]*?<\/p>/,
  '<p class="lead about__lead" data-i18n="about_lead">Ci sono luoghi che nascono per accogliere. Altri, con il tempo, entrano a far parte della storia di una città.</p>'
);
aboutHtml = aboutHtml.replace(
  /<p data-i18n="about_p1">[\s\S]*?<\/p>/,
  '<p data-i18n="about_p1">Tursport nasce nel 1980 a San Vito, alle porte di Taranto, con una vocazione che va oltre l’ospitalità. Negli anni ha accolto personalità di spicco del panorama italiano e internazionale, diventando un punto di riferimento per lo sport, la cultura e la vita del territorio.</p>'
);
aboutHtml = aboutHtml.replace(
  /<p data-i18n="about_p3">[\s\S]*?<\/p>/,
  '<p data-i18n="about_p3">Oggi Tursport continua a evolversi, in Un luogo che accoglie storie diverse e ne scrive di nuove.</p>'
);
aboutHtml = aboutHtml.replace(
  /<button type="button" class="btn" id="openGalleryBtn" data-i18n="gallery_btn">[\s\S]*?<\/button>/,
  '<button type="button" class="btn" id="openGalleryBtn" data-i18n="gallery_btn">Esplora la galleria</button>'
);
fs.writeFileSync(path.join(ROOT, 'about.html'), aboutHtml, 'utf8');
console.log('about.html updated.');

// 4. UPDATE services.html
let servicesHtml = fs.readFileSync(path.join(ROOT, 'services.html'), 'utf8');
servicesHtml = servicesHtml.replace(
  /<p data-i18n="srv_p1">[\s\S]*?<\/p>/,
  '<p data-i18n="srv_p1">Al Tursport Hotel Residence, camere e appartamenti si affiancano a spazi dedicati al benessere, allo sport, al lavoro e agli incontri, per adattarsi a esigenze e ritmi diversi.</p>'
);
servicesHtml = servicesHtml.replace(
  /<h3 class="h3" data-i18n="srv_rooms">[\s\S]*?<\/h3>/,
  '<h3 class="h3" data-i18n="srv_rooms">Camere &amp; Appartamenti</h3>'
);
fs.writeFileSync(path.join(ROOT, 'services.html'), servicesHtml, 'utf8');
console.log('services.html updated.');

// 5. UPDATE rooms.html
let roomsHtml = fs.readFileSync(path.join(ROOT, 'rooms.html'), 'utf8');
roomsHtml = roomsHtml.replace(
  /<p data-i18n="rooms_p1">[\s\S]*?<\/p>/,
  '<p data-i18n="rooms_p1">Al Tursport, l’ospitalità prende forma in camere e appartamenti indipendenti, distribuiti all’interno del residence. Sono ambienti pensati per soggiorni di piacere e viaggi di lavoro, con attenzione al comfort e alla libertà di vivere il proprio tempo.</p>'
);
fs.writeFileSync(path.join(ROOT, 'rooms.html'), roomsHtml, 'utf8');
console.log('rooms.html updated.');

// 6. UPDATE sport.html
let sportHtml = fs.readFileSync(path.join(ROOT, 'sport.html'), 'utf8');
sportHtml = sportHtml.replace(
  /<p data-i18n="sport_p1">[\s\S]*?<\/p>/,
  '<p data-i18n="sport_p1">Campi da tennis, superfici per il beach tennis e beach volley, palazzetto per il basket, piscina per il nuoto: ogni impianto è un’occasione per coltivare la propria passione e trovare il proprio modo di mettersi in gioco.</p>'
);
fs.writeFileSync(path.join(ROOT, 'sport.html'), sportHtml, 'utf8');
console.log('sport.html updated.');

// 7. UPDATE palazzetto.html
let palazzettoHtml = fs.readFileSync(path.join(ROOT, 'palazzetto.html'), 'utf8');
palazzettoHtml = palazzettoHtml.replace(
  /<h1 class="h1-page" data-i18n="events_arena_h2">[\s\S]*?<\/h1>/,
  '<h1 class="h1-page" data-i18n="events_arena_h2">Porta la tua squadra, o la tua idea.</h1>\n      <p class="lead" style="margin-bottom:1rem" data-i18n="events_arena_sub">Dall\'allenamento all\'evento, a modo tuo.</p>'
);
palazzettoHtml = palazzettoHtml.replace(
  /<p data-i18n="events_arena_p1">[\s\S]*?<\/p>/,
  '<p data-i18n="events_arena_p1">Il palazzetto del Tursport è uno spazio dedicato allo sport e alle attività che prendono forma intorno ad esso. Pensato anche per il basket, può essere riservato per allenamenti, iniziative sportive ed eventi.</p>'
);
fs.writeFileSync(path.join(ROOT, 'palazzetto.html'), palazzettoHtml, 'utf8');
console.log('palazzetto.html updated.');

// 8. UPDATE corporate.html
let corporateHtml = fs.readFileSync(path.join(ROOT, 'corporate.html'), 'utf8');
corporateHtml = corporateHtml.replace(
  /<h1 class="h1-page" data-i18n="events_corp_h2">[\s\S]*?<\/h1>/,
  '<h1 class="h1-page" data-i18n="events_corp_h2">Le idee prendono spazio.</h1>\n      <p class="lead" style="margin-bottom:1rem" data-i18n="events_corp_sub">Il tuo incontro, organizzato con cura.</p>'
);
corporateHtml = corporateHtml.replace(
  /<p data-i18n="events_corp_p2">[\s\S]*?<\/p>/,
  '<p data-i18n="events_corp_p2">Ambienti e servizi possono essere organizzati in base alle caratteristiche dell’incontro, per un’esperienza di lavoro funzionale e curata.</p>'
);
fs.writeFileSync(path.join(ROOT, 'corporate.html'), corporateHtml, 'utf8');
console.log('corporate.html updated.');

// 9. UPDATE convention.html
let conventionHtml = fs.readFileSync(path.join(ROOT, 'convention.html'), 'utf8');
if (!conventionHtml.includes('events_conv_sub')) {
  conventionHtml = conventionHtml.replace(
    /(<\/h1>)/,
    '$1\n      <p class="lead" style="margin-bottom:1rem" data-i18n="events_conv_sub">Dall\'arrivo all\'ultimo intervento, nello stesso posto.</p>'
  );
}
conventionHtml = conventionHtml.replace(
  /<p data-i18n="events_conv_p1">[\s\S]*?<\/p>/,
  '<p data-i18n="events_conv_p1">Per convention, incontri aziendali e appuntamenti professionali, Tursport permette di abbinare gli spazi dedicati agli eventi con le soluzioni di soggiorno della struttura.</p>'
);
fs.writeFileSync(path.join(ROOT, 'convention.html'), conventionHtml, 'utf8');
console.log('convention.html updated.');

// 10. Also update Tursport Hotel Residence.html (backup/standalone)
if (fs.existsSync(path.join(ROOT, 'Tursport Hotel Residence.html'))) {
  fs.copyFileSync(path.join(ROOT, 'index.html'), path.join(ROOT, 'Tursport Hotel Residence.html'));
}
