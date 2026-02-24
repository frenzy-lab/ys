// =========================
// FADE IN
// =========================
window.addEventListener("DOMContentLoaded", () => {
  const logoArea = document.getElementById("logoArea");
  const linksArea = document.getElementById("linksArea");
  const diagLine = document.getElementById("diagLine");

  logoArea.classList.remove("hidden");
  linksArea.classList.remove("hidden");

  logoArea.classList.add("show");
  linksArea.classList.add("show");

  diagLine.classList.add("visible");
});

// =========================
// PERMANENT LOGO GLITCH (unchanged)
// =========================
const hoverSlice = document.querySelector(".hover-slice");

setInterval(() => {
  const top = Math.random() * 80;
  const height = 5 + Math.random() * 15;
  const shift = (Math.random() - 0.5) * 25;

  hoverSlice.style.clipPath = `inset(${top}% 0 ${100 - (top + height)}% 0)`;
  hoverSlice.style.transform = `translateX(${shift}px)`;
  hoverSlice.style.opacity = 0.85;

  setTimeout(() => {
    hoverSlice.style.opacity = 0;
  }, 80);
}, 140);

// =========================
// TRIANGLE TRACER (mouse + touch + pen + many touchpads)
// =========================
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d", { alpha: true });

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let trail = [];
let lastX = 0;
let lastY = 0;

function pushPoint(x, y) {
  const dx = x - lastX;
  const dy = y - lastY;

  // If it's the first point or very small delta, still allow
  const angle = Math.atan2(dy || 0.0001, dx || 0.0001);

  lastX = x;
  lastY = y;

  trail.push({
    x,
    y,
    alpha: 1,
    size: 14,
    angle,
    jitter: 0
  });

  // glitch burst triangles around pointer
  if (Math.random() > 0.72) {
    const burstCount = 1 + Math.floor(Math.random() * 3);
    for (let i = 0; i < burstCount; i++) {
      trail.push({
        x: x + (Math.random() - 0.5) * 18,
        y: y + (Math.random() - 0.5) * 18,
        alpha: 0.9,
        size: 10 + Math.random() * 10,
        angle: angle + (Math.random() - 0.5) * 0.9,
        jitter: 1
      });
    }
  }
}

function pickColor() {
  const r = Math.random();
  if (r > 0.92) return "black";
  if (r > 0.75) return "white";
  return "#ff5c9a";
}

function drawTriangle(x, y, size, alpha, angle, jitter) {
  ctx.save();

  if (jitter) {
    x += (Math.random() - 0.5) * 4;
    y += (Math.random() - 0.5) * 4;
  }

  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.globalAlpha = alpha;

  ctx.beginPath();
  ctx.moveTo(size, 0);
  ctx.lineTo(-size, size / 1.6);
  ctx.lineTo(-size, -size / 1.6);
  ctx.closePath();

  ctx.fillStyle = pickColor();
  ctx.fill();
  ctx.restore();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < trail.length; i++) {
    const t = trail[i];

    drawTriangle(t.x, t.y, t.size, t.alpha, t.angle, t.jitter);

    t.alpha -= 0.055;
    t.size *= 0.95;

    if (Math.random() > 0.92) t.alpha -= 0.06;

    if (t.alpha <= 0) {
      trail.splice(i, 1);
      i--;
    }
  }

  requestAnimationFrame(animate);
}
animate();

/* Best universal input: Pointer Events */
window.addEventListener("pointermove", (e) => {
  // If the browser is sending pointer events, this covers mouse + touch + pen.
  pushPoint(e.clientX, e.clientY);
}, { passive: true });

/* Fallback for older iOS Safari */
window.addEventListener("touchmove", (e) => {
  if (!e.touches || e.touches.length === 0) return;
  const t = e.touches[0];
  pushPoint(t.clientX, t.clientY);
}, { passive: true });