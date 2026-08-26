/* ============================================================
   CONTENT.JS — Contenido editable (datos del sitio)
   Se carga primero: todos los demás módulos lo necesitan.
   ============================================================ */
(function () {
  "use strict";

  window.JH = window.JH || {};

  window.JH.CONTENIDO = {
    marca:  "jhosno",
    correo: "jhosno.dev@gmail.com",
    asunto: "Tengo un sistema que ya existe",
    huso:   "gmt−5",
    husoH:  -5,
    facts:  [ "tamagotchi fan", "glitch", "brat", "retro RPG", "leer stack traces", "tattoo", "puzzle solver", "elgibitiquaplus" ]
  };

  /* Volcar al DOM antes de que nada mida ni clone */
  (function aplicarContenido() {
    var C = window.JH.CONTENIDO;
    var q = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };
    q("[data-mail]").forEach(function (el) { el.textContent = C.correo; });
    q("[data-huso]").forEach(function (el) { el.textContent = C.huso; });

    var bm = document.getElementById("bigmail");
    if (bm) {
      var at = C.correo.indexOf("@") + 1;
      bm.textContent = "";
      bm.appendChild(document.createTextNode(C.correo.slice(0, at)));
      bm.appendChild(document.createElement("wbr"));
      bm.appendChild(document.createTextNode(C.correo.slice(at)));
      bm.setAttribute("data-text", C.correo);
      bm.setAttribute("href", "mailto:" + C.correo +
                              "?subject=" + encodeURIComponent(C.asunto));
    }
    var f0 = document.getElementById("fact");
    if (f0) f0.textContent = C.facts[0];

    document.documentElement.style.setProperty("--wm-ch", C.marca.length);
    document.documentElement.style.setProperty("--mail-ch", C.correo.length);
  })();
})();
