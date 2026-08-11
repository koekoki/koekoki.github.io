/**
 * Header behaviour: scroll shadow + accessible mobile menu.
 */
export function initNav() {
  const header = document.getElementById("header");
  const navToggle = document.getElementById("nav-toggle");
  const mobileNav = document.getElementById("mobile-nav");
  const mobileLinks = mobileNav ? mobileNav.querySelectorAll("a") : [];

  function setNavOpen(open) {
    if (!navToggle || !mobileNav) return;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    mobileNav.dataset.state = open ? "open" : "closed";
    document.body.classList.toggle("nav-open", open);

    if (open) {
      const firstLink = mobileNav.querySelector("a");
      if (firstLink) firstLink.focus();
    }
  }

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setNavOpen(!isOpen);
      if (isOpen) navToggle.focus();
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => setNavOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        setNavOpen(false);
        navToggle.focus();
      }
    });
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("header--scrolled", window.scrollY > 8);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}
