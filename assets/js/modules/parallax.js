/**
 * Subtle scroll-based motion for decorative floaters marked with
 * [data-parallax]. Movement is bounded to a few pixels/degrees while an
 * element crosses the viewport — nothing travels across the screen, it
 * just drifts a little, independently of the sections around it.
 *
 * Performance:
 *  - Reads (getBoundingClientRect) and writes (style.transform) are batched
 *    once per animation frame via requestAnimationFrame, never per scroll
 *    event.
 *  - IntersectionObserver skips any floater that isn't near the viewport,
 *    so scrolling through sections with no floater costs nothing extra.
 *  - Disabled entirely under prefers-reduced-motion, and floaters are
 *    hidden on small screens by CSS (assets/css/motion.css), so this module
 *    simply has nothing to select there.
 */
export function initParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const items = [...document.querySelectorAll("[data-parallax]")].map((el) => ({
    el,
    speed: parseFloat(el.dataset.parallaxSpeed || "16"),
    rotate: parseFloat(el.dataset.parallaxRotate || "0"),
    // Starts inactive: none of these floaters sit in the initial viewport,
    // so there's nothing to position until IntersectionObserver confirms
    // one is actually near the screen.
    active: false,
  }));

  if (!items.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const item = items.find((i) => i.el === entry.target);
          if (item) item.active = entry.isIntersecting;
        });
        onScroll();
      },
      { rootMargin: "25% 0px 25% 0px" }
    );
    items.forEach((item) => observer.observe(item.el));
  } else {
    // No IntersectionObserver support: just animate everything, still rAF-throttled.
    items.forEach((item) => (item.active = true));
  }

  let ticking = false;

  function update() {
    const vh = window.innerHeight;
    items.forEach((item) => {
      if (!item.active) return;
      const rect = item.el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      // Clamped so an element far from the viewport (e.g. before its first
      // IntersectionObserver callback resolves) can never get an oversized
      // offset — the drift always stays within +/- speed/2 px.
      const progress = Math.max(-0.5, Math.min(0.5, (vh / 2 - center) / vh));
      const y = (progress * item.speed).toFixed(1);
      const rotate = (progress * item.rotate).toFixed(2);
      item.el.style.transform = `translate3d(0, ${y}px, 0) rotate(${rotate}deg)`;
    });
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}
