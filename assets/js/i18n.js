/* ============================================================
   I18N.JS — Internationalization system (EN/ES)
   ============================================================ */
(function () {
  "use strict";

  window.JH = window.JH || {};

  /* --- Diccionarios ----------------------------------------------- */
  var CONTENIDO = window.JH.CONTENIDO;

  var ES = {
    skip:"Saltar al contenido",
    h1sr:"Jhosno Hernández — desarrolladora full stack y diseñadora web. WordPress, Laravel y diseño web.",
    mq1:"diseño web ✳",
    tail:"Leo lo que ya está antes de tocar nada. A veces es código roto que escribió otro; a veces es una marca que todavía no existe.",
    tz:"[zona horaria ", since:"desde ",
    signoise:"señal/ruido",
    seal:"disponible ✳ diseño web ✳ código ✳ refactor ✳ ",
    copymq:"copiar correo",
    b1a:"leer ", b1b:"diseñar ", b1c:"refactorizar ", b1d:"entregar ",
    b2a:"02 · trabajo ", b2b:"wordpress + producto ",

    h1a:"01 — quién", h1b:"perfil",
    statement:"Empiezo leyendo. Código que escribió alguien más, o una idea que todavía no tiene forma. Solo entonces decido <em>qué debería ser</em>.",
    q1:"temas · plugins · WooCommerce",
    q2t:"diseño", q2:"diseño web · UI",
    q4t:"especialidad", q4:"multi-tenancy · pagos · legacy",
    q5t:"método", q5:"leer · diagnosticar · refactorizar",
    q6t:"idiomas", q6:"español · inglés C2",
    q7t:"respuesta", q7:"menos de 24 h",
    q8t:"estado", q8:"disponible",

    lBrief:"encargo", lCall:"criterio", lShip:"entrega",
    lSym:"síntoma", lCatch:"captura", lOut:"resultado",
    before:"antes ↗", live:"ahora ↗",
    viewCase:"ver caso →",
    tDover:"Estado anterior en archive.org · 7 de marzo de 2026",
    tClute:"Estado anterior en archive.org · 8 de febrero de 2026",
    tAmanda:"Estado anterior en archive.org · 9 de septiembre de 2020",
    tLive:"Sitio en vivo",
    altDover:"The Dover Street Examiner: titular en grotesca pesada con glitch cromático sobre fotografía nocturna.",
    altClute:"Clute Institute: titular en serif de alto contraste sobre textura poligonal turquesa.",
    altAE:"Amanda Escalona: portafolio de copywriter y content strategist con paleta oscura y sistema tipográfico.",
    tgBrand:"diseño web", tgArt:"diseño web", tgPay:"pagos",
    tgInt:"integraciones", tgProd:"producto", tgPhp:"php nativo", tgSens:"dominio sensible", tgBil:"bilingüe",

    c0i:"wordpress · diseño web · 2026",
    c0t:"Dos diarios",
    c0d:"Misma agencia, con semanas de diferencia. El mismo Elementor. Dos identidades que no se parecen en nada — a propósito. El «antes» de cada una está en archive.org.",
    c0a:"Los accesos y dos adjetivos: «moderna y linda». Sin diseño, sin guía, nada que heredar.",
    c0bt:"criterio · dover",
    c0b:"La voz ya era una parodia paranoica. Se dirige en serio: cuanto más convencido el diseño, más gracioso el texto.",
    c0ct:"criterio · clute",
    c0c:"Sin color que heredar. Turquesa en vez del azul de todo diario, y lejos de Dover a propósito: dos clientes de la misma agencia no pueden parecerse.",
    c0e:"Identidad, sistema visual y el sitio funcionando. Dos veces, sin repetir una sola decisión.",

    cAi:"landing page · sitio personal · 2025",
    cAt:"Amanda Escalona",
    cAd:"El sitio de una copywriter freelance es su canal de venta. Sin producto que fotografiar y nada que heredar: el único material era su propia escritura, en dos idiomas.",
    cAa:"Una copywriter en ejercicio que vende en español y en inglés, sobre un sitio de 2020 con tema por defecto.",
    cAb:"Su materia prima es el texto y no había fotografía en la que apoyarse: el sistema tipográfico tenía que sostener el diseño. Paleta y espaciado elegidos para que las palabras se lean en los dos idiomas.",
    cAc:"Build a medida: sistema tipográfico, paleta oscura y estructura bilingüe.",

    c1i:"wordpress · cartera de cliente · 2018 — 2024", c1t:"WordPress a fondo",
    c1d:"Temas, plugins propios y tiendas WooCommerce con mantenimiento continuo.",
    c1a:"Plugins de terceros que hacían casi lo que hacía falta.",
    c1b:"Plugins a medida y optimización de carga.",
    c1c:"Menos dependencias, menos incidencias.",

    c2i:"producto · laravel · 2024 — hoy",
    c2d:"SaaS multi-tenant de e-commerce para PyMEs LATAM. Módulos críticos en producción, muchos comercios sobre la misma base.",
    c2a:"Módulos acoplados y lentos de responder.",
    c2b:"Refactor a capa de servicios, orientado a SOLID.",
    c2c:"+20 % de velocidad de respuesta.",

    c3i:"producto · pagos · 2025", c3t:"Multi\u2011pasarela",
    c3d:"Cobros en LATAM: cada país con su proveedor y cada proveedor con su propio contrato.",
    c3a:"Sumar una pasarela obligaba a tocar el checkout entero.",
    c3b:"Patrón Factory sobre una interfaz común.",
    c3c:"Proveedor nuevo sin abrir el núcleo.",

    c4i:"producto · backoffice · 2025",
    c4d:"El panel desde el que se opera el SaaS. Quien gestiona necesita ver el negocio sin pedirle un query a nadie.",
    c4a:"Métricas fijas: cada pregunta nueva era un ticket.",
    c4b:"Métricas dinámicas con filtro por rango de fechas.",
    c4c:"El equipo se responde solo.",

    c5i:"producto propio · 2018 — 2024",
    c5d:"Producto propio. Cartas digitales con código QR para restaurantes, montadas en cuatro pasos.",
    c5a:"Cambiar un precio significaba reimprimir la carta.",
    c5b:"Carga de productos, editor de estilo y URL única.",
    c5c:"La carta se actualiza sin volver a imprimir.",

    c6i:"plataforma a medida · 2019 — 2021", c6t:"Acompañamiento",
    c6d:"Plataforma a medida para un centro psicológico y de cuidado de niños con necesidades especiales.",
    c6a:"Los requerimientos cambiaban más rápido que el código.",
    c6b:"Refactor de módulos y mantenimiento evolutivo.",
    c6c:"Base estable para seguir sumando sin romper.",

    c7i:"en construcción · 2026", c7t:"En camino",
    c7d:"Lo que está abierto ahora mismo sobre la mesa.",
    c7a:"Dos sitios de cero, con diseño propio cada uno.",
    c7b:"SaaS de gestión: mitad encargo, mitad laboratorio.",
    c7ct:"disponible", c7c:"Queda agenda. Escríbeme y lo hablamos.",

    h2work:"02 — trabajo · WordPress y producto",
    h3b:"de dónde sale todo esto",
    labs:"La planta de arriba es una Dionaea escrita en ASCII: crece, espera y solo entonces <em>atrapa</em> — el mismo instinto que lee un sistema antes de tocarlo. Nada es de stock: todo está generado en vivo.",
    l1:"máquina de estados en ASCII", l2:"el bicho es lo que traes",
    l3:"ruido procedural a sangre", l4t:"marca", l4:"glitch cromático por capas",
    l5:"cero · todo generado",

    h4a:"04 — contacto", h4b:"la última captura",
    reveal:"El cursor nunca fue una flecha. Es el problema que trajiste.",
    catches:"capturas", copy:"copiar correo",
    k1t:"trabajo con", k1:"agencias, estudios y equipos de producto",
    k2t:"modalidad",  k2:"white-label · remoto · sin nombrar clientes",
    k3t:"horario",    k3:"bogotá gmt−5 · solapo con jornada us",
    k4t:"entrego",    k4:"diseño web, sistema visual y el sitio funcionando",
    k5t:"idiomas",    k5:"español nativo · inglés c2 (efset 73)",
    k6t:"para empezar", k6:"manda el stack trace, o dos adjetivos",
    foot:"hecho a mano con html, css y gsap · sin plantillas",
    up:"volver arriba ↑",

    _copied:"correo copiado",
    _subject:"Tengo un sistema que ya existe",
    _secs:{ top:"inicio", quien:"quién", trabajo:"trabajos", labs:"labs", contacto:"contacto" },
    navAbout:"quién", navWorks:"trabajos", navLabs:"labs", navContact:"contacto",
    _facts:["tamagotchi fan", "glitch", 'retro RPG', "leer stack traces", "tattoo", "puzzle solver", "elgibitiquaplus",],
    _btn:"EN", _aria:"Switch to English"
  };

  var EN = {
    _copied:"email copied",
    _subject:"I have a system that already exists",
    _secs:{ top:"home", quien:"about", trabajo:"works", labs:"labs", contacto:"contact" },
    _facts:CONTENIDO.facts.slice(),
    _btn:"ES", _aria:"Cambiar a español"
  };

  /* --- Estado ----------------------------------------------------- */
  var IDIOMA = "en";
  var T = EN;

  /* Cache del inglés original */
  var BASE = (function () {
    var m = { text:{}, html:{}, attr:{} };
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (k in m.text) return;
      var hijo = el.querySelector("b, i, .dot");
      if (hijo) {
        m.text[k] = "";
        for (var i = 0; i < el.childNodes.length; i++) {
          if (el.childNodes[i].nodeType === 3) { m.text[k] = el.childNodes[i].nodeValue; break; }
        }
      } else {
        m.text[k] = el.textContent;
      }
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      m.html[el.getAttribute("data-i18n-html")] = el.innerHTML;
    });
    ["title", "alt"].forEach(function (a) {
      document.querySelectorAll("[data-i18n-" + a + "]").forEach(function (el) {
        var k = el.getAttribute("data-i18n-" + a);
        m.attr[a + ":" + k] = el.getAttribute(a);
      });
    });
    return m;
  })();

  /* --- Función de aplicación -------------------------------------- */
  function aplicarIdioma(lang) {
    IDIOMA = lang;
    T = (lang === "es") ? ES : EN;
    var dic = ES;

    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = (lang === "es") ? dic[k] : BASE.text[k];
      if (v == null) return;
      var hijo = el.querySelector("b, i, .dot");
      if (hijo) {
        for (var i = 0; i < el.childNodes.length; i++) {
          if (el.childNodes[i].nodeType === 3) { el.childNodes[i].nodeValue = v; break; }
        }
      } else {
        el.textContent = v;
      }
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html");
      var v = (lang === "es") ? dic[k] : BASE.html[k];
      if (v == null) return;
      el.innerHTML = v;
      delete el.dataset.original;
    });

    ["title", "alt"].forEach(function (a) {
      document.querySelectorAll("[data-i18n-" + a + "]").forEach(function (el) {
        var k = el.getAttribute("data-i18n-" + a);
        var v = (lang === "es") ? dic[k] : BASE.attr[a + ":" + k];
        if (v != null) el.setAttribute(a, v);
      });
    });

    CONTENIDO.facts = T._facts;
    var f0 = document.getElementById("fact");
    if (f0) f0.textContent = CONTENIDO.facts[0];

    var bm = document.getElementById("bigmail");
    if (bm) bm.setAttribute("href", "mailto:" + CONTENIDO.correo +
                                    "?subject=" + encodeURIComponent(T._subject));

    var ro = document.getElementById("readout");
    if (ro && typeof window.JH.currentId !== "undefined") ro.textContent = T._secs[window.JH.currentId];

    var lb = document.getElementById("langBtn");
    if (lb) { lb.textContent = T._btn; lb.setAttribute("aria-label", T._aria); }

    try { localStorage.setItem("jh-lang", lang); } catch (e) {}
  }

  /* --- Botón de idioma -------------------------------------------- */
  var langBtn = document.getElementById("langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", function () {
      aplicarIdioma(IDIOMA === "en" ? "es" : "en");
      if (window.JH.remedirIdioma) window.JH.remedirIdioma();
    });
  }

  /* --- Idioma inicial --------------------------------------------- */
  (function () {
    var guardado = null;
    try { guardado = localStorage.getItem("jh-lang"); } catch (e) {}
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    aplicarIdioma("en");
  })();

  /* --- Export ----------------------------------------------------- */
  window.JH.IDIOMA = function () { return IDIOMA; };
  window.JH.T = function () { return T; };
  window.JH.ES = ES;
  window.JH.BASE = BASE;
  window.JH.aplicarIdioma = aplicarIdioma;
})();
