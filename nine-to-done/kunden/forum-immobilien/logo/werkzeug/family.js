const { logo, favicon } = require('./build.js'); const fs = require('fs'); const out = process.argv[2];
const BLUE = '#2e5b86';
fs.writeFileSync(`${out}/forum-logo.svg`, logo('caslon', { blue: BLUE }));
fs.writeFileSync(`${out}/forum-logo-ohne-unterzeile.svg`, logo('caslon', { blue: BLUE, withSub: false }));
fs.writeFileSync(`${out}/forum-logo-weiss.svg`, logo('caslon', { mono: '#ffffff' }));
fs.writeFileSync(`${out}/forum-logo-schwarz.svg`, logo('caslon', { mono: '#1a1a1a' }));
fs.writeFileSync(`${out}/favicon.svg`, favicon(BLUE));
