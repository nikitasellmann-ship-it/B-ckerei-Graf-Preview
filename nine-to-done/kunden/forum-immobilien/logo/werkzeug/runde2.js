// Runde 2: Konzept B (Gold-Kapitell) als Hauptlogo plus Rundbogen aus C als Bildmarke.
// Aufruf: node runde2.js <ausgabeordner>
const fs = require('fs');
const { THEMES, column, FONT, text, tw, capH, fit, svg, colors } = require('./konzepte.js');

const SUB_VOLL = 'IMMOBILIEN · FINANZIERUNGEN · HAUSVERWALTUNG';
const SUB_KURZ = 'FINANZIERUNGEN · HAUSVERWALTUNG';

// Bildmarke: goldener Rundbogen, darin die Säule (Schaft blau, Kapitell gold)
function portal(x, y, w, h, t, { stroke = 0.075, colGold = true, fillBg = null } = {}) {
  const sw = w * stroke, r = w / 2 - sw / 2;
  let s = '';
  if (fillBg) s += `<path d="M${x + sw / 2} ${y + h} V${y + r + sw / 2} A${r} ${r} 0 0 1 ${x + w - sw / 2} ${y + r + sw / 2} V${y + h} Z" fill="${fillBg}"/>`;
  s += `<path d="M${x + sw / 2} ${y + h} V${y + r + sw / 2} A${r} ${r} 0 0 1 ${x + w - sw / 2} ${y + r + sw / 2} V${y + h}" fill="none" stroke="${t.gold}" stroke-width="${sw}"/>`;
  s += column(x + w * 0.25, y + h * 0.3, w * 0.5, h * 0.63, colors(t, colGold), { flutes: 5 });
  s += `<rect x="${x - sw * 0.35}" y="${y + h - sw}" width="${w + sw * 0.7}" height="${sw}" fill="${t.gold}"/>`;
  return s;
}

// Waagerecht: FORUM [Säule oder Bogen] IMMOBILIEN, optional Unterzeile
function waagerecht(t, { mitte = 'saeule', unterzeile = SUB_VOLL, subBreite = 0.86, subSperr = 0.1, linien = true }) {
  const font = FONT.cormorant, S = 100, ch = capH(font, S), tr = 0.06 * S;
  const w1 = tw(font, 'FORUM', S, tr), w2 = tw(font, 'IMMOBILIEN', S, tr);
  const mH = mitte === 'saeule' ? ch * 1.3 : ch * 1.55, mW = mitte === 'saeule' ? ch * 0.8 : mH * 0.6, gap = ch * 0.34;
  const W = w1 + gap * 2 + mW + w2, mTop = -mH + (mitte === 'saeule' ? 0 : ch * 0.04);
  let s = `<path fill="${t.ink}" d="${text(font, 'FORUM', 0, 0, S, tr).d}${text(font, 'IMMOBILIEN', w1 + gap * 2 + mW, 0, S, tr).d}"/>`;
  s += mitte === 'saeule' ? column(w1 + gap, mTop, mW, mH, colors(t, true)) : portal(w1 + gap, mTop, mW, mH, t);
  let bottom = ch * 0.1;
  if (unterzeile) {
    const sf = FONT.cormorantB, subW = W * (linien ? subBreite : 1);
    const { size: ss, track: st } = fit(sf, unterzeile, subW, subSperr);
    const sy = ch * 0.36 + capH(sf, ss);
    s += `<path fill="${t.gold}" d="${text(sf, unterzeile, (W - subW) / 2, sy, ss, st).d}"/>`;
    if (linien) {
      const ly = sy - capH(sf, ss) / 2 - ch * 0.01, lw = (W - subW) / 2 - ch * 0.14, lh = Math.max(1.4, ch * 0.022);
      s += `<rect x="0" y="${ly}" width="${lw}" height="${lh}" fill="${t.gold}"/><rect x="${W - lw}" y="${ly}" width="${lw}" height="${lh}" fill="${t.gold}"/>`;
    }
    bottom = sy + ss * 0.12;
  }
  const pad = ch * 0.12;
  return svg([-pad, mTop - pad, W + pad * 2, bottom - mTop + pad * 2], s);
}

// Bogen links, Schrift rechts (einzeilig oder gestapelt)
function mitBogen(t, { gestapelt = false, unterzeile = SUB_KURZ }) {
  const font = FONT.cormorant, sf = FONT.cormorantB, S = 100, ch = capH(font, S);
  let s = '', x0, textW, yLast;
  if (gestapelt) {
    const trF = 0.24 * S, wF = tw(font, 'FORUM', S, trF);
    const { size: s2, track: t2 } = fit(font, 'IMMOBILIEN', wF, 0.06);
    const { size: s3, track: t3 } = fit(sf, unterzeile, wF, 0.12);
    const y1 = ch, y2 = y1 + ch * 0.3 + capH(font, s2), y3 = y2 + ch * 0.36 + capH(sf, s3);
    const emH = y3 + ch * 0.02, emW = emH * 0.6; x0 = emW + emW * 0.3; textW = wF; yLast = y3;
    s += portal(0, 0, emW, emH, t);
    s += `<path fill="${t.ink}" d="${text(font, 'FORUM', x0, y1, S, trF).d}${text(font, 'IMMOBILIEN', x0, y2, s2, t2).d}"/>`;
    s += `<rect x="${x0}" y="${y2 + ch * 0.13}" width="${wF}" height="${ch * 0.02}" fill="${t.gold}"/>`;
    s += `<path fill="${t.gold}" d="${text(sf, unterzeile, x0, y3, s3, t3).d}"/>`;
  } else {
    const tr = 0.08 * S, wN = tw(font, 'FORUM IMMOBILIEN', S, tr);
    const { size: s3, track: t3 } = fit(sf, unterzeile, wN, 0.16);
    const y1 = ch, y3 = y1 + ch * 0.42 + capH(sf, s3);
    const emH = y3 + ch * 0.02, emW = emH * 0.6; x0 = emW + emW * 0.34; textW = wN; yLast = y3;
    s += portal(0, 0, emW, emH, t);
    s += `<path fill="${t.ink}" d="${text(font, 'FORUM IMMOBILIEN', x0, y1, S, tr).d}"/>`;
    s += `<path fill="${t.gold}" d="${text(sf, unterzeile, x0, y3, s3, t3).d}"/>`;
  }
  const pad = ch * 0.12;
  return svg([-pad, -pad, x0 + textW + pad * 2, yLast + ch * 0.04 + pad * 2], s);
}

// Bildmarke allein und Favicon
function bildmarke(t) { return svg([-6, -6, 72, 112], portal(0, 0, 60, 100, t)); }
function favicon() {
  const t = { ...THEMES.dunkel, gold: '#d2b07a', light: '#c9d6e6' };
  return svg([0, 0, 64, 64], `<rect width="64" height="64" rx="13" fill="#1e3a5f"/>${portal(15, 7, 34, 50, t, { stroke: 0.1 })}`);
}

const VARIANTEN = [
  { id: 'v1-klassisch', name: '1 · B, klarer',
    idee: 'Konzept B mit größerer, fetterer Unterzeile, damit sie auch klein lesbar bleibt. Säule etwas höher.',
    logo: (t) => waagerecht(t, {}), kopf: (t) => waagerecht(t, { unterzeile: null }) },
  { id: 'v2-bogen-mitte', name: '2 · B mit Bogen in der Mitte',
    idee: 'Statt der freien Säule steht der goldene Rundbogen zwischen den Wörtern. Logo und Bildmarke sind damit ein und dasselbe Zeichen.',
    logo: (t) => waagerecht(t, { mitte: 'bogen' }), kopf: (t) => waagerecht(t, { mitte: 'bogen', unterzeile: null }) },
  { id: 'v3-bogen-links', name: '3 · Bogen links, einzeilig',
    idee: 'Bildmarke links, Name in einer Zeile. Unterzeile ohne das doppelte „Immobilien“. Gut für Briefkopf und Kopfzeile der Website.',
    logo: (t) => mitBogen(t, {}), kopf: (t) => mitBogen(t, {}) },
  { id: 'v4-bogen-gestapelt', name: '4 · Bogen links, gestapelt',
    idee: 'Konzept C aufgeräumt: kompakter Block, Unterzeile ohne Doppelung. Gut für Schilder, Visitenkarten, Social Media.',
    logo: (t) => mitBogen(t, { gestapelt: true }), kopf: (t) => mitBogen(t, { gestapelt: true }) },
  { id: 'v5-b-ohne-linien', name: '5 · B, Unterzeile über volle Breite',
    idee: 'Wie Variante 1, aber ohne Haarlinien: Die Unterzeile läuft über die ganze Breite wie im heutigen Logo und wird dadurch am größten.',
    logo: (t) => waagerecht(t, { linien: false, subSperr: 0.14 }), kopf: (t) => waagerecht(t, { unterzeile: null }) },
];

if (require.main === module) {
  const out = process.argv[2] || 'out-runde2'; fs.mkdirSync(out, { recursive: true });
  for (const v of VARIANTEN) {
    for (const [tn, t] of Object.entries(THEMES)) fs.writeFileSync(`${out}/${v.id}-${tn}.svg`, v.logo(t));
    fs.writeFileSync(`${out}/${v.id}-kopfzeile.svg`, v.kopf(THEMES.hell));
  }
  for (const [tn, t] of Object.entries(THEMES)) fs.writeFileSync(`${out}/bildmarke-${tn}.svg`, bildmarke(t));
  fs.writeFileSync(`${out}/favicon.svg`, favicon());
  const rows = VARIANTEN.map((v) => `
  <section class="k"><h2>${v.name}</h2><p>${v.idee}</p>
    <div class="grid">
      <div class="f hell"><img src="${v.id}-hell.svg" alt=""></div>
      <div class="f dunkel"><img src="${v.id}-dunkel.svg" alt=""></div>
      <div class="f hell"><img src="${v.id}-mono.svg" alt=""></div>
      <div class="f hell col"><span>Kopfzeile Handy (180 px breit)</span><div class="phone"><img src="${v.id}-kopfzeile.svg" alt=""><b>☰</b></div></div>
    </div></section>`).join('');
  fs.writeFileSync(`${out}/vorschau.html`, `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Logo Runde 2 Forum Immobilien</title>
<style>body{margin:0;background:#eef0f3;font-family:system-ui,sans-serif;color:#1a1a1a}main{max-width:1000px;margin:0 auto;padding:24px 16px}
h1{font-size:22px;margin:0 0 4px}h2{font-size:17px;margin:0 0 4px}.k{background:#fff;border-radius:14px;padding:20px;margin:0 0 18px}.k p{margin:0 0 14px;color:#444;font-size:14px;max-width:70ch}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.f{border-radius:10px;padding:22px;display:flex;align-items:center;justify-content:center;min-height:120px;border:1px solid #e3e6ea}
.f img{max-width:100%;max-height:150px}.hell{background:#fff}.dunkel{background:#1b2a4a;border-color:#1b2a4a}.col{flex-direction:column;gap:8px;font-size:12px;color:#666}
.phone{width:300px;display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border:1px solid #e3e6ea;border-radius:8px}.phone img{width:180px;max-height:none}.phone b{color:#1e3a5f;font-size:20px}
.marke{display:flex;gap:18px;align-items:flex-end;flex-wrap:wrap}.marke img{height:110px}
@media(max-width:640px){.grid{grid-template-columns:1fr}}</style></head><body><main>
<h1>Forum Immobilien · Logo Runde 2</h1><p style="color:#555;font-size:14px">Basis: Konzept B (Gold-Kapitell) als Logo, Rundbogen aus C als Bildmarke für Favicon, Profilbilder, Schilder.</p>
<section class="k"><h2>Bildmarke und Favicon (für alle Varianten gleich)</h2><p>Für Google- und ImmoScout-Profilbild, Instagram, Verkaufsschild, Stempel und den Browser-Tab.</p>
<div class="marke"><div class="f hell"><img src="bildmarke-hell.svg" alt=""></div><div class="f dunkel"><img src="bildmarke-dunkel.svg" alt=""></div><div class="f hell"><img src="bildmarke-mono.svg" alt=""></div>
<div class="f hell" style="gap:14px;align-items:flex-end"><img src="favicon.svg" style="height:64px"><img src="favicon.svg" style="height:32px"><img src="favicon.svg" style="height:16px"></div></div></section>
${rows}</main></body></html>`);
  console.log('ok');
}
module.exports = { VARIANTEN, waagerecht, mitBogen, portal, bildmarke, favicon };
