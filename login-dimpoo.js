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
  min-height: 400px;
  margin: 4px 0 10px;
}

.mirror {
  width: 100%;
  max-width: 520px;
  height: auto;
  max-height: 440px;
  overflow: visible;
}

#mirrorCanvas {
  position: absolute;
  inset: -10px -24px;
  width: calc(100% + 48px);
  height: calc(100% + 20px);
  pointer-events: none;
}

.mirror-stage.has-3d .mirror { visibility: hidden; }

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
  margin-bottom: 14px;
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
// A small warm "room" that real-gold and petal surfaces reflect, like the
// candle-lit room in a photo. Built once per WebGL renderer.
window.__makeRoseEnv = function (renderer) {
  if (!window.THREE) return null;
  var pm = new THREE.PMREMGenerator(renderer);
  var es = new THREE.Scene();
  es.add(new THREE.Mesh(
    new THREE.BoxGeometry(24, 14, 24),
    new THREE.MeshBasicMaterial({ color: 0x2b0d16, side: THREE.BackSide })
  ));
  function panel(w, h, color, power, x, y, z) {
    var m = new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide });
    m.color.multiplyScalar(power);
    var p = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
    p.position.set(x, y, z);
    p.lookAt(0, 0, 0);
    es.add(p);
  }
  panel(6, 4, 0xfff0d6, 7, -5, 4, 7);    // big warm window, upper left
  panel(2.5, 7, 0xffd2a0, 3.5, 7, 0.5, 3); // lamp glow, right
  panel(5, 3, 0xfff6ea, 4, 2, 6, -7);    // ceiling light behind
  panel(9, 2, 0xff5c7c, 1.4, 0, -6, -3); // rose-red bounce from below
  panel(1.5, 1.5, 0xffffff, 10, -1, 2, 9); // small sparkle source
  var tex = pm.fromScene(es, 0.02).texture;
  pm.dispose();
  return tex;
};
</script>

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

  var envTex = window.__makeRoseEnv ? window.__makeRoseEnv(renderer) : null;

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
    var geo = new THREE.PlaneGeometry(1, 1.25, 32, 32);
    var pos = geo.attributes.position;
    var cup = rnd(0.35, 0.7);
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
      roughness: 0.36,
      metalness: 0,
      envMap: envTex,
      envMapIntensity: 0.6,
      emissive: 0x3a0006,
      emissiveIntensity: 0.4
    }));
  }
  for (var n = 0; n < 6; n++) geometries.push(makeGeometry());

  var count = window.innerWidth < 700 ? 40 : 80;
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
    var s = rnd(0.15, 0.28);
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

    <div class="mirror-stage" id="mirrorStage">
      <canvas id="mirrorCanvas" aria-hidden="true"></canvas>
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

    <h2 class="card-title">Towards greatness.</h2>

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

<script>
(function () {
  "use strict";
  if (!window.THREE) return;

  var stage = document.getElementById("mirrorStage");
  var canvas = document.getElementById("mirrorCanvas");
  if (!stage || !canvas) return;

  var renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  } catch (e) { return; }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  var env = window.__makeRoseEnv(renderer);
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

  scene.add(new THREE.AmbientLight(0xffe6d0, 0.18));
  var key = new THREE.DirectionalLight(0xfff0dc, 1.4);
  key.position.set(4, 5, 7);
  scene.add(key);
  var rimLight = new THREE.DirectionalLight(0xff7a90, 0.6);
  rimLight.position.set(-5, 1, -4);
  scene.add(rimLight);
  var glint = new THREE.PointLight(0xfff2d8, 1.2, 12);
  scene.add(glint);

  function rnd(a, b) { return a + Math.random() * (b - a); }

  // --- Carved relief: a tileable texture of curls, rosettes and beading,
  //     used as a bump map so the gold looks hand-carved ---
  function carvingTexture() {
    var S = 512;
    var c = document.createElement("canvas");
    c.width = c.height = S;
    var g = c.getContext("2d");
    g.fillStyle = "#808080";
    g.fillRect(0, 0, S, S);
    function wrap(fn) {
      for (var ox = -S; ox <= S; ox += S)
        for (var oy = -S; oy <= S; oy += S) fn(ox, oy);
    }
    for (var i = 0; i < 90; i++) {
      var cx = rnd(0, S), cy = rnd(0, S), r = rnd(10, 34), turns = rnd(1.2, 2.4);
      var light = Math.random() < 0.6;
      wrap(function (ox, oy) {
        g.beginPath();
        for (var a = 0; a < Math.PI * 2 * turns; a += 0.12) {
          var rr = r * (1 - a / (Math.PI * 2 * turns) * 0.85);
          var x = cx + ox + Math.cos(a) * rr, y = cy + oy + Math.sin(a) * rr;
          if (a === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        g.strokeStyle = light ? "rgba(255,255,255,.55)" : "rgba(0,0,0,.45)";
        g.lineWidth = rnd(2.5, 6);
        g.stroke();
      });
    }
    for (var k = 0; k < 40; k++) {
      var px = rnd(0, S), py = rnd(0, S), pr = rnd(6, 13);
      wrap(function (ox, oy) {
        for (var p = 0; p < 8; p++) {
          var ang = p / 8 * Math.PI * 2;
          var grd = g.createRadialGradient(
            px + ox + Math.cos(ang) * pr, py + oy + Math.sin(ang) * pr, 0,
            px + ox + Math.cos(ang) * pr, py + oy + Math.sin(ang) * pr, pr * 0.7);
          grd.addColorStop(0, "rgba(255,255,255,.7)");
          grd.addColorStop(1, "rgba(255,255,255,0)");
          g.fillStyle = grd;
          g.fillRect(0, 0, S, S);
        }
      });
    }
    for (var n = 0; n < 9000; n++) {
      g.fillStyle = Math.random() < 0.5 ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.1)";
      g.fillRect(rnd(0, S), rnd(0, S), 2, 2);
    }
    var t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(1.6, 1.6);
    return t;
  }
  var carve = carvingTexture();

  var goldDeep = new THREE.MeshStandardMaterial({
    color: 0xb8862c, metalness: 1, roughness: 0.38,
    envMap: env, envMapIntensity: 1.25, bumpMap: carve, bumpScale: 0.035
  });
  var goldBright = new THREE.MeshStandardMaterial({
    color: 0xe2b85c, metalness: 1, roughness: 0.24,
    envMap: env, envMapIntensity: 1.4, bumpMap: carve, bumpScale: 0.012
  });
  var goldOrn = new THREE.MeshStandardMaterial({
    color: 0xd9ac4c, metalness: 1, roughness: 0.3,
    envMap: env, envMapIntensity: 1.35
  });
  var glassMat = new THREE.MeshStandardMaterial({
    color: 0xd9cfcb, metalness: 1, roughness: 0.05,
    envMap: env, envMapIntensity: 0.9
  });

  // --- Frame outline, shaped like an antique gilded floor mirror ---
  function outerShape() {
    var s = new THREE.Shape();
    s.moveTo(0, -2.14);
    s.bezierCurveTo(0.45, -2.14, 0.93, -2.06, 0.93, -1.7);
    s.lineTo(0.89, 1.2);
    s.bezierCurveTo(0.9, 1.56, 0.7, 1.72, 0.48, 1.86);
    s.bezierCurveTo(0.3, 1.97, 0.12, 2.02, 0, 2.26);
    s.bezierCurveTo(-0.12, 2.02, -0.3, 1.97, -0.48, 1.86);
    s.bezierCurveTo(-0.7, 1.72, -0.9, 1.56, -0.89, 1.2);
    s.lineTo(-0.93, -1.7);
    s.bezierCurveTo(-0.93, -2.06, -0.45, -2.14, 0, -2.14);
    return s;
  }

  function arch(hw, bottom, sideTop, peak) {
    var s = new THREE.Shape();
    var r = 0.08;
    s.moveTo(-hw + r, bottom);
    s.lineTo(hw - r, bottom);
    s.quadraticCurveTo(hw, bottom, hw, bottom + r);
    s.lineTo(hw, sideTop);
    s.bezierCurveTo(hw, sideTop + (peak - sideTop) * 0.65, hw * 0.55, peak, 0, peak);
    s.bezierCurveTo(-hw * 0.55, peak, -hw, sideTop + (peak - sideTop) * 0.65, -hw, sideTop);
    s.lineTo(-hw, bottom + r);
    s.quadraticCurveTo(-hw, bottom, -hw + r, bottom);
    return s;
  }

  function ring(outer, hole, depth, bevel, mat, z) {
    outer.holes = [hole];
    var geo = new THREE.ExtrudeGeometry(outer, {
      depth: depth, curveSegments: 72, bevelEnabled: true,
      bevelThickness: bevel, bevelSize: bevel * 0.8, bevelSegments: 6
    });
    var m = new THREE.Mesh(geo, mat);
    m.position.z = z;
    return m;
  }

  var mirror = new THREE.Group();
  scene.add(mirror);

  // Body, raised inner molding, and a thin inner lip
  mirror.add(ring(outerShape(), arch(0.7, -1.86, 1.05, 1.62), 0.1, 0.05, goldDeep, 0));
  mirror.add(ring(arch(0.73, -1.89, 1.05, 1.66), arch(0.58, -1.74, 1.08, 1.52), 0.16, 0.06, goldBright, 0.02));
  mirror.add(ring(arch(0.585, -1.745, 1.08, 1.525), arch(0.555, -1.715, 1.08, 1.5), 0.08, 0.012, goldOrn, 0.06));

  // Mirror glass
  var glass = new THREE.Mesh(new THREE.ShapeGeometry(arch(0.565, -1.725, 1.08, 1.51), 48), glassMat);
  glass.position.z = 0.07;
  mirror.add(glass);

  // Beading rows
  function beads(path, count, radius, z) {
    var pts = path.getSpacedPoints(count);
    var inst = new THREE.InstancedMesh(new THREE.SphereGeometry(radius, 12, 10), goldBright, count);
    var d = new THREE.Object3D();
    for (var i = 0; i < count; i++) {
      d.position.set(pts[i].x, pts[i].y, z);
      d.updateMatrix();
      inst.setMatrixAt(i, d.matrix);
    }
    mirror.add(inst);
  }
  beads(arch(0.8, -1.95, 1.05, 1.74), 150, 0.02, 0.16);
  beads(arch(0.655, -1.815, 1.07, 1.59), 130, 0.014, 0.245);

  // Carved rosette
  function rosette(r, x, y, z) {
    var g = new THREE.Group();
    var petalGeo = new THREE.SphereGeometry(1, 18, 12);
    g.add(new THREE.Mesh(new THREE.SphereGeometry(r * 0.26, 18, 14), goldBright));
    for (var ringI = 0; ringI < 2; ringI++) {
      var n = ringI === 0 ? 7 : 11;
      var rad = ringI === 0 ? r * 0.42 : r * 0.78;
      for (var i = 0; i < n; i++) {
        var a = i / n * Math.PI * 2 + ringI * 0.3;
        var p = new THREE.Mesh(petalGeo, ringI === 0 ? goldBright : goldOrn);
        p.scale.set(r * 0.2, r * (ringI === 0 ? 0.3 : 0.36), r * 0.14);
        p.position.set(Math.cos(a) * rad, Math.sin(a) * rad, ringI === 0 ? r * 0.08 : -r * 0.04);
        p.rotation.z = a - Math.PI / 2;
        p.rotation.x = ringI === 0 ? -0.5 : -0.25;
        g.add(p);
      }
    }
    g.position.set(x, y, z);
    mirror.add(g);
    return g;
  }

  // Scallop shell
  function shell(scale, x, y, z, flip) {
    var g = new THREE.Group();
    var rib = new THREE.SphereGeometry(1, 16, 12);
    for (var i = 0; i < 11; i++) {
      var a = -1.25 + i / 10 * 2.5;
      var m = new THREE.Mesh(rib, i % 2 ? goldOrn : goldBright);
      m.scale.set(0.045, 0.24, 0.05);
      m.position.set(Math.sin(a) * 0.2, Math.cos(a) * 0.2, Math.cos(a) * 0.03);
      m.rotation.z = -a;
      g.add(m);
    }
    var base = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), goldBright);
    base.scale.set(1.3, 0.8, 0.8);
    g.add(base);
    g.scale.setScalar(scale);
    if (flip) g.rotation.z = Math.PI;
    g.position.set(x, y, z);
    mirror.add(g);
  }

  // C-scroll
  function scroll(size, x, y, z, dir, rot) {
    var pts = [];
    for (var t = 0; t <= 1.0001; t += 0.04) {
      var a = t * Math.PI * 2.6;
      var rr = size * (1 - t * 0.78);
      pts.push(new THREE.Vector3(dir * Math.cos(a) * rr, Math.sin(a) * rr + (1 - t) * size * 0.9, 0));
    }
    var tube = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 90, size * 0.11, 12, false),
      goldOrn
    );
    tube.position.set(x, y, z);
    tube.rotation.z = rot || 0;
    mirror.add(tube);
  }

  // Acanthus leaf spray
  function leaves(x, y, z, dir, count, rot) {
    var g = new THREE.Group();
    var geo = new THREE.SphereGeometry(1, 14, 10);
    for (var i = 0; i < count; i++) {
      var m = new THREE.Mesh(geo, i % 2 ? goldOrn : goldBright);
      m.scale.set(0.035, 0.12 - i * 0.006, 0.025);
      m.position.set(dir * i * 0.035, -i * 0.07, 0);
      m.rotation.z = dir * (0.5 + i * 0.12);
      g.add(m);
    }
    g.position.set(x, y, z);
    g.rotation.z = rot || 0;
    mirror.add(g);
  }

  // Crest
  rosette(0.17, 0, 2.0, 0.19);
  rosette(0.1, 0.34, 1.83, 0.18);
  rosette(0.1, -0.34, 1.83, 0.18);
  scroll(0.15, 0.56, 1.58, 0.17, 1, 0.3);
  scroll(0.15, -0.56, 1.58, 0.17, -1, -0.3);
  leaves(0.14, 2.12, 0.2, 1, 5, -0.4);
  leaves(-0.14, 2.12, 0.2, -1, 5, 0.4);
  shell(0.75, 0, 1.6, 0.27, true);

  // Sides
  [1, -1].forEach(function (d) {
    rosette(0.085, d * 0.81, 1.2, 0.17);
    leaves(d * 0.81, 1.08, 0.18, d, 6, 0);
    rosette(0.07, d * 0.81, 0.35, 0.17);
    rosette(0.07, d * 0.81, -0.55, 0.17);
    rosette(0.09, d * 0.82, -1.25, 0.17);
    leaves(d * 0.82, -1.08, 0.18, -d, 6, Math.PI);
    scroll(0.17, d * 0.74, -1.72, 0.17, d, d * 2.6);
    rosette(0.085, d * 0.44, -1.99, 0.18);
  });

  // Base
  shell(1.05, 0, -2.0, 0.2, false);

  mirror.rotation.x = -0.05; // leaning back slightly, like a floor mirror

  // Soft floor shadow
  (function () {
    var c = document.createElement("canvas");
    c.width = 256; c.height = 64;
    var g = c.getContext("2d");
    var grd = g.createRadialGradient(128, 32, 4, 128, 32, 128);
    grd.addColorStop(0, "rgba(0,0,0,.55)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grd;
    g.fillRect(0, 0, 256, 64);
    var m = new THREE.Mesh(
      new THREE.PlaneGeometry(2.8, 0.7),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false })
    );
    m.rotation.x = -Math.PI / 2;
    m.position.set(0, -2.18, 0.1);
    scene.add(m);
  })();

  // --- Red threads of fate, wound around the frame and tied in a bow ---
  var threadMat = new THREE.MeshStandardMaterial({
    color: 0xc4001c, emissive: 0x8a0012, emissiveIntensity: 0.9, roughness: 0.55, metalness: 0
  });
  function v(x, y, z) { return new THREE.Vector3(x, y, z); }
  var threads = [];
  function thread(points, radius) {
    var geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 360, radius, 8, false);
    geo.setDrawRange(0, 0);
    var m = new THREE.Mesh(geo, threadMat);
    m.userData.total = geo.index.count;
    mirror.add(m);
    threads.push(m);
  }
  thread([
    v(-2.6, 1.5, 0.6), v(-1.05, 0.95, 0.4), v(-0.4, 0.35, 0.43), v(0, 0.05, 0.45),
    v(0.45, -0.3, 0.42), v(0.99, -0.68, 0.34), v(1.07, -0.86, 0), v(0.85, -1.0, -0.2),
    v(-0.85, -1.22, -0.2), v(-1.07, -1.34, 0.05), v(-0.97, -1.46, 0.34),
    v(-0.3, -1.62, 0.42), v(0.7, -1.7, 0.4), v(2.6, -1.35, 0.6)
  ], 0.009);
  thread([
    v(2.6, 1.85, 0.6), v(1.0, 1.25, 0.4), v(0.35, 0.4, 0.43), v(0, 0.05, 0.45),
    v(-0.5, -0.25, 0.43), v(-1.0, -0.42, 0.36), v(-1.08, -0.55, 0), v(-0.8, -0.66, -0.2),
    v(0.8, -0.8, -0.2), v(1.08, -0.9, 0.05), v(2.6, -0.5, 0.55)
  ], 0.007);

  var bow = new THREE.Group();
  function loop(d) {
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
      v(0, 0, 0), v(d * 0.08, 0.07, 0.02), v(d * 0.19, 0.08, 0.03),
      v(d * 0.22, 0.0, 0.02), v(d * 0.17, -0.07, 0.0), v(d * 0.07, -0.04, 0.0), v(0, 0, 0)
    ], true), 60, 0.011, 8, true);
  }
  function tail(d) {
    return new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
      v(0, 0, 0), v(d * 0.04, -0.1, 0.02), v(d * 0.05, -0.2, 0.0), v(d * 0.1, -0.3, 0.03)
    ]), 40, 0.009, 8, false);
  }
  bow.add(new THREE.Mesh(loop(1), threadMat));
  bow.add(new THREE.Mesh(loop(-1), threadMat));
  bow.add(new THREE.Mesh(tail(1), threadMat));
  bow.add(new THREE.Mesh(tail(-1), threadMat));
  bow.add(new THREE.Mesh(new THREE.SphereGeometry(0.028, 16, 12), threadMat));
  bow.position.set(0, 0.05, 0.46);
  bow.scale.setScalar(0.001);
  mirror.add(bow);

  // --- Sizing ---
  function resize() {
    var r = stage.getBoundingClientRect();
    var w = Math.max(1, r.width), h = Math.max(1, r.height);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    var tanHalf = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    var dist = Math.max(2.4 / tanHalf, (1.25 / camera.aspect) / tanHalf);
    camera.position.set(0, 0.05, dist);
    camera.lookAt(0, 0.02, 0);
    camera.updateProjectionMatrix();
  }
  if (window.ResizeObserver) new ResizeObserver(resize).observe(stage);
  window.addEventListener("resize", resize);
  resize();

  // Gentle tilt toward the pointer so the gold catches the light
  var tx = 0, ty = 0;
  window.addEventListener("pointermove", function (e) {
    tx = (e.clientX / window.innerWidth - 0.5) * 0.5;
    ty = (e.clientY / window.innerHeight - 0.5) * 0.2;
  });

  stage.classList.add("has-3d");

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var clock = new THREE.Clock();
  var start = null;

  function frame() {
    var t = clock.getElapsedTime();
    if (start === null && document.getElementById("story").classList.contains("visible")) start = t;

    var sway = reduce ? 0 : Math.sin(t * 0.35) * 0.18;
    mirror.rotation.y += ((sway + tx) - mirror.rotation.y) * 0.04;
    mirror.rotation.x += ((-0.05 + ty) - mirror.rotation.x) * 0.04;
    mirror.position.y = reduce ? 0 : Math.sin(t * 0.8) * 0.015;

    glint.position.set(Math.sin(t * 0.5) * 2.5, 1.5 + Math.cos(t * 0.4) * 1.2, 3);

    if (start !== null) {
      var p = reduce ? 1 : Math.min(1, Math.max(0, (t - start - 0.8) / 4));
      var eased = 1 - Math.pow(1 - p, 3);
      for (var i = 0; i < threads.length; i++) {
        var count = Math.floor(threads[i].userData.total * eased / 3) * 3;
        threads[i].geometry.setDrawRange(0, count);
      }
      var b = reduce ? 1 : Math.min(1, Math.max(0, (t - start - 4.4) / 0.8));
      bow.scale.setScalar(0.001 + b * (1 - 0.001));
    }

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
</script>

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

  // Show the title, mirror and threads right away instead of waiting for the song
  requestAnimationFrame(function () {
    story.classList.add("visible");
  });

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
<!-- ===== THEME: real-looking petals, gilded mirror, red string of fate ===== -->
<style>
#petalCanvas, .mirror-stage > svg.mirror, #mirrorCanvas { display: none !important; }
#petalsReal { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 3; }
#fateThread { position: fixed; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 4; overflow: visible; }
.mirror-real { width: 100%; max-width: 380px; height: auto; max-height: 560px; overflow: visible;
  filter: drop-shadow(0 26px 30px rgba(20,0,8,.55)); transition: transform .6s cubic-bezier(.2,.8,.2,1); }
.mirror-real .sheen { animation: mrSheen 9s ease-in-out infinite; }
@keyframes mrSheen { 0%, 60% { transform: translateX(-260px) skewX(-18deg); } 100% { transform: translateX(260px) skewX(-18deg); } }
.mirror-real .flicker { animation: mrFlicker 3.4s ease-in-out infinite alternate; }
@keyframes mrFlicker { 0% { opacity: .78; } 45% { opacity: 1; } 70% { opacity: .86; } 100% { opacity: .96; } }
@media (prefers-reduced-motion: reduce) { #petalsReal { display: none; } .mirror-real .sheen, .mirror-real .flicker { animation: none; } }
</style>

<canvas id="petalsReal" aria-hidden="true"></canvas>
<svg id="fateThread" aria-hidden="true">
  <defs>
    <filter id="ftGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.2" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <g filter="url(#ftGlow)">
    <path id="ftBase" fill="none" stroke="#a8001a" stroke-width="2.4" stroke-linecap="round" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
    <path id="ftTwist" fill="none" stroke="#ff4d63" stroke-width="1.1" stroke-linecap="round" stroke-dasharray="1.4 2.6" opacity="0"/>
    <path id="ftShine" fill="none" stroke="#ffd0d6" stroke-width=".55" stroke-linecap="round" opacity="0"/>
    <g id="ftKnotA" opacity="0"></g>
    <g id="ftKnotB" opacity="0"></g>
  </g>
</svg>

<script>
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var NS = "http://www.w3.org/2000/svg";

  /* 1. Gilded floor mirror */
  var stage = document.getElementById("mirrorStage");
  if (stage) {
    var M = [
      '<svg class="mirror-real" viewBox="0 0 300 660" role="img" aria-label="An antique gilded floor mirror">',
      '<defs>',
      '<linearGradient id="mrGold" x1="0" y1="0" x2="1" y2="1">',
      '<stop offset="0" stop-color="#fbe5a6"/><stop offset=".22" stop-color="#d8a648"/><stop offset=".45" stop-color="#8f5e1f"/>',
      '<stop offset=".62" stop-color="#e7bf6a"/><stop offset=".82" stop-color="#9c6a24"/><stop offset="1" stop-color="#f0cf7e"/></linearGradient>',
      '<filter id="mrRelief" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB">',
      '<feGaussianBlur in="SourceAlpha" stdDeviation="1.6" result="h"/>',
      '<feDiffuseLighting in="h" surfaceScale="4" diffuseConstant="1.15" lighting-color="#ffe6b0" result="d"><feDistantLight azimuth="235" elevation="48"/></feDiffuseLighting>',
      '<feComposite in="d" in2="SourceAlpha" operator="in" result="d2"/>',
      '<feBlend in="SourceGraphic" in2="d2" mode="multiply" result="lit"/>',
      '<feSpecularLighting in="h" surfaceScale="5" specularConstant="1.25" specularExponent="26" lighting-color="#fff6dc" result="s"><fePointLight x="-60" y="-120" z="260"/></feSpecularLighting>',
      '<feComposite in="s" in2="SourceAlpha" operator="in" result="s2"/>',
      '<feComposite in="lit" in2="s2" operator="arithmetic" k1="0" k2="1" k3=".85" k4="0"/>',
      '</filter>',
      '<filter id="mrSoft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="2.6"/></filter>',
      '<filter id="mrBokeh" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.4"/></filter>',
      '<radialGradient id="mrSilver" cx="50%" cy="45%" r="70%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#1d2a22" stop-opacity=".42"/></radialGradient>',
      '<linearGradient id="mrRoom" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2e6cf"/><stop offset=".55" stop-color="#e2cfab"/><stop offset=".78" stop-color="#b99a6c"/><stop offset="1" stop-color="#7d5d3a"/></linearGradient>',
      '<linearGradient id="mrWin" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fffdf4"/><stop offset="1" stop-color="#f7e7c2"/></linearGradient>',
      '<linearGradient id="mrSheenG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>',
      '<radialGradient id="mrGlow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff4cf" stop-opacity=".95"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>',
      '<clipPath id="mrGlass"><path d="M78 590 V214 C78 147 108 124 150 124 C192 124 222 147 222 214 V590 Q222 604 208 604 H92 Q78 604 78 590 Z"/></clipPath>',
      '</defs>',
      '<ellipse cx="150" cy="648" rx="120" ry="9" fill="#000" opacity=".4" filter="url(#mrSoft)"/>',
      '<g clip-path="url(#mrGlass)">',
      '<rect x="70" y="100" width="160" height="520" fill="url(#mrRoom)"/>',
      '<g filter="url(#mrSoft)">',
      '<path d="M96 360 V250 Q96 214 122 206 Q148 214 148 250 V360 Z" fill="url(#mrWin)"/>',
      '<path d="M100 356 V252 Q100 220 122 213 Q144 220 144 252 V356 Z" fill="#fffef8" opacity=".9"/>',
      '<rect x="160" y="230" width="58" height="150" fill="#d9c39c" opacity=".55"/>',
      '<rect x="84" y="440" width="132" height="70" rx="16" fill="#eadfca" opacity=".8"/>',
      '<rect x="92" y="420" width="44" height="40" rx="12" fill="#f3eadb"/><rect x="164" y="420" width="44" height="40" rx="12" fill="#f3eadb"/>',
      '<ellipse cx="150" cy="520" rx="52" ry="9" fill="#c9b18a" opacity=".7"/>',
      '<rect x="104" y="526" width="4" height="40" fill="#a98450"/><rect x="192" y="526" width="4" height="40" fill="#a98450"/>',
      '<path d="M138 500 Q150 470 162 500 Z" fill="#dfe8d6" opacity=".8"/><circle cx="150" cy="468" r="16" fill="#f6f1e2" opacity=".9"/>',
      '<rect x="70" y="566" width="160" height="44" fill="#8a6a44" opacity=".55"/>',
      '</g>',
      '<g class="flicker">',
      '<ellipse cx="150" cy="232" rx="54" ry="40" fill="url(#mrGlow)" opacity=".7"/>',
      '<g fill="#fff3cf" filter="url(#mrBokeh)">',
      '<circle cx="120" cy="226" r="3.2"/><circle cx="135" cy="220" r="3.2"/><circle cx="150" cy="216" r="3.4"/><circle cx="165" cy="220" r="3.2"/><circle cx="180" cy="226" r="3.2"/>',
      '<circle cx="128" cy="244" r="2.2"/><circle cx="150" cy="248" r="2.4"/><circle cx="172" cy="244" r="2.2"/>',
      '<circle cx="138" cy="258" r="1.6"/><circle cx="150" cy="262" r="1.8"/><circle cx="162" cy="258" r="1.6"/>',
      '</g>',
      '<path d="M150 150 V212" stroke="#b58a46" stroke-width="1" opacity=".6"/>',
      '</g>',
      '<rect x="70" y="100" width="160" height="520" fill="url(#mrSilver)"/>',
      '<g opacity=".18" fill="#3b2a18" filter="url(#mrSoft)"><circle cx="96" cy="560" r="6"/><circle cx="210" cy="300" r="4"/><circle cx="200" cy="585" r="7"/><circle cx="88" cy="190" r="4"/></g>',
      '<rect class="sheen" x="40" y="80" width="70" height="560" fill="url(#mrSheenG)"/>',
      '</g>',
      '<path d="M78 590 V214 C78 147 108 124 150 124 C192 124 222 147 222 214 V590 Q222 604 208 604 H92 Q78 604 78 590 Z" fill="none" stroke="#1b0c04" stroke-width="5" opacity=".55" filter="url(#mrSoft)"/>',
      '<g id="mrFrame" filter="url(#mrRelief)" fill="url(#mrGold)">',
      '<path fill-rule="evenodd" d="M44 600 V206 C44 110 105 88 150 88 C195 88 256 110 256 206 V600 Q256 630 226 632 H74 Q44 630 44 600 Z',
      ' M78 590 V214 C78 147 108 124 150 124 C192 124 222 147 222 214 V590 Q222 604 208 604 H92 Q78 604 78 590 Z"/>',
      '</g>',
      '</svg>'
    ].join("");
    stage.insertAdjacentHTML("beforeend", M);
    var svg = stage.querySelector(".mirror-real");
    var frame = svg.querySelector("#mrFrame");
    function el(tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }

    frame.appendChild(el("path", { d: "M52 598 V207 C52 117 110 96 150 96 C190 96 248 117 248 207 V598 Q248 622 224 624 H76 Q52 622 52 598 Z", fill: "none", stroke: "url(#mrGold)", "stroke-width": "4" }));
    frame.appendChild(el("path", { d: "M70 592 V212 C70 141 104 116 150 116 C196 116 230 141 230 212 V592 Q230 610 212 611 H88 Q70 610 70 592 Z", fill: "none", stroke: "url(#mrGold)", "stroke-width": "3.2" }));

    var guide = el("path", { d: "M62 594 V210 C62 130 107 106 150 106 C193 106 238 130 238 210 V594 Q238 616 218 617 H82 Q62 616 62 594 Z" });
    svg.appendChild(guide);
    var L = guide.getTotalLength();
    for (var i = 0; i < 150; i++) {
      var p = guide.getPointAtLength(i / 150 * L);
      frame.appendChild(el("circle", { cx: p.x.toFixed(1), cy: p.y.toFixed(1), r: "2.1" }));
    }
    guide.remove();

    function rosette(cx, cy, r) {
      var g = el("g", {});
      for (var k = 0; k < 8; k++) {
        var a = k / 8 * Math.PI * 2, ex = cx + Math.cos(a) * r * .62, ey = cy + Math.sin(a) * r * .62;
        g.appendChild(el("ellipse", { cx: ex.toFixed(1), cy: ey.toFixed(1), rx: (r * .42).toFixed(1), ry: (r * .26).toFixed(1), transform: "rotate(" + (a * 180 / Math.PI).toFixed(0) + " " + ex.toFixed(1) + " " + ey.toFixed(1) + ")" }));
      }
      g.appendChild(el("circle", { cx: cx, cy: cy, r: (r * .34).toFixed(1) }));
      frame.appendChild(g);
    }
    function leaf(x, y, len, ang, w) {
      frame.appendChild(el("path", { d: "M0 0 C" + (len * .3) + " " + (-w) + " " + (len * .75) + " " + (-w * .8) + " " + len + " 0 C" + (len * .75) + " " + (w * .5) + " " + (len * .3) + " " + (w * .7) + " 0 0 Z", transform: "translate(" + x + " " + y + ") rotate(" + ang + ")" }));
    }
    function scroll(x, y, s, flip) {
      frame.appendChild(el("path", { d: "M0 0 C" + 14 * s + " " + (-2 * s) + " " + 20 * s + " " + 10 * s + " " + 10 * s + " " + 14 * s + " C" + 3 * s + " " + 16 * s + " 0 " + 9 * s + " " + 5 * s + " " + 7 * s, fill: "none", stroke: "url(#mrGold)", "stroke-width": (3.4 * s).toFixed(1), "stroke-linecap": "round", transform: "translate(" + x + " " + y + ") scale(" + (flip ? -1 : 1) + " 1)" }));
    }
    rosette(150, 66, 15); rosette(118, 82, 9); rosette(182, 82, 9);
    leaf(150, 52, 30, -150, 8); leaf(150, 52, 30, -30, 8); leaf(150, 40, 18, -90, 6);
    leaf(130, 70, 26, 200, 7); leaf(170, 70, 26, -20, 7);
    scroll(100, 96, 1.2, true); scroll(200, 96, 1.2, false);
    [210, 330, 450, 560].forEach(function (y, k) {
      var r = k === 0 || k === 3 ? 8 : 6.5;
      rosette(48, y, r); rosette(252, y, r);
      leaf(48, y + 10, 20, 100, 5); leaf(252, y + 10, 20, 80, 5);
      leaf(48, y - 10, 20, -100, 5); leaf(252, y - 10, 20, -80, 5);
    });
    for (var j = 0; j < 9; j++) {
      var a2 = Math.PI + (j / 8) * Math.PI, sx2 = 150 + Math.cos(a2) * 15, sy2 = 630 + Math.sin(a2) * 15;
      frame.appendChild(el("ellipse", { cx: sx2.toFixed(1), cy: sy2.toFixed(1), rx: "5", ry: "13", transform: "rotate(" + ((a2 * 180 / Math.PI) + 90).toFixed(0) + " " + sx2.toFixed(1) + " " + sy2.toFixed(1) + ")" }));
    }
    frame.appendChild(el("ellipse", { cx: 150, cy: 634, rx: 11, ry: 7 }));
    scroll(112, 620, 1, true); scroll(188, 620, 1, false);
    leaf(124, 636, 26, 170, 6); leaf(176, 636, 26, 10, 6);

    if (!reduce) {
      window.addEventListener("pointermove", function (e) {
        var x = (e.clientX / window.innerWidth - .5), y = (e.clientY / window.innerHeight - .5);
        svg.style.transform = "perspective(900px) rotateY(" + (x * 7).toFixed(2) + "deg) rotateX(" + (-y * 4).toFixed(2) + "deg)";
      });
    }
  }

  /* 2. Rose petals */
  (function () {
    if (reduce) return;
    var cv = document.getElementById("petalsReal"); if (!cv) return;
    var ctx = cv.getContext("2d"), dpr = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0;
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function petalPath(g, w, h, j) {
      g.beginPath();
      g.moveTo(w * .5, h * .98);
      g.bezierCurveTo(w * (.18 + j[0]), h * .9, w * .02, h * (.62 + j[1]), w * .05, h * .36);
      g.bezierCurveTo(w * .08, h * .1, w * (.3 + j[2]), h * .02, w * .44, h * (.08 + j[3]));
      g.quadraticCurveTo(w * .5, h * .12, w * .56, h * (.07 + j[3]));
      g.bezierCurveTo(w * (.72 - j[2]), h * .01, w * .94, h * .12, w * .95, h * .38);
      g.bezierCurveTo(w * .98, h * (.64 - j[1]), w * (.8 - j[0]), h * .9, w * .5, h * .98);
      g.closePath();
    }
    function makePetal(back) {
      var w = 120, h = 150, c = document.createElement("canvas"); c.width = w; c.height = h; var g = c.getContext("2d");
      var j = [rnd(-.06, .06), rnd(-.06, .06), rnd(-.06, .06), rnd(-.03, .03)];
      petalPath(g, w, h, j); g.save(); g.clip();
      var body = g.createLinearGradient(0, h, 0, 0);
      if (back) { body.addColorStop(0, "#c98a3a"); body.addColorStop(.18, "#7a0814"); body.addColorStop(1, "#8e0b18"); }
      else { body.addColorStop(0, "#f2c25a"); body.addColorStop(.1, "#d4502a"); body.addColorStop(.22, "#b80d1d"); body.addColorStop(.7, "#c8142a"); body.addColorStop(1, "#a50a18"); }
      g.fillStyle = body; g.fillRect(0, 0, w, h);
      var glow = g.createRadialGradient(w * rnd(.35, .6), h * rnd(.3, .5), 4, w * .5, h * .45, w * .75);
      glow.addColorStop(0, back ? "rgba(255,60,70,.12)" : "rgba(255,95,95,.32)"); glow.addColorStop(1, "rgba(255,60,60,0)");
      g.fillStyle = glow; g.fillRect(0, 0, w, h);
      var side = g.createLinearGradient(0, 0, w, 0);
      side.addColorStop(0, "rgba(40,0,6,.45)"); side.addColorStop(.25, "rgba(40,0,6,0)"); side.addColorStop(.75, "rgba(255,170,170,0)"); side.addColorStop(1, back ? "rgba(255,150,150,.08)" : "rgba(255,190,190,.28)");
      g.fillStyle = side; g.fillRect(0, 0, w, h);
      for (var v = 0; v < 26; v++) {
        var tx = rnd(4, w - 4);
        g.strokeStyle = "rgba(80,0,10," + rnd(.06, .15).toFixed(2) + ")"; g.lineWidth = rnd(.5, 1.1);
        g.beginPath(); g.moveTo(w * .5 + rnd(-4, 4), h - 4); g.quadraticCurveTo((w * .5 + tx) / 2 + rnd(-14, 14), h * .55, tx, rnd(6, 40)); g.stroke();
      }
      for (var k = 0; k < 2200; k++) { g.fillStyle = Math.random() < .5 ? "rgba(255,120,120,.06)" : "rgba(50,0,6,.08)"; g.fillRect(rnd(0, w), rnd(0, h), 1, 1); }
      g.lineWidth = 9; g.strokeStyle = "rgba(60,0,8,.35)"; petalPath(g, w, h, j); g.stroke();
      g.fillStyle = "rgba(70,0,10," + rnd(0, .18).toFixed(2) + ")"; g.beginPath(); g.ellipse(w * rnd(.3, .7), h * .1, w * .2, h * .06, 0, 0, Math.PI * 2); g.fill();
      g.restore();
      return c;
    }
    function blurred(src, px) { var c = document.createElement("canvas"); c.width = src.width + px * 6; c.height = src.height + px * 6; var g = c.getContext("2d"); g.filter = "blur(" + px + "px)"; g.drawImage(src, px * 3, px * 3); return c; }
    var kinds = [];
    for (var n = 0; n < 6; n++) { var f = makePetal(false), b = makePetal(true); kinds.push({ f: [blurred(f, 2.4), f, blurred(f, 3.4)], b: [blurred(b, 2.4), b, blurred(b, 3.4)] }); }
    var petals = [];
    function spawn(p, anywhere) {
      p.z = Math.random(); p.layer = p.z < .3 ? 0 : p.z > .88 ? 2 : 1;
      p.size = p.layer === 0 ? rnd(14, 22) : p.layer === 2 ? rnd(46, 64) : rnd(24, 36);
      p.x = rnd(-40, W + 40); p.y = anywhere ? rnd(-H * .1, H) : rnd(-140, -40);
      p.vy = (p.layer === 0 ? rnd(18, 30) : p.layer === 2 ? rnd(60, 90) : rnd(32, 55));
      p.sw = rnd(18, 55) * (p.layer + 1) * .6; p.sf = rnd(.4, 1.1); p.ph = rnd(0, 6.28);
      p.rot = rnd(0, 6.28); p.vr = rnd(-1, 1); p.fl = rnd(0, 6.28); p.vf = rnd(.8, 2.4) * (Math.random() < .5 ? -1 : 1);
      p.k = kinds[(Math.random() * kinds.length) | 0];
      p.alpha = p.layer === 0 ? .7 : 1;
    }
    function resize() { W = window.innerWidth; H = window.innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    window.addEventListener("resize", resize); resize();
    var count = W < 700 ? 22 : 40;
    for (var i = 0; i < count; i++) { var p = {}; spawn(p, true); petals.push(p); }
    petals.sort(function (a, b) { return a.z - b.z; });
    var last = performance.now(), t = 0;
    function frame(now) {
      var dt = Math.min((now - last) / 1000, .05); last = now; t += dt;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < petals.length; i++) {
        var p = petals[i];
        p.fl += p.vf * dt; p.rot += p.vr * dt;
        var flat = Math.abs(Math.cos(p.fl));
        p.y += p.vy * (.55 + .45 * flat) * dt;
        var x = p.x + Math.sin(t * p.sf + p.ph) * p.sw;
        if (p.y > H + 80) spawn(p, false);
        var sx = Math.cos(p.fl), img = sx >= 0 ? p.k.f[p.layer] : p.k.b[p.layer], s = p.size / 120;
        ctx.save();
        ctx.globalAlpha = p.alpha * (.75 + .25 * flat);
        ctx.translate(x, p.y); ctx.rotate(p.rot);
        ctx.scale(Math.max(.12, Math.abs(sx)) * s, (.85 + .15 * Math.sin(p.fl * .7)) * s);
        ctx.drawImage(img, -img.width / 2, -img.height / 2);
        ctx.restore();
      }
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();

  /* 3. The red string of fate */
  (function () {
    var base = document.getElementById("ftBase"), twist = document.getElementById("ftTwist"), shine = document.getElementById("ftShine");
    var kA = document.getElementById("ftKnotA"), kB = document.getElementById("ftKnotB");
    var card = document.querySelector(".login-card");
    if (!base || !card || !stage) return;
    function knot(g) {
      g.innerHTML = '<ellipse rx="6.5" ry="3.6" fill="none" stroke="#a8001a" stroke-width="2.2"/>' +
        '<ellipse rx="6.5" ry="3.6" fill="none" stroke="#ff7b8c" stroke-width=".6" stroke-dasharray="1.4 2.4"/>' +
        '<path d="M5 1 q6 4 9 11" fill="none" stroke="#a8001a" stroke-width="1.8" stroke-linecap="round"/>' +
        '<path d="M4 2 q2 6 0 12" fill="none" stroke="#a8001a" stroke-width="1.6" stroke-linecap="round"/>' +
        '<circle r="2.4" fill="#8a0015"/>';
    }
    knot(kA); knot(kB);
    function ends() {
      var c = card.getBoundingClientRect(), m = (stage.querySelector(".mirror-real") || stage).getBoundingClientRect();
      var stacked = c.top > m.bottom - 10;
      var a = stacked ? { x: c.left + c.width * .5, y: c.top + 14 } : { x: c.left + c.width * .5, y: c.bottom - 16 };
      var b = { x: m.left + m.width * .5, y: m.top + m.height * .72 };
      return [a, b, stacked];
    }
    var t0 = performance.now();
    function frame(now) {
      var t = (now - t0) / 1000, e = ends(), a = e[0], b = e[1];
      var dx = b.x - a.x, dy = b.y - a.y, dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var sag = Math.min(160, dist * .32), sway = reduce ? 0 : Math.sin(t * .9) * 10, sway2 = reduce ? 0 : Math.cos(t * .7) * 8;
      var c1, c2;
      if (e[2]) {
        var side = Math.min(window.innerWidth * .32, 120);
        c1 = { x: a.x - side + sway, y: a.y - Math.abs(dy) * .25 + sway2 };
        c2 = { x: b.x - side * .8 - sway, y: b.y + Math.abs(dy) * .35 - sway2 };
      } else {
        c1 = { x: a.x + dx * .28 + sway2, y: Math.max(a.y, b.y) + sag + sway };
        c2 = { x: a.x + dx * .72 - sway2, y: Math.max(a.y, b.y) + sag * .8 - sway };
      }
      var d = "M" + a.x.toFixed(1) + " " + a.y.toFixed(1) + " C" + c1.x.toFixed(1) + " " + c1.y.toFixed(1) + " " + c2.x.toFixed(1) + " " + c2.y.toFixed(1) + " " + b.x.toFixed(1) + " " + b.y.toFixed(1);
      base.setAttribute("d", d); twist.setAttribute("d", d); shine.setAttribute("d", d);
      shine.setAttribute("transform", "translate(0 -0.7)");
      kA.setAttribute("transform", "translate(" + a.x.toFixed(1) + " " + a.y.toFixed(1) + ") rotate(-18)");
      kB.setAttribute("transform", "translate(" + b.x.toFixed(1) + " " + b.y.toFixed(1) + ") rotate(16)");
      var k = reduce ? 1 : Math.min(1, Math.max(0, (t - .8) / 3.4)), eased = 1 - Math.pow(1 - k, 3);
      base.setAttribute("stroke-dashoffset", (1 - eased).toFixed(4));
      kA.setAttribute("opacity", Math.min(1, t * 1.5).toFixed(2));
      var after = Math.min(1, Math.max(0, (t - 4.2) / 1));
      twist.setAttribute("opacity", (after * .75).toFixed(2)); shine.setAttribute("opacity", (after * .45).toFixed(2)); kB.setAttribute("opacity", after.toFixed(2));
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  })();
})();
</script>
<!-- ===== END THEME ===== -->
</body>
</html>`;

export { DIMPOO_LOGIN_PAGE };
