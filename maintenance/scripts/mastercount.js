// recount every domain MOC and sync numbers in the master MOC (mermaid + table + total)
const fs = require('fs'), path = require('path');
const d = process.argv[2];
const counts = {};
for (const n of fs.readdirSync(d).filter(f => /^00_.*_MOC\.md$/.test(f) && !f.startsWith('00_02'))) {
  const t = fs.readFileSync(path.join(d, n), 'utf8');
  const m = t.match(/소속 토픽 수\*\*:\s*\*\*(\d+)개/);
  counts[n.replace('.md', '')] = m ? Number(m[1]) : 0;
}
const mp = path.join(d, '00_02_IT_Tech_MOC.md');
let t = fs.readFileSync(mp, 'utf8');
t = t.replace(/(\[\[(00_[^|\\\]]+_MOC)(?:\\?\|)[^\]]*\]\][^\n]*?\|\s*\*\*)(\d+)(\*\*)/g, (a, pre, name, n, post) => counts[name] != null ? pre + counts[name] + post : a);
t = t.replace(/(\[\[(00_[^|\\\]]+_MOC)\|[^\]]*\]\]<br\/>\()(\d+)(개\))/g, (a, pre, name, n, post) => counts[name] != null ? pre + counts[name] + post : a);
const sum = Object.values(counts).reduce((a, b) => a + b, 0);
t = t.replace(/(\*\*)[\d,]+(개\*\*의 핵심 기술 노트)/, `$1${sum.toLocaleString('en-US')}$2`);
fs.writeFileSync(mp, t, 'utf8');
console.log(counts, sum);
console.log(t.split('\n').filter(l => /\d+개|\*\*\d+\*\*/.test(l)).join('\n'));
