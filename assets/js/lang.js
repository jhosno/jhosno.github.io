/* LANG — toggle de idiomas EN/ES */
(function() {
  "use strict";

  // auto-detect browser language
  var savedLang = null;
  try { savedLang = localStorage.getItem("jh-lang"); } catch(e) {}

  if (!savedLang) {
    var nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    if (nav === "es") {
      // already on es by default
    } else if (window.location.pathname.indexOf("/en/") === -1) {
      // redirect to /en/ for non-spanish browsers
      try { sessionStorage.setItem("lang_redirect", "1"); } catch(e) {}
      // don't redirect if already redirected this session
      var already = null;
      try { already = sessionStorage.getItem("lang_redirect"); } catch(e) {}
      if (!already) {
        try { sessionStorage.setItem("lang_redirect", "1"); } catch(e) {}
        // uncomment below to enable auto-redirect:
        // window.location.href = "/en/";
      }
    }
  }

  // toggle button
  var langBtn = document.getElementById("langBtn");
  if (!langBtn) return;

  var isEN = window.location.pathname.indexOf("/en/") !== -1;

  langBtn.addEventListener("click", function() {
    if (isEN) {
      // go to es: remove /en prefix
      var path = window.location.pathname.replace(/^\/en\//, "/").replace(/^\/en$/, "/");
      window.location.href = path + window.location.search;
    } else {
      // go to en: add /en prefix
      var path2 = "/en" + window.location.pathname;
      window.location.href = path2 + window.location.search;
    }
  });
})();
