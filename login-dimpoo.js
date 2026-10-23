const DIMPOO_LOGIN_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#3b0d1c">
<title>You Are My Mirror</title>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500&family=Mulish:wght@400;600;700&display=swap" rel="stylesheet">

<style>
:root {
  --wine: #3b0d1c;        /* deep rose at dusk */
  --wine-2: #5c1530;
  --rose: #c2405e;        /* full-bloom rose */
  --blush: #f7d9de;       /* petal */
  --petal-paper: #fdf1f2; /* card */
  --leaf: #5b7a52;        /* stem and leaves */
  --gold: #e9c58f;        /* pollen / candle light */
  --ink: #4a1626;         /* text on light */
  --serif: "Cormorant Garamond", Georgia, "Times New Roman", serif;
  --sans: "Mulish", "Segoe UI", Arial, sans-serif;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  min-height: 100%;
  width: 100%;
}

body {
  min-height: 100vh;
  color: var(--blush);
  font-family: var(--serif);
  background:
    radial-gradient(ellipse at 15% 10%, rgba(194,64,94,.35), transparent 45%),
    radial-gradient(ellipse at 85% 90%, rgba(91,122,82,.28), transparent 50%),
    radial-gradient(ellipse at 50% 50%, var(--wine-2), var(--wine) 75%);
  overflow-x: hidden;
}

/* Real 3D rose petals (WebGL), drifting over the whole page */
#petalCanvas {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 3;
}

.page {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  width: min(1240px, 100%);
  margin: auto;
  padding: 32px;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(300px, .75fr);
  gap: 38px;
  align-items: center;
}

/* Left: the song panel */
.story {
  position: relative;
  min-width: 0;
  min-height: 650px;
  overflow: hidden;
  border-radius: 200px 200px 28px 28px; /* arched like a garden gate */
  border: 1px solid rgba(233,197,143,.35);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 78px 24px 34px;
  text-align: center;
  background:
    radial-gradient(ellipse at 50% 48%, rgba(233,197,143,.16), transparent 55%),
    radial-gradient(ellipse at 50% 100%, rgba(194,64,94,.25), transparent 60%),
    linear-gradient(180deg, #5a1630, #2c0814 85%);
  box-shadow: 0 30px 90px rgba(20,0,8,.5);

  opacity: 0;
  visibility: hidden;
  transform: translateY(12px);
  transition: opacity 1.2s ease, transform 1.2s ease, visibility 1.2s;
}

.story.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.vine {
  position: absolute;
  width: 170px;
  height: auto;
  pointer-events: none;
  opacity: .9;
}

.vine.left  { top: 70px; left: -6px; }
.vine.right { top: 70px; right: -6px; transform: scaleX(-1); }

.story-title,
.mirror-stage,
.story-copy {
  position: relative;
  z-index: 1;
  width: 100%;
}

.mirror-stage {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  margin: 4px 0 10px;
}

.mirror {
  width: 100%;
  max-width: 520px;
  height: auto;
  max-height: 440px;
  overflow: visible;
}

.mirror-glass-sheen {
  animation: sheen 7s ease-in-out infinite;
}

@keyframes sheen {
  0%, 55% { transform: translateX(-160px); }
  100%    { transform: translateX(160px); }
}

/* Red threads draw themselves in when the panel appears */
.thread {
  fill: none;
  stroke: #d5102c;
  stroke-width: 1.8;
  stroke-linecap: round;
  filter: drop-shadow(0 0 3px rgba(255,30,60,.85));
  stroke-dasharray: 1400;
  stroke-dashoffset: 1400;
  transition: stroke-dashoffset 4.5s cubic-bezier(.4,0,.2,1) 1s;
}

.thread.thin { stroke-width: 1.2; opacity: .8; }

.story.visible .thread { stroke-dashoffset: 0; }

.bow {
  opacity: 0;
  transition: opacity 1.2s ease 4.6s;
}

.story.visible .bow { opacity: 1; }

h1 {
  margin: 0;
  font-family: var(--serif);
  font-size: clamp(44px, 5.4vw, 72px);
  line-height: 1;
  font-weight: 500;
  font-style: italic;
  letter-spacing: -.5px;
  color: var(--blush);
  text-shadow: 0 2px 30px rgba(194,64,94,.45);
}

.stem-divider {
  display: block;
  width: 180px;
  height: 22px;
  margin: 14px auto 0;
}

.lyrics-area {
  min-height: 65px;
  color: #fbe6ea;
  font-size: clamp(18px, 2.1vw, 23px);
  line-height: 1.65;
  font-style: italic;
}

.lyric-line {
  animation: lyricFade 1.1s ease both;
}

@keyframes lyricFade {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Right: the sign-in card, like a pressed-flower note */
.login-card {
  position: relative;
  width: 100%;
  max-width: 410px;
  justify-self: center;
  padding: 40px clamp(22px, 4vw, 36px) 34px;
  border-radius: 6px 6px 6px 40px;
  background: var(--petal-paper);
  color: var(--ink);
  box-shadow:
    0 30px 80px rgba(20,0,8,.45),
    0 0 0 8px rgba(247,217,222,.08);
}

.card-rose {
  position: absolute;
  top: -34px;
  right: -22px;
  width: 92px;
  height: 92px;
  transform: rotate(18deg);
  filter: drop-shadow(0 8px 14px rgba(59,13,28,.35));
}

.card-title {
  margin: 0;
  font-family: var(--serif);
  font-size: 34px;
  font-weight: 600;
  line-height: 1.1;
  color: var(--wine-2);
}

.card-intro {
  margin: 8px 0 22px;
  color: #8a5563;
  font: 14px/1.7 var(--sans);
}

label {
  display: block;
  color: var(--ink);
  font: 600 13px var(--sans);
  margin: 16px 0 8px;
}

input {
  display: block;
  width: 100%;
  min-height: 50px;
  padding: 13px 15px;
  border-radius: 12px;
  border: 1px solid #e8bfc8;
  outline: none;
  color: var(--ink);
  background: #fff;
  font: 15px var(--sans);
  transition: border-color .2s, box-shadow .2s;
}

input::placeholder { color: #c49aa5; }

input:focus {
  border-color: var(--rose);
  box-shadow: 0 0 0 4px rgba(194,64,94,.15);
}

.submit {
  width: 100%;
  min-height: 52px;
  border: none;
  border-radius: 999px;
  margin-top: 26px;
  background: linear-gradient(180deg, #cf4c6a, #a3304c);
  color: #fff6f7;
  font: 700 15px var(--sans);
  letter-spacing: .2px;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(163,48,76,.3);
  transition: transform .2s, filter .2s;
}

.submit:hover {
  transform: translateY(-2px);
  filter: brightness(1.06);
}

.submit:focus-visible,
.audio-hint:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 3px;
}

.submit:disabled {
  opacity: .7;
  cursor: wait;
}

.message {
  min-height: 20px;
  margin-top: 14px;
  color: #a3304c;
  font: 600 13px/1.5 var(--sans);
  text-align: center;
  overflow-wrap: anywhere;
}

.card-footer {
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px dashed #e8bfc8;
  text-align: center;
  color: var(--rose);
  font-family: var(--serif);
  font-size: clamp(22px, 2.4vw, 27px);
  line-height: 1.35;
  font-style: italic;
}

.audio-hint {
  position: fixed;
  z-index: 5;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  max-width: calc(100% - 28px);
  padding: 12px 20px;
  border: 1px solid rgba(233,197,143,.5);
  border-radius: 999px;
  background: var(--petal-paper);
  color: var(--ink);
  font: 600 13px var(--sans);
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(20,0,8,.4);
}

.audio-hint[hidden] { display: none; }

@media (max-width: 820px) {
  .page {
    grid-template-columns: 1fr;
    gap: 44px;
    padding: 18px 15px 80px;
  }

  .story {
    min-height: 600px;
    padding-top: 64px;
    border-radius: 160px 160px 24px 24px;
  }

  .login-card { max-width: 460px; }

  h1 { font-size: clamp(30px, 8.4vw, 52px); }

  .vine { width: 120px; }
}

@media (max-width: 420px) {
  .story { min-height: 540px; }
  .story { padding: 62px 14px 26px; }
  .login-card { padding: 34px 20px 28px; }
  .card-rose { width: 72px; height: 72px; right: -8px; }
}

@media (prefers-reduced-motion: reduce) {
  #petalCanvas { display: none; }
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
</style>
</head>

<body>

<!-- Reusable rose drawing -->
<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <radialGradient id="petalOuter" cx="50%" cy="60%" r="60%">
      <stop offset="0%" stop-color="#e2667f"/>
      <stop offset="100%" stop-color="#8e1f3c"/>
    </radialGradient>
    <radialGradient id="petalInner" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#f6a3b3"/>
      <stop offset="100%" stop-color="#c2405e"/>
    </radialGradient>
    <linearGradient id="leafFill" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#7d9b6e"/>
      <stop offset="100%" stop-color="#3f5a39"/>
    </linearGradient>

    <symbol id="rose" viewBox="0 0 200 200">
      <path d="M100 150 C60 175 30 160 22 132 C55 128 80 135 100 150 Z" fill="url(#leafFill)"/>
      <path d="M100 150 C140 175 172 160 178 130 C145 126 120 135 100 150 Z" fill="url(#leafFill)"/>
      <g transform="translate(100 95)">
        <g fill="url(#petalOuter)">
          <ellipse rx="40" ry="28" transform="rotate(0) translate(0 -30)"/>
          <ellipse rx="40" ry="28" transform="rotate(72) translate(0 -30)"/>
          <ellipse rx="40" ry="28" transform="rotate(144) translate(0 -30)"/>
          <ellipse rx="40" ry="28" transform="rotate(216) translate(0 -30)"/>
          <ellipse rx="40" ry="28" transform="rotate(288) translate(0 -30)"/>
        </g>
        <g fill="url(#petalInner)">
          <ellipse rx="28" ry="20" transform="rotate(36) translate(0 -17)"/>
          <ellipse rx="28" ry="20" transform="rotate(108) translate(0 -17)"/>
          <ellipse rx="28" ry="20" transform="rotate(180) translate(0 -17)"/>
          <ellipse rx="28" ry="20" transform="rotate(252) translate(0 -17)"/>
          <ellipse rx="28" ry="20" transform="rotate(324) translate(0 -17)"/>
        </g>
        <circle r="20" fill="#d4506d"/>
        <path d="M-12 2 C-12 -14 12 -16 13 -2 C14 10 -2 13 -4 3 C-5 -4 5 -5 5 1"
              fill="none" stroke="#7d1734" stroke-width="3" stroke-linecap="round"/>
      </g>
    </symbol>
  </defs>
</svg>

<canvas id="petalCanvas" aria-hidden="true"></canvas>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
(function () {
  "use strict";
  if (!window.THREE) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var canvas = document.getElementById("petalCanvas");
  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (e) { return; }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  // Warm key light, soft fill, and a pink rim from behind so curls catch light
  scene.add(new THREE.HemisphereLight(0xffe3e3, 0x3a0010, 0.75));
  var key = new THREE.DirectionalLight(0xfff1e4, 1.7);
  key.position.set(3, 6, 7);
  scene.add(key);
  var rim = new THREE.DirectionalLight(0xff5a78, 0.9);
  rim.position.set(-5, -3, -6);
  scene.add(rim);

  function rnd(a, b) { return a + Math.random() * (b - a); }

  // --- Petal texture: deep velvet red, darker rim, lighter claw, veins ---
  function makeTexture() {
    var W = 256, H = 320;
    var c = document.createElement("canvas");
    c.width = W; c.height = H;
    var g = c.getContext("2d");

    var j = function (n) { return n + rnd(-9, 9); };
    g.beginPath();
    g.moveTo(128, 316);
    g.bezierCurveTo(j(80), 300, j(16), j(230), j(12), j(150));
    g.bezierCurveTo(j(8), j(78), j(40), j(18), j(92), j(14));
    g.bezierCurveTo(j(110), j(12), 118, j(24), 128, j(26));
    g.bezierCurveTo(138, j(22), j(150), j(8), j(172), j(12));
    g.bezierCurveTo(j(224), j(20), j(250), j(84), j(244), j(152));
    g.bezierCurveTo(j(238), j(228), j(178), 300, 128, 316);
    g.closePath();

    g.save();
    g.clip();

    var body = g.createLinearGradient(0, 0, 0, H);
    body.addColorStop(0, "#a8060f");
    body.addColorStop(0.45, "#c40d17");
    body.addColorStop(0.8, "#b8101a");
    body.addColorStop(0.95, "#d64a24");
    body.addColorStop(1, "#e9b04a");
    g.fillStyle = body;
    g.fillRect(0, 0, W, H);

    var glow = g.createRadialGradient(W * 0.45, H * 0.4, 10, W * 0.5, H * 0.45, W * 0.6);
    glow.addColorStop(0, "rgba(255,60,60,.28)");
    glow.addColorStop(1, "rgba(255,60,60,0)");
    g.fillStyle = glow;
    g.fillRect(0, 0, W, H);

    // Veins fanning from the base
    g.lineWidth = 1.1;
    for (var v = 0; v < 22; v++) {
      var tx = rnd(10, W - 10);
      g.strokeStyle = "rgba(90,0,8," + rnd(0.08, 0.16).toFixed(2) + ")";
      g.beginPath();
      g.moveTo(128 + rnd(-6, 6), H - 6);
      g.quadraticCurveTo((128 + tx) / 2 + rnd(-20, 20), H * 0.5, tx, rnd(10, 60));
      g.stroke();
    }

    // Velvet grain
    for (var k = 0; k < 2600; k++) {
      g.fillStyle = Math.random() < 0.5 ? "rgba(255,90,90,.05)" : "rgba(60,0,5,.07)";
      g.fillRect(rnd(0, W), rnd(0, H), 1.4, 1.4);
    }

    // Darker rim, as on real petals
    g.lineWidth = 26;
    g.strokeStyle = "rgba(70,0,6,.38)";
    g.stroke();
    g.restore();

    var tex = new THREE.CanvasTexture(c);
    tex.encoding = THREE.sRGBEncoding;
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return tex;
  }

  // --- Petal geometry: cupped across, curled back at the tip, rippled edge ---
  function makeGeometry() {
    var geo = new THREE.PlaneGeometry(1, 1.25, 28, 28);
    var pos = geo.attributes.position;
    var cup = rnd(0.25, 0.55);
    var curl = rnd(-0.45, -0.15);
    var ripple = rnd(0.03, 0.08);
    var freq = rnd(8, 14);
    var twist = rnd(-0.35, 0.35);
    for (var i = 0; i < pos.count; i++) {
      var x = pos.getX(i), y = pos.getY(i);
      var t = (y + 0.625) / 1.25;
      var z = cup * x * x * 4 * (0.25 + t) * 0.6
            + curl * Math.pow(t, 3)
            + ripple * Math.sin(x * freq + t * 4) * Math.pow(t, 2)
            + twist * x * t * 0.5;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  }

  var materials = [], geometries = [];
  for (var m = 0; m < 5; m++) {
    materials.push(new THREE.MeshStandardMaterial({
      map: makeTexture(),
      side: THREE.DoubleSide,
      alphaTest: 0.5,
      roughness: 0.42,
      metalness: 0,
      emissive: 0x3a0006,
      emissiveIntensity: 0.4
    }));
  }
  for (var n = 0; n < 6; n++) geometries.push(makeGeometry());

  var count = window.innerWidth < 700 ? 22 : 44;
  var petals = [];
  var aspect = 1;

  function halfHeightAt(z) {
    return Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * (camera.position.z - z);
  }

  function spawn(p, anywhere) {
    p.z = rnd(-9, 4);
    var hh = halfHeightAt(p.z);
    p.hh = hh;
    p.x0 = rnd(-hh * aspect * 1.1, hh * aspect * 1.1);
    p.y = anywhere ? rnd(-hh, hh) : hh + rnd(0.5, 2.5);
    p.speed = rnd(0.55, 1.1);
    p.swayA = rnd(0.3, 1.1);
    p.swayF = rnd(0.5, 1.2);
    p.ph = rnd(0, Math.PI * 2);
    p.rx = rnd(-1.4, 1.4);
    p.ry = rnd(-1.8, 1.8);
    p.fl = rnd(1.2, 2.6);
    p.rz0 = rnd(0, Math.PI * 2);
    p.t = rnd(0, 10);
    p.mesh.position.z = p.z;
  }

  for (var i = 0; i < count; i++) {
    var mesh = new THREE.Mesh(
      geometries[i % geometries.length],
      materials[i % materials.length]
    );
    var s = rnd(0.45, 0.85);
    mesh.scale.set(s, s, s);
    mesh.rotation.set(rnd(0, 6), rnd(0, 6), rnd(0, 6));
    scene.add(mesh);
    var p = { mesh: mesh };
    spawn(p, true);
    petals.push(p);
  }

  function resize() {
    var w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    aspect = w / h;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  var clock = new THREE.Clock();

  function frame() {
    var dt = Math.min(clock.getDelta(), 0.05);
    for (var i = 0; i < petals.length; i++) {
      var p = petals[i], o = p.mesh;
      p.t += dt;
      // A petal lying flat catches the air and falls slower than one edge-on
      var drag = 0.55 + 0.45 * Math.abs(Math.sin(o.rotation.x));
      p.y -= p.speed * drag * dt;
      o.position.x = p.x0 + Math.sin(p.t * p.swayF + p.ph) * p.swayA;
      o.position.y = p.y;
      o.rotation.x += p.rx * dt;
      o.rotation.y += p.ry * dt;
      o.rotation.z = p.rz0 + Math.sin(p.t * p.fl) * 0.7;
      if (p.y < -p.hh - 1.5) spawn(p, false);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
</script>

<audio id="song" src="/vimlesh.mp3" preload="auto" loop playsinline></audio>

<main class="page">

  <section class="story" id="story">
    <svg class="vine left" viewBox="0 0 170 320" aria-hidden="true">
      <path d="M8 0 C40 60 10 120 40 180 C60 220 30 270 50 320"
            fill="none" stroke="#5b7a52" stroke-width="3" stroke-linecap="round"/>
      <path d="M30 70 C60 55 75 70 80 80 C60 90 40 85 30 70 Z" fill="#6b8a5e"/>
      <path d="M28 150 C0 140 -5 160 0 168 C15 170 25 162 28 150 Z" fill="#6b8a5e"/>
      <path d="M44 230 C75 220 88 235 90 245 C70 252 52 246 44 230 Z" fill="#6b8a5e"/>
      <use href="#rose" x="40" y="88" width="64" height="64"/>
      <use href="#rose" x="10" y="190" width="44" height="44"/>
    </svg>
    <svg class="vine right" viewBox="0 0 170 320" aria-hidden="true">
      <path d="M8 0 C40 60 10 120 40 180 C60 220 30 270 50 320"
            fill="none" stroke="#5b7a52" stroke-width="3" stroke-linecap="round"/>
      <path d="M30 70 C60 55 75 70 80 80 C60 90 40 85 30 70 Z" fill="#6b8a5e"/>
      <path d="M44 230 C75 220 88 235 90 245 C70 252 52 246 44 230 Z" fill="#6b8a5e"/>
      <use href="#rose" x="30" y="120" width="54" height="54"/>
    </svg>

    <div class="story-title">
      <h1>You Are My Mirror</h1>
      <svg class="stem-divider" viewBox="0 0 180 22" aria-hidden="true">
        <path d="M4 11 H176" stroke="#e9c58f" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>
        <path d="M62 11 C70 2 80 2 84 9 C76 12 68 13 62 11 Z" fill="#7d9b6e"/>
        <path d="M118 11 C110 20 100 20 96 13 C104 10 112 9 118 11 Z" fill="#7d9b6e"/>
        <use href="#rose" x="79" y="0" width="22" height="22"/>
      </svg>
    </div>

    <div class="mirror-stage">
      <svg class="mirror" viewBox="0 0 500 440" role="img" aria-label="An antique gothic mirror on a stand, tied with red thread">
        <defs>
          <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stop-color="#f8e2a6"/>
            <stop offset="30%"  stop-color="#c99443"/>
            <stop offset="55%"  stop-color="#7c521d"/>
            <stop offset="78%"  stop-color="#e3b96c"/>
            <stop offset="100%" stop-color="#8a5f25"/>
          </linearGradient>
          <linearGradient id="goldPost" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stop-color="#7c521d"/>
            <stop offset="45%"  stop-color="#f3d58f"/>
            <stop offset="100%" stop-color="#6d4718"/>
          </linearGradient>
          <linearGradient id="glass" x1="0" y1="0" x2=".6" y2="1">
            <stop offset="0%"   stop-color="#6b3a52"/>
            <stop offset="45%"  stop-color="#2a0f1e"/>
            <stop offset="100%" stop-color="#4a1d33"/>
          </linearGradient>
          <radialGradient id="glassGlow" cx="50%" cy="45%" r="55%">
            <stop offset="0%"   stop-color="#ff9db4" stop-opacity=".35"/>
            <stop offset="100%" stop-color="#ff9db4" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="sheenGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stop-color="#fff" stop-opacity="0"/>
            <stop offset="50%"  stop-color="#fff" stop-opacity=".32"/>
            <stop offset="100%" stop-color="#fff" stop-opacity="0"/>
          </linearGradient>
          <clipPath id="glassClip">
            <path d="M186 318 V150 Q186 92 250 56 Q314 92 314 150 V318 Z"/>
          </clipPath>
        </defs>

        <!-- Floor shadow -->
        <ellipse cx="250" cy="424" rx="150" ry="10" fill="#000" opacity=".35"/>

        <!-- Stand: posts, finials, feet, stretcher -->
        <g fill="url(#goldPost)" stroke="#5a3a12" stroke-width=".8">
          <rect x="133" y="150" width="11" height="262" rx="3"/>
          <rect x="356" y="150" width="11" height="262" rx="3"/>
          <path d="M138 140 C130 140 128 150 138 152 C148 150 146 140 138 140 Z"/>
          <path d="M362 140 C354 140 352 150 362 152 C372 150 370 140 362 140 Z"/>
          <rect x="136.5" y="118" width="3" height="22"/>
          <rect x="360.5" y="118" width="3" height="22"/>
          <circle cx="138" cy="116" r="5"/>
          <circle cx="362" cy="116" r="5"/>
          <path d="M100 420 C115 404 128 402 138 404 C148 402 161 404 176 420 Z"/>
          <path d="M324 420 C339 404 352 402 362 404 C372 402 385 404 400 420 Z"/>
          <rect x="140" y="372" width="220" height="7" rx="3"/>
          <circle cx="250" cy="375" r="9"/>
        </g>
        <!-- Pivots -->
        <g fill="url(#gold)" stroke="#5a3a12" stroke-width=".8">
          <rect x="143" y="226" width="25" height="7" rx="2"/>
          <rect x="332" y="226" width="25" height="7" rx="2"/>
          <circle cx="149" cy="229.5" r="8"/>
          <circle cx="351" cy="229.5" r="8"/>
        </g>

        <!-- Frame: pointed gothic arch -->
        <path d="M166 334 V146 Q166 78 250 30 Q334 78 334 146 V334 Z"
              fill="url(#gold)" stroke="#5a3a12" stroke-width="1.2"/>
        <path d="M176 326 V148 Q176 86 250 44 Q324 86 324 148 V326 Z"
              fill="none" stroke="#5a3a12" stroke-width="1" opacity=".6"/>
        <g fill="#fbe7b0" opacity=".85">
          <circle cx="171" cy="170" r="2"/><circle cx="171" cy="200" r="2"/>
          <circle cx="171" cy="270" r="2"/><circle cx="171" cy="300" r="2"/><circle cx="171" cy="325" r="2"/>
          <circle cx="329" cy="170" r="2"/><circle cx="329" cy="200" r="2"/>
          <circle cx="329" cy="270" r="2"/><circle cx="329" cy="300" r="2"/><circle cx="329" cy="325" r="2"/>
          <circle cx="182" cy="112" r="2"/><circle cx="204" cy="80" r="2"/><circle cx="227" cy="57" r="2"/>
          <circle cx="318" cy="112" r="2"/><circle cx="296" cy="80" r="2"/><circle cx="273" cy="57" r="2"/>
        </g>
        <!-- Crown finial -->
        <g fill="url(#gold)" stroke="#5a3a12" stroke-width=".8">
          <path d="M250 4 C244 14 240 20 250 30 C260 20 256 14 250 4 Z"/>
          <path d="M250 30 C236 28 228 18 232 10 C240 14 244 22 250 30 Z"/>
          <path d="M250 30 C264 28 272 18 268 10 C260 14 256 22 250 30 Z"/>
          <circle cx="250" cy="31" r="3.5"/>
        </g>
        <!-- Base scroll -->
        <path d="M200 334 C206 350 228 352 250 344 C272 352 294 350 300 334 Z"
              fill="url(#gold)" stroke="#5a3a12" stroke-width=".8"/>
        <!-- Quatrefoil medallions -->
        <g fill="url(#gold)" stroke="#5a3a12" stroke-width=".8">
          <circle cx="171" cy="229" r="4"/><circle cx="171" cy="241" r="4"/>
          <circle cx="165" cy="235" r="4"/><circle cx="177" cy="235" r="4"/>
          <circle cx="329" cy="229" r="4"/><circle cx="329" cy="241" r="4"/>
          <circle cx="323" cy="235" r="4"/><circle cx="335" cy="235" r="4"/>
        </g>

        <!-- Glass -->
        <path d="M186 318 V150 Q186 92 250 56 Q314 92 314 150 V318 Z" fill="url(#glass)"/>
        <g clip-path="url(#glassClip)">
          <rect x="186" y="56" width="128" height="262" fill="url(#glassGlow)"/>
          <rect class="mirror-glass-sheen" x="200" y="20" width="60" height="340"
                fill="url(#sheenGrad)"/>
          <g fill="#fff">
            <circle cx="212" cy="140" r="1.2" opacity=".7"/>
            <circle cx="292" cy="210" r="1" opacity=".6"/>
            <circle cx="236" cy="270" r=".9" opacity=".5"/>
          </g>
        </g>
        <path d="M186 318 V150 Q186 92 250 56 Q314 92 314 150 V318 Z"
              fill="none" stroke="#2a1405" stroke-width="2" opacity=".7"/>

        <!-- Red threads of fate -->
        <path class="thread" d="M0 168 C70 140 112 196 140 210 C160 220 172 236 186 250 C214 280 286 280 314 250 C330 232 342 222 360 214 C392 198 430 150 500 176"/>
        <path class="thread thin" d="M0 300 C60 292 100 330 138 340 C180 352 214 330 250 344 C286 358 324 330 362 340 C402 350 440 296 500 310"/>
        <path class="thread thin" d="M30 0 C60 40 120 20 170 70 C190 90 196 100 196 120"/>
        <path class="thread thin" d="M470 0 C440 40 380 20 330 70 C310 90 304 100 304 120"/>
        <g class="bow" fill="none" stroke="#d5102c" stroke-width="1.8" stroke-linecap="round"
           style="filter: drop-shadow(0 0 3px rgba(255,30,60,.85))">
          <path d="M250 278 C232 262 224 286 250 278 Z"/>
          <path d="M250 278 C268 262 276 286 250 278 Z"/>
          <path d="M250 278 C246 290 240 298 236 306"/>
          <path d="M250 278 C254 290 262 298 266 304"/>
          <circle cx="250" cy="278" r="2.4" fill="#d5102c" stroke="none"/>
        </g>
      </svg>
    </div>

    <div class="story-copy">
      <div class="lyrics-area" id="lyrics" aria-live="polite"></div>
    </div>
  </section>

  <section class="login-card">
    <svg class="card-rose" aria-hidden="true"><use href="#rose"/></svg>

    <h2 class="card-title">Welcome back</h2>
    <p class="card-intro">
      Towards greatness.
    </p>

    <form id="loginForm">
      <label for="username">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        autocomplete="username"
        placeholder="Enter your username"
        required
      >

      <label for="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        autocomplete="current-password"
        placeholder="Enter your password"
        required
      >

      <button class="submit" id="loginButton" type="submit">Enter with love ♡</button>
      <div class="message" id="message" role="status"></div>
    </form>

    <div class="card-footer">Dimpoo,<br>you are loved always ♡</div>
  </section>

</main>

<button class="audio-hint" id="audioHint" type="button" hidden>
  ♫ Tap to start our song
</button>

<script>
(function () {
  "use strict";

  var CONTENT_START_AT = 13;
  var LYRICS_START_AT = 14 * 60 + 30;

  var song = document.getElementById("song");
  var story = document.getElementById("story");
  var lyricsBox = document.getElementById("lyrics");
  var audioHint = document.getElementById("audioHint");
  var loginForm = document.getElementById("loginForm");
  var loginButton = document.getElementById("loginButton");
  var message = document.getElementById("message");

  var lyricLines = [];
  var shownLines = 0;

  function updatePage() {
    if (song.currentTime >= CONTENT_START_AT) {
      story.classList.add("visible");
    }

    if (song.currentTime < LYRICS_START_AT || !lyricLines.length) {
      return;
    }

    var duration = song.duration;

    if (!Number.isFinite(duration) || duration <= LYRICS_START_AT) {
      return;
    }

    var elapsed = song.currentTime - LYRICS_START_AT;
    var remainingDuration = duration - LYRICS_START_AT;

    var target = Math.min(
      lyricLines.length,
      Math.floor((elapsed / remainingDuration) * lyricLines.length) + 1
    );

    while (shownLines < target) {
      var line = document.createElement("div");
      line.className = "lyric-line";
      line.textContent = lyricLines[shownLines];
      lyricsBox.appendChild(line);
      shownLines++;
    }
  }

  async function loadLyrics() {
    try {
      var response = await fetch("/lyrics.txt", { cache: "no-cache" });
      if (!response.ok) throw new Error("Could not load lyrics.txt");

      var content = await response.text();

      lyricLines = content
        .split(/\\r?\\n/)
        .map(function (line) { return line.trim(); })
        .filter(Boolean);

      updatePage();
    } catch (error) {
      console.warn("Could not load lyrics:", error);
    }
  }

  async function startMusic() {
    try {
      await song.play();
      audioHint.hidden = true;
      updatePage();
    } catch (error) {
      audioHint.hidden = false;
    }
  }

  song.addEventListener("timeupdate", updatePage);
  song.addEventListener("loadedmetadata", updatePage);

  song.addEventListener("playing", function () {
    audioHint.hidden = true;
    updatePage();
  });

  song.addEventListener("error", function () {
    audioHint.textContent =
      "Song could not load. Check that vimlesh.mp3 is in the root folder.";
    audioHint.hidden = false;
  });

  audioHint.addEventListener("click", startMusic);

  document.addEventListener("pointerdown", function () {
    if (song.paused) startMusic();
  }, { once: true });

  document.addEventListener("keydown", function () {
    if (song.paused) startMusic();
  }, { once: true });

  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    message.textContent = "";
    loginButton.disabled = true;
    loginButton.textContent = "Please wait…";

    var username = document.getElementById("username").value.trim();
    var password = document.getElementById("password").value;

    try {
      var response = await fetch("/__login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (response.ok) {
        window.location.href = "/";
        return;
      }

      var errorMessage = "Incorrect username or password. Please try again.";

      try {
        var result = await response.json();

        if (result && result.error) {
          errorMessage = result.error;
        } else if (result && result.message) {
          errorMessage = result.message;
        }
      } catch (_) {}

      message.textContent = errorMessage;
    } catch (error) {
      message.textContent = "Connection issue. Please try again.";
    } finally {
      loginButton.disabled = false;
      loginButton.textContent = "Enter with love ♡";
    }
  });

  loadLyrics();

  // Start the song at 0:00; never seek forward.
  startMusic();
})();
</script>
</body>
</html>`;

export { DIMPOO_LOGIN_PAGE };
