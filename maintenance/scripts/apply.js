// node apply.js <contentDir> <merges.tsv> [--write]
const fs = require('fs'), path = require('path');
const [contentDir, tsv, flag] = process.argv.slice(2);
const WRITE = flag === '--write';
const noteDir = path.join(contentDir, '01_IT Tech');

// ---- merge map (resolve chains) ----
const map = {};
for (const line of fs.readFileSync(tsv, 'utf8').replace(/^﻿/, '').split(/\r?\n/)) {
  if (!line.includes('\t')) continue;
  const [o, c] = line.split('\t').map(s => s.trim());
  if (o && c && o !== c) map[o] = c;
}
const resolve = n => { let s = 0; while (map[n] && s++ < 10) n = map[n]; return n; };
const lowerMap = {};
for (const k of Object.keys(map)) lowerMap[k.toLowerCase()] = k;
const canonOf = t => {
  if (map[t]) return resolve(t);
  const k = lowerMap[t.toLowerCase()];
  return k ? resolve(k) : null;
};
const canons = new Set(Object.keys(map).map(resolve));

// ---- collect md files ----
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith('.')) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (e.name.endsWith('.md')) files.push(p);
  }
})(contentDir);

const LINK = /(!?)\[\[([^\]\|#\\\n]+?)(#[^\]\|\\\n]*)?(?:(\\?\|)([^\]\n]*))?\]\]/g;
const baseName = t => { t = t.trim(); if (t.endsWith('.md')) t = t.slice(0, -3); const i = t.lastIndexOf('/'); return i >= 0 ? t.slice(i + 1) : t; };

const report = { linksRewritten: 0, filesChanged: 0, selfLinks: 0, dupRelated: 0, mocRemoved: [], mocConverted: [], deleted: [] };

function titleOf(name) {
  const p = path.join(noteDir, name + '.md');
  if (!fs.existsSync(p)) return name;
  const m = fs.readFileSync(p, 'utf8').match(/^title:\s*(.+)$/m);
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : name;
}
function domainOf(name) {
  const p = path.join(noteDir, name + '.md');
  if (!fs.existsSync(p)) return null;
  const m = fs.readFileSync(p, 'utf8').match(/소속 도메인\*\*:\s*\[\[(00_[^|\]]+)/);
  return m ? m[1] : null;
}

const isMoc = f => /^00_.*MOC\.md$/.test(path.basename(f));
const oldSet = new Set(Object.keys(map));

// ---- pass 1: rewrite links in non-MOC notes ----
for (const f of files) {
  if (isMoc(f)) continue;
  const self = path.basename(f, '.md');
  if (oldSet.has(self)) continue; // will be deleted
  let src = fs.readFileSync(f, 'utf8');
  let out = src.replace(LINK, (all, bang, tgt, hash, pipe, alias) => {
    const b = baseName(tgt);
    const c = canonOf(b);
    if (!c) return all;
    report.linksRewritten++;
    const sep = pipe || '|';
    const disp = alias !== undefined ? alias : b;
    return `${bang}[[${c}${hash || ''}${sep}${disp}]]`;
  });
  // self links: inline -> plain text, related-topic bullets -> removed
  const lines = out.split('\n');
  const kept = [];
  let inRelated = false; const seen = new Set();
  for (let ln of lines) {
    if (/핵심 연관 토픽/.test(ln)) { inRelated = true; kept.push(ln); continue; }
    if (inRelated && !/^\s+-\s/.test(ln) && ln.trim() !== '') inRelated = false;
    if (inRelated) {
      const m = ln.match(/^\s+-\s*\[\[([^\]\|#\\]+)/);
      if (m) {
        const t = baseName(m[1]);
        if (t === self) { report.selfLinks++; continue; }
        if (seen.has(t)) { report.dupRelated++; continue; }
        seen.add(t);
      }
      kept.push(ln); continue;
    }
    ln = ln.replace(LINK, (all, bang, tgt, hash, pipe, alias) => {
      if (bang || hash) return all;
      if (baseName(tgt) !== self) return all;
      report.selfLinks++;
      return alias !== undefined ? alias : baseName(tgt);
    });
    kept.push(ln);
  }
  out = kept.join('\n');
  if (out !== src) { report.filesChanged++; if (WRITE) fs.writeFileSync(f, out, 'utf8'); }
}

// ---- pass 2: MOCs ----
const mocFiles = files.filter(isMoc);
const mocName = f => path.basename(f, '.md');
// gather bullet lines per canon
const mocLines = {}; // canon -> [{moc, idx, isOld}]
const mocText = {};
for (const f of mocFiles) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  mocText[f] = lines;
  lines.forEach((ln, i) => {
    const m = ln.match(/^-\s*\[\[([^\]\|#\\]+)/);
    if (!m) return;
    const b = baseName(m[1]);
    const c = canonOf(b) || (canons.has(b) ? b : null);
    if (!c) return;
    (mocLines[c] = mocLines[c] || []).push({ f, i, isOld: b !== c });
  });
}
const drop = new Map(); // f -> Set(idx)
const conv = new Map(); // f -> Map(idx -> canon)
for (const [c, arr] of Object.entries(mocLines)) {
  const dom = domainOf(c);
  let keep = arr.find(x => !x.isOld && mocName(x.f) === dom)
    || arr.find(x => mocName(x.f) === dom)
    || arr.find(x => !x.isOld)
    || arr[0];
  for (const x of arr) {
    if (x === keep) { if (x.isOld) { if (!conv.has(x.f)) conv.set(x.f, new Map()); conv.get(x.f).set(x.i, c); report.mocConverted.push(`${mocName(x.f)}: -> ${c}`); } continue; }
    if (!drop.has(x.f)) drop.set(x.f, new Set()); drop.get(x.f).add(x.i);
    report.mocRemoved.push(`${mocName(x.f)}: ${x.f && mocText[x.f][x.i].trim()}`);
  }
}
const domainCounts = {};
for (const f of mocFiles) {
  let lines = mocText[f];
  const d = drop.get(f) || new Set(), cv = conv.get(f) || new Map();
  lines = lines.map((ln, i) => cv.has(i) ? `- [[${cv.get(i)}|${titleOf(cv.get(i))}]]` : ln).filter((_, i) => !d.has(i));
  // rewrite remaining in-text links to old names
  lines = lines.map(ln => ln.replace(LINK, (all, bang, tgt, hash, pipe, alias) => {
    const c = canonOf(baseName(tgt)); if (!c) return all;
    return `${bang}[[${c}${hash || ''}${pipe || '|'}${alias !== undefined ? alias : baseName(tgt)}]]`;
  }));
  // recount sections
  let total = 0;
  for (let i = 0; i < lines.length; i++) {
    const h = lines[i].match(/^(###\s+.*?\()(\d+)(\)\s*)$/);
    if (!h) continue;
    let n = 0;
    for (let j = i + 1; j < lines.length && !/^#{1,3}\s/.test(lines[j]); j++) if (/^-\s*\[\[/.test(lines[j])) n++;
    lines[i] = h[1] + n + h[3]; total += n;
  }
  if (total) {
    domainCounts[mocName(f)] = total;
    lines = lines.map(ln => ln.replace(/(소속 토픽 수\*\*:\s*\*\*)\d+(개\*\*)/, `$1${total}$2`));
  }
  const out = lines.join('\n');
  if (out !== fs.readFileSync(f, 'utf8') && WRITE) fs.writeFileSync(f, out, 'utf8');
}
// master MOC
const master = mocFiles.find(f => /00_02_IT_Tech_MOC/.test(f));
if (master) {
  let t = fs.readFileSync(master, 'utf8');
  let sum = 0;
  t = t.replace(/(\[\[(00_[^|\]]+_MOC)\|[^\]]*\]\]<br\/>\()(\d+)(개\))/g, (all, a, name, n, b) => {
    const v = domainCounts[name] ?? Number(n); sum += v; return a + v + b;
  });
  t = t.replace(/(\*\*)[\d,]+(개\*\*의 핵심 기술 노트)/, `$1${sum.toLocaleString('en-US')}$2`);
  report.domainCounts = domainCounts; report.masterTotal = sum;
  if (WRITE) fs.writeFileSync(master, t, 'utf8');
}

// ---- pass 3: delete old files ----
for (const o of Object.keys(map)) {
  const p = path.join(noteDir, o + '.md');
  if (fs.existsSync(p)) { report.deleted.push(o); if (WRITE) fs.unlinkSync(p); }
}
console.log(JSON.stringify(report, null, 1));
