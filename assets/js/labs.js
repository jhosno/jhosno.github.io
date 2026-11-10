(function () {
  "use strict";
  var REDUCE = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var GLYPHS = "▚▞█▓▒░/\\|<>+*#@$%&=~^01";

  /* Count, never typed by hand */
  var labs = document.querySelectorAll("[data-lab]");
  document.getElementById("labCount").textContent = labs.length;

  /* Progress rail */
  var rail = document.getElementById("progress");
  function paintRail() {
    var h = document.documentElement.scrollHeight - innerHeight;
    rail.style.width = (h > 0 ? scrollY / h * 100 : 0).toFixed(2) + "%";
  }
  addEventListener("scroll", paintRail, { passive: true }); addEventListener("resize", paintRail); paintRail();

  function scramble(el, final, ms) {
    if (REDUCE) { el.textContent = final; return; }
    var t0 = performance.now(), ch = final.split("");
    (function step(t) {
      var p = Math.min(1, (t - t0) / (ms || 460)), rev = Math.floor(p * ch.length), out = "";
      for (var i = 0; i < ch.length; i++) out += (i < rev || ch[i] === " ") ? ch[i] : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      el.textContent = out;
      if (p < 1) requestAnimationFrame(step); else el.textContent = final;
    })(t0);
  }

  /* Section readout */
  var readout = document.getElementById("readout"), current = "labs";
  var SECS = { en: { tesis: "thesis", experiments: "labs", dionaea: "dionaea", clio: "clio" },
               es: { tesis: "tesis", experiments: "labs", dionaea: "dionaea", clio: "clio" } };
  var LANG = "en";
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var name = SECS[LANG][e.target.id] || "labs";
        if (name !== current) { current = name; scramble(readout, name); }
      });
    }, { rootMargin: "-45% 0px -45% 0px" });
    ["tesis", "experiments", "dionaea", "clio"].forEach(function (id) { io.observe(document.getElementById(id)); });
  }

  /* H1 glitch bursts: an event, not a loop of decoration */
  var h1 = document.getElementById("h1");
  function burst(ms) { if (REDUCE) return; h1.classList.add("is-glitch"); setTimeout(function () { h1.classList.remove("is-glitch"); }, ms || 220); }
  if (!REDUCE) (function loop() { setTimeout(function () { burst(160 + Math.random() * 180); loop(); }, 2600 + Math.random() * 4200); })();

  /* ============================================================
     THE SPECIMEN — the hero's Dionaea geometry (ported from the
     404), same trap shapes, same bite and reopen constants.
     ============================================================ */
  var RAMP = " .:-=+*#%@", RN = RAMP.length - 1;
  function noise(i) { var n = Math.sin(i * 12.9898) * 43758.5453; return n - Math.floor(n); }
  var slab = document.getElementById("slab"), pEl = document.getElementById("plant");
  var bugEl = document.getElementById("bug"), hintEl = document.getElementById("hint");
  var trailEls = [].slice.call(document.querySelectorAll("#trail span"));
  var catchesEl = document.getElementById("catches");

  var DEF = [
    { reach:58, dir:0.95, size:10.0, w:1.85, tooth:5.10, step:3, bow: 0.13, live:true },
    { reach:36, dir:0.31, size: 7.2, w:1.42, tooth:3.80, step:3, bow:-0.17 },
    { reach:32, dir:1.22, size: 6.8, w:1.34, tooth:3.60, step:3, bow: 0.20 },
    { reach:13, dir:0.62, size: 3.4, w:0.82, tooth:1.80, step:2, bow: 0.10, bud:true }
  ];
  var PC = 0, PR = 0, M = null, HH = null, AR = .6, CW = 6, CH = 10, SC = 1, SP = 1, CX = 0, FLOOR = 0, HMAX = 1;

  function measureCell(px) {
    var s = document.createElement("span");
    s.style.cssText = "position:absolute;visibility:hidden;white-space:pre;line-height:1;letter-spacing:0;font-family:" + getComputedStyle(pEl).fontFamily + ";font-size:" + px + "px";
    s.textContent = "0000000000"; document.body.appendChild(s);
    var r = s.getBoundingClientRect(); document.body.removeChild(s);
    return { w: (r.width / 10) || px * .6, h: r.height || px };
  }
  function limb(reach, dir, size, w, tooth, step, bow) {
    var sx = Math.sin(dir), cy = Math.cos(dir), hx = reach * sx, hy = reach * cy;
    return { hx:hx, hy:hy, ang:(Math.PI/2 - dir) + (dir > 1 ? -.16 : .26), size:size, w:w, tooth:tooth, step:step,
             px:0, py:.6, cx:hx*.45 - cy*reach*bow, cy:hy*.45 + sx*reach*bow, reach:reach, nx:cy, ny:-sx };
  }
  function measure() {
    var box = slab.getBoundingClientRect();
    var px = Math.max(5, Math.min(11, box.height / 56, box.width / 52));
    pEl.style.setProperty("--pcell", px + "px");
    var c = measureCell(px); CW = c.w; CH = c.h; AR = CW / CH;
    PC = Math.max(16, Math.floor(box.width / CW)); PR = Math.max(16, Math.floor(box.height / CH));
    M = new Float32Array(PC * PR); HH = new Float32Array(PC * PR);
    SC = PR / 60; CX = PC * .045; FLOOR = PR - 1; HMAX = PR * 1.3;
    SP = 1;
    for (var k = 0; k < 16; k++) {
      var wide = 0;
      DEF.forEach(function (d) { var e = (d.reach*SC*Math.sin(d.dir*SP) + (d.size + d.tooth)*SC) / AR; if (e > wide) wide = e; });
      if (CX + wide <= PC * 1.15) break;
      SP -= .04; if (SP < .52) { SP = .52; break; }
    }
  }
  function disc(X, Y, rad, mass) {
    var gx = CX + X / AR, gy = FLOOR - Y, rg = rad < .45 ? .45 : rad, rx = rg / AR;
    var x0 = Math.max(0, Math.ceil(gx - rx)), x1 = Math.min(PC - 1, Math.floor(gx + rx));
    var y0 = Math.max(0, Math.ceil(gy - rg)), y1 = Math.min(PR - 1, Math.floor(gy + rg));
    var hh = Math.sqrt(X*X + Y*Y) / HMAX;
    for (var yy = y0; yy <= y1; yy++) for (var xx = x0; xx <= x1; xx++) {
      var dx = (xx - gx) * AR, dy = yy - gy, d2 = (dx*dx + dy*dy) / (rg*rg);
      if (d2 > 1) continue;
      var j = yy * PC + xx, m = mass * (1 - d2 * .45);
      if (m > M[j]) { M[j] = m; HH[j] = hh; }
    }
  }
  function bez(t, a, b, c) { var u = 1 - t; return u*u*a + 2*u*t*b + t*t*c; }
  function drawTrap(T, close, sway) {
    var open = 1 - close, alpha = .02 + .60 * open, beta = .62;
    var amp = sway * (.16 + T.reach * .03), hx = T.hx + T.nx * amp, hy = T.hy + T.ny * amp;
    var NP = Math.max(30, Math.round(T.reach * 2.2));
    for (var p = 0; p <= NP; p++) { var u = p / NP;
      disc(bez(u, T.px, T.cx + T.nx*amp*.45, hx), bez(u, T.py, T.cy + T.ny*amp*.45, hy), (.72 - .28*u) * SC, .84); }
    if (open > .1) for (var q = 1; q <= 9; q++) { var uq = q / 9;
      disc(hx + Math.cos(T.ang)*uq*T.size*.72, hy + Math.sin(T.ang)*uq*T.size*.72, T.w*1.5*(1 - uq*.45)*open, .34*open); }
    for (var sg = -1; sg <= 1; sg += 2) {
      var a = T.ang + sg * (alpha + beta), X = hx, Y = hy, N = 30;
      var arc = T.size * beta / Math.sin(beta), ds = arc / N, curv = -sg * 2 * beta / arc;
      for (var i = 0; i <= N; i++) { var u2 = i / N;
        a += curv * ds; X += Math.cos(a) * ds; Y += Math.sin(a) * ds;
        disc(X, Y, T.w * (.30 + .95 * Math.sin(Math.pow(u2, .75) * Math.PI)), .95);
        if (u2 > .22 && i % T.step === 0) {
          var g = Math.min(1, (u2 - .22) / .2) * (1 - .28 * u2), tl = T.tooth * g;
          var na = a + sg * (Math.PI/2 - .4 * u2), tx = Math.cos(na), ty = Math.sin(na), NT = Math.max(5, Math.round(tl * 3));
          for (var d = 1; d <= NT; d++) { var f = d / NT; disc(X + tx*tl*f, Y + ty*tl*f, .46*(1 - f*.5)*SC, .93 - .13*f); }
        }
      }
    }
    return { hx: hx, hy: hy };
  }

  /* state */
  var GROW = REDUCE ? 1 : 0, CLOSE = 0, TW = null, LEAN = 0, LEAN_T = 0;
  var ARMED = true, BITING = false, COUNT = 0, STATE = "";
  var MOUTH = { x: 0, y: 0, r: 40 };
  var PTR = { x: -999, y: -999, in: false };
  var BUG = { st: "alive", t0: 0, x: -999, y: -999 }, T_NOW = 0;
  var WING = ["\\#/", "-#-", "/#\\", "-#-"], SCRAP = "▚▞/\\|<>+*#@%&";

  function easeIn4(x) { return x*x*x*x; }
  function easeInOut2(x) { return x < .5 ? 2*x*x : 1 - Math.pow(-2*x + 2, 2) / 2; }
  function tween(to, dur, ease) { TW = { t0: performance.now() / 1000, from: CLOSE, to: to, dur: dur, ease: ease }; }
  function stepTween() {
    if (!TW) return;
    var p = (performance.now() / 1000 - TW.t0) / TW.dur;
    if (p >= 1) { CLOSE = TW.to; TW = null; return; }
    CLOSE = TW.from + (TW.to - TW.from) * TW.ease(Math.max(0, p));
  }
  function setState(s) {
    if (STATE === s) return; STATE = s;
    trailEls.forEach(function (el) { el.classList.toggle("on", el.getAttribute("data-s") === s); });
  }
  function bite() {
    ARMED = false; BITING = true; COUNT++;
    catchesEl.textContent = (COUNT < 10 ? "0" : "") + COUNT;
    setState("caught"); BUG.st = "caught"; BUG.t0 = T_NOW + 1.0;
    burst(200);
    tween(1, .09, easeIn4);                                   /* bite   = 0.09 s power4.in   */
    setTimeout(function () { setState("reopen"); tween(0, 2.4, easeInOut2); }, 90 + 700);  /* reopen = 2.4 s power2.inOut after 0.7 s */
    setTimeout(function () { BITING = false; setState("wait"); }, 90 + 700 + 2400);
  }

  function paint(t) {
    M.fill(0); HH.fill(0);
    var sway = Math.sin(t * .62) * .62 + Math.sin(t * 1.07 + 1.3) * .28, mouth = null;
    DEF.forEach(function (d, i) {
      var T = limb(d.reach*SC, d.dir*SP + (d.live ? LEAN : 0), d.size*SC, d.w*SC, d.tooth*SC, d.step, d.bow);
      var c = d.bud ? 1 : d.live ? CLOSE : .16 + .13 * Math.sin(t * .5 + i * 2.1);
      var h = drawTrap(T, c, sway * (d.live ? 1 : .8));
      if (d.live) mouth = { hx: h.hx + Math.cos(T.ang) * T.size * .5, hy: h.hy + Math.sin(T.ang) * T.size * .5 };
    });
    if (mouth) { MOUTH.x = (CX + mouth.hx / AR) * CW; MOUTH.y = (FLOOR - mouth.hy) * CH + (slab.clientHeight - PR * CH); MOUTH.r = DEF[0].size * SC * CH * 1.1; }
    var gl = CLOSE > .5 && CLOSE < .999, rows = [];
    for (var y = 0; y < PR; y++) {
      var line = "", shift = (gl && noise(y * 7.3) > .6) ? ((noise(y * 3.1) * 13) | 0) - 6 : 0;
      for (var x = 0; x < PC; x++) {
        var xi = x + shift, j = y * PC + xi, v = (xi < 0 || xi >= PC) ? 0 : M[j];
        if (v > 0) {
          var g = (GROW * 1.12 - HH[j]) / .14; g = g < 0 ? 0 : g > 1 ? 1 : g; g = g*g*(3 - 2*g);
          v *= g; if (v > .06) v += (noise(j) - .5) * .26 * v;
        }
        line += v <= .07 ? " " : RAMP.charAt(v >= 1 ? RN : (v * RN) | 0);
      }
      rows.push(line);
    }
    pEl.textContent = rows.join("\n");
  }

  function hunt() {
    if (GROW < .85) { setState("grow"); return; }                     /* it does not hunt until grown */
    if (BITING) return;
    if (!PTR.in) { LEAN_T = 0; setState("wait"); return; }
    var dx = PTR.x - MOUTH.x, dy = PTR.y - MOUTH.y, d = Math.sqrt(dx*dx + dy*dy);
    LEAN_T = Math.max(-.3, Math.min(.34, dx / (slab.clientWidth * .85)));
    setState(d < MOUTH.r * 2.2 ? "fly" : "wait");
    if (d > MOUTH.r * 1.5) ARMED = true;
    if (ARMED && d < MOUTH.r) bite();
  }

  function moveBug(t) {
    if (BUG.st === "alive") {
      BUG.x += (PTR.x - BUG.x) * .2; BUG.y += (PTR.y - BUG.y) * .2;
      bugEl.textContent = WING[((t * 11) | 0) & 3];
    } else if (BUG.st === "caught" || BUG.st === "digest") {
      BUG.x = MOUTH.x; BUG.y = MOUTH.y; bugEl.textContent = BUG.st === "caught" ? "-o-" : ".o.";
      if (t > BUG.t0) { if (BUG.st === "caught") { BUG.st = "digest"; BUG.t0 = t + .9; } else { BUG.st = "regrow"; BUG.t0 = t + .6; } }
    } else {
      BUG.x += (PTR.x - BUG.x) * .1; BUG.y += (PTR.y - BUG.y) * .1;
      var s = ""; for (var i = 0; i < 3; i++) s += SCRAP.charAt((Math.random() * SCRAP.length) | 0);
      bugEl.textContent = s; if (t > BUG.t0) BUG.st = "alive";
    }
    bugEl.style.transform = "translate3d(" + (BUG.x - 14) + "px," + (BUG.y - 8) + "px,0)";
    bugEl.classList.toggle("on", PTR.in || BUG.st !== "alive");
  }

  function local(e) { var r = slab.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  slab.addEventListener("pointermove", function (e) {
    if (e.pointerType === "touch") return;
    var p = local(e); PTR.x = p.x; PTR.y = p.y;
    if (!PTR.in) { PTR.in = true; slab.classList.add("has-bug"); hintEl.hidden = true; }
  });
  slab.addEventListener("pointerleave", function () { PTR.in = false; slab.classList.remove("has-bug"); });
  slab.addEventListener("pointerdown", function (e) {
    if (GROW < .85 || BITING || CLOSE > .3) return;
    var p = local(e); PTR.x = BUG.x = p.x; PTR.y = BUG.y = p.y; hintEl.hidden = true; bite();
  });

  measure();
  if (REDUCE) { paint(3.2); setState("wait"); }
  else {
    var visible = true, started = false, t0 = performance.now(), last = 0;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) started = true; }, { threshold: .15 }).observe(slab);
    } else started = true;
    var rz; addEventListener("resize", function () { clearTimeout(rz); rz = setTimeout(measure, 180); });
    (function frame(now) {
      requestAnimationFrame(frame);
      if (!visible || now - last < 33) return;   /* 30 fps, paused off-screen */
      last = now;
      var t = (now - t0) / 1000; T_NOW = t;
      if (started && GROW < 1) GROW = Math.min(1, GROW + .012);
      stepTween();
      LEAN += (LEAN_T - LEAN) * .07;
      paint(t); hunt(); moveBug(t);
    })(t0);
  }

  /* Clio specimen: the same ASCII book as the Clio landing, in its own scope */
  (function () {
  /* ============================================================
     THE BOOK — a 3D open book rasterized to ASCII each frame.
     Pages are hinged on the spine and travel right to left; each
     sample is z-buffered and shaded by its normal against one light.
     Same ramp and same cell rules as the Dionaea.
     ============================================================ */
  var RAMP = " .:-=+*#%@", RN = RAMP.length - 1;
  var stage = document.getElementById("bookSlab"), pre = document.getElementById("book"), pageNo = document.getElementById("pageNo");
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

  })();

  /* ============================================================
     LANGUAGES — the site's own mechanism: English in the HTML,
     Spanish as a layer.
     ============================================================ */
  var ES = {
    skip:"Saltar al contenido", allwork:"← todo el trabajo",
    idx:"[labs · explorar · romper · imaginar · crear]",
    thesis:"Un lugar para <em>explorar, romper, imaginar y crear</em>, solo para ver qué sale.",
    f1t:"los verbos", f1:"explorar · romper · imaginar · crear", f2t:"experimentos", f3t:"regla", f3:"cero stock · todo generado",
    b1:"La tesis", b1s:"de dónde sale la estética",
    h1a:"la frase", h1b:"todo se deriva de ella",
    phrase:"Leo lo que ya está antes de tocar nada. A veces es código roto que escribió otro; a veces es <em>un diseño que todavía no existe</em>.",
    g1:"Dar forma", g2:"un diseño que no existe", g3:"Dover, Clute, Amanda Escalona",
    c1:"Diagnosticar", c2:"código que existe y falla", c3:"Creatienda, rescate WordPress",
    mat:"material", work:"en el trabajo", log:"en la ficha",
    join:"Parecen dos perfiles. Son una sola habilidad. <strong>Refactorizar</strong> es leer el código que escribió otro y encontrar dónde la realidad se separó de la intención. <strong>Diseñar</strong> Clute fue leer la copia de otro y encontrar su voz. El mismo verbo, dos materiales.",
    w1t:"Por qué una planta carnívora",
    w1:"Es depredadora y ornamental a la vez. La gente la tiene de adorno y además come. Eso resuelve en una sola imagen tres cosas que normalmente se contradicen:",
    t1k:"confiable", t1:"Espera. No improvisa. Tiene un ciclo.",
    t2k:"compleja", t2:"Es una máquina de estados, no un dibujo.",
    t3k:"linda", t3:"Es la razón por la que alguien la tiene en casa.",
    h2a:"lo que sobrevive a un rediseño",
    s1k:"el verbo", s1:"leer antes de tocar", s2k:"dos mitades", s2:"diagnosticar y dar forma",
    s3k:"el visitante", s3:"es la presa", s4k:"prueba", s4:"verificable sobre afirmado",
    credit:"El magenta, el violeta, el ASCII y el glitch son la ejecución actual de esas cuatro. Pueden cambiar. Las cuatro, no.",
    b2:"Experimentos", b2s:"explorar ✳ romper ✳ imaginar ✳ crear",
    i1d:"máquina de estados en ascii", i2d:"lector local", st1:"en vivo", st2:"en desarrollo",
    spec:"espécimen · vivo", hint:"acercate a la boca grande", caught:"capturas en esta visita",
    d0:"lab · ascii · 2026",
    d1:"La planta del hero del portafolio es una atrapamoscas escrita en ASCII y reconstruida en cada fotograma. Cada lóbulo es un arco de lente con bisagra en el peciolo, con dientes abiertos en abanico hacia la punta. Abrir y cerrar es <strong>un solo número por cepo</strong>.",
    d2:"Tiene una máquina de estados completa, y estaba ahí antes que la tesis. La tesis se leyó de ella, no se dibujó encima. Dos líneas lo deciden todo:",
    exc:"extracto",
    d3:"Primero se da forma, después atrapa. Y cuando entrás al sitio tu cursor es un bicho, <em>\\#/</em>, y la planta te espera a vos en vez de a su propia mosca. El espécimen de esta página corre la misma geometría y los mismos tiempos.",
    k1:"estados", k2:"mordida", k3:"reapertura", k3v:"2.4 s · power2.inOut · tras 0.7 s", k4:"rampa", k5:"vive en", trap:"cepo de contacto ↗",
    spec2:"clio · vivo", cap2:"El libro de la landing de Clio, generado en vivo en ASCII: cada página se dibuja en 3D y se sombrea en cada fotograma.",
    cl0:"lab · 2026",
    cl1:"Un lector local-first que guarda lo que lees: resaltados y notas atados a su pasaje exacto, en SQLite en tu equipo y exportables a Markdown, listos para Obsidian. El lector de escritorio corre en Windows y Linux; después viene un plugin de Obsidian y luego Android.",
    cl2:"<strong>El síntoma.</strong> Quería tener mis notas Zettelkasten en mi bóveda de Obsidian mientras leía. No encontré un lector para Windows que me gustara, y mucho menos uno amable con Obsidian. Mis notas terminaban aisladas y encapsuladas dentro de cada lector de EPUB, y los plugins para leer EPUB dentro de Obsidian nunca me resultaron cómodos.",
    k6:"estado", k7:"inicio", k8:"landing", clink:"ver clio reader →", tbc:"[por confirmar]", repo:"[enlace cuando sea público]", date:"[fecha]",
    n1:"Trabajo pagado", n2:"Ver los casos →", n3:"O bien", n4:"Traé el stack trace →",
    foot:"hecho a mano con html, css y gsap · sin plantillas", up:"volver arriba ↑",
    _btn:"EN", _aria:"Switch to English"
  };
  var BASE = { text:{}, html:{} };
  document.querySelectorAll("[data-i18n]").forEach(function (el) { var k = el.getAttribute("data-i18n"); if (!(k in BASE.text)) BASE.text[k] = el.textContent; });
  document.querySelectorAll("[data-i18n-html]").forEach(function (el) { BASE.html[el.getAttribute("data-i18n-html")] = el.innerHTML; });
  var btn = document.getElementById("langBtn");
  function apply(lang) {
    LANG = lang; document.documentElement.setAttribute("lang", lang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n"), v = lang === "es" ? ES[k] : BASE.text[k]; if (v != null) el.textContent = v; });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var k = el.getAttribute("data-i18n-html"), v = lang === "es" ? ES[k] : BASE.html[k]; if (v != null) el.innerHTML = v; });
    btn.textContent = lang === "es" ? ES._btn : "ES";
    btn.setAttribute("aria-label", lang === "es" ? ES._aria : "Cambiar a español");
    try { localStorage.setItem("jh-lang", lang); } catch (e) {}
  }
  btn.addEventListener("click", function () { apply(LANG === "en" ? "es" : "en"); });
  var saved = null; try { saved = localStorage.getItem("jh-lang"); } catch (e) {}
  var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  apply(saved || (nav === "es" ? "es" : "en"));
})();
