---
title: Welcome to my Digital Garden
---

<div class="hero-section" style="isolation: isolate; z-index: 0;">
  <div id="computer"></div>
  <canvas id="hero-canvas"></canvas>
  <div class="hero-content">
    <div class="hero-title">supreme thumb's notes</div>
    <p class="hero-subtitle">Exploring UX, Tech, and Ideas</p>
    <p class="hero-description">안녕하세요! supreme thumb's notes에 오신 것을 환영합니다.</p>
  </div>
</div>

<style>
:root {
  --light-gray : #d6d2c8;
  --dark-gray: #55524e;
  --gray: #9b9484;
  --dark-blue: #2b293e;
  --light-blue: #35b7da;
}

#computer {
  position: absolute;
  width: 340px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.6);
  z-index: -1;
  opacity: 0.15;
  background:

  /* Bottom Section */
  repeating-linear-gradient(90deg, var(--gray) 0 10px, var(--light-gray) 10px 18px) 258px 236px / 64px 10px,
  repeating-linear-gradient(90deg, var(--dark-gray) 0 10px, var(--light-gray) 10px 18px) 258px 246px / 64px 38px,
  linear-gradient(var(--dark-gray), var(--dark-gray)) 166px 264px / 10px 14px,
  linear-gradient(var(--light-gray) 10px, var(--dark-gray) 10px) 144px 248px / 80px 20px,
  linear-gradient(90deg, var(--dark-gray) 10px, var(--gray) 10px) 124px 236px / 110px 48px,
  linear-gradient(90deg, var(--gray) 10px, var(--light-gray) 10px) 90px 230px / 250px 60px,
  linear-gradient(90deg, var(--gray) 10px, var(--light-gray) 10px) 100px 220px / 240px 80px,
  linear-gradient(var(--dark-gray), var(--dark-gray)) 10px bottom / 330px 80px,
  linear-gradient(var(--dark-gray), var(--dark-gray)) left bottom / 320px 70px,

  /* Top Section */
  linear-gradient(90deg, var(--gray) 18px, var(--light-gray) 18px 26px, var(--gray) 26px 36px, var(--dark-gray) 36px 122px, var(--light-gray) 122px 160px, var(--gray) 160px) 120px 180px / 170px 10px,
  linear-gradient(var(--gray) 10px, var(--dark-blue) 10px 150px, var(--gray) 150px) 130px 10px / 150px 160px,
  linear-gradient(90deg, var(--gray) 10px, var(--dark-blue) 10px 180px, var(--gray) 180px) 110px 30px / 190px 120px,
  linear-gradient(var(--gray), var(--gray)) 120px 20px / 170px 140px,
  linear-gradient(var(--light-gray), var(--light-gray)) 110px top / 190px 200px,
  linear-gradient(90deg, var(--gray) 10px, var(--light-gray) 10px) 90px 10px / 220px 180px,
  linear-gradient(var(--gray), var(--gray)) 100px top / 200px 200px,
  linear-gradient(var(--dark-gray), var(--dark-gray)) 40px top / 260px 200px,
  linear-gradient(90deg, var(--dark-gray) 50%, var(--light-gray) 50%) 30px 10px / 280px 180px,

  /* Back section */
  linear-gradient(90deg, var(--dark-gray) 96px, var(--gray) 96px) 70px 210px / 216px 14px,
  linear-gradient(var(--dark-gray), var(--dark-gray)) 90px 190px / 178px 30px;
  background-repeat: no-repeat;
}

#computer::before {
  content: "";
  display: block;
  position: absolute;
  width: 10px;
  height: 10px;
  top: 95px;
  left: 175px;
  background-color: var(--light-blue);
  animation: hello 3500ms linear infinite forwards alternate;
}

@keyframes hello {
  0%, 18% {
    box-shadow:
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    40px -30px 0 var(--light-blue),
    40px -20px 0 var(--light-blue),
    10px -30px 0 var(--light-blue),
    10px -20px 0 var(--light-blue),
    50px 0 0 var(--light-blue),
    40px 10px 0 var(--light-blue),
    30px 10px 0 var(--light-blue),
    20px 10px 0 var(--light-blue),
    10px 10px 0 var(--light-blue);
  }
  24%, 38% {
    box-shadow:
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    50px -30px 0 var(--light-blue),
    40px -20px 0 var(--light-blue),
    0 -30px 0 var(--light-blue),
    10px -20px 0 var(--light-blue),
    50px 0 0 var(--light-blue),
    40px 10px 0 var(--light-blue),
    30px 0 0 var(--light-blue),
    20px 10px 0 var(--light-blue),
    10px 10px 0 var(--light-blue);
  }
  44%, 58% {
    box-shadow:
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    50px -30px 0 var(--light-blue),
    50px 0 0 var(--light-blue),
    40px 10px 0 var(--light-blue),
    30px -20px 0 var(--light-blue),
    30px 0 0 var(--light-blue),
    30px 10px 0 var(--light-blue),
    10px -10px var(--light-blue),
    0 -30px 0 var(--light-blue),
    0 -20px 0 var(--light-blue),
    0 10px 0 var(--light-blue);
  }
  64%, 78% {
    box-shadow:
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    0 0 0 var(--light-blue),
    50px -30px 0 var(--light-blue),
    50px 0 0 var(--light-blue),
    50px 10px 0 var(--light-blue),
    30px -30px 0 var(--light-blue),
    30px -20px 0 var(--light-blue),
    30px 0 0 var(--light-blue),
    30px 10px 0 var(--light-blue),
    10px -10px var(--light-blue),
    0 -30px 0 var(--light-blue),
    0 -20px 0 var(--light-blue),
    0 10px 0 var(--light-blue);
  }
  84%, 100% {
    box-shadow:
    50px -30px 0 var(--light-blue),
    50px -10px 0 var(--light-blue),
    50px 0 0 var(--light-blue),
    50px 10px 0 var(--light-blue),
    30px -30px 0 var(--light-blue),
    30px -20px 0 var(--light-blue),
    30px -10px 0 var(--light-blue),
    30px 0 0 var(--light-blue),
    30px 10px 0 var(--light-blue),
    20px -10px 0 var(--light-blue),
    10px -10px 0 var(--light-blue),
    0 -30px 0 var(--light-blue),
    0 -20px 0 var(--light-blue),
    0 -10px var(--light-blue),
    0 10px 0 var(--light-blue);
  }
}
</style>

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
