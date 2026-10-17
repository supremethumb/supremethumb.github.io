// node linkcheck.js <contentDir>  -> unresolved wikilinks in 01_IT Tech
const fs = require('fs'), path = require('path');
const contentDir = process.argv[2];
const names = new Map(); // lower name -> real
const aliases = new Map(); // lower alias -> note
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else {
      const rel = path.relative(contentDir, p).replace(/\\/g, '/');
      const base = e.name.replace(/\.md$/, '');
      names.set(base.toLowerCase(), base); names.set(rel.toLowerCase(), base); names.set(rel.replace(/\.md$/, '').toLowerCase(), base);
      if (e.name.endsWith('.md')) {
        files.push(p);
        const fm = fs.readFileSync(p, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (fm) { const a = fm[1].match(/aliases:\s*\r?\n((?:\s+-.*\r?\n?)+)/); if (a) for (const l of a[1].split(/\r?\n/)) { const v = l.replace(/^\s+-\s*/, '').trim().replace(/^["']|["']$/g, ''); if (v) aliases.set(v.toLowerCase(), base); } }
      }
    }
  }
})(contentDir);
const LINK = /!?\[\[([^\]\|#\\\n]*?)(#[^\]\|\\\n]*)?(?:\\?\|[^\]\n]*)?\]\]/g;
const bad = {}; const viaAlias = {}; const pathStyle = {};
for (const f of files) {
  if (!f.includes('01_IT Tech')) continue;
  const txt = fs.readFileSync(f, 'utf8').replace(/```(?!mermaid)[\s\S]*?```/g, '');
  const me = path.basename(f, '.md');
  for (const m of txt.matchAll(LINK)) {
    let t = m[1].trim(); if (!t) continue;
    if (t.includes('/')) (pathStyle[t] = pathStyle[t] || new Set()).add(me);
    const k = t.toLowerCase();
    if (names.has(k)) continue;
    const b = t.split('/').pop().toLowerCase();
    if (names.has(b)) continue;
    if (aliases.has(k) || aliases.has(b)) { (viaAlias[t] = viaAlias[t] || new Set()).add(me); continue; }
    (bad[t] = bad[t] || new Set()).add(me);
  }
}
const fmt = o => Object.entries(o).sort((a, b) => b[1].size - a[1].size).map(([t, s]) => `${s.size}\t${t}\t<- ${[...s].slice(0, 4).join(' ; ')}`).join('\n');
console.log('### UNRESOLVED (' + Object.keys(bad).length + ')\n' + fmt(bad));
console.log('\n### ALIAS-ONLY (' + Object.keys(viaAlias).length + ')\n' + fmt(viaAlias));
console.log('\n### PATH-STYLE (' + Object.keys(pathStyle).length + ')\n' + fmt(pathStyle));
