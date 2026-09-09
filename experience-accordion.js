const experienceToggles = [...document.querySelectorAll('.record-toggle')];

function setOpenExperience(toggleToOpen) {
  experienceToggles.forEach((toggle) => {
    const content = document.getElementById(toggle.getAttribute('aria-controls'));
    const shouldOpen = toggle === toggleToOpen;

    toggle.setAttribute('aria-expanded', String(shouldOpen));

    if (content) {
      content.hidden = !shouldOpen;
    }
  });
}

experienceToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    setOpenExperience(toggle.getAttribute('aria-expanded') === 'true' ? null : toggle);
  });
});
