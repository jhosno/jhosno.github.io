/* HERO — ASCII art, dither, plant, cursor bug */
(function() {
  "use strict";
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var RAMPA = " .:-=+*#%@", RN = RAMPA.length - 1;

  function ruido(i) {
    var n = Math.sin(i * 12.9898) * 43758.5453;
    return n - Math.floor(n);
  }

  function medirCelda(px) {
    var s = document.createElement("span");
    s.style.cssText = "position:absolute;visibility:hidden;white-space:pre;line-height:1;" +
      "letter-spacing:0;font-size:" + px + "px;font-family:" +
      getComputedStyle(document.body).fontFamily;
    s.textContent = "0000000000";
    document.body.appendChild(s);
    var r = s.getBoundingClientRect();
    document.body.removeChild(s);
    return { w: (r.width / 10) || px * 0.6, h: r.height || px };
  }

  // === DITHER ===
  var noiseEl = document.getElementById("noise");
  var DC = 0, DR = 0, dbuf = [];

  function medirDither() {
    var heroEl = document.querySelector(".hero");
    if (!heroEl || !noiseEl) return;
    var caja = heroEl.getBoundingClientRect();
    var px = Math.max(7, Math.min(13, caja.width / 78));
    noiseEl.style.setProperty("--ascii-fs", px + "px");
    var c = medirCelda(px);
    DC = Math.ceil(caja.width / c.w) + 1;
    DR = Math.ceil(caja.height / c.h) + 1;
  }

  function tri(x) { x = x - Math.floor(x); return x < .5 ? x * 2 : 2 - x * 2; }

  function pintarDither(t) {
    if (!noiseEl) return;
    for (var y = 0; y < DR; y++) {
      var fila = "";
      for (var x = 0; x < DC; x++) {
        var v = 0.5 * tri(x * 0.052 + y * 0.030 + t * 0.055)
              + 0.5 * tri(x * 0.031 - y * 0.047 - t * 0.032);
        v = v * 0.72 + ruido(y * DC + x) * 0.28;
        fila += v <= 0.42 ? " " : RAMPA.charAt(((v - 0.42) / 0.58 * RN) | 0);
      }
      dbuf[y] = fila;
    }
    dbuf.length = DR;
    noiseEl.textContent = dbuf.join("\n");
  }

  // === BUG CURSOR ===
  var bugEl = document.getElementById("bugcur");
  var BX = -400, BY = -400, TX = -400, TY = -400, VIVO = false;

  if (bugEl && !REDUCE) {
    document.documentElement.style.cursor = "none";
    addEventListener("pointermove", function(e) {
      if (e.pointerType && e.pointerType !== "mouse") return;
      TX = e.clientX; TY = e.clientY; VIVO = true;
    }, { passive: true });
    addEventListener("pointerleave", function() { VIVO = false; });
  }

  // === MAIN LOOP ===
  if (!REDUCE && noiseEl) {
    medirDither();
    var rt;
    addEventListener("resize", function() { clearTimeout(rt); rt = setTimeout(medirDither, 180); });

    var t0 = performance.now(), f = 0;
    (function marco(now) {
      var t = (now - t0) / 1000; f++;
      if (f % 3 === 0) pintarDither(t);
      if (bugEl) {
        BX += (TX - BX) * 0.17; BY += (TY - BY) * 0.17;
        bugEl.classList.toggle("is-on", VIVO);
        bugEl.style.transform = "translate3d(" + (BX - 9) + "px," + (BY - 9) + "px,0)";
      }
      requestAnimationFrame(marco);
    })(t0);
  } else if (noiseEl) {
    // reduced motion: just show static
    noiseEl.textContent = "";
  }

  // === WORDMARK GLITCH ===
  var wordmark = document.getElementById("wordmark");
  if (wordmark && !REDUCE) {
    setInterval(function() {
      wordmark.classList.add("is-glitching");
      setTimeout(function() { wordmark.classList.remove("is-glitching"); }, 150);
    }, 4000 + Math.random() * 3000);
  }

  // === RANDOM FACTS ===
  var facts = [
    "wordpress", "laravel", "brand identity", "bug catcher",
    "refactor", "multi-tenant", "SaaS", "white-label",
    "art direction", "open to work", "GSAP", "PHP"
  ];
  var factEl = document.getElementById("fact");
  if (factEl) {
    setInterval(function() {
      var pick = facts[Math.floor(Math.random() * facts.length)];
      if (typeof JH !== "undefined") JH.scramble(factEl, pick, 400);
    }, 3500);
  }

  // === SEAL ROTATION ===
  var sealRing = document.getElementById("seal");
  if (sealRing && !REDUCE) {
    var sealAngle = 0;
    (function giraSeal() {
      sealAngle += 0.15;
      sealRing.style.transform = "rotate(" + sealAngle + "deg)";
      requestAnimationFrame(giraSeal);
    })();
  }

  // === CLOCK ===
  var clockEl = document.getElementById("clock");
  if (clockEl && typeof JH !== "undefined") {
    JH.initClock(clockEl);
  }
})();
