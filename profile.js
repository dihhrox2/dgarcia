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

export function initializeProfile() {
  const currentAge = document.querySelector("#current-age");
  if (currentAge) currentAge.textContent = `${calculateAge()} anos`;

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
}
