// Runde 1: sechs Logo-Konzepte für Forum Immobilien.
// Aufruf: node konzepte.js <ausgabeordner>
const opentype = require('opentype.js'), fs = require('fs');
const F = (p) => opentype.loadSync(`node_modules/@fontsource/${p}.woff`);
const FONT = {
  caslon: F('libre-caslon-text/files/libre-caslon-text-latin-400-normal'),
  cormorant: F('cormorant-garamond/files/cormorant-garamond-latin-600-normal'),
  cormorantB: F('cormorant-garamond/files/cormorant-garamond-latin-700-normal'),
  garamond: F('eb-garamond/files/eb-garamond-latin-500-normal'),
  cinzel: F('cinzel/files/cinzel-latin-500-normal'),
  cinzelB: F('cinzel/files/cinzel-latin-600-normal'),
};

const SUB = 'IMMOBILIEN · FINANZIERUNGEN · HAUSVERWALTUNG';
const SUB_MIXED = 'Immobilien · Finanzierungen · Hausverwaltung';

// Farbwelten: hell (auf Weiß), dunkel (auf Marineblau), einfarbig
const THEMES = {
  hell:  { bg: '#ffffff', ink: '#1e3a5f', tone: '#2e5b86', light: '#5b84ad', gold: '#a8834a' },
  dunkel:{ bg: '#1b2a4a', ink: '#ffffff', tone: '#ffffff', light: '#c9d6e6', gold: '#c9a66b' },
  mono:  { bg: '#ffffff', ink: '#111111', tone: '#111111', light: '#111111', gold: '#111111' },
};

function text(font, str, x, y, size, track = 0) {
  let d = '', cx = x; const gs = font.stringToGlyphs(str), sc = size / font.unitsPerEm;
  gs.forEach((g, i) => {
    d += g.getPath(cx, y, size).toPathData(2);
    let adv = g.advanceWidth * sc + track;
    if (i < gs.length - 1) adv += font.getKerningValue(g, gs[i + 1]) * sc;
    cx += adv;
  });
  return { d, w: cx - x - track };
}
const tw = (font, s, size, track = 0) => text(font, s, 0, 0, size, track).w;
const capH = (font, size) => font.charToGlyph('H').getBoundingBox().y2 * size / font.unitsPerEm;
// Größe so wählen, dass der Text genau `width` breit ist (Sperrung proportional zur Größe)
function fit(font, s, width, trackEm) {
  const w100 = tw(font, s, 100, trackEm * 100); const size = 100 * width / w100;
  return { size, track: trackEm * size };
}

// Ionische Säule: Abakus, Voluten, Echinus, kannelierter Schaft mit leichter Verjüngung, Basis
function column(x, top, w, h, c, { volutes = true, flutes = 5 } = {}) {
  let s = '';
  const ab = h * 0.055, r = volutes ? w * 0.13 : 0, capB = top + ab + (volutes ? r * 1.7 : h * 0.06);
  const baseH = h * 0.11, shaftBot = top + h - baseH;
  s += `<rect x="${x}" y="${top}" width="${w}" height="${ab}" fill="${c.capital}"/>`;
  if (volutes) {
    const cy = top + ab + r * 0.95;
    for (const cx of [x + r * 1.05, x + w - r * 1.05]) {
      s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.82}" fill="none" stroke="${c.capital}" stroke-width="${r * 0.32}"/>`;
      s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.22}" fill="${c.capital}"/>`;
    }
    s += `<rect x="${x + r * 1.05}" y="${top + ab}" width="${w - r * 2.1}" height="${r * 0.55}" fill="${c.capital}"/>`;
    s += `<path d="M${x + w * 0.27} ${top + ab + r * 0.55} H${x + w * 0.73} Q${x + w * 0.70} ${capB} ${x + w * 0.5} ${capB} Q${x + w * 0.30} ${capB} ${x + w * 0.27} ${top + ab + r * 0.55} Z" fill="${c.capital}"/>`;
  } else {
    s += `<path d="M${x + w * 0.08} ${top + ab} H${x + w * 0.92} L${x + w * 0.8} ${capB} H${x + w * 0.2} Z" fill="${c.capital}"/>`;
  }
  // Schaft: Streifen in zwei Tönen mit kleinen Fugen, unten etwas breiter (Entasis)
  const topW = w * 0.52, botW = w * 0.6, sTop = capB + h * 0.02;
  const cxm = x + w / 2, n = flutes;
  for (let i = 0; i < n; i++) {
    const a = i / n, b = (i + 1) / n, gap = 0.12 / n;
    const xt0 = cxm - topW / 2 + topW * (a + gap), xt1 = cxm - topW / 2 + topW * (b - gap);
    const xb0 = cxm - botW / 2 + botW * (a + gap), xb1 = cxm - botW / 2 + botW * (b - gap);
    const fill = i % 2 ? c.shaftLight : c.shaft;
    s += `<path d="M${xt0} ${sTop} L${xt1} ${sTop} L${xb1} ${shaftBot} L${xb0} ${shaftBot} Z" fill="${fill}"/>`;
  }
  const t1 = baseH * 0.42, t2 = baseH * 0.5;
  s += `<rect x="${cxm - w * 0.36}" y="${shaftBot + baseH * 0.06}" width="${w * 0.72}" height="${t1}" rx="${t1 / 2}" fill="${c.base}"/>`;
  s += `<rect x="${x + w * 0.06}" y="${top + h - t2}" width="${w * 0.88}" height="${t2}" fill="${c.base}"/>`;
  return s;
}
const colors = (t, gold = false) => ({
  capital: gold ? t.gold : t.tone, base: gold ? t.gold : t.tone, shaft: t.tone, shaftLight: t.light,
});

function svg(vb, inner, label = 'Forum Immobilien') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.map((v) => +v.toFixed(1)).join(' ')}" role="img" aria-label="${label}">${inner}</svg>`;
}

// Waagerechte Wortmarke: FORUM [Säule] IMMOBILIEN, Unterzeile mit Haarlinien
function horizontal(t, { font, track, gold = false, subFont, subMixed = false, rules = true, colScale = 1.25 }) {
  const size = 100, ch = capH(font, size), tr = track * size;
  const w1 = tw(font, 'FORUM', size, tr), colW = ch * 0.78, gap = ch * 0.34;
  const w2 = tw(font, 'IMMOBILIEN', size, tr), W = w1 + gap * 2 + colW + w2;
  const base = 0, colH = ch * colScale, colTop = base - colH;
  let s = `<path fill="${t.ink}" d="${text(font, 'FORUM', 0, base, size, tr).d}${text(font, 'IMMOBILIEN', w1 + gap * 2 + colW, base, size, tr).d}"/>`;
  s += column(w1 + gap, colTop, colW, colH, colors(t, gold));
  const sf = subFont || font;
  const subStr = subMixed ? SUB_MIXED : SUB;
  const subW = rules ? W * 0.74 : W;
  const { size: ss, track: st } = fit(sf, subStr, subW, subMixed ? 0.01 : 0.16);
  const sy = base + ch * 0.32 + capH(sf, ss);
  s += `<path fill="${gold ? t.gold : t.ink}" d="${text(sf, subStr, (W - subW) / 2, sy, ss, st).d}"/>`;
  if (rules) {
    const ly = sy - capH(sf, ss) / 2, lw = (W - subW) / 2 - ch * 0.12;
    s += `<rect x="0" y="${ly}" width="${lw}" height="${Math.max(1.2, ch * 0.018)}" fill="${gold ? t.gold : t.ink}"/>`;
    s += `<rect x="${W - lw}" y="${ly}" width="${lw}" height="${Math.max(1.2, ch * 0.018)}" fill="${gold ? t.gold : t.ink}"/>`;
  }
  const pad = ch * 0.12;
  return svg([-pad, colTop - pad, W + pad * 2, sy - colTop + pad * 2 + ss * 0.1], s);
}

// Zeichen links, Schrift rechts gestapelt
function stacked(t, emblem, { font, subFont, gold = false }) {
  const S = 100, ch = capH(font, S);
  const trF = 0.22 * S, wF = tw(font, 'FORUM', S, trF);
  const { size: s2, track: t2 } = fit(font, 'IMMOBILIEN', wF, 0.06);
  const sf = subFont || font;
  const { size: s3, track: t3 } = fit(sf, SUB, wF, 0.08);
  const emH = ch * 2.35, emW = emH * 0.62, gap = emW * 0.32, x0 = emW + gap;
  const y1 = ch, y2 = y1 + ch * 0.32 + capH(font, s2), y3 = y2 + ch * 0.3 + capH(sf, s3);
  const top = y3 - emH + (emH - y3) / 2 * 0; const emTop = (y3 - emH) / 2 + 0;
  let s = emblem(0, Math.min(0, (y3 - emH) / 2), emW, emH, t, gold);
  s += `<path fill="${t.ink}" d="${text(font, 'FORUM', x0, y1, S, trF).d}${text(font, 'IMMOBILIEN', x0, y2, s2, t2).d}"/>`;
  s += `<rect x="${x0}" y="${y2 + ch * 0.14}" width="${wF}" height="${ch * 0.018}" fill="${gold ? t.gold : t.ink}"/>`;
  s += `<path fill="${gold ? t.gold : t.ink}" d="${text(sf, SUB, x0, y3, s3, t3).d}"/>`;
  const pad = ch * 0.12, yTop = Math.min(0, (y3 - emH) / 2);
  return svg([-pad, yTop - pad, x0 + wF + pad * 2, Math.max(emH, y3 - yTop) + pad * 2], s);
}

// Zeichen: Säule in einem Rundbogen (Portal)
function portal(x, y, w, h, t, gold) {
  const sw = w * 0.07, r = w / 2 - sw / 2;
  let s = `<path d="M${x + sw / 2} ${y + h} V${y + r + sw / 2} A${r} ${r} 0 0 1 ${x + w - sw / 2} ${y + r + sw / 2} V${y + h}" fill="none" stroke="${gold ? t.gold : t.ink}" stroke-width="${sw}"/>`;
  s += column(x + w * 0.24, y + h * 0.3, w * 0.52, h * 0.62, colors(t, false));
  s += `<rect x="${x - sw * 0.3}" y="${y + h - sw * 0.9}" width="${w + sw * 0.6}" height="${sw * 0.9}" fill="${gold ? t.gold : t.ink}"/>`;
  return s;
}
// Zeichen: Monogramm F, die Säule ist der Stamm
function monoF(x, y, w, h, t, gold) {
  const cw = w * 0.5;
  let s = column(x, y, cw, h, colors(t, gold), { volutes: false, flutes: 3 });
  const bar = h * 0.075;
  s += `<rect x="${x + cw * 0.86}" y="${y}" width="${w - cw * 0.86}" height="${bar}" fill="${gold ? t.gold : t.tone}"/>`;
  s += `<rect x="${x + cw * 0.7}" y="${y + h * 0.44}" width="${(w - cw * 0.86) * 0.72 + cw * 0.08}" height="${bar}" fill="${gold ? t.gold : t.tone}"/>`;
  return s;
}

// Zentriertes Wappen: Säule oben, Schrift darunter
function crest(t, { font, subFont, gold = true }) {
  const S = 100, ch = capH(font, S), tr = 0.12 * S;
  const W = tw(font, 'FORUM IMMOBILIEN', S, tr);
  const colH = ch * 2.1, colW = colH * 0.6, colTop = -colH - ch * 0.55;
  let s = column(W / 2 - colW / 2, colTop, colW, colH, colors(t, gold));
  const lw = W / 2 - colW / 2 - ch * 0.5;
  s += `<rect x="0" y="${-ch * 0.55 - ch * 0.04}" width="${W}" height="${ch * 0.028}" fill="${gold ? t.gold : t.ink}"/>`;
  s += `<path fill="${t.ink}" d="${text(font, 'FORUM IMMOBILIEN', 0, ch, S, tr).d}"/>`;
  const sf = subFont || font;
  const { size: ss, track: st } = fit(sf, SUB, W * 0.9, 0.14);
  const sy = ch + ch * 0.45 + capH(sf, ss);
  s += `<path fill="${gold ? t.gold : t.ink}" d="${text(sf, SUB, W * 0.05, sy, ss, st).d}"/>`;
  const pad = ch * 0.15;
  return svg([-pad, colTop - pad, W + pad * 2, sy - colTop + pad * 2], s);
}

// Favicons: Zeichen auf Badge
function favBadge(t, draw) {
  return svg([0, 0, 64, 64], `<rect width="64" height="64" rx="13" fill="${t.ink === '#ffffff' ? '#ffffff' : t.ink}"/>${draw}`);
}
const FT = { ...THEMES.dunkel, bg: '#1e3a5f' }; // Favicon: hell auf Blau
const fav = {
  saeule: (gold) => favBadge(THEMES.hell, column(18, 10, 28, 45, { capital: gold ? '#d8b77a' : '#fff', base: gold ? '#d8b77a' : '#fff', shaft: '#fff', shaftLight: '#c9d6e6' }, { flutes: 3 })),
  portal: () => favBadge(THEMES.hell, portal(12, 8, 40, 48, { ink: '#fff', tone: '#fff', light: '#c9d6e6', gold: '#fff' }, false)),
  f: () => favBadge(THEMES.hell, monoF(16, 11, 34, 42, { ink: '#fff', tone: '#fff', light: '#c9d6e6', gold: '#fff' }, false)),
};

const KONZEPTE = [
  { id: 'a-verfeinert', name: 'A · Verfeinert',
    idee: 'Am nächsten am Original. Feinere Schrift mit mehr Luft, echte ionische Säule mit Voluten, Unterzeile in gesperrten Versalien zwischen Haarlinien.',
    logo: (t) => horizontal(t, { font: FONT.cormorant, track: 0.06 }), fav: () => fav.saeule(false) },
  { id: 'b-gold', name: 'B · Gold-Kapitell',
    idee: 'Wie A, aber Kapitell, Basis und Unterzeile in einem gedämpften Messington. Ein kleiner warmer Akzent, der das Blau edler wirken lässt.',
    logo: (t) => horizontal(t, { font: FONT.cormorant, track: 0.06, gold: true }), fav: () => fav.saeule(true) },
  { id: 'c-portal', name: 'C · Portal',
    idee: 'Die Säule steht in einem Rundbogen, wie ein Eingang. Eigenständiges Zeichen, das auch allein funktioniert (Schild, Social Media).',
    logo: (t) => stacked(t, portal, { font: FONT.cormorant, gold: true }), fav: () => fav.portal() },
  { id: 'd-monogramm', name: 'D · Monogramm F',
    idee: 'Die Säule bildet den Stamm eines F. Modern und markant, entfernt sich aber am weitesten vom heutigen Logo.',
    logo: (t) => stacked(t, monoF, { font: FONT.cormorant, gold: false }), fav: () => fav.f() },
  { id: 'e-inschrift', name: 'E · Römische Inschrift',
    idee: 'Schrift nach römischen Inschriften, passend zu „Forum“. Säule zentriert darüber, wie ein Siegel. Wirkt am feierlichsten.',
    logo: (t) => crest(t, { font: FONT.cinzel, gold: true }), fav: () => fav.saeule(true) },
  { id: 'f-klassisch', name: 'F · Original, nur sauber',
    idee: 'Das heutige Logo fast unverändert, nur mit der neuen Säule. Sicher, aber kaum ein eigener Touch.',
    logo: (t) => horizontal(t, { font: FONT.caslon, track: 0.03, subMixed: true, rules: false, colScale: 1.18 }), fav: () => fav.saeule(false) },
];

module.exports = { KONZEPTE, THEMES, horizontal, stacked, crest, portal, monoF, column, fav, FONT };

if (require.main === module) {
  const out = process.argv[2] || 'out-konzepte'; fs.mkdirSync(out, { recursive: true });
  for (const k of KONZEPTE) {
    for (const [tn, t] of Object.entries(THEMES)) fs.writeFileSync(`${out}/${k.id}-${tn}.svg`, k.logo(t));
    fs.writeFileSync(`${out}/${k.id}-favicon.svg`, k.fav());
  }
  const rows = KONZEPTE.map((k) => `
  <section class="k"><h2>${k.name}</h2><p>${k.idee}</p>
    <div class="grid">
      <div class="f hell"><img src="${k.id}-hell.svg" alt=""></div>
      <div class="f dunkel"><img src="${k.id}-dunkel.svg" alt=""></div>
      <div class="f hell"><img src="${k.id}-mono.svg" alt=""></div>
      <div class="f hell row"><img src="${k.id}-favicon.svg" width="64" alt=""><img src="${k.id}-favicon.svg" width="32" alt=""><img src="${k.id}-favicon.svg" width="16" alt=""><img class="klein" src="${k.id}-hell.svg" alt=""></div>
    </div></section>`).join('');
  fs.writeFileSync(`${out}/vorschau.html`, `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Logo-Konzepte Forum Immobilien</title>
<style>body{margin:0;background:#eef0f3;font-family:system-ui,sans-serif;color:#1a1a1a}main{max-width:1000px;margin:0 auto;padding:24px 16px}
h1{font-size:22px;margin:0 0 4px}h2{font-size:17px;margin:0 0 4px}.k{background:#fff;border-radius:14px;padding:20px;margin:0 0 18px}.k p{margin:0 0 14px;color:#444;font-size:14px;max-width:70ch}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.f{border-radius:10px;padding:22px;display:flex;align-items:center;justify-content:center;min-height:120px;border:1px solid #e3e6ea}
.f img{max-width:100%;max-height:150px}.hell{background:#fff}.dunkel{background:#1b2a4a;border-color:#1b2a4a}.row{gap:14px;align-items:flex-end}.row .klein{width:170px;margin-left:auto}
@media(max-width:640px){.grid{grid-template-columns:1fr}}</style></head><body><main>
<h1>Forum Immobilien · Logo-Konzepte, Runde 1</h1><p style="color:#555;font-size:14px">Jedes Konzept auf Weiß, auf Dunkelblau, einfarbig, als Favicon (64/32/16 px) und klein. Säule, Name und Blau bleiben überall erhalten.</p>
${rows}</main></body></html>`);
  console.log('ok');
}
