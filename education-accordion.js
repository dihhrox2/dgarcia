const educationToggle = document.querySelector('.education-toggle');

if (educationToggle) {
  const educationContent = document.getElementById(educationToggle.getAttribute('aria-controls'));

  educationToggle.addEventListener('click', () => {
    const isOpen = educationToggle.getAttribute('aria-expanded') === 'true';
    educationToggle.setAttribute('aria-expanded', String(!isOpen));

    if (educationContent) {
      educationContent.hidden = isOpen;
    }
  });
}
