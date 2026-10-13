const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'generate_multipage.js');
let gen = fs.readFileSync(filePath, 'utf8');

const replacements = [
  [/idx_rooms_title:\s*"[^"]+"/, 'idx_rooms_title: "Camere & Appartamenti"'],
  [/idx_events_title:\s*"[^"]+"/, 'idx_events_title: "Eventi"'],
  [/idx_events_desc:\s*"[^"]+"/, 'idx_events_desc: "Incontrarsi e condividere nuove idee."'],
  [/about_lead:\s*"[^"]+"/, 'about_lead: "Ci sono luoghi che nascono per accogliere. Altri, con il tempo, entrano a far parte della storia di una città."'],
  [/about_p1:\s*"[^"]+"/, 'about_p1: "Tursport nasce nel 1980 a San Vito, alle porte di Taranto, con una vocazione che va oltre l’ospitalità. Negli anni ha accolto personalità di spicco del panorama italiano e internazionale, diventando un punto di riferimento per lo sport, la cultura e la vita del territorio."'],
  [/about_p3:\s*"[^"]+"/, 'about_p3: "Oggi Tursport continua a evolversi, in Un luogo che accoglie storie diverse e ne scrive di nuove."'],
  [/gallery_btn:\s*"[^"]+"/, 'gallery_btn: "Esplora la galleria"'],
  [/srv_p1:\s*"[^"]+"/, 'srv_p1: "Al Tursport Hotel Residence, camere e appartamenti si affiancano a spazi dedicati al benessere, allo sport, al lavoro e agli incontri, per adattarsi a esigenze e ritmi diversi."'],
  [/srv_rooms:\s*"[^"]+"/, 'srv_rooms: "Camere & Appartamenti"'],
  [/rooms_p1:\s*"[^"]+"/, 'rooms_p1: "Al Tursport, l’ospitalità prende forma in camere e appartamenti indipendenti, distribuiti all’interno del residence. Sono ambienti pensati per soggiorni di piacere e viaggi di lavoro, con attenzione al comfort e alla libertà di vivere il proprio tempo."'],
  [/sport_p1:\s*"[^"]+"/, 'sport_p1: "Campi da tennis, superfici per il beach tennis e beach volley, palazzetto per il basket, piscina per il nuoto: ogni impianto è un’occasione per coltivare la propria passione e trovare il proprio modo di mettersi in gioco."'],
  [/events_arena_h2:\s*"[^"]+"/, 'events_arena_h2: "Porta la tua squadra, o la tua idea."'],
  [/events_arena_p1:\s*"[^"]+"/, 'events_arena_p1: "Il palazzetto del Tursport è uno spazio dedicato allo sport e alle attività che prendono forma intorno ad esso. Pensato anche per il basket, può essere riservato per allenamenti, iniziative sportive ed eventi."']
];

for (const [re, rep] of replacements) {
  gen = gen.replace(re, rep);
}

fs.writeFileSync(filePath, gen, 'utf8');
console.log('generate_multipage.js updated with new copy.');
