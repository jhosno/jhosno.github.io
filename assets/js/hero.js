/* ============================================================
   HERO.JS — Wordmark, Dionaea plant, noise, flower panel,
   bug automaton, cursor bug, glitch, intro, ambient, exit
   ============================================================ */
(function () {
  "use strict";

  window.JH = window.JH || {};
  var REDUCE = window.JH.REDUCE;
  var CONTENIDO = window.JH.CONTENIDO;

  /* ----------------------------------------------------------
     HERO — wordmark construction
     ---------------------------------------------------------- */
  var glyphHost = document.querySelector(".wordmark__glyphs");
  glyphHost.textContent = "";
  var word = CONTENIDO.marca;
  word.split("").forEach(function (ch) {
    var s = document.createElement("span");
    s.className = "wordmark__ch";
    s.setAttribute("data-ch", ch);
    s.textContent = ch;
    glyphHost.appendChild(s);
  });
  var glyphs = glyphHost.querySelectorAll(".wordmark__ch");
  var wordmark = document.getElementById("wordmark");

  /* ----------------------------------------------------------
     DIONAEA — atrapamoscas ASCII
     ---------------------------------------------------------- */
  function tri(x) { x -= Math.floor(x); return x < 0.5 ? x * 2 : 2 - 2 * x; }

  function rng(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }

  function makePlant(cols, rows, opt) {
    opt = opt || {};
    var AR = opt.ar || 0.6, RAMP = " .:-=+*#%@", RN = RAMP.length - 1;
    var R = rng(opt.seed || 3), n = cols * rows, SC = opt.scale || 1;
    var M = new Float32Array(n), HH = new Float32Array(n);
    var NZ = new Float32Array(n), LAT = new Float32Array(n);
    for (var y = 0, i = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++, i++) {
        NZ[i] = R();
        LAT[i] = 0.5*tri(x*0.52 + y*0.30) + 0.5*tri(x*0.31 - y*0.47);
      }
    }
    var CX = opt.mini ? cols/2 : cols*0.035, BY = rows-1;
    var HMAX = opt.mini ? rows*1.6 : rows*1.30;

    function disc(X, Y, rad, mass) {
      var gx = CX + X/AR, gy = BY - Y, rg = rad < 0.45 ? 0.45 : rad, rx = rg/AR;
      var x0 = Math.max(0, Math.ceil(gx-rx)), x1 = Math.min(cols-1, Math.floor(gx+rx));
      var y0 = Math.max(0, Math.ceil(gy-rg)), y1 = Math.min(rows-1, Math.floor(gy+rg));
      var hh = (opt.mini ? Y : Math.sqrt(X*X + Y*Y)) / HMAX;
      for (var yy = y0; yy <= y1; yy++) {
        for (var xx = x0; xx <= x1; xx++) {
          var dx = (xx-gx)*AR, dy = yy-gy, d2 = (dx*dx + dy*dy)/(rg*rg);
          if (d2 > 1) continue;
          var j = yy*cols + xx, m = mass * (1 - d2*0.45);
          if (m > M[j]) { M[j] = m; HH[j] = hh; }
        }
      }
    }

    function limb(reach, dir, size, w, tooth, step, bow) {
      var sx = Math.sin(dir), cy2 = Math.cos(dir);
      var hx = reach*sx, hy = reach*cy2;
      var px2 = -cy2*reach*bow, py2 = sx*reach*bow;
      return { hx:hx, hy:hy, ang:(Math.PI/2 - dir) + (dir>1.0 ? -0.16 : 0.26),
               size:size, w:w, tooth:tooth, step:step,
               px:0, py:0.6, cx:hx*0.45 + px2, cy:hy*0.45 + py2,
               reach:reach, nx:cy2, ny:-sx };
    }

    var SP = opt.spread || 1;

    var TR = opt.mini
      ? [{ hx:0, hy:1.6, ang:1.52, size:2.9, w:0.62, tooth:1.5, step:2, px:0, py:-1.5, cx:0, cy:0,
           reach:2, nx:1, ny:0 }]
      : [
        limb(58*SC, 0.95*SP, 10.0*SC, 1.85*SC, 5.10*SC, 3,  0.13),
        limb(36*SC, 0.31*SP, 7.2*SC, 1.42*SC, 3.80*SC, 3, -0.17),
        limb(32*SC, 1.22*SP, 6.8*SC, 1.34*SC, 3.60*SC, 3,  0.20),
        limb(13*SC, 0.62*SP, 3.4*SC, 0.82*SC, 1.80*SC, 2,  0.10)
      ];

    function bez(t, a, b, c) { var u = 1-t; return u*u*a + 2*u*t*b + t*t*c; }

    function drawTrap(T, close, sway) {
      var open = 1 - close;
      var alpha = 0.02 + 0.60 * open;
      var beta  = 0.62;
      var amp = sway * (0.16 + T.reach * 0.030);
      var hx = T.hx + T.nx*amp, hy = T.hy + T.ny*amp;

      var NP = Math.max(34, Math.round(T.reach * 2.4));
      for (var p = 0; p <= NP; p++) {
        var u = p/NP;
        disc(bez(u, T.px, T.cx + T.nx*amp*0.45, hx), bez(u, T.py, T.cy + T.ny*amp*0.45, hy),
             (0.72 - 0.28*u)*SC, 0.84);
      }
      if (open > 0.10) {
        for (var q = 1; q <= 9; q++) {
          var uq = q/9;
          disc(hx + Math.cos(T.ang)*uq*T.size*0.72, hy + Math.sin(T.ang)*uq*T.size*0.72,
               T.w*1.5*(1 - uq*0.45)*open, 0.34*open);
        }
      }
      for (var sgn = -1; sgn <= 1; sgn += 2) {
        var a = T.ang + sgn*(alpha + beta), X = hx, Y = hy, N = 30;
        var arc = T.size * beta / Math.sin(beta), ds = arc/N, curv = -sgn * 2*beta / arc;
        for (var ii = 0; ii <= N; ii++) {
          var u2 = ii/N;
          a += curv*ds; X += Math.cos(a)*ds; Y += Math.sin(a)*ds;
          disc(X, Y, T.w * (0.30 + 0.95*Math.sin(Math.pow(u2, 0.75)*Math.PI)), 0.95);
          if (u2 > 0.22 && ii % T.step === 0) {
            var g = Math.min(1, (u2-0.22)/0.20) * (1 - 0.28*u2), tl = T.tooth*g;
            var na = a + sgn*(Math.PI/2 - 0.40*u2), nx = Math.cos(na), ny = Math.sin(na);
            var NT = Math.max(5, Math.round(tl*3.0));
            for (var d = 1; d <= NT; d++) {
              var f = d/NT;
              disc(X + nx*tl*f, Y + ny*tl*f, 0.46*(1 - f*0.50)*SC, 0.93 - 0.13*f);
            }
          }
        }
      }
    }

    var line = new Array(cols), buf = new Array(rows);

    return {
      cols: cols, rows: rows, traps: TR,
      mouth: function (k) {
        var T = TR[k], rr = T.size * 0.50;
        return { gx: CX + (T.hx + Math.cos(T.ang)*rr)/AR, gy: BY - (T.hy + Math.sin(T.ang)*rr) };
      },
      frame: function (t, grow, close, bugs) {
        M.fill(0); HH.fill(0);
        var sway = 0.55*Math.sin(t*0.41) + 0.24*Math.sin(t*0.79);
        if (!opt.mini) {
          for (var b = 0; b < 9; b++) disc((-1.4 + b*0.85)*SC, (0.2 + Math.sin(b*1.7)*0.4)*SC, 1.05*SC, 0.58);
        }
        for (var k = 0; k < TR.length; k++) drawTrap(TR[k], close[k], opt.mini ? sway*0.25 : sway);

        var pt = t * 1.4;
        for (var yy = 0; yy < rows; yy++) {
          for (var xx = 0; xx < cols; xx++) {
            var i = yy*cols + xx, m = M[i], val = -1;
            if (m > 0.003) {
              var gg = (grow*1.12 - HH[i]) / 0.14;
              gg = gg < 0 ? 0 : (gg > 1 ? 1 : gg);
              gg = gg*gg*(3 - 2*gg);
              if (gg > 0.002) {
                var pu = tri(HH[i]*3.2 - pt);
                val = (0.18 + 0.76*m + 0.15*(0.62*LAT[i] + 0.38*NZ[i])*m + 0.12*pu*m) * gg;
              }
            }
            line[xx] = val <= 0.08 ? " " : RAMP.charAt(val >= 1 ? RN : (val*RN) | 0);
          }
          buf[yy] = line.join("");
        }

        if (bugs) {
          for (var q2 = 0; q2 < bugs.length; q2++) {
            var bg = bugs[q2];
            if (!bg || !bg.glyph) continue;
            var bx = Math.round(bg.gx), by = Math.round(bg.gy);
            if (by < 0 || by >= rows) continue;
            var row = buf[by].split("");
            for (var c = 0; c < 3; c++) {
              var cx = bx - 1 + c;
              if (cx >= 0 && cx < cols) row[cx] = bg.glyph.charAt(c);
            }
            buf[by] = row.join("");
          }
        }
        return buf.join("\n");
      }
    };
  }

  /* ----------------------------------------------------------
     FLOWER — rosa polar
     ---------------------------------------------------------- */
  function makeFlower(cols, rows, opt){
    opt = opt || {};
    var AR   = opt.ar   || 0.6;
    var FILL = opt.fill || 0.94;
    var RAMP = opt.ramp || ' .:-=+*#%@';
    var RN   = RAMP.length - 1;

    var P = Object.assign({
      base : 0.24, lobe : 0.68, pow  : 0.85,
      h6   : 0.035, h9   : 0.020,
      wave : 0.22, vein : 0.10, floor: 0.19,
      span : 0.86, grain: 0.05, cut  : 0.085, snow : 0
    }, opt.p || {});

    var n = cols * rows;
    var rad = new Float32Array(n), nz = new Float32Array(n);
    var C3 = new Float32Array(n), S3 = new Float32Array(n);
    var C2 = new Float32Array(n), S2 = new Float32Array(n);
    var C6 = new Float32Array(n), S6 = new Float32Array(n);
    var C9 = new Float32Array(n), S9 = new Float32Array(n);
    var WC = new Float32Array(n), WS = new Float32Array(n);

    var cx = (cols-1)/2, cy = (rows-1)/2, R = (rows/2)*FILL;
    for(let y=0, i=0; y<rows; y++){
      for(let x=0; x<cols; x++, i++){
        var px = (x-cx)*AR, py = (y-cy);
        var r = Math.hypot(px,py)/R, th = Math.atan2(py,px);
        rad[i] = r;  nz[i] = Math.random();
        C3[i]=Math.cos(3*th); S3[i]=Math.sin(3*th);
        C2[i]=Math.cos(2*th); S2[i]=Math.sin(2*th);
        C6[i]=Math.cos(6*th); S6[i]=Math.sin(6*th);
        C9[i]=Math.cos(9*th); S9[i]=Math.sin(9*th);
        var w = 16*r + 3*th;
        WC[i]=Math.cos(w); WS[i]=Math.sin(w);
      }
    }

    var shift = new Int16Array(rows);
    var line  = new Array(cols);
    var buf   = new Array(rows);

    return {
      cols:cols, rows:rows, shift:shift,
      frame:function(t, bloom, morph){
        var rot = t*0.11;
        var c3r=Math.cos(3*rot), s3r=Math.sin(3*rot);
        var c2r=Math.cos(2*rot), s2r=Math.sin(2*rot);
        var p6 = 6*rot - 1.55*t, c6p=Math.cos(p6), s6p=Math.sin(p6);
        var p9 = 9*rot + 2.30*t, c9p=Math.cos(p9), s9p=Math.sin(p9);
        var ch = 3*rot - 2.80*t, cch=Math.cos(ch), sch=Math.sin(ch);
        var v9 = 9*rot,          c9v=Math.cos(v9), s9v=Math.sin(v9);

        var breath = 0.93 + 0.09*Math.sin(t*0.72);
        var coreR  = (0.05 + 0.03*Math.sin(t*2.1)) * bloom;
        var dust   = 0.05 * bloom;
        var wilt   = 1 - bloom;
        var m1     = 1 - morph;

        for(let y=0; y<rows; y++){
          var sh = shift[y];
          for(let x=0; x<cols; x++){
            var sx = x + sh;
            if(sx < 0) sx += cols; else if(sx >= cols) sx -= cols;
            var i = y*cols + sx, r = rad[i];
            var v = -1;

            if(r < 1.25){
              var lobe = m1    * Math.abs(C3[i]*c3r - S3[i]*s3r)
                       + morph * Math.abs(C2[i]*c2r - S2[i]*s2r);
              lobe = Math.pow(lobe, P.pow);
              var petal = ( P.base
                            + P.lobe * lobe
                            + P.h6 * (S6[i]*c6p + C6[i]*s6p)
                            + P.h9 * (S9[i]*c9p + C9[i]*s9p)
                            ) * breath * bloom;
              if(r < coreR){
                v = 1.3;
              } else if(r < petal){
                var d = 1 - (r - coreR)/(petal - coreR + 1e-4);
                d = d*d*(3 - 2*d);
                var amp = 0.35 + 0.65*d;
                v = P.floor + P.span*d
                  + P.wave * amp * (WS[i]*cch + WC[i]*sch)
                  + P.vein * amp * (S9[i]*c9v + C9[i]*s9v)
                  + nz[i]*P.grain
                  - wilt * nz[i] * 1.05;
              } else if(r < petal + dust){
                v = 0.13 + nz[i]*0.13 - wilt*nz[i];
              }
            }
            if (P.snow) { var sn = wilt * P.snow * Math.random(); if (sn > v) v = sn; }
            line[x] = v <= P.cut ? ' '
                    : RAMP.charAt(v >= 1 ? RN : (v*RN)|0);
          }
          buf[y] = line.join('');
        }
        return buf.join('\n');
      }
    };
  }

  var panelF = makeFlower(38, 15, { fill: 2.4, p: {
    floor: 0.26, span: 0.80, grain: 0.06, cut: 0.05, wave: 0.26, vein: 0.12, snow: 0.85
  }});

  var panelEl = document.getElementById("ascii");
  var panelText = panelEl.appendChild(document.createTextNode(""));

  /* ----------------------------------------------------------
     NOISE — dither procedural
     ---------------------------------------------------------- */
  function makeNoise(cols, rows, opt){
    opt=opt||{};
    var R=rng(opt.seed||11), pick=rng((opt.seed||11)^0x9E37);
    var n=cols*rows;
    var RV=new Float32Array(n), GI=new Uint8Array(n);
    var GL=opt.glyphs||".:.:+.:=.:+#.:|.:+.:=.:#.:|+";
    var GN=GL.length;
    var BASE=opt.base!==undefined?opt.base:0.07;

    var CLU=new Float32Array(n);
    function octave(div, w){
      var GW=Math.max(3,Math.round(cols/div)), GH=Math.max(3,Math.round(rows/(div*0.62)));
      var CG=new Float32Array(GW*GH); for(var q=0;q<CG.length;q++) CG[q]=R();
      for(var y0=0,k=0;y0<rows;y0++) for(var x0=0;x0<cols;x0++,k++){
        var fx=x0/(cols-1)*(GW-1), fy=y0/(rows-1)*(GH-1);
        var ix=fx|0, iy=fy|0, tx=fx-ix, ty=fy-iy;
        var ix1=Math.min(GW-1,ix+1), iy1=Math.min(GH-1,iy+1);
        tx=tx*tx*(3-2*tx); ty=ty*ty*(3-2*ty);
        var a0=CG[iy*GW+ix]*(1-tx)+CG[iy*GW+ix1]*tx;
        var a1=CG[iy1*GW+ix]*(1-tx)+CG[iy1*GW+ix1]*tx;
        CLU[k]+=w*(a0*(1-ty)+a1*ty);
      }
    }
    octave(13, 0.66);
    octave(5,  0.34);
    for(var q2=0;q2<n;q2++){
      var c=(CLU[q2]-0.54)/0.46;
      CLU[q2]= c<0 ? 0 : (c>1 ? 1 : c*c*(3-2*c));
    }

    var g=0;
    for(var y=0,i=0;y<rows;y++) for(var x=0;x<cols;x++,i++){
      RV[i]=R();
      if(pick()<0.45) g=(pick()*GN)|0;
      GI[i]=g;
    }

    var SX=new Float32Array(cols), SA=new Float32Array(cols), CA=new Float32Array(cols), BX=new Float32Array(cols);
    var SY=new Float32Array(rows), SB=new Float32Array(rows), CB=new Float32Array(rows), BY=new Float32Array(rows);
    for(var y2=0;y2<rows;y2++){ SB[y2]=Math.sin(y2*0.037); CB[y2]=Math.cos(y2*0.037); }
    var shift=new Int16Array(rows), line=new Array(cols), buf=new Array(rows);

    return { cols:cols, rows:rows, shift:shift,
    frame:function(t, gate){
      var bcx=cols*(0.5+0.36*Math.sin(t*0.07)), bcy=rows*(0.5+0.34*Math.cos(t*0.053));
      var bcx2=cols*(0.5+0.42*Math.sin(t*0.041+2.2)), bcy2=rows*(0.5+0.30*Math.sin(t*0.063+1.1));
      var wx=cols*0.17, wy=rows*0.21;
      for(var x=0;x<cols;x++){
        SX[x]=Math.sin(x*0.045+t*0.11);
        var A=x*0.021+t*0.16; SA[x]=Math.sin(A); CA[x]=Math.cos(A);
        var u=(x-bcx)/wx, u2=(x-bcx2)/(wx*0.7);
        BX[x]=Math.exp(-u*u)+0.6*Math.exp(-u2*u2);
      }
      for(var y=0;y<rows;y++){
        SY[y]=Math.sin(y*0.075-t*0.09);
        var v=(y-bcy)/wy, v2=(y-bcy2)/(wy*0.7);
        BY[y]=Math.exp(-v*v)+0.6*Math.exp(-v2*v2);
      }
      for(var yy=0;yy<rows;yy++){
        var sh=shift[yy], sy=SY[yy], sb=SB[yy], cb=CB[yy], by=BY[yy];
        for(var xx=0;xx<cols;xx++){
          var sx=xx+sh;
          if(sx<0||sx>=cols){ line[xx]=" "; continue; }
          var i2=yy*cols+sx;
          var band=0.70+0.34*SX[sx]+0.28*sy+0.22*(SA[sx]*cb+CA[sx]*sb);
          var d=(BASE+0.80*CLU[i2]+0.26*BX[sx]*by)*band;
          d*=gate;
          line[xx]= RV[i2]<d ? GL.charAt(GI[i2]) : " ";
        }
        buf[yy]=line.join("");
      }
      return buf.join("\n");
    }};
  }

  /* ----------------------------------------------------------
     LAYOUT GRID — resize logic
     ---------------------------------------------------------- */
  var plantEl = document.getElementById("plant");
  var noiseEl = document.getElementById("noise");
  var budEl   = document.getElementById("bud");

  var heroEl = document.querySelector(".hero");
  var plant, noise, TIER = "";

  function fanSpread(cols, scale, maxSpread) {
    var avail = cols * 0.6 * 0.88 - cols * 0.035 * 0.6;
    for (var sp = maxSpread; sp > 0.20; sp -= 0.02) {
      if ((58 + 5) * scale * Math.sin(0.95 * sp) <= avail) return sp;
    }
    return 0.20;
  }

  function layoutGrid() {
    var W = window.innerWidth;
    var H = heroEl.clientHeight || window.innerHeight;
    var rows, nomRows, scale, maxSpread, tier;
    if (W <= 720)          { rows = nomRows = 52; scale = 0.66; maxSpread = 0.80; tier = "movil"; }
    else if (W / H < 1.15) { rows = nomRows = 64; scale = 0.95; maxSpread = 0.95; tier = "retrato"; }
    else                   { rows = nomRows = 60; scale = 1.00; maxSpread = 1.00; tier = "apaisado"; }
    rows = Math.min(rows, Math.max(30, Math.round(H / 11)));
    scale *= rows / nomRows;
    var fs = H / rows;
    var cols = Math.max(32, Math.min(260, Math.round(W / (fs * 0.6))));
    document.documentElement.style.setProperty("--ascii-fs", fs.toFixed(2) + "px");
    return { cols: cols, rows: rows, scale: scale, tier: tier,
             spread: fanSpread(cols, scale, maxSpread) };
  }

  function syncHeroTop() {
    if (document.getElementById("ribbon").getAttribute("data-state") !== "top") return;
    var h = document.getElementById("ribbon").offsetHeight;
    if (h > 20) document.documentElement.style.setProperty("--hero-top", (h + 22) + "px");
  }

  function buildPlant() {
    syncHeroTop();
    var g = layoutGrid();
    TIER = g.tier;
    plant = makePlant(g.cols, g.rows, { seed: 3, scale: g.scale, spread: g.spread });
    noise = makeNoise(g.cols, g.rows, { seed: 11 });
  }
  buildPlant();
  var budP = makePlant(15, 7, { seed: 3, mini: true });

  /* ----------------------------------------------------------
     STATE — FL, CL, CLOSE, BUG, CUR
     ---------------------------------------------------------- */
  var FL = { open: 0, wilt: 1, morph: 0 };
  var CL  = { a: 0, b: 0, c: 0 };
  var BUD = { close: 0 };

  function budSnap() {
    if (!BUD) return;
    gsap.to(BUD, { close: 1, duration: 0.09, ease: "power4.in" });
    gsap.to(BUD, { close: 0, duration: 1.4, ease: "power2.inOut", delay: 0.45 });
  }
  window.JH.budSnap = budSnap;

  function closeKey(k) { return k === 0 ? "a" : (k === 1 ? "b" : "c"); }

  /* --- Bug automaton --- */
  var WING = ["\\#/", "-#-", "/#\\", "-#-"];
  var BUG  = { st: "wait", phase: "wait", gx: 0, gy: 0, tx: 0, ty: 0, t0: 2.6, target: 0, seed: 0, glyph: null };

  function bugSpawn(t) {
    var r = Math.random();
    BUG.target = r < 0.60 ? 0 : (r < 0.82 ? 1 : 2);
    var m = plant.mouth(BUG.target);
    var side = Math.random() < 0.5 ? -1 : 1;
    BUG.gx = m.gx + side * (18 + Math.random() * 22);
    BUG.gy = m.gy - 9 + Math.random() * 16;
    BUG.tx = m.gx + (Math.random() - 0.5) * 5;
    BUG.ty = m.gy - 3.5 - Math.random() * 3;
    BUG.seed = Math.random() * 6.28;
    BUG.st = "fly"; BUG.phase = "fly";
  }
  function bugSnap(t) {
    var o = {}; o[closeKey(BUG.target)] = 1; o.duration = 0.09; o.ease = "power4.in";
    gsap.to(CL, o);
    burstGlitch(150);
    BUG.st = "caught"; BUG.phase = "caught"; BUG.t0 = t + 1.6;
  }
  function bugReopen(t) {
    var o = {}; o[closeKey(BUG.target)] = 0; o.duration = 2.4; o.ease = "power2.inOut"; o.delay = 0.7;
    gsap.to(CL, o);
    BUG.st = "wait"; BUG.phase = "reopen"; BUG.t0 = t + 4.6 + Math.random() * 2.5;
  }

  function stepBug(t, grow) {
    if (grow < 0.85) { BUG.glyph = null; BUG.st = "wait"; BUG.phase = "wait"; BUG.t0 = t + 1.2; return; }
    var m = plant.mouth(BUG.target);
    if ((BUG.st === "fly" || BUG.st === "hover") && CLOSE[BUG.target] > 0.5) {
      BUG.st = "wait"; BUG.phase = "wait"; BUG.t0 = t + 3.0; BUG.glyph = null; return;
    }
    if (BUG.phase === "reopen" && Math.max(CL.a, CL.b, CL.c) < 0.1) BUG.phase = "wait";

    if (BUG.st === "wait") {
      BUG.glyph = null;
      if (CUR.vis && CUR.st === "alive") { BUG.t0 = t + 2.0; return; }
      if (t > BUG.t0) bugSpawn(t);
    } else if (BUG.st === "fly") {
      var dx = BUG.tx - BUG.gx, dy = BUG.ty - BUG.gy;
      BUG.gx += dx * 0.040 + Math.sin(t*7.1 + BUG.seed) * 0.30;
      BUG.gy += dy * 0.040 + Math.sin(t*5.3 + BUG.seed*2) * 0.24;
      BUG.glyph = WING[(t * 13) | 0 & 3];
      if (Math.abs(dx) + Math.abs(dy) < 4.5) { BUG.st = "hover"; BUG.t0 = t + 0.9 + Math.random(); }
    } else if (BUG.st === "hover") {
      BUG.gx += Math.sin(t*6.2 + BUG.seed) * 0.45 + (m.gx - BUG.gx) * 0.022;
      BUG.gy += Math.cos(t*4.7 + BUG.seed) * 0.36 + (m.gy - BUG.gy) * 0.022;
      BUG.glyph = WING[(t * 16) | 0 & 3];
      if (t > BUG.t0) bugSnap(t);
    } else if (BUG.st === "caught") {
      BUG.gx = m.gx + (Math.random() - 0.5) * 1.4;
      BUG.gy = m.gy + (Math.random() - 0.5) * 1.0;
      BUG.glyph = Math.random() < 0.5 ? "-o-" : "~o~";
      if (t > BUG.t0) { BUG.st = "digest"; BUG.t0 = t + 1.8; }
    } else if (BUG.st === "digest") {
      BUG.gx = m.gx; BUG.gy = m.gy;
      var life = (BUG.t0 - t) / 1.8;
      BUG.glyph = life > 0.62 ? "-o-" : life > 0.32 ? ".o." : life > 0.08 ? " . " : null;
      if (life <= 0) bugReopen(t);
    }
  }

  /* --- Cursor bug --- */
  var PX = { a: 0, b: 0, c: 0 };
  var armed = [true, true, true];
  var PTR = { x: -1e4, y: -1e4, on: false, mouse: false };

  window.addEventListener("pointermove", function (e) {
    PTR.x = e.clientX; PTR.y = e.clientY; PTR.on = true;
    var m = (e.pointerType !== "touch");
    if (m !== PTR.mouse) {
      PTR.mouse = m;
      heroEl.style.cursor = (m && !REDUCE) ? "none" : "";
      if (!m) { curEl.classList.remove("is-on"); CUR.vis = false; }
    }
  }, { passive: true });
  document.addEventListener("mouseleave", function () { PTR.on = false; });

  var curEl  = document.getElementById("bugcur");
  var WINGC  = ["\\#/", "-#-", "/#\\", "-#-"];
  var SCRAP  = "▚▞/\\|<>+*#@%&";
  var CUR = { st: "alive", t0: 0, trap: -1, gx: 0, gy: 0, glyph: null, vis: false };
  var curX, curY;

  if (!REDUCE) {
    gsap.set(curEl, { xPercent: -50, yPercent: -50 });
    curX = gsap.quickTo(curEl, "x", { duration: 0.11, ease: "power2" });
    curY = gsap.quickTo(curEl, "y", { duration: 0.11, ease: "power2" });
  }

  var GEO = { t: -1e9, heroBottom: 0, ribBottom: 0, stageDoc: 1e9,
              px: 0, py: 0, cw: 1, chh: 1, ok: false };
  var stageEl = document.querySelector(".stage");

  function readGeom(now) {
    if (now - GEO.t < 130) return;
    GEO.t = now;
    var hr = heroEl.getBoundingClientRect();
    var rr = document.getElementById("ribbon").getBoundingClientRect();
    var pr = plantEl.getBoundingClientRect();
    var sr = stageEl.getBoundingClientRect();
    GEO.heroBottom = hr.bottom;
    GEO.ribBottom  = rr.bottom;
    GEO.stageDoc = sr.top + window.scrollY;
    GEO.px = pr.left; GEO.py = pr.top;
    GEO.cw = pr.width / plant.cols; GEO.chh = pr.height / plant.rows;
    GEO.ok = pr.width > 4;
  }
  window.addEventListener("resize", function () { GEO.t = -1e9; }, { passive: true });

  function mouthPx(k) {
    if (!GEO.ok) return null;
    var m = plant.mouth(k);
    return { x: GEO.px + m.gx * GEO.cw, y: GEO.py + m.gy * GEO.chh, chh: GEO.chh };
  }

  function curStrike(t) {
    for (var k = 0; k < 3; k++) {
      var P0 = mouthPx(k); if (!P0) return;
      var T = plant.traps[k];
      var dx = PTR.x - P0.x, dy = PTR.y - P0.y;
      var d = Math.sqrt(dx*dx + dy*dy);
      var rIn = (T.size + T.tooth) * P0.chh * 0.95;
      if (d > rIn * 1.35) armed[k] = true;
      if (!armed[k] || CLOSE[k] > 0.35) continue;
      if (d < rIn) {
        var o = {}; o[closeKey(k)] = 1; o.duration = 0.085; o.ease = "power4.in";
        gsap.to(PX, o);
        burstGlitch(190);
        armed[k] = false;
        CUR.st = "caught"; CUR.trap = k; CUR.t0 = t + 0.85;
        return;
      }
    }
  }

  function curReset() {
    if (CUR.st !== "alive" && CUR.trap >= 0) {
      var o = {}; o[closeKey(CUR.trap)] = 0; o.duration = 0.55; o.ease = "power2.out";
      gsap.to(PX, o);
    }
    CUR.st = "alive"; CUR.trap = -1; CUR.glyph = null;
    armed[0] = armed[1] = armed[2] = true;
  }

  function curLock() {
    var m = plant.mouth(CUR.trap);
    var j = CUR.st === "caught" ? 1 : 0;
    CUR.gx = m.gx + (Math.random() - 0.5) * 1.4 * j;
    CUR.gy = m.gy + (Math.random() - 0.5) * 1.0 * j;
  }

  function cursorBug(t) {
    if (REDUCE) return;
    var show = PTR.on && PTR.mouse && GEO.ok;
    if (show) {
      var visBottom = Math.min(GEO.heroBottom, GEO.stageDoc - window.scrollY);
      show = PTR.y > GEO.ribBottom + 2 && PTR.y < visBottom - 2 &&
             PTR.x > 0 && PTR.x < window.innerWidth;
    }
    if (show !== CUR.vis) {
      CUR.vis = show;
      if (show) curEl.classList.add("is-on"); else curEl.classList.remove("is-on");
      if (!show) curReset();
    }
    if (!show) { CUR.glyph = null; return; }

    curX(PTR.x); curY(PTR.y);

    if (CUR.st === "alive") {
      curEl.textContent = WINGC[((t * 11) | 0) & 3];
      CUR.glyph = null;
      curStrike(t);
    } else if (CUR.st === "caught") {
      curEl.textContent = "·";
      CUR.glyph = Math.random() < 0.5 ? "-o-" : "~o~";
      curLock();
      if (t > CUR.t0) { CUR.st = "digest"; CUR.t0 = t + 1.0; }
    } else if (CUR.st === "digest") {
      curEl.textContent = "·";
      var life = (CUR.t0 - t) / 1.0;
      CUR.glyph = life > 0.55 ? "-o-" : life > 0.25 ? ".o." : life > 0 ? " . " : null;
      curLock();
      if (life <= 0) {
        var o2 = {}; o2[closeKey(CUR.trap)] = 0; o2.duration = 1.9;
        o2.ease = "power2.inOut"; o2.delay = 0.5;
        gsap.to(PX, o2);
        CUR.st = "regrow"; CUR.t0 = t + 0.6;
      }
    } else {
      var sc = "";
      for (var i2 = 0; i2 < 3; i2++) sc += SCRAP.charAt((Math.random() * SCRAP.length) | 0);
      curEl.textContent = sc;
      CUR.glyph = null;
      if (t > CUR.t0) CUR.st = "alive";
    }
  }

  /* --- Glitch --- */
  var glitchUntil = 0;
  function burstGlitch(ms) { glitchUntil = performance.now() + (ms || 240); }
  window.JH.burstGlitch = burstGlitch;

  function scatterRows(sh, rows, power) {
    sh.fill(0);
    var bands = 2 + (Math.random() * 3 | 0);
    for (var b = 0; b < bands; b++) {
      var y0 = (Math.random() * rows) | 0, h = 1 + (Math.random() * 3 | 0);
      var dd = ((Math.random() * 2 - 1) * power) | 0;
      for (var y = y0; y < Math.min(rows, y0 + h); y++) sh[y] = dd;
    }
  }
  function scatterPanel() { scatterRows(panelF.shift, panelF.shift.length, 4); }

  /* --- Main loop --- */
  var FPS = 30, STEP = 1000 / FPS, flT0 = performance.now(), flLast = -1e9;
  var CLOSE = [0, 0, 0, 1];
  var panelDirty = false, noiseDirty = false, noiseTick = 0;

  function paintPlant(t) {
    var grow = FL.open * FL.wilt;
    CLOSE[0] = Math.max(CL.a, PX.a, FL.morph);
    CLOSE[1] = Math.max(CL.b, PX.b, FL.morph);
    CLOSE[2] = Math.max(CL.c, PX.c, FL.morph);
    CLOSE[3] = 1;

    var glitching = performance.now() < glitchUntil;

    noiseTick++;
    if (glitching || noiseTick % 3 === 0) {
      if (glitching) { if (Math.random() < 0.5) scatterRows(noise.shift, noise.rows, 5); noiseDirty = true; }
      else if (noiseDirty) { noise.shift.fill(0); noiseDirty = false; }
      noiseEl.textContent = noise.frame(t, 0.55 + 0.45 * grow);
    }

    plantEl.textContent = plant.frame(t + (glitching ? (Math.random() - 0.5) * 1.6 : 0), grow, CLOSE, [BUG, CUR]);
    budEl.textContent   = budP.frame(t, FL.open, [Math.max(CLOSE[0], BUD.close)], null);

    if (glitching) { if (Math.random() < 0.6) scatterPanel(); }
    else if (panelDirty) { panelF.shift.fill(0); panelDirty = false; }
    if (glitching) panelDirty = true;
    panelText.nodeValue = panelF.frame(t, grow, FL.morph);
  }

  if (REDUCE) {
    FL.open = 1;
    paintPlant(3.2);
  } else {
    paintPlant(0);
    gsap.ticker.add(function () {
      var now = performance.now();
      if (now - flLast < STEP) return;
      flLast = now;
      var t = (now - flT0) / 1000;
      readGeom(now);
      cursorBug(t);
      stepBug(t, FL.open * FL.wilt);
      paintPlant(t);
    });
  }

  var flRz;
  window.addEventListener("resize", function () {
    clearTimeout(flRz);
    flRz = setTimeout(function () {
      syncHeroTop();
      var g = layoutGrid();
      if (g.cols !== plant.cols || g.rows !== plant.rows) buildPlant();
      GEO.t = -1e9;
    }, 220);
  });

  /* ----------------------------------------------------------
     RANDOM FACTS
     ---------------------------------------------------------- */
  var facts = CONTENIDO.facts;
  var factEl = document.getElementById("fact");
  var fi = 0;
  if (!REDUCE) {
    setInterval(function () {
      var lista = CONTENIDO.facts;
      fi = (fi + 1) % lista.length;
      window.JH.scramble(factEl, lista[fi], 0.55);
    }, 2200);
  }

  /* ----------------------------------------------------------
     INTRO SEQUENCE
     ---------------------------------------------------------- */
  gsap.set(".ribbon", { yPercent: -100 });
  gsap.set(glyphs, { yPercent: 118, rotate: 6, opacity: 0 });
  gsap.set([".wordmark__tail", ".hero__top", ".hero__bottom"], { opacity: 0, y: 18 });
  gsap.set([".sticker", ".seal", ".ascii"], { opacity: 0, scale: 0.9 });
  gsap.set([".hero__noise", ".hero__plant"], { opacity: 0 });
  gsap.set(".hero__ticker", { yPercent: 100 });

  var intro = gsap.timeline({ defaults: { ease: "expo.out" }, delay: 0.15 });

  intro
    .to(".ribbon", { yPercent: 0, duration: 0.9 })
    .to(".hero__noise", { opacity: 1, duration: 0.6 }, "-=0.85")
    .to(".hero__plant", { opacity: 1, duration: 0.5 }, "-=0.55")
    .to(FL, { open: 1, duration: 2.1, ease: "expo.out",
              onComplete: function () { burstGlitch(320); } }, "-=0.5")
    .to(glyphs, {
      yPercent: 0, rotate: 0, opacity: 1,
      duration: 1.15, stagger: 0.065
    }, "-=1.9")
    .to(".wordmark__tail", { opacity: 0.82, y: 0, duration: 0.8 }, "-=1.5")
    .to(".hero__top",    { opacity: 1, y: 0, duration: 0.7 }, "-=1.65")
    .to(".hero__bottom", { opacity: 1, y: 0, duration: 0.7 }, "-=1.52")
    .to(".seal",  { opacity: 1, scale: 1, duration: 0.7 }, "-=1.45")
    .to(".ascii", { opacity: 1, scale: 1, duration: 0.7 }, "-=1.42")
    .to(".sticker", { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 }, "-=1.4")
    .to(".hero__ticker", { yPercent: 0, duration: 0.7 }, "-=1.4");

  if (REDUCE) intro.progress(1);

  /* ----------------------------------------------------------
     AMBIENT — seal rotation, cue, glitch loop, parallax
     ---------------------------------------------------------- */
  if (!REDUCE) {
    gsap.to("#seal", { rotate: 360, duration: 22, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
    gsap.fromTo("#cueLine", { scaleY: 0.2 }, { scaleY: 1, duration: 1.1, repeat: -1, yoyo: true, ease: "power1.inOut" });

    var glitchLoop = function () {
      var delay = 2.2 + Math.random() * 4;
      gsap.delayedCall(delay, function () {
        wordmark.classList.add("is-glitching");
        burstGlitch(180 + Math.random() * 160);
        var tl = gsap.timeline({ onComplete: function () { wordmark.classList.remove("is-glitching"); glitchLoop(); } });
        tl.to(glyphs, { x: function () { return gsap.utils.random(-9, 9); }, duration: 0.06, stagger: 0.012 })
          .to(glyphs, { x: 0, duration: 0.14, ease: "power2.out" });
      });
    };
    glitchLoop();

    wordmark.addEventListener("pointerenter", function () {
      gsap.to(FL, { morph: 1, duration: 0.9, ease: "power2.out" });
      burstGlitch(200);
    });
    wordmark.addEventListener("pointerleave", function () {
      gsap.to(FL, { morph: 0, duration: 1.1, ease: "power2.out" });
    });

    var depthEls = Array.prototype.slice.call(document.querySelectorAll("[data-depth]"));
    var setters = depthEls.map(function (el) {
      return {
        el: el,
        d: parseFloat(el.getAttribute("data-depth")) || 0.05,
        x: gsap.quickTo(el, "x", { duration: 0.7, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 0.7, ease: "power3" })
      };
    });
    window.addEventListener("pointermove", function (e) {
      var cx = e.clientX - window.innerWidth / 2;
      var cy = e.clientY - window.innerHeight / 2;
      setters.forEach(function (s) { s.x(-cx * s.d); s.y(-cy * s.d); });
    }, { passive: true });
  }

  /* ----------------------------------------------------------
     HERO EXIT — scroll-driven
     ---------------------------------------------------------- */
  gsap.to(".hero__inner", {
    yPercent: -12, scale: 0.94, opacity: 0.25,
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 }
  });
  gsap.to(FL, {
    wilt: 0, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "72% top", scrub: 0.5 }
  });
  gsap.to(".hero__plant", {
    yPercent: 9, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6 }
  });
  gsap.fromTo(".hero__ticker",
    { yPercent: 0 },
    {
      yPercent: 100, ease: "none", immediateRender: false,
      scrollTrigger: { trigger: ".hero", start: "top top", end: "35% top", scrub: 0.5 }
    }
  );

  /* --- Export estado para otros módulos --- */
  window.JH.FL = FL;
  window.JH.CL = CL;
  window.JH.CLOSE = CLOSE;
})();
