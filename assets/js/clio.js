/* CLIO.JS — /labs/clio/: rotating word, rail, nav, ASCII book, EN/ES toggle. */
(function () {
  "use strict";
  var REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.JH = window.JH || {};
  window.JH.REDUCE = REDUCE;

  var g = document.getElementById("glitch");
  if (!REDUCE) (function loop() { setTimeout(function () { g.classList.add("is-on"); setTimeout(function () { g.classList.remove("is-on"); }, 160 + Math.random() * 180); loop(); }, 2400 + Math.random() * 4000); })();

  /* rotating word: same rhythm as the home's random facts (2.2 s, 0.55 s scramble) */
  var WORDS = {
    en: ["Kept.", "Transformed.", "Shared.", "Expanded.", "Explored."],
    es: ["Guardado.", "Transformado.", "Compartido.", "Ampliado.", "Explorado."]
  };
  var GLYPHS = "\u259A\u259E\u2588\u2593\u2592\u2591/\\|<>+*#@$%&=~^01", wi = 0, wlang = "en";
  function scramble(el, final, ms) {
    if (REDUCE) { el.textContent = final; return; }
    var t0 = performance.now(), ch = final.split("");
    (function step(t) {
      var p = Math.min(1, (t - t0) / (ms || 550)), rev = Math.floor(p * ch.length), out = "";
      for (var i = 0; i < ch.length; i++) out += (i < rev || ch[i] === " ") ? ch[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      el.textContent = out; if (p < 1) requestAnimationFrame(step); else el.textContent = final;
    })(t0);
  }
  function setWords(lang) {
    wlang = lang; wi = 0;
    var l = WORDS[lang] || WORDS.en;
    g.style.setProperty("--wch", Math.max.apply(null, l.map(function (w) { return w.length; })));
    g.textContent = l[0]; g.setAttribute("data-text", l[0]);
  }
  if (!REDUCE) setInterval(function () {
    var l = WORDS[wlang]; wi = (wi + 1) % l.length;
    g.setAttribute("data-text", l[wi]); scramble(g, l[wi], 550);
  }, 2200);

  var rail = document.getElementById("progress");
  function paintRail() { var h = document.documentElement.scrollHeight - innerHeight; rail.style.width = (h > 0 ? scrollY / h * 100 : 0).toFixed(2) + "%"; }
  addEventListener("scroll", paintRail, { passive: true }); addEventListener("resize", paintRail); paintRail();

  var links = [].slice.call(document.querySelectorAll(".nav a"));
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (a) { if (a.getAttribute("href") === "#" + e.target.id) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current"); });
    }); }, { rootMargin: "-20% 0px -70% 0px" });
    ["why", "how", "next", "get"].forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* ============================================================
     THE BOOK — a 3D open book rasterized to ASCII each frame.
     Pages are hinged on the spine and travel right to left; each
     sample is z-buffered and shaded by its normal against one light.
     Same ramp and same cell rules as the Dionaea.
     ============================================================ */
  var RAMP = " .:-=+*#%@", RN = RAMP.length - 1;
  var stage = document.querySelector(".stage"), pre = document.getElementById("book"), pageNo = document.getElementById("pageNo");
  var C = 0, R = 0, AR = .6, Z = null, L = null, S = 1, CX0 = 0, CY0 = 0;
  function hash(i) { var n = Math.sin(i * 12.9898) * 43758.5453; return n - Math.floor(n); }
  function measure() {
    var b = stage.getBoundingClientRect();
    var px = Math.max(5, Math.min(10, b.width / 92));
    pre.style.setProperty("--bcell", px + "px");
    var s = document.createElement("span");
    s.style.cssText = "position:absolute;visibility:hidden;white-space:pre;line-height:1;letter-spacing:0;font-family:" + getComputedStyle(pre).fontFamily + ";font-size:" + px + "px";
    s.textContent = "0000000000"; document.body.appendChild(s);
    var r = s.getBoundingClientRect(); document.body.removeChild(s);
    var cw = r.width / 10 || px * .6, ch = r.height || px;
    AR = cw / ch; C = Math.floor(b.width / cw); R = Math.floor(b.height / ch);
    Z = new Float32Array(C * R); L = new Float32Array(C * R);
    S = Math.min(R * .56, C * AR * .36); CX0 = C * .46; CY0 = R * .7;
  }

  var N = 26, W = 1.0, H = 1.42, TAU = .62;
  var LX = -.35, LY = .55, LZ = .76;          /* light: upper left, toward viewer */
  function rasterPage(phi0, bend, edge, t, yaw) {
    var cy = Math.cos(yaw), sy = Math.sin(yaw), ct = Math.cos(TAU), st = Math.sin(TAU);
    var NU = Math.max(18, Math.round(C * .26)), NV = Math.max(24, Math.round(R * .8));
    var x = 0, z = 0, du = W / NU;
    for (var iu = 0; iu <= NU; iu++) {
      var u = iu / NU, phi = phi0 + bend * u;
      x += Math.cos(phi) * du; z += Math.sin(phi) * du;
      var nx = -Math.sin(phi), nz = Math.cos(phi);
      var nX = nx * cy, nY = nx * sy;
      var nDepth = -nY * ct + nz * st, nUp = nz * ct + nY * st;
      var lum = Math.abs(nX * LX + nUp * LY + nDepth * LZ);
      for (var iv = 0; iv <= NV; iv++) {
        var v = iv / NV, y = (v - .5) * H;
        var X = x * cy - y * sy, Y = x * sy + y * cy;
        var up = z * ct + Y * st, depth = -Y * ct + z * st;
        var k = 4 / (4 - depth);
        var col = Math.round(CX0 + X * S * k / AR), row = Math.round(CY0 - up * S * k);
        if (col < 0 || col >= C || row < 0 || row >= R) continue;
        var j = row * C + col;
        if (depth <= Z[j]) continue;
        Z[j] = depth;
        var val = .06 + lum * .62;
        /* lines of text on the page, faint at the margins */
        if (u > .14 && u < .9 && v > .1 && v < .9 && (v * 30 % 1) < .45) val *= .35;
        /* page edges read as rules */
        if (iu === NU) val = Math.max(val, .92 * edge); else if (iv === 0 || iv === NV) val = Math.max(val, .62 * edge);
        val += (hash(j + iu) - .5) * .12;
        L[j] = val;
      }
    }
  }
  function frame(t) {
    Z.fill(-99); L.fill(0);
    var yaw = .32 + Math.sin(t * .23) * .07;
    var order = [];
    for (var i = 0; i < N; i++) {
      var s = (i / N + t * .045) % 1;
      var e = .5 - .5 * Math.cos(Math.PI * s);                 /* pages pile up at both covers */
      var phi = .07 + (Math.PI - .14) * (1 - e);
      order.push(phi);
    }
    /* covers: flat-ish boards under the stacks */
    rasterPage(.03, 0, .6, t, yaw); rasterPage(Math.PI - .03, 0, .6, t, yaw);
    for (var k = 0; k < N; k++) {
      var p = order[k], lift = Math.sin(p);
      var bend = (p < Math.PI / 2 ? .5 : -.5) * lift * lift;      /* flying pages curl toward vertical */
      rasterPage(p, bend, 1, t, yaw);
    }
    var out = new Array(R);
    for (var r = 0; r < R; r++) {
      var line = "";
      for (var c = 0; c < C; c++) {
        var v = L[r * C + c];
        if (v <= 0 && hash(r * 977 + c + Math.floor(t * 3)) > .996) { line += "."; continue; }   /* dust */
        line += v <= .12 ? " " : RAMP.charAt(v >= 1 ? RN : (v * RN) | 0);
      }
      out[r] = line;
    }
    pre.textContent = out.join("\n");
    var n = (Math.floor(t * .045 * N) % 999) + 1;
    pageNo.textContent = ("00" + n).slice(-3);
  }

  measure();
  if (REDUCE) frame(6.5);
  else {
    var vis = true, last = 0, t0 = performance.now();
    if ("IntersectionObserver" in window) new IntersectionObserver(function (es) { vis = es[0].isIntersecting; }).observe(stage);
    var rz; addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(measure, 180); });
    (function loop(now) {
      requestAnimationFrame(loop);
      if (!vis || now - last < 40) return;   /* 25 fps, paused off-screen */
      last = now; frame((now - t0) / 1000);
    })(t0);
  }

  /* ============================================================
     LANGUAGES — English in the HTML, Spanish as a layer.
     ============================================================ */
  var ES = {
    skip:"Saltar al contenido", n1:"por qué clio", n2:"cómo funciona", n3:"qué viene", n4:"descargar", livel:"windows · linux",
    eb:"01 / un lector con memoria", ebt:"leer · anotar · guardar",
    h1a:"Todo lo que lees.",
    lead:"Resalta lo que importa, escribe lo que te hizo pensar y encuéntralo meses después. Clio guarda tu biblioteca y tus notas en tu computador, en archivos que son tuyos.",
    cta1:"descargar para windows y linux", cta2:"qué viene", noteb:"biblioteca local<br>sin nube", metar:"plugin de obsidian <em>en camino</em>", metal:"# clio reader / disponible para windows y linux",
    s1a:"02 — por qué clio", s1b:"lee una vez, guárdalo para siempre",
    st1:"Marcas un gran pasaje hoy. Meses después, <em>sigue a un clic.</em>",
    bk1:"no pierdes nada", bt1:"Cada nota sabe de dónde viene", bd1:"Resaltados y notas quedan atados a su pasaje exacto, así que siempre puedes volver a la página.",
    bk2:"tuyo", bt2:"Sin cuenta. Sin nube.", bd2:"Tu biblioteca y todo lo que escribes viven en tu computador, y funciona sin conexión.",
    bk3:"portable", bt3:"Listo para Obsidian", bd3:"Tus notas se exportan como archivos Markdown que van directo a una bóveda de Obsidian o se abren en cualquier editor.",
    bk4:"una biblioteca", bt4:"Lee lo que ya tienes", bd4:"Libros, papers, notas y cómics: EPUB, PDF, Markdown y CBZ en un solo lugar.",
    ba1:"importar", ba2:"leer", ba3:"resaltar", ba4:"volver", ba5:"exportar",
    s2a:"03 — cómo funciona", s2b:"sin registro, sin configurar",
    st2:"Instálalo, agrega tus libros, empieza a leer. <em>Esa es toda la configuración.</em>",
    l1:"Importar", l1d:"Agrega tus archivos EPUB, PDF, Markdown y CBZ.",
    l2:"Leer", l2d:"Una página tranquila, sin nada en el medio.",
    l3:"Resaltar", l3d:"Marca un pasaje y escribe lo que te hizo pensar.",
    l4:"Volver", l4d:"Cada nota abre el libro justo donde la dejaste.",
    l5:"Exportar", l5d:"Tus notas como archivos Markdown, listos para Obsidian.",
    hlc:"2 resaltados", nt:"notas", nt1:"Alicia quiere dibujos y conversaciones. Justo.", nt2:"Donde de verdad empieza la historia.",
    cap1:"Boceto de la interfaz. Alicia en el país de las maravillas (1865) es de dominio público.", illus:"ejemplo",
    cap2:"Una nota exportada a Markdown, lista para tu bóveda de Obsidian. Un archivo plano que guardas para siempre.",
    bn1:"hoy", bn2:"después", bn3:"más adelante",
    s3a:"04 — qué hay y qué viene", s3b:"dicho sin rodeos",
    t1n:"hoy", avail:"disponible", t1p:"El lector: tu biblioteca, resaltados y notas, y exportación a Markdown, lista para Obsidian.",
    t2n:"después", soon:"en camino", t2s:"plugin", t2p:"Lleva tus resaltados y notas a tu bóveda de Obsidian, con enlaces que abren el pasaje en Clio.",
    t3n:"más adelante", plan:"planeado", t3p:"Sigue leyendo y anotando en tu teléfono, con la misma biblioteca.",
    rk:"una promesa", rt:"Venga lo que venga, tu biblioteca se queda en tus dispositivos, en archivos que son tuyos.",
    s5a:"05 — descargar", s5b:"disponible hoy", b1:"Tu biblioteca.", b2:"Tus archivos.",
    pend:"[enlace de descarga y versión por confirmar]", dl:"descargar ↓", obp:"Plugin de Obsidian", obs:"en camino", ans:"planeado", next:"después", later:"más adelante",
    src:"código fuente", repo:"[repositorio y licencia cuando sea público]",
    ft:"un lector que guarda lo que lees", lab:"un lab de jhosno",
    _btn:"EN", _aria:"Switch to English"
  };
  var BASE = { text:{}, html:{} };
  document.querySelectorAll("[data-i18n]").forEach(function (el) { var k = el.getAttribute("data-i18n"); if (!(k in BASE.text)) BASE.text[k] = el.textContent; });
  document.querySelectorAll("[data-i18n-html]").forEach(function (el) { BASE.html[el.getAttribute("data-i18n-html")] = el.innerHTML; });
  var LANG = "en", btn = document.getElementById("langBtn");
  function apply(lang) {
    LANG = lang; document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) { var k = el.getAttribute("data-i18n"), v = lang === "es" ? ES[k] : BASE.text[k]; if (v != null) el.textContent = v; });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) { var k = el.getAttribute("data-i18n-html"), v = lang === "es" ? ES[k] : BASE.html[k]; if (v != null) el.innerHTML = v; });
    setWords(lang);
    if (booted) remeasure();
    btn.textContent = lang === "es" ? ES._btn : "ES";
    btn.setAttribute("aria-label", lang === "es" ? ES._aria : "Cambiar a español");
    try { localStorage.setItem("jh-lang", lang); } catch (e) {}
  }
  /* marquee band: build once fonts are in, rebuild when the words change width */
  var booted = false;
  function remeasure() { if (window.JH.buildMarquees) { window.JH.buildMarquees(); ScrollTrigger.refresh(); } }
  function boot() { if (booted) return; booted = true; remeasure(); }
  if (document.fonts && document.fonts.ready) { document.fonts.ready.then(boot); setTimeout(boot, 2500); }
  else addEventListener("load", boot);
  var mrz; addEventListener("resize", function () { clearTimeout(mrz); mrz = setTimeout(function () { if (booted) remeasure(); }, 220); });

  btn.addEventListener("click", function () { apply(LANG === "en" ? "es" : "en"); });
  var saved = null; try { saved = localStorage.getItem("jh-lang"); } catch (e) {}
  apply(saved || ((navigator.language || "en").slice(0, 2).toLowerCase() === "es" ? "es" : "en"));
})();
