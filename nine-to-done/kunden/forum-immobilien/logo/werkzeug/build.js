// Baut das Forum-Immobilien-Logo als SVG mit Text in Vektorpfaden.
const opentype = require('opentype.js'), fs = require('fs');
const F = (n) => opentype.loadSync(`node_modules/@fontsource/${n}.woff`);
const variants = {
  caslon:   { main: F('libre-caslon-text/files/libre-caslon-text-latin-400-normal'), sub: F('libre-caslon-text/files/libre-caslon-text-latin-400-normal') },
  garamond: { main: F('eb-garamond/files/eb-garamond-latin-500-normal'), sub: F('eb-garamond/files/eb-garamond-latin-700-normal') },
  cormorant:{ main: F('cormorant-garamond/files/cormorant-garamond-latin-600-normal'), sub: F('cormorant-garamond/files/cormorant-garamond-latin-700-normal') },
};
const BLUE = process.argv[2] || '#2e5b86';
function textPath(font, str, x, y, size, track = 0) {
  // mit Unterschneidung (kerning) und optionaler Sperrung
  let d = '', cx = x; const glyphs = font.stringToGlyphs(str); const scale = size / font.unitsPerEm;
  glyphs.forEach((g, i) => {
    d += g.getPath(cx, y, size).toPathData(2);
    let adv = g.advanceWidth * scale + track;
    if (i < glyphs.length - 1) adv += font.getKerningValue(g, glyphs[i + 1]) * scale;
    cx += adv;
  });
  return { d, width: cx - x - track };
}
function width(font, s, size, track = 0) { return textPath(font, s, 0, 0, size, track).width; }
function column(x, top, h, w) {
  // Säule: Abakus, Echinus, kannelierter Schaft, Basis
  const ab = h * 0.13, ech = h * 0.08, base = h * 0.08, shaftTop = top + ab + ech, shaftBot = top + h - base;
  const sw = w * 0.74, sx = x + (w - sw) / 2, flutes = 4, fw = sw / (flutes * 2 - 1);
  let s = `<rect x="${x}" y="${top}" width="${w}" height="${ab}" rx="${ab*0.25}"/>`;
  s += `<path d="M${x + w*0.06} ${top+ab} H${x + w*0.94} Q${x+w*0.86} ${top+ab+ech} ${sx+sw} ${top+ab+ech} H${sx} Q${x+w*0.14} ${top+ab+ech} ${x+w*0.06} ${top+ab} Z"/>`;
  for (let i = 0; i < flutes; i++) s += `<rect x="${(sx + i*2*fw).toFixed(2)}" y="${shaftTop.toFixed(2)}" width="${fw.toFixed(2)}" height="${(shaftBot-shaftTop).toFixed(2)}"/>`;
  s += `<rect x="${sx - w*0.04}" y="${shaftBot}" width="${sw + w*0.08}" height="${base}" rx="${base*0.2}"/>`;
  return s;
}
function logo(v, { blue = BLUE, withSub = true, mono = null } = {}) {
  const { main, sub } = variants[v]; const size = 100, track = 4;
  const capH = main.charToGlyph('H').getBoundingBox().y2 * size / main.unitsPerEm;
  const w1 = width(main, 'FORUM', size, track), colW = capH * 0.62, gap = capH * 0.34;
  const w2 = width(main, 'IMMOBILIEN', size, track), total = w1 + gap * 2 + colW + w2;
  const base = capH + 10;
  const p1 = textPath(main, 'FORUM', 0, base, size, track), p2 = textPath(main, 'IMMOBILIEN', w1 + gap*2 + colW, base, size, track);
  const colTop = base - capH * 1.18, colH = capH * 1.18;
  const fill = mono || blue;
  let g = `<g fill="${fill}"><path d="${p1.d}"/><path d="${p2.d}"/></g>`;
  g += `<g fill="${mono || 'url(#saeule)'}">${column(w1 + gap, colTop, colH, colW)}</g>`;
  let H = base + 8;
  if (withSub) {
    const subStr = 'Immobilien · Finanzierungen · Hausverwaltung';
    let ss = 40, sw = width(sub, subStr, ss, 0.6); ss = ss * total / sw; // auf volle Breite
    const sy = base + ss * 1.25; const ps = textPath(sub, subStr, 0, sy, ss, 0.6 * ss / 40);
    g += `<path fill="${mono || blue}" fill-opacity="${mono ? 1 : 0.92}" d="${ps.d}"/>`; H = sy + ss * 0.35;
  }
  const defs = `<defs><linearGradient id="saeule" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${blue}"/><stop offset="1" stop-color="${blue}" stop-opacity="0.72"/></linearGradient></defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-4 ${colTop - 4} ${(total + 8).toFixed(1)} ${(H - colTop + 8).toFixed(1)}" role="img" aria-label="Forum Immobilien">${defs}${g}</svg>`;
}
function favicon(blue = BLUE) {
  // Säule weiß auf blauem Badge
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="${blue}"/><g fill="#fff">${column(19, 10, 44, 26)}</g></svg>`;
}
module.exports = { logo, favicon, variants };
if (require.main === module) {
  fs.mkdirSync('out', { recursive: true });
  for (const v of Object.keys(variants)) fs.writeFileSync(`out/logo-${v}.svg`, logo(v));
  fs.writeFileSync('out/favicon.svg', favicon());
  console.log('ok', fs.readdirSync('out'));
}
