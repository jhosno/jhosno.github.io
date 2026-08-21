/* SEED — utilidades base: reloj, progress bar, scramble */
var JH = window.JH || {};
JH.REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
JH.GLYPHS = "\u259A\u259E\u2588\u2593\u2592\u2591/\\|<>+*#@$%&=~^01";

JH.scramble = function(el, final, ms) {
  if (JH.REDUCE) { el.textContent = final; return; }
  var t0 = performance.now(), chars = final.split("");
  (function paso(t) {
    var p = Math.min(1, (t - t0) / (ms || 460));
    var rev = Math.floor(p * chars.length), out = "";
    for (var i = 0; i < chars.length; i++) {
      out += (i < rev || chars[i] === " ") ? chars[i] : JH.GLYPHS[(Math.random() * JH.GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(paso); else el.textContent = final;
  })(t0);
};

JH.initClock = function(el) {
  function tick() {
    var now = new Date();
    el.textContent = now.toLocaleTimeString("en-GB", { hour12: false, timeZone: "America/Bogota" });
  }
  tick();
  setInterval(tick, 1000);
};

JH.initProgress = function(el) {
  function paint() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    el.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0).toFixed(2) + "%";
  }
  addEventListener("scroll", paint, { passive: true });
  addEventListener("resize", paint);
  paint();
};

JH.ruido = function(i) {
  var n = Math.sin(i * 12.9898) * 43758.5453;
  return n - Math.floor(n);
};
