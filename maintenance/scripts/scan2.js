// node scan2.js <dir> [--fix]  : stray hr after frontmatter, broken math, leftover artifacts
const fs = require('fs'), path = require('path');
const [d, flag] = process.argv.slice(2);
const res = { hrAfterFm: [], mathBroken: [], oddDollar: [], emptyHeadings: [], triplePlus: [] };
for (const n of fs.readdirSync(d).filter(f => f.endsWith('.md'))) {
  const p = path.join(d, n); let t = fs.readFileSync(p, 'utf8'); const o = t;
  const m = t.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
  if (m) {
    const rest = t.slice(m[0].length);
    const r = rest.match(/^(\s*\r?\n)*---\r?\n/);
    if (r) { res.hrAfterFm.push(n); if (flag === '--fix') t = m[0] + rest.slice(r[0].length); }
  }
  const body = t.replace(/```[\s\S]*?```/g, '').replace(/<svg[\s\S]*?<\/svg>/g, '');
  for (const [i, line] of body.split('\n').entries()) {
    if (/_[a-zA-Z]__[a-zA-Z]_|\\_\{|\$\$\$/.test(line)) res.mathBroken.push(`${n}:${i + 1}: ${line.trim().slice(0, 90)}`);
    const dollars = (line.replace(/\\\$/g, '').match(/\$/g) || []).length;
    if (dollars % 2 === 1 && !/[0-9],?[0-9]*\s*\$|\$\s*[0-9]/.test(line)) res.oddDollar.push(`${n}:${i + 1}: ${line.trim().slice(0, 90)}`);
    if (/^#{1,6}\s*$/.test(line)) res.emptyHeadings.push(`${n}:${i + 1}`);
  }
  if (/\n\s*\n\s*\n\s*\n\s*\n/.test(t)) { res.triplePlus.push(n); if (flag === '--fix') t = t.replace(/(\r?\n[ \t]*){4,}\n/g, '\n\n\n'); }
  if (t !== o && flag === '--fix') fs.writeFileSync(p, t, 'utf8');
}
for (const [k, v] of Object.entries(res)) console.log(`### ${k} (${v.length})\n` + v.slice(0, 40).join('\n'));
