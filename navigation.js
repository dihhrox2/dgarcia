export function initializeNavigation() {
  const tabs = [...document.querySelectorAll(".nav-tab")];
  const panels = [...document.querySelectorAll(".tab-panel")];
  const panelById = new Map(panels.map((panel) => [panel.id, panel]));
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
      Object.keys(tabByHash).find(
        (hash) => tabByHash[hash] === tab.dataset.tab,
      ),
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
    if (
      !["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(event.key)
    )
      return;
    const index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    event.preventDefault();
    const forward = event.key === "ArrowDown" || event.key === "ArrowRight";
    tabs[(index + (forward ? 1 : -1) + tabs.length) % tabs.length].focus();
  });
}
