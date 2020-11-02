//////////header background//////////////////////7

VANTA.HALO({
  el: "#header",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  baseColor: 0xc0950,
  backgroundColor: 0x291343,
  amplitudeFactor: 2.30,
  xOffset: 0.20,
  yOffset: -0.03,
  size: 1.30
})


/////////////about hover distorsion  ////////////////////
var hoverDistort = new hoverEffect({
  parent: document.querySelector('.about-wrapper'),
  intensity: 0.5,
  image1: '/assets/images/JH-about-1-c.png',
  image2: '/assets/images/JH-about-3-c.png',
  displacementImage: '/assets/images/7.jpg'
});
////////////////////////////skills tag canvas sphere /////////////////////////////////

if (!$('#tag-skills').tagcanvas({
    //textColour : '#a5a5a5',
    outlineThickness: 0.5,
    outlineColour: '#44c2fd',
    maxSpeed: 0.06,
    freezeActive: true,
    shuffleTags: true,
    shape: 'sphere',
    zoom: 0.8,
    noSelect: true,
    textFont: null,
    pinchZoom: true,
    freezeDecel: true,
    fadeIn: 3000,
    initial: [0.3, -0.1],
    depth: 1.1

  })) {
  // TagCanvas failed to load
  $('#skills-charts').hide();

}

