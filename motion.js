(() => {
  const tabDuration = 100;
  const contentDuration = 300;
  const tabItemsDuration = 200;
  const initialDuration = 500;
  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const panels = [...document.querySelectorAll('.tab-panel')];
  const contentPanel = document.querySelector('.content-panel');
  const sideRail = document.querySelector('.side-rail');
  const appShell = document.querySelector('.app-shell');
  const tabItemSelectors = {
    about: '.about-summary > div, .competency-grid > article',
    experience: '.record-list > .record',
    education: '.education-section',
    skills: '.skill-group',
    projects: '.project-grid > .project-card',
    services: '.service-accordions > .service-accordion',
    additional: '.additional-list > article',
    contact: '.contact-list > *',
  };
  const hashByTab = {
    about: 'sobre',
    experience: 'experiencia',
    education: 'formacao',
    skills: 'habilidades',
    projects: 'projetos',
    services: 'servicos',
    additional: 'informacoes-adicionais',
    contact: 'contato',
  };
  let tabTimer = 0;
  let tabItemsTimer = 0;
  let animatedTabItems = [];

  const motionEnabled = () => !reducedMotionQuery.matches;
  const clearContentTimer = (content) => {
    window.clearTimeout(content._motionTimer);
    content._motionTimer = 0;
  };

  function clearTabItemsMotion() {
    window.clearTimeout(tabItemsTimer);
    tabItemsTimer = 0;
    animatedTabItems.forEach((item) => item.classList.remove('is-tab-item-pending', 'is-tab-item-entering'));
    animatedTabItems = [];
  }

  function queueTabItemsMotion(panel) {
    clearTabItemsMotion();
    if (!motionEnabled() || !panel || panel.hidden) return;

    const selector = tabItemSelectors[panel.id];
    if (!selector) return;
    animatedTabItems = [...panel.querySelectorAll(selector)];
    animatedTabItems.forEach((item) => item.classList.add('is-tab-item-pending'));
    tabItemsTimer = window.setTimeout(() => {
      if (panel.hidden) return;
      animatedTabItems.forEach((item) => {
        item.classList.remove('is-tab-item-pending');
        item.classList.add('is-tab-item-entering');
      });
      tabItemsTimer = window.setTimeout(() => {
        animatedTabItems.forEach((item) => item.classList.remove('is-tab-item-entering'));
        animatedTabItems = [];
      }, tabItemsDuration);
    }, tabDuration);
  }

  function renderTab(id, updateUrl) {
    const target = document.getElementById(id);
    if (!target) return;

    panels.forEach((panel) => {
      panel.hidden = panel !== target;
      panel.classList.toggle('active', panel === target);
      panel.classList.remove('is-tab-entering', 'is-tab-leaving');
    });

    tabs.forEach((tab) => {
      const active = tab.dataset.tab === id;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    document.body.classList.toggle('is-about-tab', id === 'about');
    if (contentPanel) contentPanel.scrollTop = 0;

    if (updateUrl) {
      const hash = `#${hashByTab[id]}`;
      if (window.location.hash !== hash) history.pushState(null, '', hash);
    }
  }

  function transitionToTab(id, updateUrl) {
    const current = panels.find((panel) => panel.classList.contains('active'));
    if (!current || current.id === id || !motionEnabled()) {
      if (current?.id !== id) clearTabItemsMotion();
      renderTab(id, updateUrl);
      return;
    }

    window.clearTimeout(tabTimer);
    clearTabItemsMotion();
    panels.forEach((panel) => panel.classList.remove('is-tab-entering', 'is-tab-leaving'));
    renderTab(id, updateUrl);
    const next = document.getElementById(id);
    if (!next) return;

    next.classList.add('is-tab-entering');
    queueTabItemsMotion(next);
    tabTimer = window.setTimeout(() => next.classList.remove('is-tab-entering'), tabDuration);
  }

  function openContent(content) {
    clearContentTimer(content);
    content.hidden = false;
    content.removeAttribute('aria-hidden');
    content.classList.remove('is-motion-leaving');

    if (!motionEnabled()) return;

    content.classList.remove('is-motion-entering');
    void content.offsetWidth;
    content.classList.add('is-motion-entering');
    content._motionTimer = window.setTimeout(() => {
      content.classList.remove('is-motion-entering');
    }, contentDuration);
  }

  function closeContent(content) {
    clearContentTimer(content);
    content.setAttribute('aria-hidden', 'true');
    content.classList.remove('is-motion-entering', 'is-motion-leaving');
    content.hidden = true;
  }

  function scrollToOpenedSkill(toggle) {
    const behavior = motionEnabled() ? 'smooth' : 'auto';
    window.requestAnimationFrame(() => {
      if (window.matchMedia('(max-width: 900px)').matches) {
        let completed = false;
        let settleTimer = 0;
        let safetyTimer = 0;
        const finishAutoScroll = () => {
          if (completed) return;
          completed = true;
          window.clearTimeout(settleTimer);
          window.clearTimeout(safetyTimer);
          window.removeEventListener('scroll', onScroll);
          window.removeEventListener('scrollend', finishAutoScroll);
          window.dispatchEvent(new CustomEvent('portfolio:auto-scroll-end'));
        };
        const onScroll = () => {
          window.clearTimeout(settleTimer);
          settleTimer = window.setTimeout(finishAutoScroll, 180);
        };

        window.dispatchEvent(new CustomEvent('portfolio:auto-scroll-start'));
        window.addEventListener('scroll', onScroll, { passive:true });
        window.addEventListener('scrollend', finishAutoScroll, { once:true });
        window.scrollTo({ top: toggle.getBoundingClientRect().top + window.scrollY - 16, behavior });
        settleTimer = window.setTimeout(finishAutoScroll, 250);
        safetyTimer = window.setTimeout(finishAutoScroll, 2000);
        return;
      }

      if (!contentPanel) return;
      contentPanel.scrollTo({
        top: toggle.getBoundingClientRect().top - contentPanel.getBoundingClientRect().top + contentPanel.scrollTop - 18,
        behavior,
      });
    });
  }

  function toggleAccordion(toggle) {
    const selector = toggle.matches('.record-toggle') ? '.record-toggle'
      : toggle.matches('.skill-toggle') ? '.skill-toggle'
      : toggle.matches('.service-toggle') ? '.service-toggle'
      : '.education-toggle';
    const group = [...document.querySelectorAll(selector)];
    const opening = toggle.getAttribute('aria-expanded') !== 'true';

    group.forEach((item) => {
      const content = document.getElementById(item.getAttribute('aria-controls'));
      const shouldOpen = opening && item === toggle;
      item.setAttribute('aria-expanded', String(shouldOpen));
      if (!content) return;
      if (shouldOpen) openContent(content);
      else closeContent(content);
    });

    if (opening && toggle.matches('.skill-toggle')) scrollToOpenedSkill(toggle);
  }

  document.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-tab]');
    if (tab) {
      event.preventDefault();
      event.stopPropagation();
      transitionToTab(tab.dataset.tab, true);
      return;
    }

    const toggle = event.target.closest('.record-toggle, .skill-toggle, .education-toggle, .service-toggle');
    if (!toggle) return;
    event.preventDefault();
    event.stopPropagation();
    toggleAccordion(toggle);
  }, true);

  function animateInitialNavigation() {
    const isMobile = window.matchMedia('(max-width: 900px)').matches;
    if (isMobile) {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      window.addEventListener('load', () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }, { once: true });
    }

    if (!sideRail || !motionEnabled()) return;

    const needsProfileStage = isMobile && !document.body.classList.contains('is-about-tab');

    if (needsProfileStage && appShell) {
      appShell.style.setProperty('--initial-profile-top', `${sideRail.offsetHeight + 12}px`);
      document.body.classList.add('is-initial-profile-stage');
    }

    document.body.classList.add('is-initial-profile-motion');
    if (isMobile) window.dispatchEvent(new CustomEvent('portfolio:initial-motion-start'));
    window.requestAnimationFrame(() => {
      if (isMobile) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      sideRail.classList.add('is-initial-entering');
      contentPanel?.classList.add('is-initial-entering');
      window.setTimeout(() => {
        sideRail.classList.remove('is-initial-entering');
        contentPanel?.classList.remove('is-initial-entering');
        document.body.classList.remove('is-initial-profile-motion', 'is-initial-profile-stage');
        appShell?.style.removeProperty('--initial-profile-top');
        if (isMobile) window.dispatchEvent(new CustomEvent('portfolio:initial-motion-end'));
      }, initialDuration);
    });
  }

  animateInitialNavigation();
  queueTabItemsMotion(panels.find((panel) => panel.classList.contains('active')));
})();
