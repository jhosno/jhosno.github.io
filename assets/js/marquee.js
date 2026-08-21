/* MARQUEE — animacion de texto infinito */
(function() {
  "use strict";
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (REDUCE) return;

  document.querySelectorAll("[data-marquee]").forEach(function(el) {
    var track = el.querySelector(".marquee__track");
    if (!track) return;
    var speed = parseInt(el.dataset.speed) || 26;
    var dir = parseInt(el.dataset.dir) || 1;
    var group = el.querySelector(".marquee__group");
    if (!group) return;

    // clone group for seamless loop
    var clone = group.cloneNode(true);
    track.appendChild(clone);

    var pos = 0;
    function tick() {
      pos -= speed * 0.016 * dir;
      var w = group.offsetWidth;
      if (Math.abs(pos) >= w) pos = 0;
      track.style.transform = "translate3d(" + pos + "px,0,0)";
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
})();
