/**
 * Theme (light/dark) toggle.
 * Defaults to the visitor's system preference (handled purely in CSS via
 * `prefers-color-scheme`). Once the visitor toggles manually, the explicit
 * choice is written to [data-theme] on <html> and persisted in localStorage.
 */

const STORAGE_KEY = "kaiky-portfolio-theme";
const root = document.documentElement;

function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function safeSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    /* storage unavailable (private mode, disabled cookies) — fail silently */
  }
}

function applyTheme(theme) {
  if (theme === "dark" || theme === "light") {
    root.setAttribute("data-theme", theme);
  } else {
    root.removeAttribute("data-theme");
  }
}

function currentTheme() {
  const explicit = root.getAttribute("data-theme");
  if (explicit) return explicit;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function initTheme() {
  const saved = safeGet(STORAGE_KEY);
  if (saved) applyTheme(saved);

  const toggle = document.getElementById("theme-toggle");
  if (!toggle) return;

  toggle.setAttribute("aria-pressed", String(currentTheme() === "dark"));

  toggle.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    safeSet(STORAGE_KEY, next);
    toggle.setAttribute("aria-pressed", String(next === "dark"));
  });
}
