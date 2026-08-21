/* RIBBON — cintillo fijo que muta con el scroll */
(function() {
  "use strict";
  var ribbon = document.getElementById("ribbon");
  if (!ribbon) return;

  var heroEl = document.getElementById("top");
  var progressEl = document.getElementById("progress");
  var readoutEl = document.getElementById("readout");

  // scroll state
  function update() {
    var scrollY = window.scrollY;
    var heroH = heroEl ? heroEl.offsetHeight : 600;
    var stuck = scrollY > heroH * 0.85;
    ribbon.setAttribute("data-state", stuck ? "stuck" : "top");
  }

  addEventListener("scroll", update, { passive: true });
  update();

  // progress bar
  if (progressEl) {
    function paintProgress() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progressEl.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0).toFixed(2) + "%";
    }
    addEventListener("scroll", paintProgress, { passive: true });
    addEventListener("resize", paintProgress);
    paintProgress();
  }

  // section reader
  if (readoutEl && typeof JH !== "undefined") {
    var sections = document.querySelectorAll(".sec[data-section]");
    var actual = "";
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
          if (!e.isIntersecting) return;
          var txt = e.target.dataset.section || "";
          if (txt !== actual) { actual = txt; JH.scramble(readoutEl, txt); }
        });
      }, { rootMargin: "-45% 0px -45% 0px" });
      sections.forEach(function(el) { io.observe(el); });
    }
  }

  // smooth scroll for anchor links
  document.querySelectorAll("[data-scroll]").forEach(function(a) {
    a.addEventListener("click", function(e) {
      var href = a.getAttribute("href");
      if (href && href.startsWith("#")) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: JH.REDUCE ? "auto" : "smooth" });
      }
    });
  });
})();
