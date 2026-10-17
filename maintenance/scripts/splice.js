// node splice.js <target.md> <new.md> : replaces {{SVG:n}} / {{CODE:n}} in new with nth <svg> / fenced block of target, writes target.
const fs = require('fs');
const [target, src] = process.argv.slice(2);
const o = fs.readFileSync(target, 'utf8');
const svgs = o.match(/<svg[\s\S]*?<\/svg>/g) || [];
const codes = o.match(/^```[^\n]*\n[\s\S]*?^```/gm) || [];
let n = fs.readFileSync(src, 'utf8');
n = n.replace(/\{\{SVG:(\d+)\}\}/g, (_, i) => { if (!svgs[i - 1]) throw new Error('no svg ' + i); return svgs[i - 1]; });
n = n.replace(/\{\{CODE:(\d+)\}\}/g, (_, i) => { if (!codes[i - 1]) throw new Error('no code ' + i); return codes[i - 1]; });
fs.writeFileSync(target, n, 'utf8');
console.log('ok', target, 'svgs', svgs.length, 'codes', codes.length);
