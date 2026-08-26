/* ============================================================
   MARQUEE.JS — Infinite marquee builder + velocity reactive
   ============================================================ */
(function () {
  "use strict";

  window.JH = window.JH || {};
  var REDUCE = window.JH.REDUCE;

  var marquees = [];

  function buildMarquees() {
    marquees.forEach(function (m) { m.tw.kill(); gsap.set(m.el, { x: 0, skewX: 0 }); });
    marquees = [];

    document.querySelectorAll("[data-marquee]").forEach(function (host) {
      var mq = host.classList.contains("marquee") ? host : host.querySelector(".marquee");
      if (!mq) return;
      var track = mq.querySelector(".marquee__track");
      if (!track) return;

      if (track.children.length < 2) {
        track.appendChild(track.firstElementChild.cloneNode(true))
             .setAttribute("aria-hidden", "true");
      }

      var speed = parseFloat(host.getAttribute("data-speed")) || 50;
      var dir = parseFloat(host.getAttribute("data-dir")) || 1;
      var width = track.scrollWidth / 2;
      if (!width) return;

      var tw = gsap.fromTo(track,
        { x: dir > 0 ? 0 : -width },
        { x: dir > 0 ? -width : 0, duration: width / speed, ease: "none", repeat: -1 }
      );

      if (REDUCE) tw.pause(0);

      marquees.push({
        tw: tw,
        el: track,
        reactive: host.hasAttribute("data-velocity"),
        skewTo: gsap.quickTo(track, "skewX", { duration: 0.45, ease: "power3" })
      });
    });
  }

  /* Velocidad reactiva al scroll */
  var velTarget = 1, velCurrent = 1, skewTarget = 0;

  if (!REDUCE) {
    ScrollTrigger.create({
      onUpdate: function (self) {
        var v = self.getVelocity();
        velTarget = gsap.utils.clamp(-5, 5, 1 + v / 900);
        skewTarget = gsap.utils.clamp(-8, 8, v / 260);
      }
    });

    gsap.ticker.add(function () {
      velTarget += (1 - velTarget) * 0.035;
      skewTarget += (0 - skewTarget) * 0.08;
      velCurrent += (velTarget - velCurrent) * 0.12;

      for (var i = 0; i < marquees.length; i++) {
        if (!marquees[i].reactive) continue;
        marquees[i].tw.timeScale(velCurrent);
        marquees[i].skewTo(skewTarget);
      }
    });
  }

  window.JH.buildMarquees = buildMarquees;
})();
