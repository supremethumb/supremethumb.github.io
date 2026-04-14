---
title: Welcome to my Digital Garden
---

<div class="hero-section">
  <canvas id="hero-canvas"></canvas>
  <div class="hero-content">
    <div class="hero-title">supreme thumb's notes</div>
    <p class="hero-subtitle">Exploring UX, Tech, and Ideas</p>
    <p class="hero-description">안녕하세요! supreme thumb's notes에 오신 것을 환영합니다.</p>
  </div>
</div>

<script>
// Prevent multiple loops from spawning during SPA navigation
if (window.particleAnimationId) {
  cancelAnimationFrame(window.particleAnimationId);
}
if (window.particleResizeHandler) {
  window.removeEventListener('resize', window.particleResizeHandler);
}

function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const heroSection = document.querySelector('.hero-section');
  let width = heroSection.clientWidth;
  let height = heroSection.clientHeight;
  canvas.width = width;
  canvas.height = height;

  const particles = [];
  const properties = {
    bgColor: 'transparent',
    particleColor: 'rgba(132, 165, 157, 0.5)',
    particleRadius: 3,
    particleCount: 60,
    particleMaxVelocity: 0.5,
    lineLength: 150,
    particleLife: 6,
  };

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
      this.life = Math.random() * properties.particleLife * 60;
    }
    position() {
      this.x + this.velocityX > width && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
      this.y + this.velocityY > height && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
    reDraw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }
    reCalculateLife() {
      if(this.life < 1){
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
        this.life = Math.random() * properties.particleLife * 60;
      }
      this.life--;
    }
  }

  function reDrawBackground() {
    ctx.clearRect(0, 0, width, height);
  }

  function drawLines() {
    let x1, y1, x2, y2, length, opacity;
    for (let i in particles) {
      for (let j in particles) {
        x1 = particles[i].x;
        y1 = particles[i].y;
        x2 = particles[j].x;
        y2 = particles[j].y;
        length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        if (length < properties.lineLength) {
          opacity = 1 - length / properties.lineLength;
          ctx.lineWidth = '0.5';
          ctx.strokeStyle = `rgba(132, 165, 157, ${opacity})`;
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  }

  function reDrawParticles() {
    for (let i in particles) {
      particles[i].reCalculateLife();
      particles[i].position();
      particles[i].reDraw();
    }
  }

  function loop() {
    // If canvas is removed from DOM, stop the loop
    if (!document.getElementById('hero-canvas')) {
      return;
    }
    reDrawBackground();
    reDrawParticles();
    drawLines();
    window.particleAnimationId = requestAnimationFrame(loop);
  }

  function init() {
    for (let i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle);
    }
    loop();
  }

  init();

  window.particleResizeHandler = () => {
    const section = document.querySelector('.hero-section');
    if (!section) return;
    width = section.clientWidth;
    height = section.clientHeight;
    canvas.width = width;
    canvas.height = height;
  };

  window.addEventListener('resize', window.particleResizeHandler);
}

document.addEventListener("nav", () => {
  if (window.particleAnimationId) {
    cancelAnimationFrame(window.particleAnimationId);
  }
  if (window.particleResizeHandler) {
    window.removeEventListener('resize', window.particleResizeHandler);
  }
  initParticles();
});

document.addEventListener("DOMContentLoaded", initParticles);

// For the initial load since nav event might not fire initially depending on timing
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(initParticles, 1);
}
</script>
