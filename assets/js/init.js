/* ============================================================
   INIT.JS — Orchestrator: line reveals, resize, bootstrap
   ============================================================ */
(function () {
  "use strict";

  window.JH = window.JH || {};
  var REDUCE = window.JH.REDUCE;

  /* ----------------------------------------------------------
     LINE REVEALS — splitLines + scroll-triggered
     ---------------------------------------------------------- */
  function splitLines(el) {
    if (!el.dataset.original) el.dataset.original = el.innerHTML;
    var html = el.dataset.original;
    var tmp = document.createElement("div");
    tmp.innerHTML = html;

    var words = [];
    (function walk(node, tagName) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          n.nodeValue.split(/(\s+)/).forEach(function (w) {
            if (!w.trim()) return;
            words.push({ text: w, tag: tagName });
          });
        } else if (n.nodeType === 1) {
          walk(n, n.tagName.toLowerCase());
        }
      });
    })(tmp, null);

    el.innerHTML = "";
    var spans = words.map(function (w) {
      var s = document.createElement("span");
      s.style.display = "inline-block";
      if (w.tag === "em") { var em = document.createElement("em"); em.textContent = w.text; s.appendChild(em); }
      else s.textContent = w.text;
      el.appendChild(s);
      el.appendChild(document.createTextNode(" "));
      return s;
    });

    var lines = [], currentTop = null, bucket = null;
    spans.forEach(function (s) {
      var top = s.offsetTop;
      if (currentTop === null || Math.abs(top - currentTop) > 4) {
        currentTop = top; bucket = []; lines.push(bucket);
      }
      bucket.push(s);
    });

    el.innerHTML = "";
    lines.forEach(function (bucketSpans) {
      var outer = document.createElement("span");
      outer.className = "line";
      var inner = document.createElement("span");
      bucketSpans.forEach(function (s, i) {
        inner.appendChild(s);
        if (i < bucketSpans.length - 1) inner.appendChild(document.createTextNode(" "));
      });
      outer.appendChild(inner);
      el.appendChild(outer);
    });

    return el.querySelectorAll(".line > span");
  }

  var lineTriggers = [];
  function buildLineReveals() {
    lineTriggers.forEach(function (st) { st.kill(); });
    lineTriggers = [];

    document.querySelectorAll("[data-lines]").forEach(function (el) {
      var inners = splitLines(el);
      if (REDUCE) return;
      gsap.set(inners, { yPercent: 108 });
      var tw = gsap.to(inners, {
        yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.075,
        scrollTrigger: { trigger: el, start: "top 82%" }
      });
      if (tw.scrollTrigger) lineTriggers.push(tw.scrollTrigger);
    });
  }

  /* --- RISE elements --- */
  gsap.utils.toArray(".rise").forEach(function (el, i) {
    gsap.to(el, {
      opacity: 1, y: 0, duration: 0.85, ease: "expo.out",
      scrollTrigger: { trigger: el, start: "top 90%" }
    });
  });

  /* ----------------------------------------------------------
     BOOTSTRAP — after fonts load
     ---------------------------------------------------------- */
  function bootstrapMeasured() {
    window.JH.buildMarquees();
    buildLineReveals();
    if (window.__rehacerCepo) window.__rehacerCepo();
    ScrollTrigger.refresh();
  }

  /* Expose for i18n re-measure */
  window.JH.remedirIdioma = function () {
    window.JH.buildMarquees();
    buildLineReveals();
    if (window.__rehacerCepo) window.__rehacerCepo();
    ScrollTrigger.refresh();
  };

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(bootstrapMeasured);
    setTimeout(function () { if (!window.JH.buildMarquees) bootstrapMeasured(); }, 2500);
  } else {
    bootstrapMeasured();
  }

  /* ----------------------------------------------------------
     RESIZE — recalculate
     ---------------------------------------------------------- */
  var rt;
  window.addEventListener("resize", function () {
    clearTimeout(rt);
    rt = setTimeout(function () {
      window.JH.buildMarquees();
      buildLineReveals();
      if (window.__rehacerCepo) window.__rehacerCepo();
      ScrollTrigger.refresh();
    }, 220);
  });

  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
