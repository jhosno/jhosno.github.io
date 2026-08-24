/**
 * case.js — Case study page behavior.
 *
 * Features:
 * - IntersectionObserver for scroll-triggered fade-in (.rise)
 * - Progress bar (ribbon__rail)
 * - Section reader with scramble effect (ribbon__readout)
 * - Language toggle (EN/ES)
 *
 * No GSAP, no Lenis. Pure vanilla JS.
 * Each case provides its own ES translations in a <script> tag.
 */
(function () {
  "use strict";

  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     1. RISE — scroll-triggered fade-in
     ------------------------------------------------------------------ */
  if ("IntersectionObserver" in window && !REDUCE) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    document.querySelectorAll(".rise").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".rise").forEach(function (el) { el.classList.add("on"); });
  }


  /* ------------------------------------------------------------------
     2. PROGRESS BAR
     ------------------------------------------------------------------ */
  var riel = document.getElementById("progress");
  var pintarRiel = function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    riel.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0).toFixed(2) + "%";
  };
  addEventListener("scroll", pintarRiel, { passive: true });
  addEventListener("resize", pintarRiel);
  pintarRiel();


  /* ------------------------------------------------------------------
     3. SECTION READER — scramble effect on band titles
     ------------------------------------------------------------------ */
  var GLYPHS = "▚▞█▓▒░/\\|<>+*#@$%&=~^01";
  var readout = document.getElementById("readout");

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

  var estados = [].slice.call(document.querySelectorAll(".band span[data-i18n]"));
  var actual = "";
  if ("IntersectionObserver" in window) {
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var txt = e.target.textContent.trim().toLowerCase();
        if (txt !== actual) { actual = txt; scramble(readout, txt); }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    estados.forEach(function (el) { io2.observe(el); });
  }


  /* ------------------------------------------------------------------
     4. LANGUAGE TOGGLE
     ------------------------------------------------------------------ */

  // ES translations are defined per-case in a separate <script> tag
  // that sets window.__CASE_ES = { ... }
  var ES = window.__CASE_ES || {};
  var EN = { _btn: "ES", _aria: "Cambiar a español" };

  var IDIOMA = "en";

  // Snapshot the original English content from the DOM
  var BASE = (function () {
    var m = { text: {}, html: {} };
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (!(k in m.text)) m.text[k] = el.textContent;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      m.html[el.getAttribute("data-i18n-html")] = el.innerHTML;
    });
    return m;
  })();

  function aplicarIdioma(lang) {
    IDIOMA = lang;
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = (lang === "es") ? ES[k] : BASE.text[k];
      if (v != null) el.textContent = v;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      var v = (lang === "es") ? ES[k] : BASE.html[k];
      if (v != null) el.innerHTML = v;
    });

    var b = document.getElementById("langBtn");
    if (b) {
      b.textContent = (lang === "es") ? ES._btn : EN._btn;
      b.setAttribute("aria-label", (lang === "es") ? ES._aria : EN._aria);
    }

    actual = ""; // reset section reader
    try { localStorage.setItem("jh-lang", lang); } catch (e) {}
  }

  // Bind button
  var langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      aplicarIdioma(IDIOMA === "en" ? "es" : "en");
    });
  }

  // Initial language: saved preference > browser language > English
  (function () {
    var g = null;
    try { g = localStorage.getItem("jh-lang"); } catch (e) {}
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    aplicarIdioma(g || (nav === "es" ? "es" : "en"));
  })();
})();
