/**
 * services.js — Service page behavior (Before → After).
 *
 * Loaded after case.js, which already handles progress, the
 * section reader and the language toggle. This adds:
 * - Glitch burst on the title word (#glitch)
 * - Copy-email button with the house scramble (#copyBtn)
 */
(function () {
  "use strict";

  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var ES = window.__CASE_ES || {};
  var EN = { copy: "copy email", copied: "email copied", select: "selected, copy with ⌘C" };

  function T(k) { return (document.documentElement.lang === "es" && ES[k]) || EN[k]; }


  /* ------------------------------------------------------------------
     1. GLITCH — a burst, then quiet
     ------------------------------------------------------------------ */
  var g = document.getElementById("glitch");
  if (g && !REDUCE) {
    (function loop() {
      setTimeout(function () {
        g.classList.add("is-on");
        setTimeout(function () { g.classList.remove("is-on"); }, 160 + Math.random() * 180);
        loop();
      }, 2600 + Math.random() * 4200);
    })();
  }


  /* ------------------------------------------------------------------
     2. COPY EMAIL
     ------------------------------------------------------------------ */
  var GLYPHS = "▚▞█▓▒░/\\|<>+*#@$%&=~^01";

  function scramble(el, final, ms) {
    if (REDUCE) { el.textContent = final; return; }
    var t0 = performance.now(), chars = final.split("");
    (function paso(t) {
      var p = Math.min(1, (t - t0) / (ms || 460));
      var rev = Math.floor(p * chars.length), out = "";
      for (var i = 0; i < chars.length; i++) {
        out += (i < rev || chars[i] === " ")
          ? chars[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) requestAnimationFrame(paso); else el.textContent = final;
    })(t0);
  }

  var copyBtn = document.getElementById("copyBtn");
  var mailEl = document.getElementById("mail");
  if (copyBtn && mailEl) {
    copyBtn.addEventListener("click", function () {
      var done = function (ok) {
        scramble(copyBtn, ok ? T("copied") : T("select"));
        if (!ok) {
          var r = document.createRange(); r.selectNodeContents(mailEl);
          var s = getSelection(); s.removeAllRanges(); s.addRange(r);
        }
        setTimeout(function () { scramble(copyBtn, T("copy")); }, 2000);
      };
      try {
        navigator.clipboard.writeText(mailEl.textContent)
          .then(function () { done(true); }, function () { done(false); });
      } catch (e) { done(false); }
    });
  }
})();
