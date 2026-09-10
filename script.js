const tabs = [...document.querySelectorAll(".nav-tab")];
const panels = [...document.querySelectorAll(".tab-panel")];
const panelById = new Map(panels.map((panel) => [panel.id, panel]));
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const contentPanel = document.querySelector(".content-panel");
const tabByHash = {
  sobre: "about",
  inicio: "about",
  experiencia: "experience",
  formacao: "education",
  cursos: "education",
  habilidades: "skills",
  projetos: "projects",
  servicos: "services",
  "informacoes-adicionais": "additional",
  contato: "contact",
};
const hashByTab = Object.fromEntries(
  tabs.map((tab) => [
    tab.dataset.tab,
    Object.keys(tabByHash).find((hash) => tabByHash[hash] === tab.dataset.tab),
  ]),
);

function tabFromHash() {
  let hash;
  try {
    hash = decodeURIComponent(window.location.hash.slice(1)).toLowerCase();
  } catch {
    return "about";
  }
  if (hash === "cursos") history.replaceState(null, "", "#formacao");
  return tabByHash[hash] || "about";
}

// Single owner of panel visibility, ARIA selection and hash history.
function selectTab(id, { updateUrl = false } = {}) {
  const target = panelById.get(id);
  if (!target) return;
  const previous = panels.find((panel) => panel.classList.contains("active"));
  panels.forEach((panel) => {
    panel.hidden = panel !== target;
    panel.classList.toggle("active", panel === target);
  });
  tabs.forEach((tab) => {
    const active = tab.dataset.tab === id;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  document.body.classList.toggle("is-about-tab", id === "about");
  if (contentPanel) contentPanel.scrollTop = 0;
  if (updateUrl) {
    const hash = "#" + hashByTab[id];
    if (window.location.hash !== hash) history.pushState(null, "", hash);
  }
  if (previous !== target) {
    window.dispatchEvent(
      new CustomEvent("portfolio:tab-change", {
        detail: { previousId: previous?.id, panel: target },
      }),
    );
  }
}

document.addEventListener("click", (event) => {
  const control = event.target.closest(
    '.nav-tab, .profile-actions a[href="#contato"]',
  );
  if (
    !control ||
    event.defaultPrevented ||
    event.ctrlKey ||
    event.metaKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  )
    return;
  event.preventDefault();
  selectTab(control.dataset.tab || "contact", { updateUrl: true });
});

function syncTabFromLocation() {
  const id = tabFromHash();
  // History traversal can emit both popstate and hashchange.
  if (!panelById.get(id)?.classList.contains("active")) selectTab(id);
}
window.addEventListener("popstate", syncTabFromLocation);
window.addEventListener("hashchange", syncTabFromLocation);
const navigationEntry = performance.getEntriesByType("navigation")[0];
const didReload = navigationEntry
  ? navigationEntry.type === "reload"
  : performance.navigation?.type === performance.navigation?.TYPE_RELOAD;
if (didReload) {
  history.replaceState(null, "", "#sobre");
  selectTab("about");
} else selectTab(tabFromHash());

document.querySelector(".side-rail").addEventListener("keydown", (event) => {
  if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(event.key))
    return;
  const index = tabs.indexOf(document.activeElement);
  if (index < 0) return;
  event.preventDefault();
  const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
  tabs[(index + (forward ? 1 : -1) + tabs.length) % tabs.length].focus();
});
function calculateAge() {
  const birth = new Date(1989, 8, 29);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() < birth.getDate());
  return age - (beforeBirthday ? 1 : 0);
}
document.querySelector("#current-age").textContent = `${calculateAge()} anos`;
const rotatingText = document.querySelector("#profile-rotating-text");
const rotatingTerms = [
  "Suporte técnico",
  "Infraestrutura e redes",
  "Operação administrativa",
  "Atendimento",
  "Gestão de serviços de TI",
  "Criação de conteúdo",
  "Soluções web",
];
function startProfileRotator() {
  if (!rotatingText) return;
  let termIndex = 0;
  let characterIndex = 0;
  let deleting = false;
  function animate() {
    const term = rotatingTerms[termIndex];
    rotatingText.textContent = term.slice(0, characterIndex);
    if (!deleting && characterIndex < term.length) {
      characterIndex += 1;
      window.setTimeout(animate, 65);
      return;
    }
    if (!deleting) {
      deleting = true;
      window.setTimeout(animate, 1250);
      return;
    }
    if (characterIndex > 0) {
      characterIndex -= 1;
      window.setTimeout(animate, 38);
      return;
    }
    deleting = false;
    termIndex = (termIndex + 1) % rotatingTerms.length;
    window.setTimeout(animate, 260);
  }
  animate();
}
startProfileRotator();
const logoCarousel = document.querySelector("#profile-logo-carousel");
if (logoCarousel) {
  const slides = [...logoCarousel.querySelectorAll(".logo-carousel__slide")];
  const loadLogo = (slide) => {
    if (!slide.getAttribute("src")) slide.src = slide.dataset.src;
  };
  for (let current = slides.length - 1; current > 0; current -= 1) {
    const randomIndex = Math.floor(Math.random() * (current + 1));
    [slides[current], slides[randomIndex]] = [
      slides[randomIndex],
      slides[current],
    ];
  }
  logoCarousel.replaceChildren(...slides);
  let slideIndex = 0;
  function activateLogo(index) {
    loadLogo(slides[index]);
    slides.forEach((slide, currentIndex) => {
      const active = currentIndex === index;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
  }
  function scheduleLogoCycle() {
    window.setTimeout(() => {
      const currentSlide = slides[slideIndex];
      loadLogo(slides[(slideIndex + 1) % slides.length]);
      currentSlide.classList.remove("is-active");
      window.setTimeout(() => {
        currentSlide.setAttribute("aria-hidden", "true");
        slideIndex = (slideIndex + 1) % slides.length;
        activateLogo(slideIndex);
        scheduleLogoCycle();
      }, 2000);
    }, 4000);
  }
  window.requestAnimationFrame(() => {
    activateLogo(slideIndex);
    scheduleLogoCycle();
  });
}
let savedTheme;
try {
  savedTheme = localStorage.getItem("diego-garcia-theme");
} catch {
  /* Session theme still works when storage is blocked. */
}
const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches
  ? "light"
  : "dark";
const initialTheme =
  savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemTheme;
function setTheme(theme, { persist = true } = {}) {
  if (theme !== "light" && theme !== "dark") return;
  root.setAttribute("data-theme", theme);
  if (persist) {
    try {
      localStorage.setItem("diego-garcia-theme", theme);
    } catch {
      /* Keep the selected theme in this document. */
    }
  }
  if (themeToggle) {
    themeToggle.classList.toggle("theme-is-light", theme === "light");
    themeToggle.classList.toggle("theme-is-dark", theme === "dark");
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro",
    );
  }
  window.dispatchEvent(new CustomEvent("portfolio:theme-change"));
}
setTheme(initialTheme, { persist: false });
if (themeToggle)
  themeToggle.addEventListener("click", () =>
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"),
  );

const signature = document.querySelector(".site-signature");
const appShell = document.querySelector(".app-shell");
function positionSignature() {
  if (!signature || !appShell) return;
  if (!window.matchMedia("(min-width: 901px)").matches) {
    signature.style.removeProperty("--signature-top");
    return;
  }
  const shellBottom = appShell.getBoundingClientRect().bottom;
  const freeSpace = Math.max(0, window.innerHeight - shellBottom);
  signature.style.setProperty(
    "--signature-top",
    `${shellBottom + freeSpace / 2}px`,
  );
}
window.addEventListener("resize", positionSignature);
positionSignature();

const networkCanvas = document.querySelector(".network-background");
if (networkCanvas) {
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
  // This background is part of the visual identity: never gate it on reduced motion.
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
