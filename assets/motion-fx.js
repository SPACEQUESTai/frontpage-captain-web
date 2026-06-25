/* Frontpage Captain — Motion-FX
   Nutzt das lokal gebündelte Motion (motion.dev, assets/motion.min.js, globales `Motion`).
   Belebt alle .reveal-Elemente beim Ins-Bild-Scrollen mit Feder-naher Easing-Bewegung.
   IMMER reduced-motion-sicher + robuster Fallback: ohne Motion erscheinen Elemente sofort. */
(function () {
  function run() {
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var els = [].slice.call(document.querySelectorAll('.reveal'));
    var M = window.Motion;
    // Fallback (kein Motion / reduced-motion): sofort sichtbar, kein Bruch
    if (reduce || !M || !M.inView || !M.animate) {
      els.forEach(function (e) { e.classList.add('in'); });
      return;
    }
    els.forEach(function (el) {
      M.inView(el, function () {
        M.animate(
          el,
          { opacity: [0, 1], transform: ['translateY(26px)', 'translateY(0px)'] },
          { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        );
        el.classList.add('in');
      }, { amount: 0.14 });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run);
  else run();
})();
