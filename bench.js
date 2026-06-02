const { performance } = require('perf_hooks');

const numNodes = 10000;
const numLinks = 50000;

const nodes = [];
for (let i = 0; i < numNodes; i++) {
  nodes.push({ id: `node${i}` });
}

const links = [];
for (let i = 0; i < numLinks; i++) {
  links.push({
    source: `node${Math.floor(Math.random() * numNodes)}`,
    target: `node${Math.floor(Math.random() * numNodes)}`
  });
}

const neighbourhood = new Set();
for (let i = 0; i < numNodes; i++) {
  if (Math.random() > 0.1) {
    neighbourhood.add(`node${i}`);
  }
}

// Baseline
const startBaseline = performance.now();
const filteredLinks = links.filter(l => neighbourhood.has(l.source) && neighbourhood.has(l.target));
const mappedLinksBaseline = filteredLinks.map(l => ({
  source: nodes.find(n => n.id === l.source),
  target: nodes.find(n => n.id === l.target)
}));
const endBaseline = performance.now();
console.log(`Baseline time: ${endBaseline - startBaseline} ms`);

// Optimized
const startOptimized = performance.now();
const idToNodeMap = new Map();
nodes.forEach(n => idToNodeMap.set(n.id, n));

const mappedLinksOptimized = filteredLinks.map(l => ({
  source: idToNodeMap.get(l.source),
  target: idToNodeMap.get(l.target)
}));
const endOptimized = performance.now();
console.log(`Optimized time: ${endOptimized - startOptimized} ms`);
