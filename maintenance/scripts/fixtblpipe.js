// escape alias pipes of wikilinks inside markdown table rows (outside code fences)
const fs = require('fs'), path = require('path');
const d = process.argv[2];
let files = 0, links = 0;
for (const n of fs.readdirSync(d).filter(f => f.endsWith('.md'))) {
  const p = path.join(d, n);
  const src = fs.readFileSync(p, 'utf8');
  let inCode = false;
  const out = src.split('\n').map(line => {
    if (/^\s*```/.test(line)) { inCode = !inCode; return line; }
    if (inCode || !/^\s*\|/.test(line)) return line;
    return line.replace(/\[\[([^\]\n]*?)\]\]/g, (all, inner) => {
      const fixed = inner.replace(/(^|[^\\])\|/g, (m, pre) => pre + '\\|');
      if (fixed !== inner) links++;
      return '[[' + fixed + ']]';
    });
  }).join('\n');
  if (out !== src) { files++; fs.writeFileSync(p, out, 'utf8'); }
}
console.log({ files, links });
