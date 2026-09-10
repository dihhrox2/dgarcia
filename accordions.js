(() => {
  const selectors = [
    ".record-toggle",
    ".skill-toggle",
    ".education-toggle",
    ".service-toggle",
  ];
  const groupByToggle = new Map();
  selectors.forEach((selector) => {
    const group = [...document.querySelectorAll(selector)].map((toggle) => ({
      toggle,
      content: document.getElementById(toggle.getAttribute("aria-controls")),
    }));
    group.forEach(({ toggle }) => groupByToggle.set(toggle, group));
  });

  document.addEventListener("click", (event) => {
    const toggle = event.target.closest(selectors.join(", "));
    const group = groupByToggle.get(toggle);
    if (!group) return;
    const opening = toggle.getAttribute("aria-expanded") !== "true";
    group.forEach(({ toggle: item, content }) => {
      const shouldOpen = opening && item === toggle;
      item.setAttribute("aria-expanded", String(shouldOpen));
      if (!content) return;
      if (shouldOpen) window.PortfolioMotion.openContent(content);
      else window.PortfolioMotion.closeContent(content);
    });
    if (opening && toggle.matches(".skill-toggle"))
      window.PortfolioMotion.scrollToOpenedSkill(toggle);
  });
})();
