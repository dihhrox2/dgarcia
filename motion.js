(() => {
  const tabDuration = 100;
  const contentDuration = 300;
  const tabItemsDuration = 200;
  const initialDuration = 500;
  const reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  const panels = [...document.querySelectorAll(".tab-panel")];
  const contentPanel = document.querySelector(".content-panel");
  const sideRail = document.querySelector(".side-rail");
  const appShell = document.querySelector(".app-shell");
  const tabItemSelectors = {
    about: ".about-summary > div, .competency-grid > article",
    experience: ".record-list > .record",
    education: ".education-section",
    skills: ".skill-group",
    projects: ".project-grid > .project-card",
    services: ".service-accordions > .service-accordion",
    additional: ".additional-list > article",
    contact: ".contact-list > *",
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
    animatedTabItems.forEach((item) =>
      item.classList.remove("is-tab-item-pending", "is-tab-item-entering"),
    );
    animatedTabItems = [];
  }

  function queueTabItemsMotion(panel) {
    clearTabItemsMotion();
    if (!motionEnabled() || !panel || panel.hidden) return;

    const selector = tabItemSelectors[panel.id];
    if (!selector) return;
    animatedTabItems = [...panel.querySelectorAll(selector)];
    animatedTabItems.forEach((item) =>
      item.classList.add("is-tab-item-pending"),
    );
    tabItemsTimer = window.setTimeout(() => {
      if (panel.hidden) return;
      animatedTabItems.forEach((item) => {
        item.classList.remove("is-tab-item-pending");
        item.classList.add("is-tab-item-entering");
      });
      tabItemsTimer = window.setTimeout(() => {
        animatedTabItems.forEach((item) =>
          item.classList.remove("is-tab-item-entering"),
        );
        animatedTabItems = [];
      }, tabItemsDuration);
    }, tabDuration);
  }

  function clearTabMotion() {
    window.clearTimeout(tabTimer);
    tabTimer = 0;
    clearTabItemsMotion();
    panels.forEach((panel) =>
      panel.classList.remove("is-tab-entering", "is-tab-leaving"),
    );
    document.querySelectorAll(".is-motion-entering").forEach((content) => {
      clearContentTimer(content);
      content.classList.remove("is-motion-entering");
    });
  }

  window.addEventListener("portfolio:tab-change", ({ detail }) => {
    clearTabMotion();
    cancelSkillScroll();
    const panel = detail.panel;
    if (!motionEnabled()) return;
    panel.classList.add("is-tab-entering");
    queueTabItemsMotion(panel);
    tabTimer = window.setTimeout(
      () => panel.classList.remove("is-tab-entering"),
      tabDuration,
    );
  });

  function openContent(content) {
    clearContentTimer(content);
    content.hidden = false;
    content.removeAttribute("aria-hidden");
    content.classList.remove("is-motion-leaving");

    if (!motionEnabled()) return;

    content.classList.remove("is-motion-entering");
    void content.offsetWidth;
    content.classList.add("is-motion-entering");
    content._motionTimer = window.setTimeout(() => {
      content.classList.remove("is-motion-entering");
    }, contentDuration);
  }

  function closeContent(content) {
    clearContentTimer(content);
    content.setAttribute("aria-hidden", "true");
    content.classList.remove("is-motion-entering", "is-motion-leaving");
    content.hidden = true;
  }

  let skillScrollFrame = 0;
  let finishSkillScroll = null;
  function cancelSkillScroll() {
    window.cancelAnimationFrame(skillScrollFrame);
    skillScrollFrame = 0;
    finishSkillScroll?.();
    finishSkillScroll = null;
  }

  function scrollToOpenedSkill(toggle) {
    cancelSkillScroll();
    const behavior = motionEnabled() ? "smooth" : "auto";
    skillScrollFrame = window.requestAnimationFrame(() => {
      skillScrollFrame = 0;
      if (
        toggle.closest(".tab-panel")?.hidden ||
        toggle.getAttribute("aria-expanded") !== "true"
      )
        return;
      if (window.matchMedia("(max-width: 900px)").matches) {
        let completed = false;
        let settleTimer = 0;
        let safetyTimer = 0;
        const finishAutoScroll = () => {
          if (completed) return;
          completed = true;
          finishSkillScroll = null;
          window.clearTimeout(settleTimer);
          window.clearTimeout(safetyTimer);
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("scrollend", finishAutoScroll);
          window.dispatchEvent(new CustomEvent("portfolio:auto-scroll-end"));
        };
        const onScroll = () => {
          window.clearTimeout(settleTimer);
          settleTimer = window.setTimeout(finishAutoScroll, 180);
        };

        finishSkillScroll = finishAutoScroll;
        window.dispatchEvent(new CustomEvent("portfolio:auto-scroll-start"));
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("scrollend", finishAutoScroll, { once: true });
        window.scrollTo({
          top: toggle.getBoundingClientRect().top + window.scrollY - 16,
          behavior,
        });
        settleTimer = window.setTimeout(finishAutoScroll, 250);
        safetyTimer = window.setTimeout(finishAutoScroll, 2000);
        return;
      }

      if (!contentPanel) return;
      contentPanel.scrollTo({
        top:
          toggle.getBoundingClientRect().top -
          contentPanel.getBoundingClientRect().top +
          contentPanel.scrollTop -
          18,
        behavior,
      });
    });
  }

  // Accordion state belongs to accordions.js; this API only handles presentation.
  window.PortfolioMotion = { openContent, closeContent, scrollToOpenedSkill };

  let initialFrame = 0;
  let initialTimer = 0;
  let initialMobile = false;
  let initialActive = false;

  function finishInitialNavigation() {
    window.cancelAnimationFrame(initialFrame);
    window.clearTimeout(initialTimer);
    sideRail?.classList.remove("is-initial-entering");
    contentPanel?.classList.remove("is-initial-entering");
    document.body.classList.remove(
      "is-initial-profile-motion",
      "is-initial-profile-stage",
    );
    appShell?.style.removeProperty("--initial-profile-top");
    if (initialActive && initialMobile)
      window.dispatchEvent(new CustomEvent("portfolio:initial-motion-end"));
    initialActive = false;
  }

  function animateInitialNavigation() {
    const isMobile = window.matchMedia("(max-width: 900px)").matches;
    if (isMobile) {
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      window.addEventListener(
        "load",
        () => {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        },
        { once: true },
      );
    }

    if (!sideRail || !motionEnabled()) return;

    const needsProfileStage =
      isMobile && !document.body.classList.contains("is-about-tab");

    if (needsProfileStage && appShell) {
      appShell.style.setProperty(
        "--initial-profile-top",
        `${sideRail.offsetHeight + 12}px`,
      );
      document.body.classList.add("is-initial-profile-stage");
    }

    initialMobile = isMobile;
    initialActive = true;
    document.body.classList.add("is-initial-profile-motion");
    if (isMobile)
      window.dispatchEvent(new CustomEvent("portfolio:initial-motion-start"));
    initialFrame = window.requestAnimationFrame(() => {
      if (isMobile) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      sideRail.classList.add("is-initial-entering");
      contentPanel?.classList.add("is-initial-entering");
      initialTimer = window.setTimeout(
        finishInitialNavigation,
        initialDuration,
      );
    });
  }

  reducedMotionQuery.addEventListener("change", () => {
    if (!motionEnabled()) {
      clearTabMotion();
      cancelSkillScroll();
      finishInitialNavigation();
    }
  });

  animateInitialNavigation();
  queueTabItemsMotion(
    panels.find((panel) => panel.classList.contains("active")),
  );
})();
