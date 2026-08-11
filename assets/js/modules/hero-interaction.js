/**
 * Hero photo interaction.
 *
 * The hover expansion itself (scale, border-radius, shadow, backdrop shift)
 * is pure CSS — see .hero__figure:hover in assets/css/motion.css. This
 * module only adds the very subtle cursor-follow tilt on top of it, and
 * only where it makes sense: devices with a real mouse. Touch devices never
 * get a "hover" in the first place, so there's nothing to disable there,
 * but we still gate on (hover: hover) and (pointer: fine) so trackpads /
 * hybrid devices without a precise pointer don't get a jittery effect.
 */
export function initHeroInteraction() {
  const figure = document.querySelector(".hero__figure");
  if (!figure) return;

  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canHover || reduceMotion) return;

  const MAX_OFFSET = 5; // px — deliberately tiny, meant to be felt more than seen
  let raf = null;

  function onMove(event) {
    const rect = figure.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5; // -0.5..0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    if (raf) return;
    raf = requestAnimationFrame(() => {
      figure.style.setProperty("--tilt-x", `${(x * MAX_OFFSET * 2).toFixed(2)}px`);
      figure.style.setProperty("--tilt-y", `${(y * MAX_OFFSET * 2).toFixed(2)}px`);
      raf = null;
    });
  }

  function onLeave() {
    figure.style.setProperty("--tilt-x", "0px");
    figure.style.setProperty("--tilt-y", "0px");
  }

  figure.addEventListener("mousemove", onMove);
  figure.addEventListener("mouseleave", onLeave);
}
