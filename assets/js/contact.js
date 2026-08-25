/* ============================================================
   CONTACT.JS — Copy email, cepo trap animation, draggable btn
   ============================================================ */
(function () {
  "use strict";

  window.JH = window.JH || {};
  var REDUCE = window.JH.REDUCE;
  var CONTENIDO = window.JH.CONTENIDO;

  var copyBtn = document.getElementById("copyBtn");
  var MAIL = CONTENIDO.correo;

  function copyMailToClipboard() {
    var done = function () {
      if (window.JH.burstGlitch) window.JH.burstGlitch(200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(MAIL).then(done, done);
    } else {
      var ta = document.createElement("textarea");
      ta.value = MAIL; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (e) {}
      document.body.removeChild(ta);
      done();
    }
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      copyMailToClipboard();
      window.JH.scramble(copyBtn, window.JH.T()._copied, 0.5);
      setTimeout(function () {
        window.JH.scramble(copyBtn, window.JH.IDIOMA() === "es" ? window.JH.ES.copy : window.JH.BASE.text.copy, 0.5);
      }, 2000);
    });
  }

  var tickerCopy = document.getElementById("tickerCopy");
  if (tickerCopy) {
    tickerCopy.addEventListener("click", function () {
      copyMailToClipboard();
      var orig = tickerCopy.textContent;
      tickerCopy.textContent = window.JH.T()._copied || "copied";
      setTimeout(function () { tickerCopy.textContent = orig; }, 1500);
    });
  }

  /* --- CEPO — trap animation --- */
  var trapEl   = document.getElementById("trap");
  var ciliaT   = document.getElementById("ciliaTop");
  var ciliaB   = document.getElementById("ciliaBot");
  var countEl  = document.getElementById("trapCount");
  var mailEl   = document.getElementById("bigmail");

  if (trapEl && ciliaT && ciliaB && mailEl) {
    var TRAP = { close: 1 };
    var capturas = 0;
    var recorrido = 0;

    function construirCilios() {
      var probe = document.createElement("span");
      var cs = getComputedStyle(ciliaT);
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;" +
        "font-family:" + cs.fontFamily + ";font-size:" + cs.fontSize + ";letter-spacing:0";
      probe.textContent = "/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\";   // 20 characters
      document.body.appendChild(probe);
      var cw = probe.getBoundingClientRect().width / 20;
      document.body.removeChild(probe);
      if (!cw || !isFinite(cw)) cw = 8;

      var n = Math.max(10, Math.floor((trapEl.clientWidth || 320) / cw));
      if (n % 2) n--;
      var vaina   = new Array(n + 1).join("%");
      var arriba  = new Array(n / 2 + 1).join("\\/");
      var abajo   = new Array(n / 2 + 1).join("/\\");

      ciliaT.textContent = vaina + "\n" + arriba;
      ciliaB.textContent = abajo + "\n" + vaina;

      gsap.set([ciliaT, ciliaB], { y: 0 });
      var rt2 = ciliaT.getBoundingClientRect(), rb2 = ciliaB.getBoundingClientRect();
      recorrido = Math.max(24, (rb2.top - rt2.bottom) / 2 + ciliaT.offsetHeight * 0.42);
      pintarCepo();
    }

    function pintarCepo() {
      var c = TRAP.close;
      var bulto = 1 + 0.022 * c;
      gsap.set(ciliaT, { y:  recorrido * c, scaleX: bulto });
      gsap.set(ciliaB, { y: -recorrido * c, scaleX: bulto });
      gsap.set(mailEl, { scaleY: 1 - 0.66 * c, opacity: 1 - 0.72 * c });
    }

    var tlCepo = null;

    function pararCepo() {
      if (tlCepo) { tlCepo.kill(); tlCepo = null; }
      gsap.killTweensOf(TRAP);
    }

    function cepoA(v, dur, ease) {
      if (REDUCE) { TRAP.close = v; pintarCepo(); return; }
      pararCepo();
      tlCepo = gsap.to(TRAP, { close: v, duration: dur, ease: ease, onUpdate: pintarCepo });
    }

    function morder() {
      capturas++;
      var b = countEl && countEl.querySelector("b");
      if (b) window.JH.scramble(b, String(capturas), 0.4);
      if (REDUCE) return;
      pararCepo();
      if (window.JH.burstGlitch) window.JH.burstGlitch(220);
      tlCepo = gsap.timeline({ onUpdate: pintarCepo })
        .to(TRAP, { close: 1, duration: 0.09, ease: "power4.in" })
        .to(TRAP, { close: 0, duration: 2.4,  ease: "power2.inOut" }, "+=0.7");
    }

    construirCilios();

    ScrollTrigger.create({
      trigger: trapEl, start: "top 88%", once: true,
      onEnter: function () { cepoA(0, 1.5, "power3.out"); }
    });

    trapEl.addEventListener("mouseenter", function () {
      if (TRAP.close < 0.9) cepoA(0.2, 0.55, "power2.out");
    });
    trapEl.addEventListener("mouseleave", function () {
      if (TRAP.close < 0.9) cepoA(0, 0.9, "power2.out");
    });

    mailEl.addEventListener("click", morder);
    if (copyBtn) copyBtn.addEventListener("click", morder);

    /* Draggable copy button */
    if (!REDUCE && copyBtn && window.matchMedia("(hover:hover)").matches) {
      var qbx = gsap.quickTo(copyBtn, "x", { duration: 0.5, ease: "power3" });
      var qby = gsap.quickTo(copyBtn, "y", { duration: 0.5, ease: "power3" });
      var caja = null, activo = false;

      var medir = function () {
        gsap.set(copyBtn, { x: 0, y: 0 });
        caja = copyBtn.getBoundingClientRect();
      };

      ScrollTrigger.create({
        trigger: document.getElementById("contacto"),
        start: "top bottom", end: "bottom top",
        onToggle: function (self) {
          activo = self.isActive;
          if (activo) medir(); else { qbx(0); qby(0); }
        },
        onRefresh: function () { if (activo) medir(); }
      });

      window.addEventListener("mousemove", function (e) {
        if (!activo || !caja) return;
        var dx = e.clientX - (caja.left + caja.width  / 2);
        var dy = e.clientY - (caja.top  + caja.height / 2);
        var alcance = 170;
        if (Math.abs(dx) < alcance && Math.abs(dy) < alcance &&
            Math.sqrt(dx * dx + dy * dy) < alcance) {
          qbx(dx * 0.34); qby(dy * 0.34);
        } else { qbx(0); qby(0); }
      }, { passive: true });

      window.addEventListener("scroll", function () { if (activo) medir(); }, { passive: true });
    }

    window.__rehacerCepo = construirCilios;
  }
})();
