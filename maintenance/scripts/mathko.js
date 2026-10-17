// find (and with --fix wrap) Korean text inside inline $...$ math that is not already in \text{}
const fs = require('fs'), path = require('path');
const [d, flag] = process.argv.slice(2);
let hits = [], fixedFiles = 0;
for (const n of fs.readdirSync(d).filter(f => f.endsWith('.md'))) {
  const p = path.join(d, n); const src = fs.readFileSync(p, 'utf8');
  let inCode = false;
  const out = src.split('\n').map((line, i) => {
    if (/^\s*```/.test(line)) { inCode = !inCode; return line; }
    if (inCode) return line;
    return line.replace(/(?<!\\)\$(?!\$)([^$\n]+?)(?<!\\)\$/g, (all, body) => {
      const stripped = body.replace(/\\(?:text|mathrm|textsf|textbf)\{[^}]*\}/g, '');
      if (!/[가-힣]/.test(stripped)) return all;
      hits.push(`${n}:${i + 1}: ${all.slice(0, 80)}`);
      // wrap each run of Korean (with inner spaces) in \text{}
      const nb = body.replace(/(\\(?:text|mathrm|textsf|textbf)\{[^}]*\})|([가-힣][가-힣\s·]*[가-힣]|[가-힣])/g, (m, keep, ko) => keep ? keep : `\\text{${ko}}`);
      return `$${nb}$`;
    });
  }).join('\n');
  if (out !== src && flag === '--fix') { fs.writeFileSync(p, out, 'utf8'); fixedFiles++; }
}
console.log(hits.length + ' hits, fixedFiles ' + fixedFiles + '\n' + hits.slice(0, 30).join('\n'));
