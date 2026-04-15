---
title: Welcome to my Digital Garden
---

<div class="hero-section" style="isolation: isolate; z-index: 0; position: relative;">
  <div id="hero-graph-container" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
    <canvas id="hero-graph-canvas"></canvas>
  </div>

  <div id="hero-loading" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: var(--light); z-index: 10; transition: opacity 0.5s;">
    <div class="loading-spinner"></div>
  </div>

  <div id="hero-speech-bubble" style="position: absolute; opacity: 0; pointer-events: none; transition: opacity 0.3s, transform 0.3s; transform: translate(-50%, -100%); z-index: 5; background: var(--secondary); color: var(--light); padding: 8px 16px; border-radius: 20px; font-size: 0.9em; box-shadow: 0 4px 12px rgba(0,0,0,0.1); white-space: nowrap;">
    <span id="speech-bubble-text"></span>
    <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 0; height: 0; border-left: 6px solid transparent; border-right: 6px solid transparent; border-top: 6px solid var(--secondary);"></div>
  </div>

  <div class="hero-content" style="pointer-events: none;">
    <div class="hero-title">supreme thumb's notes</div>
    <p class="hero-subtitle">Exploring UX, Tech, and Ideas</p>
    <p class="hero-description">안녕하세요! supreme thumb's notes에 오신 것을 환영합니다.</p>
  </div>
</div>

<style>
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--lightgray);
  border-radius: 50%;
  border-top-color: var(--tertiary);
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

#hero-graph-canvas {
  width: 100%;
  height: 100%;
  cursor: grab;
}

#hero-graph-canvas:active {
  cursor: grabbing;
}
</style>

<script type="module">
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

let heroSimulation;
let heroAnimationId;
let autoFocusInterval;
let resumeAutoFocusTimeout;
let incrementalLoadTimeout;
let isUserInteracting = false;
let d3Transform = d3.zoomIdentity;

// Prevent multiple loops from spawning during SPA navigation
if (window.heroGraphCleanup) {
  window.heroGraphCleanup();
}

async function initHeroGraph() {
  const canvas = document.getElementById('hero-graph-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const container = document.getElementById('hero-graph-container');
  const loading = document.getElementById('hero-loading');
  const speechBubble = document.getElementById('hero-speech-bubble');
  const speechBubbleText = document.getElementById('speech-bubble-text');

  let width = container.clientWidth;
  let height = container.clientHeight;
  canvas.width = width;
  canvas.height = height;

  // We are using the globally available fetchData from Quartz
  let rawData;
  try {
    if (window.fetchData) {
      rawData = await window.fetchData;
    } else {
      const res = await fetch(new URL('./static/contentIndex.json', window.location.href));
      rawData = await res.json();
    }
  } catch (e) {
    console.error("Failed to fetch graph data", e);
    if(loading) loading.style.opacity = '0';
    return;
  }

  // Parse data
  const allNodes = [];
  const allLinks = [];
  const validNodeIds = new Set();

  for (const [key, details] of Object.entries(rawData)) {
    validNodeIds.add(key);
    allNodes.push({
      id: key,
      title: details.title,
      radius: details.title === "supreme thumb's notes" ? 10 : 5 // Make index node bigger maybe?
    });
  }

  for (const [key, details] of Object.entries(rawData)) {
    if (details.links) {
      for (const target of details.links) {
        if (validNodeIds.has(target)) {
          allLinks.push({ source: key, target: target });
        }
      }
    }
  }

  const nodes = [];
  const links = [];
  const loadedNodeIds = new Set();

  // Set up Force Simulation
  heroSimulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(40))
    .force("charge", d3.forceManyBody().strength(-30))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide().radius(d => d.radius + 2).iterations(2))
    .on("tick", ticked);

  let isFirstChunk = true;

  function addNextChunk() {
    const chunkSize = 20; // Load 20 nodes at a time
    const newNodes = allNodes.splice(0, chunkSize);

    if (newNodes.length === 0) return; // All nodes loaded

    newNodes.forEach(node => {
      nodes.push(node);
      loadedNodeIds.add(node.id);
    });

    // Add links where both source and target are now loaded
    const linksToAdd = [];
    for (let i = allLinks.length - 1; i >= 0; i--) {
      const link = allLinks[i];
      if (loadedNodeIds.has(link.source) && loadedNodeIds.has(link.target)) {
        linksToAdd.push(link);
        allLinks.splice(i, 1);
      }
    }

    linksToAdd.forEach(link => links.push(link));

    // Update simulation
    heroSimulation.nodes(nodes);
    heroSimulation.force("link").links(links);
    heroSimulation.alpha(0.1).restart(); // Small bump to incorporate new nodes smoothly

    if (isFirstChunk) {
      // Remove loading overlay immediately after first chunk
      if(loading) {
          loading.style.opacity = '0';
          setTimeout(() => loading.style.display = 'none', 500);
      }
      // Start the auto focus loop once there are nodes to focus on
      startAutoFocus();
      isFirstChunk = false;
    }

    if (allNodes.length > 0) {
      incrementalLoadTimeout = setTimeout(addNextChunk, 50); // Schedule next chunk
    }
  }

  // Start incremental loading
  addNextChunk();

  // Zoom behavior
  const zoom = d3.zoom()
    .scaleExtent([0.1, 4])
    .on("start", () => {
      isUserInteracting = true;
      clearTimeout(resumeAutoFocusTimeout);
      clearInterval(autoFocusInterval);
      hideSpeechBubble();
    })
    .on("zoom", (event) => {
      d3Transform = event.transform;
      ticked(); // redraw
    })
    .on("end", () => {
      resumeAutoFocusTimeout = setTimeout(() => {
        isUserInteracting = false;
        startAutoFocus();
      }, 5000); // Resume auto focus after 5 seconds of inactivity
    });

  d3.select(canvas)
    .call(zoom)
    .call(zoom.transform, d3.zoomIdentity.translate(width/2, height/2).scale(0.5).translate(-width/2, -height/2));

  // Drag behavior
  d3.select(canvas)
    .call(d3.drag()
      .container(canvas)
      .subject((event) => {
        const [x, y] = d3Transform.invert([event.x, event.y]);
        return heroSimulation.find(x, y, 20);
      })
      .on("start", (event) => {
        if (!event.active) heroSimulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
        isUserInteracting = true;
        clearTimeout(resumeAutoFocusTimeout);
        clearInterval(autoFocusInterval);
        hideSpeechBubble();
      })
      .on("drag", (event) => {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      })
      .on("end", (event) => {
        if (!event.active) heroSimulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
        resumeAutoFocusTimeout = setTimeout(() => {
          isUserInteracting = false;
          startAutoFocus();
        }, 5000);
      })
    );


  function ticked() {
    ctx.save();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(d3Transform.x, d3Transform.y);
    ctx.scale(d3Transform.k, d3Transform.k);

    // Draw links
    ctx.beginPath();
    links.forEach(d => {
      ctx.moveTo(d.source.x, d.source.y);
      ctx.lineTo(d.target.x, d.target.y);
    });
    ctx.strokeStyle = "rgba(132, 165, 157, 0.2)"; // Tertiary color from quartz config
    ctx.lineWidth = 1 / d3Transform.k;
    ctx.stroke();

    // Draw nodes
    ctx.fillStyle = "rgba(40, 75, 99, 0.8)"; // Secondary color
    nodes.forEach(d => {
      ctx.beginPath();
      ctx.moveTo(d.x + d.radius, d.y);
      ctx.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.restore();

    // Update speech bubble position if it's visible
    if (speechBubble.style.opacity === '1' && currentFocusedNode) {
        positionSpeechBubble(currentFocusedNode);
    }
  }

  let currentFocusedNode = null;

  function hideSpeechBubble() {
      speechBubble.style.opacity = '0';
      speechBubble.style.pointerEvents = 'none';
  }

  function positionSpeechBubble(node) {
      // Calculate screen coordinates
      const screenX = node.x * d3Transform.k + d3Transform.x;
      const screenY = node.y * d3Transform.k + d3Transform.y;

      speechBubble.style.left = `${screenX}px`;
      speechBubble.style.top = `${screenY - (node.radius * d3Transform.k) - 10}px`;
  }

  function focusRandomNode() {
    if (isUserInteracting || nodes.length === 0) return;

    const randomIdx = Math.floor(Math.random() * nodes.length);
    const targetNode = nodes[randomIdx];
    currentFocusedNode = targetNode;

    // Calculate target transform to center the node
    const scale = 1.5; // Zoom level when focused
    const targetX = width / 2 - targetNode.x * scale;
    const targetY = height / 2 - targetNode.y * scale;

    d3.select(canvas).transition()
      .duration(2000)
      .call(zoom.transform, d3.zoomIdentity.translate(targetX, targetY).scale(scale))
      .on("end", () => {
        if (!isUserInteracting) {
            speechBubbleText.textContent = targetNode.title;
            positionSpeechBubble(targetNode);
            speechBubble.style.opacity = '1';
        }
      });

    // Hide bubble during transition
    hideSpeechBubble();
  }

  function startAutoFocus() {
    clearInterval(autoFocusInterval);
    autoFocusInterval = setInterval(focusRandomNode, 6000);
    setTimeout(focusRandomNode, 1000); // Initial focus shortly after start
  }

  window.heroGraphResizeHandler = () => {
    if (!container || !canvas) return;
    width = container.clientWidth;
    height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;
    heroSimulation.force("center", d3.forceCenter(width / 2, height / 2));
    heroSimulation.alpha(0.3).restart();
  };

  window.addEventListener('resize', window.heroGraphResizeHandler);

  window.heroGraphCleanup = () => {
      if (heroSimulation) heroSimulation.stop();
      clearInterval(autoFocusInterval);
      clearTimeout(resumeAutoFocusTimeout);
      clearTimeout(incrementalLoadTimeout);
      window.removeEventListener('resize', window.heroGraphResizeHandler);
      delete window.heroGraphCleanup;
  };
}

document.addEventListener("nav", () => {
  if (window.heroGraphCleanup) {
    window.heroGraphCleanup();
  }

  // Only init if we are on the index page (where hero-graph-canvas exists)
  setTimeout(() => {
    if (document.getElementById('hero-graph-canvas')) {
        initHeroGraph();
    }
  }, 100);
});

// For the initial load
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(() => {
        if (document.getElementById('hero-graph-canvas')) {
            initHeroGraph();
        }
    }, 1);
} else {
    document.addEventListener("DOMContentLoaded", () => {
        if (document.getElementById('hero-graph-canvas')) {
            initHeroGraph();
        }
    });
}
</script>
