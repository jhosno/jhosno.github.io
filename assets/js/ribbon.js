/* ============================================================
   RIBBON.JS — Ribbon state, progress bar, active section, clock
   ============================================================ */
(function () {
  "use strict";

  window.JH = window.JH || {};
  var REDUCE = window.JH.REDUCE;
  var CONTENIDO = window.JH.CONTENIDO;

  var ribbon   = document.getElementById("ribbon");
  var progress = document.getElementById("progress");
  var readout  = document.getElementById("readout");
  var clockEl  = document.getElementById("clock");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));

  var sections = [
    { id: "top",      nav: null },
    { id: "quien",    nav: "quien" },
    { id: "trabajo",  nav: "trabajo" },
    { id: "labs",     nav: "labs" },
    { id: "contacto", nav: "contacto" }
  ];
  window.JH.currentId = "top";
  window.JH.sections = sections;

  var workPinStart = 0;
  var workPinEnd = 0;

  function updateWorkPinZone() {
    var el = document.getElementById("trabajo");
    var track = document.getElementById("workTrack");
    var vp = document.querySelector(".work__vp");
    if (!el || !track || !vp) return;
    var pad = parseFloat(getComputedStyle(vp).paddingLeft) || 32;
    var dist = Math.max(0, track.scrollWidth - window.innerWidth + pad * 2);
    workPinStart = el.offsetTop;
    workPinEnd = el.offsetTop + dist;
  }
  window.JH.updateWorkPinZone = updateWorkPinZone;

  function activeSection() {
    var scrollY = window.pageYOffset || window.scrollY;
    if (scrollY >= workPinStart && scrollY < workPinEnd) return sections[2];
    var viewMid = window.innerHeight * 0.5;
    var best = sections[0];
    for (var i = sections.length - 1; i >= 0; i--) {
      var el = document.getElementById(sections[i].id);
      if (!el) continue;
      var rect = el.getBoundingClientRect();
      if (rect.top <= viewMid) { best = sections[i]; break; }
    }
    return best;
  }

  function setSection(s) {
    if (window.JH.currentId === s.id) return;
    window.JH.currentId = s.id;
    window.JH.scramble(readout, window.JH.T()._secs[s.id], 0.5);
    navLinks.forEach(function (a) {
      a.setAttribute("data-active", a.getAttribute("data-nav") === s.nav ? "true" : "false");
    });
  }

  /* 1. Estado del cintillo */
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top+=70 top",
    onEnter:     function () { ribbon.setAttribute("data-state", "stuck"); if (window.JH.burstGlitch) window.JH.burstGlitch(260); if (window.JH.budSnap) window.JH.budSnap(); },
    onLeaveBack: function () { ribbon.setAttribute("data-state", "top");   if (window.JH.burstGlitch) window.JH.burstGlitch(260); if (window.JH.budSnap) window.JH.budSnap(); }
  });

  /* 2. Barra de progreso */
  ScrollTrigger.create({
    start: 0, end: "max",
    onUpdate: function (self) { progress.style.width = (self.progress * 100).toFixed(2) + "%"; }
  });

  /* 3. Sección activa */
  readout.textContent = window.JH.T()._secs.top;

  ScrollTrigger.create({
    trigger: document.documentElement,
    start: "top top",
    end: "bottom bottom",
    onUpdate: function () { setSection(activeSection()); }
  });

  /* 4. Reloj local */
  function tick() {
    var now = new Date();
    var utc = now.getTime() + now.getTimezoneOffset() * 60000;
    var local = new Date(utc + CONTENIDO.husoH * 3600000);
    var p = function (n) { return n < 10 ? "0" + n : "" + n; };
    clockEl.textContent = p(local.getHours()) + ":" + p(local.getMinutes()) + ":" + p(local.getSeconds());
  }
  tick();
  setInterval(tick, 1000);
})();
