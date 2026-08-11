import { initTheme } from "./modules/theme.js";
import { initNav } from "./modules/nav.js";
import { initProjects } from "./modules/render-projects.js";
import { initReveal } from "./modules/reveal.js";
import { initBackToTop } from "./modules/back-to-top.js";
import { initContactForm } from "./modules/contact-form.js";
import { initParallax } from "./modules/parallax.js";
import { initHeroInteraction } from "./modules/hero-interaction.js";

document.documentElement.classList.remove("no-js");

initTheme();
initNav();
initProjects(); // must run before initReveal() so injected cards get observed too
initReveal();
initBackToTop();
initContactForm();
initParallax();
initHeroInteraction();

const yearEl = document.getElementById("current-year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
