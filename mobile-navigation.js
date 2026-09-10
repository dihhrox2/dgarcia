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
  let initialMotionActive = false;
  let awaitingPostMotionScroll = false;
  let automaticScrollActive = false;
  let awaitingUserScroll = false;

  function hideMobileNavigation() {
    mobileNavigation.classList.remove('is-mobile-floating');
    mobileNavigation.style.removeProperty('--mobile-nav-left');
    mobileNavigation.style.removeProperty('--mobile-nav-width');
    mobileNavigationPlaceholder.classList.remove('is-active');
    mobileNavigationPlaceholder.style.removeProperty('height');
    upwardDistance = 0;
  }

  function showMobileNavigation() {
    if (mobileNavigation.classList.contains('is-mobile-floating')) return;

    const bounds = mobileNavigation.getBoundingClientRect();
    mobileNavigation.style.setProperty('--mobile-nav-left', `${bounds.left}px`);
    mobileNavigation.style.setProperty('--mobile-nav-width', `${bounds.width}px`);
    mobileNavigationPlaceholder.style.height = `${mobileNavigation.offsetHeight}px`;
    mobileNavigationPlaceholder.classList.add('is-active');
    mobileNavigation.classList.add('is-mobile-floating');
  }

  function updateMobileNavigation() {
    ticking = false;

    if (initialMotionActive || automaticScrollActive) {
      hideMobileNavigation();
      lastScrollY = window.scrollY;
      return;
    }

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
    if (initialMotionActive || automaticScrollActive) {
      hideMobileNavigation();
      lastScrollY = window.scrollY;
      return;
    }

    if (awaitingPostMotionScroll || awaitingUserScroll) {
      awaitingPostMotionScroll = false;
      awaitingUserScroll = false;
      lastScrollY = window.scrollY;
      upwardDistance = 0;
      return;
    }

    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateMobileNavigation);
  }, { passive: true });

  function acknowledgeUserScroll() {
    if (!awaitingUserScroll) return;
    awaitingUserScroll = false;
    lastScrollY = window.scrollY;
    upwardDistance = 0;
  }

  window.addEventListener('wheel', acknowledgeUserScroll, { passive: true });
  window.addEventListener('touchstart', acknowledgeUserScroll, { passive: true });
  window.addEventListener('keydown', (event) => {
    if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
      acknowledgeUserScroll();
    }
  });

  mobileNavigationQuery.addEventListener('change', updateMobileNavigation);
  window.addEventListener('resize', () => {
    if (!mobileNavigation.classList.contains('is-mobile-floating')) return;
    hideMobileNavigation();
    lastScrollY = window.scrollY;
  });

  window.addEventListener('portfolio:initial-motion-start', () => {
    initialMotionActive = true;
    awaitingPostMotionScroll = false;
    hideMobileNavigation();
    lastScrollY = window.scrollY;
  });

  window.addEventListener('portfolio:initial-motion-end', () => {
    initialMotionActive = false;
    awaitingPostMotionScroll = true;
    hideMobileNavigation();
    lastScrollY = window.scrollY;
  });

  window.addEventListener('portfolio:auto-scroll-start', () => {
    automaticScrollActive = true;
    awaitingUserScroll = false;
    hideMobileNavigation();
    lastScrollY = window.scrollY;
  });

  window.addEventListener('portfolio:auto-scroll-end', () => {
    automaticScrollActive = false;
    awaitingUserScroll = true;
    hideMobileNavigation();
    lastScrollY = window.scrollY;
  });

  updateMobileNavigation();
}
