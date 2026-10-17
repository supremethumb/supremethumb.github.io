// Print notes with <svg> blocks collapsed to {{SVG:n}} markers.
const fs = require('fs'), path = require('path');
const root = process.argv[2];
for (const n of process.argv.slice(3)) {
  let i = 0;
  const t = fs.readFileSync(path.join(root, n + '.md'), 'utf8').replace(/<svg[\s\S]*?<\/svg>/g, () => `{{SVG:${++i}}}`);
  console.log(`\n##### FILE: ${n}\n` + t);
}
