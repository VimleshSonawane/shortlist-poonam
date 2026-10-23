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

/* Falling petals */
.petals {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.petal {
  position: absolute;
  top: -40px;
  left: var(--x);
  width: var(--s);
  height: calc(var(--s) * 1.25);
  border-radius: 150% 0 150% 0;
  background: linear-gradient(135deg, #f4a7b6, #c2405e 80%);
  opacity: .75;
  animation:
    fall var(--d) linear infinite,
    sway 3.4s ease-in-out infinite alternate;
  animation-delay: var(--delay), var(--delay);
}

@keyframes fall {
  from { transform: translateY(-40px) rotate(0deg); }
  to   { transform: translateY(110vh) rotate(540deg); }
}

@keyframes sway {
  from { margin-left: -18px; }
  to   { margin-left: 18px; }
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
  background:
    linear-gradient(
      180deg,
      rgba(59,13,28,.05) 10%,
      rgba(59,13,28,.25) 45%,
      rgba(59,13,28,.92) 100%
    ),
    url("/mirror-red-thread.png") center center / cover no-repeat,
    linear-gradient(160deg, #7a1f3d, var(--wine));
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

.story-copy {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 30px 28px 38px;
  text-align: center;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(59,13,28,.86) 28%,
    rgba(59,13,28,.96)
  );
}

.bloom {
  width: 96px;
  height: 96px;
  margin: 0 auto 6px;
  display: block;
  transform: scale(.4) rotate(-40deg);
  opacity: 0;
  transition: transform 2.2s cubic-bezier(.2,.8,.2,1) .4s, opacity 1.6s ease .4s;
}

.story.visible .bloom {
  transform: scale(1) rotate(0deg);
  opacity: 1;
}

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
  margin: 20px auto 16px;
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
    min-height: 520px;
    border-radius: 160px 160px 24px 24px;
  }

  .login-card { max-width: 460px; }

  .vine { width: 120px; }
}

@media (max-width: 420px) {
  .story { min-height: 450px; }
  .story-copy { padding: 24px 16px 28px; }
  .login-card { padding: 34px 20px 28px; }
  .card-rose { width: 72px; height: 72px; right: -8px; }
}

@media (prefers-reduced-motion: reduce) {
  .petal { display: none; }
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

<div class="petals" aria-hidden="true">
  <span class="petal" style="--x:6%;  --s:14px; --d:13s; --delay:0s"></span>
  <span class="petal" style="--x:18%; --s:10px; --d:16s; --delay:4s"></span>
  <span class="petal" style="--x:31%; --s:16px; --d:12s; --delay:8s"></span>
  <span class="petal" style="--x:44%; --s:11px; --d:18s; --delay:2s"></span>
  <span class="petal" style="--x:58%; --s:15px; --d:14s; --delay:6s"></span>
  <span class="petal" style="--x:71%; --s:12px; --d:17s; --delay:10s"></span>
  <span class="petal" style="--x:83%; --s:17px; --d:13s; --delay:3s"></span>
  <span class="petal" style="--x:94%; --s:10px; --d:15s; --delay:7s"></span>
</div>

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

    <div class="story-copy">
      <svg class="bloom" aria-hidden="true"><use href="#rose"/></svg>
      <h1>You Are<br>My Mirror</h1>
      <svg class="stem-divider" viewBox="0 0 180 22" aria-hidden="true">
        <path d="M4 11 H176" stroke="#e9c58f" stroke-width="1.2" stroke-linecap="round" opacity=".7"/>
        <path d="M62 11 C70 2 80 2 84 9 C76 12 68 13 62 11 Z" fill="#7d9b6e"/>
        <path d="M118 11 C110 20 100 20 96 13 C104 10 112 9 118 11 Z" fill="#7d9b6e"/>
        <use href="#rose" x="79" y="0" width="22" height="22"/>
      </svg>
      <div class="lyrics-area" id="lyrics" aria-live="polite"></div>
    </div>
  </section>

  <section class="login-card">
    <svg class="card-rose" aria-hidden="true"><use href="#rose"/></svg>

    <h2 class="card-title">Welcome back</h2>
    <p class="card-intro">
      A little garden made with love. Sign in to continue.
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
