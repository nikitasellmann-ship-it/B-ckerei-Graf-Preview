// Endgültige Logo-Familie: Variante 1 aus Runde 2 (Konzept B, Gold-Kapitell)
const fs = require('fs'); const out = process.argv[2];
const { THEMES, fav } = require('./konzepte.js'); const { waagerecht } = require('./runde2.js');
const w = (n, s) => fs.writeFileSync(`${out}/${n}`, s);
w('forum-logo.svg', waagerecht(THEMES.hell, {}));
w('forum-logo-weiss.svg', waagerecht(THEMES.dunkel, {}));
w('forum-logo-schwarz.svg', waagerecht(THEMES.mono, {}));
w('forum-logo-kurz.svg', waagerecht(THEMES.hell, { unterzeile: null }));
w('forum-logo-kurz-weiss.svg', waagerecht(THEMES.dunkel, { unterzeile: null }));
w('favicon.svg', fav.saeule(true));
console.log('ok');
