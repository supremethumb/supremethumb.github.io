import { performance } from 'perf_hooks';

// Setup mock objects for the benchmark
const NUM_LABELS = 1000;
const NUM_ACTIVE = 50;

// Create random IDs for fast lookup simulation
const activeNodesSet = new Set();
const activeNodesArray = [];
const labelsArray = [];

for (let i = 0; i < NUM_ACTIVE; i++) {
  const obj = { id: i };
  activeNodesArray.push(obj);
  activeNodesSet.add(obj);
}

for (let i = 0; i < NUM_LABELS; i++) {
  if (i < NUM_ACTIVE) {
    labelsArray.push(activeNodesArray[i]);
  } else {
    labelsArray.push({ id: i });
  }
}

function benchmarkArrayIncludes() {
  let matched = 0;
  for (let i = 0; i < 10000; i++) { // run multiple times to get measurable time
    for (const label of labelsArray) {
      if (!activeNodesArray.includes(label)) {
        matched++;
      }
    }
  }
  return matched;
}

function benchmarkSetHas() {
  let matched = 0;
  for (let i = 0; i < 10000; i++) {
    for (const label of labelsArray) {
      if (!activeNodesSet.has(label)) {
        matched++;
      }
    }
  }
  return matched;
}

const start1 = performance.now();
benchmarkArrayIncludes();
const end1 = performance.now();
const timeArray = end1 - start1;

const start2 = performance.now();
benchmarkSetHas();
const end2 = performance.now();
const timeSet = end2 - start2;

console.log(`Array.includes() time: ${timeArray.toFixed(2)} ms`);
console.log(`Set.has() time: ${timeSet.toFixed(2)} ms`);
console.log(`Speedup: ${(timeArray / timeSet).toFixed(2)}x`);
