/* ============================================================
   WORK.JS — Horizontal scroll pinning (desktop only)
   ============================================================ */
(function () {
  "use strict";

  window.JH = window.JH || {};
  var REDUCE = window.JH.REDUCE;

  var mm = gsap.matchMedia();

  mm.add("(min-width: 721px)", function () {
    var track = document.getElementById("workTrack");
    var section = document.querySelector(".work");
    var vp = document.querySelector(".work__vp");

    var amount = function () {
      var pad = parseFloat(getComputedStyle(vp).paddingLeft) || 32;
      return Math.max(0, track.scrollWidth - window.innerWidth + pad * 2);
    };

    var tw = gsap.to(track, {
      x: function () { return -amount(); },
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: function () { return "+=" + amount(); },
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    if (window.JH.updateWorkPinZone) window.JH.updateWorkPinZone();
    ScrollTrigger.addEventListener("refresh", window.JH.updateWorkPinZone);

    gsap.from(".card", {
      y: 40, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.08,
      scrollTrigger: { trigger: section, start: "top 70%" }
    });

    return function () { tw.kill(); gsap.set(track, { x: 0 }); };
  });

  mm.add("(max-width: 720px)", function () {
    var t = gsap.from(".card", {
      y: 34, opacity: 0, duration: 0.7, ease: "expo.out", stagger: 0.06,
      scrollTrigger: { trigger: ".work", start: "top 78%" }
    });
    return function () { t.kill(); };
  });
})();
