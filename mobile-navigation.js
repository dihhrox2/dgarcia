const mobileNavigation = document.querySelector('.side-rail');
const mobileNavigationQuery = window.matchMedia('(max-width: 900px)');

if (mobileNavigation) {
  const mobileNavigationPlaceholder = document.createElement('div');
  mobileNavigationPlaceholder.className = 'mobile-nav-placeholder';
  mobileNavigationPlaceholder.setAttribute('aria-hidden', 'true');
  mobileNavigation.after(mobileNavigationPlaceholder);

  let lastScrollY = window.scrollY;
  let upwardDistance = 0;
  let ticking = false;

  function hideMobileNavigation() {
    mobileNavigation.classList.remove('is-mobile-floating');
    mobileNavigationPlaceholder.classList.remove('is-active');
    mobileNavigationPlaceholder.style.removeProperty('height');
    upwardDistance = 0;
  }

  function showMobileNavigation() {
    mobileNavigationPlaceholder.style.height = `${mobileNavigation.offsetHeight}px`;
    mobileNavigationPlaceholder.classList.add('is-active');
    mobileNavigation.classList.add('is-mobile-floating');
  }

  function updateMobileNavigation() {
    ticking = false;

    if (!mobileNavigationQuery.matches) {
      hideMobileNavigation();
      lastScrollY = window.scrollY;
      return;
    }

    const currentScrollY = window.scrollY;
    const movement = currentScrollY - lastScrollY;
    const originalNavigationPassed = mobileNavigation.classList.contains('is-mobile-floating')
      ? mobileNavigationPlaceholder.getBoundingClientRect().top < 0
      : mobileNavigation.getBoundingClientRect().bottom < 0;

    if (!originalNavigationPassed) {
      hideMobileNavigation();
    } else if (movement < 0) {
      upwardDistance += Math.abs(movement);

      if (upwardDistance >= 12) {
        showMobileNavigation();
      }
    } else if (movement > 0) {
      hideMobileNavigation();
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateMobileNavigation);
  }, { passive: true });

  mobileNavigationQuery.addEventListener('change', updateMobileNavigation);
  updateMobileNavigation();
}
