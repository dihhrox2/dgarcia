export function initializeBackgroundNetwork() {
  const root = document.documentElement;
  const networkCanvas = document.querySelector(".network-background");
  if (!networkCanvas) return;

  const networkContext = networkCanvas.getContext("2d");
  let particles = [];
  let networkFrame = 0;
  let networkRunning = false;
  let networkWidth = 0;
  let networkHeight = 0;
  const cursor = { x: -9999, y: -9999, active: false };
  const colorToRgb = (color) => {
    const value = color.trim();
    const hex = value.startsWith("#") ? value.slice(1) : "";
    if (hex.length === 3)
      return hex.split("").map((item) => parseInt(item + item, 16));
    if (hex.length === 6)
      return [
        parseInt(hex.slice(0, 2), 16),
        parseInt(hex.slice(2, 4), 16),
        parseInt(hex.slice(4, 6), 16),
      ];
    return [74, 115, 255];
  };
  let networkColor;
  function updateNetworkColor() {
    networkColor = colorToRgb(
      getComputedStyle(root).getPropertyValue("--blue"),
    );
  }
  updateNetworkColor();
  window.addEventListener("portfolio:theme-change", updateNetworkColor);

  // The background is part of the visual identity, even with reduced motion.
  const particleCount = () =>
    Math.max(
      24,
      Math.min(63, Math.round((networkWidth * networkHeight) / 24000)),
    );
  function createParticle() {
    const speed = 0.12 + Math.random() * 0.26;
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * networkWidth,
      y: Math.random() * networkHeight,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      r: 1.1 + Math.random() * 1.3,
    };
  }
  function resizeNetwork() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    networkWidth = window.innerWidth;
    networkHeight = window.innerHeight;
    networkCanvas.width = Math.round(networkWidth * ratio);
    networkCanvas.height = Math.round(networkHeight * ratio);
    networkCanvas.style.width = `${networkWidth}px`;
    networkCanvas.style.height = `${networkHeight}px`;
    networkContext.setTransform(ratio, 0, 0, ratio, 0, 0);
    particles = Array.from({ length: particleCount() }, createParticle);
  }
  function drawNetwork() {
    if (!networkRunning) return;
    networkContext.clearRect(0, 0, networkWidth, networkHeight);
    const [r, g, b] = networkColor;
    const reach = Math.max(90, Math.min(155, networkWidth * 0.13));
    const connected = particles.map(() => []);
    for (let index = 0; index < particles.length; index += 1) {
      const point = particles[index];
      if (cursor.active) {
        const dx = cursor.x - point.x;
        const dy = cursor.y - point.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 170 && distance > 0) {
          point.vx += (dx / distance) * 0.0004;
          point.vy += (dy / distance) * 0.0004;
        }
      }
      point.x += point.vx;
      point.y += point.vy;
      point.vx *= 0.997;
      point.vy *= 0.997;
      if (Math.abs(point.vx) < 0.08) point.vx += (Math.random() - 0.5) * 0.04;
      if (Math.abs(point.vy) < 0.08) point.vy += (Math.random() - 0.5) * 0.04;
      if (point.x < 0 || point.x > networkWidth) point.vx *= -1;
      if (point.y < 0 || point.y > networkHeight) point.vy *= -1;
      point.x = Math.max(0, Math.min(networkWidth, point.x));
      point.y = Math.max(0, Math.min(networkHeight, point.y));
    }
    for (let first = 0; first < particles.length; first += 1) {
      let links = 0;
      for (
        let second = first + 1;
        second < particles.length && links < 3;
        second += 1
      ) {
        const a = particles[first];
        const bPoint = particles[second];
        const distance = Math.hypot(a.x - bPoint.x, a.y - bPoint.y);
        if (distance > reach) continue;
        const alpha = (1 - distance / reach) * 0.25;
        networkContext.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        networkContext.lineWidth = 0.7;
        networkContext.beginPath();
        networkContext.moveTo(a.x, a.y);
        networkContext.lineTo(bPoint.x, bPoint.y);
        networkContext.stroke();
        connected[first].push(second);
        connected[second].push(first);
        links += 1;
      }
    }
    for (let first = 0; first < particles.length; first += 1) {
      const neighbors = connected[first];
      for (let left = 0; left < neighbors.length; left += 1) {
        for (let right = left + 1; right < neighbors.length; right += 1) {
          const second = neighbors[left];
          const third = neighbors[right];
          if (
            !connected[second].includes(third) ||
            first > second ||
            second > third
          )
            continue;
          networkContext.fillStyle = `rgba(${r},${g},${b},.035)`;
          networkContext.beginPath();
          networkContext.moveTo(particles[first].x, particles[first].y);
          networkContext.lineTo(particles[second].x, particles[second].y);
          networkContext.lineTo(particles[third].x, particles[third].y);
          networkContext.closePath();
          networkContext.fill();
        }
      }
    }
    particles.forEach((point) => {
      networkContext.fillStyle = `rgba(${r},${g},${b},.7)`;
      networkContext.beginPath();
      networkContext.arc(point.x, point.y, point.r, 0, Math.PI * 2);
      networkContext.fill();
    });
    networkFrame = window.requestAnimationFrame(drawNetwork);
  }
  function startNetwork() {
    if (networkRunning || document.hidden) return;
    networkRunning = true;
    networkFrame = window.requestAnimationFrame(drawNetwork);
  }
  function stopNetwork() {
    networkRunning = false;
    window.cancelAnimationFrame(networkFrame);
  }
  window.addEventListener("resize", resizeNetwork);
  window.addEventListener(
    "pointermove",
    (event) => {
      cursor.x = event.clientX;
      cursor.y = event.clientY;
      cursor.active = true;
    },
    { passive: true },
  );
  window.addEventListener("pointerleave", () => {
    cursor.active = false;
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopNetwork();
    else startNetwork();
  });
  resizeNetwork();
  startNetwork();
}
