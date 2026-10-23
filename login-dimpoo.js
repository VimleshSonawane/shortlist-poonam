
const DIMPOO_LOGIN_PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#160d1d">
<title>You Are My Mirror</title>

<style>
:root {
  --pink: #f49ab9;
  --rose: #ffb7cb;
  --cream: #fff3f6;
  --muted: #d5c0d2;
  --night: #160d1d;
}

* { box-sizing: border-box; }

html, body {
  margin: 0;
  min-height: 100%;
  width: 100%;
}

body {
  min-height: 100vh;
  color: var(--cream);
  font-family: Georgia, "Times New Roman", serif;
  background:
    radial-gradient(ellipse at 12% 20%, #49213d, transparent 42%),
    radial-gradient(ellipse at 90% 80%, #29204d, transparent 45%),
    var(--night);
  overflow-x: hidden;
}

.ambient {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.star {
  position: absolute;
  color: #ffd3e0;
  opacity: .5;
  animation: twinkle 3s ease-in-out infinite alternate;
}

.star:nth-child(1) { top: 12%; left: 8%; }
.star:nth-child(2) { top: 22%; left: 48%; animation-delay: 1s; }
.star:nth-child(3) { top: 70%; left: 12%; animation-delay: .6s; }
.star:nth-child(4) { top: 16%; right: 8%; animation-delay: 1.4s; }
.star:nth-child(5) { top: 83%; right: 17%; animation-delay: .3s; }

@keyframes twinkle {
  from { opacity: .2; transform: scale(.8); }
  to { opacity: .9; transform: scale(1.3); }
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

/* Left side: only the song title and its lyrics */
.story {
  position: relative;
  min-width: 0;
  min-height: 650px;
  overflow: hidden;
  border: 1px solid rgba(255,183,203,.18);
  border-radius: 24px;
  background:
    linear-gradient(
      180deg,
      rgba(17,8,22,.04) 10%,
      rgba(17,8,22,.12) 45%,
      rgba(17,8,22,.88) 100%
    ),
    url("/mirror-red-thread.png") center center / cover no-repeat,
    linear-gradient(145deg, #49213d, #171023);
  box-shadow: 0 24px 80px rgba(0,0,0,.35);

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

.story-copy {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 30px 24px 35px;
  text-align: center;
  background: linear-gradient(
    180deg,
    transparent,
    rgba(17,8,22,.84) 25%,
    rgba(17,8,22,.94)
  );
}

h1 {
  margin: 0;
  font-size: clamp(40px, 5vw, 67px);
  line-height: 1.08;
  font-weight: normal;
  letter-spacing: -1px;
  color: var(--rose);
  text-shadow: 0 0 25px rgba(255,145,183,.25);
}

h1 span {
  font-style: italic;
}

.thread-divider {
  width: 145px;
  height: 2px;
  position: relative;
  margin: 24px auto 18px;
  background: linear-gradient(
    90deg,
    transparent,
    #ff416d,
    #ff8bab,
    transparent
  );
  box-shadow: 0 0 12px rgba(255,65,109,.55);
}

.thread-divider::after {
  content: "♡";
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #211125;
  color: #ff8bab;
  padding: 0 10px;
  font-size: 23px;
}

.lyrics-area {
  min-height: 65px;
  color: #ffe5ed;
  font-size: clamp(16px, 2vw, 21px);
  line-height: 1.7;
  font-style: italic;
}

.lyric-line {
  animation: lyricFade 1.1s ease both;
}

@keyframes lyricFade {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Right side: existing login wording */
.login-card {
  width: 100%;
  max-width: 410px;
  justify-self: center;
  padding: 36px clamp(22px, 4vw, 34px);
  border: 1px solid rgba(255,183,203,.38);
  border-radius: 24px;
  background: linear-gradient(
    145deg,
    rgba(65,35,57,.92),
    rgba(26,17,35,.96)
  );
  box-shadow:
    0 24px 80px rgba(0,0,0,.35),
    inset 0 1px rgba(255,255,255,.06);
  backdrop-filter: blur(18px);
}

.card-heart {
  text-align: center;
  color: var(--rose);
  font-size: 32px;
  margin-bottom: 18px;
}

.card-intro {
  margin: 0 0 26px;
  color: var(--muted);
  font: 13px/1.8 Arial, sans-serif;
  text-align: center;
}

label {
  display: block;
  color: #f1dce8;
  font: 12px Arial, sans-serif;
  margin: 18px 0 9px;
}

input {
  display: block;
  width: 100%;
  min-height: 49px;
  padding: 13px 15px;
  border-radius: 11px;
  border: 1px solid rgba(255,183,203,.3);
  outline: none;
  color: white;
  background: rgba(255,255,255,.045);
  font: 14px Arial, sans-serif;
}

input::placeholder { color: #b8a4b5; }

input:focus {
  border-color: var(--rose);
  box-shadow: 0 0 0 3px rgba(244,154,185,.12);
}

button {
  width: 100%;
  min-height: 50px;
  border: none;
  border-radius: 11px;
  margin-top: 25px;
  background: linear-gradient(110deg, #ffb5ca, #f18aab);
  color: #341726;
  font: bold 14px Arial, sans-serif;
  cursor: pointer;
  box-shadow: 0 7px 25px rgba(241,138,171,.15);
  transition: transform .2s, filter .2s;
}

button:hover {
  transform: translateY(-2px);
  filter: brightness(1.07);
}

button:disabled {
  opacity: .7;
  cursor: wait;
}

.message {
  min-height: 20px;
  margin-top: 14px;
  color: #ffb1c7;
  font: 12px/1.5 Arial, sans-serif;
  text-align: center;
  overflow-wrap: anywhere;
}

.card-footer {
  margin-top: 26px;
  text-align: center;
  color: var(--rose);
  font-size: clamp(19px, 2.3vw, 25px);
  line-height: 1.5;
  font-style: italic;
}

.audio-hint {
  position: fixed;
  z-index: 5;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  max-width: calc(100% - 28px);
  min-height: auto;
  padding: 12px 18px;
  border: 1px solid rgba(255,183,203,.35);
  border-radius: 30px;
  background: #29182e;
  color: white;
  font: 12px Arial, sans-serif;
}

.audio-hint[hidden] { display: none; }

@media (max-width: 820px) {
  .page {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 18px 15px 75px;
  }

  .story {
    order: 1;
    min-height: 510px;
  }

  .login-card {
    order: 2;
    max-width: 460px;
  }

  h1 { font-size: clamp(39px, 9vw, 58px); }
}

@media (max-width: 420px) {
  .story { min-height: 440px; }
  .story-copy { padding: 24px 15px 28px; }
  .login-card { padding: 29px 22px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    transition-duration: .01ms !important;
  }
}
</style>
</head>

<body>
<div class="ambient" aria-hidden="true">
  <span class="star">✦</span>
  <span class="star">✧</span>
  <span class="star">✦</span>
  <span class="star">✧</span>
  <span class="star">✦</span>
</div>

<audio id="song" src="/vimlesh.mp3" preload="auto" loop playsinline></audio>

<main class="page">

  <section class="story" id="story">
    <div class="story-copy">
      <h1>You Are<br><span>My Mirror</span></h1>
      <div class="thread-divider"></div>
      <div class="lyrics-area" id="lyrics" aria-live="polite"></div>
    </div>
  </section>

  <section class="login-card">
    <div class="card-heart">♡</div>

    <p class="card-intro">
      A little space made with love.<br>
      Sign in to continue.
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

      <button id="loginButton" type="submit">Enter with love ♡</button>
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
