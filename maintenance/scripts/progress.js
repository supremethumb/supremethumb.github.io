// per-domain polish progress: a note counts as polished if modified after the polish sessions started
const fs = require('fs'), path = require('path');
const d = process.argv[2];
const since = new Date(process.argv[3]).getTime();
const done = new Set(process.argv[4] ? process.argv[4].split('|') : []); // polished in the merge session
const out = {}; const lists = {};
for (const n of fs.readdirSync(d).filter(f => f.endsWith('.md') && !f.startsWith('00_'))) {
  const t = fs.readFileSync(path.join(d, n), 'utf8');
  const m = t.match(/소속 도메인\*\*:\s*\[\[00_([^_|\]]+)_MOC/);
  const dom = m ? m[1] : '(none)';
  const base = n.replace(/\.md$/, '');
  const st = fs.statSync(path.join(d, n)).mtimeMs >= since ? 'polished' : done.has(base) ? 'merged' : 'todo';
  out[dom] = out[dom] || { polished: 0, merged: 0, todo: 0 };
  out[dom][st]++;
  if (st === 'todo') (lists[dom] = lists[dom] || []).push(base);
}
console.log(JSON.stringify(out, null, 1));
fs.writeFileSync(path.join(__dirname, 'todo.json'), JSON.stringify(lists, null, 1));
