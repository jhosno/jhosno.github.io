/* ============================================================
   SCROLL.JS — Lenis smooth scroll + ScrollTrigger sync + goTo
   ============================================================ */
(function () {
  "use strict";

  window.JH = window.JH || {};
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.JH.REDUCE = REDUCE;

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  var lenis = null;
  if (!REDUCE && typeof Lenis !== "undefined") {
    lenis = new Lenis({ lerp: 0.095, wheelMultiplier: 1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  function goTo(target) {
    var y = (target instanceof HTMLElement) ? target.getBoundingClientRect().top + window.pageYOffset : 0;
    if (lenis) { lenis.scrollTo(y, { offset: 0, duration: 1.15 }); return; }
    if (typeof ScrollToPlugin !== "undefined") {
      gsap.to(window, { duration: 0.9, scrollTo: y, ease: "power2.inOut" });
    } else {
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  document.querySelectorAll('[data-scroll]').forEach(function(a){
    a.addEventListener('click',function(e){
      e.preventDefault();
      if (a.getAttribute('href') === '#top') {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      var target = document.querySelector(a.getAttribute('href'));
      if (target) goTo(target);
    });
  });

  window.JH.lenis = lenis;
  window.JH.goTo = goTo;
})();
