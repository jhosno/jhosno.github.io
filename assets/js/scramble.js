/* ============================================================
   SCRAMBLE.JS — Text scramble / reveal utility
   ============================================================ */
(function () {
  "use strict";
  var GLYPHS = "▚▞█▓▒░/\\|<>+*#@$%&=~^01";

  window.JH = window.JH || {};
  window.JH.scramble = function (el, finalText, dur) {
    if (window.JH.REDUCE) { el.textContent = finalText; return; }
    dur = dur || 0.65;
    var chars = finalText.split("");
    var state = { p: 0 };
    gsap.killTweensOf(state);
    gsap.to(state, {
      p: 1, duration: dur, ease: "power2.out",
      onUpdate: function () {
        var reveal = Math.floor(state.p * chars.length);
        var out = "";
        for (var i = 0; i < chars.length; i++) {
          if (i < reveal || chars[i] === " ") out += chars[i];
          else out += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        }
        el.textContent = out;
      },
      onComplete: function () { el.textContent = finalText; }
    });
  };
})();
