const skillToggles = [...document.querySelectorAll('.skill-toggle')];

function setOpenSkill(toggleToOpen) {
  skillToggles.forEach((toggle) => {
    const content = document.getElementById(toggle.getAttribute('aria-controls'));
    const shouldOpen = toggle === toggleToOpen;

    toggle.setAttribute('aria-expanded', String(shouldOpen));

    if (content) {
      content.hidden = !shouldOpen;
    }
  });
}

function scrollToOpenedSkill(toggle) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior = reducedMotion ? 'auto' : 'smooth';
  const contentPanel = document.querySelector('.content-panel');

  window.requestAnimationFrame(() => {
    if (window.matchMedia('(max-width: 900px)').matches) {
      const top = toggle.getBoundingClientRect().top + window.scrollY - 16;
      window.scrollTo({ top, behavior });
      return;
    }

    if (!contentPanel) return;

    const top = toggle.getBoundingClientRect().top - contentPanel.getBoundingClientRect().top + contentPanel.scrollTop - 18;
    contentPanel.scrollTo({ top, behavior });
  });
}

skillToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const isOpening = toggle.getAttribute('aria-expanded') !== 'true';
    setOpenSkill(isOpening ? toggle : null);

    if (isOpening) {
      scrollToOpenedSkill(toggle);
    }
  });
});
