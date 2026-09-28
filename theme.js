export function initializeTheme() {
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  let savedTheme;
  try {
    savedTheme = localStorage.getItem("diego-garcia-theme");
  } catch {
    /* Session theme still works when storage is blocked. */
  }
  const systemTheme = window.matchMedia("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
  const initialTheme =
    savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemTheme;

  function setTheme(theme, { persist = true } = {}) {
    if (theme !== "light" && theme !== "dark") return;
    root.setAttribute("data-theme", theme);
    if (persist) {
      try {
        localStorage.setItem("diego-garcia-theme", theme);
      } catch {
        /* Keep the selected theme in this document. */
      }
    }
    if (themeToggle) {
      themeToggle.classList.toggle("theme-is-light", theme === "light");
      themeToggle.classList.toggle("theme-is-dark", theme === "dark");
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro",
      );
    }
    window.dispatchEvent(new CustomEvent("portfolio:theme-change"));
  }

  setTheme(initialTheme, { persist: false });
  themeToggle?.addEventListener("click", () =>
    setTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark"),
  );
}
