/**
 * Shows/hides the "back to top" button based on scroll position.
 */
export function initBackToTop() {
  const button = document.querySelector(".back-to-top");
  if (!button) return;

  function toggle() {
    button.classList.toggle("show", window.scrollY > 560);
  }

  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
}
