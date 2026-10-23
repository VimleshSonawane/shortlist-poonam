
export const DIMPOO_LOGIN_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<title>Shortlist</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Caveat:wght@600&display=swap" rel="stylesheet">
<style>
:root{--rose:#B5577D;--ink:#1F2A44;--soft:#5D6680;--rule:#E4E7EF}
*{box-sizing:border-box}
html,body{min-height:100%;margin:0}
body{min-height:100vh;display:grid;place-items:center;overflow-x:hidden;padding:24px 16px 300px;background:#fff;color:var(--ink);font:16px/1.5 "Instrument Sans",system-ui,sans-serif}
.bg{position:fixed;inset:0;pointer-events:none;z-index:-1;overflow:hidden}
.bg i{position:absolute;border-radius:50%;filter:blur(70px);opacity:.65;animation:drift 22s ease-in-out infinite alternate}
.bg i:nth-child(1){width:480px;height:480px;background:#E3E9FF;top:-120px;left:-100px}
.bg i:nth-child(2){width:420px;height:420px;background:#F6E6FF;bottom:-140px;right:-120px}
.bg i:nth-child(3){width:340px;height:340px;background:#FFE6EE;top:40%;left:55%}
@keyframes drift{to{transform:translate(35px,45px) scale(1.08)}}
.hearts{position:fixed;inset:0;pointer-events:none;z-index:-1;overflow:hidden}
.hearts span{position:absolute;bottom:-40px;opacity:0;animation:rise linear infinite}
@keyframes rise{10%{opacity:.5}100%{transform:translateY(-110vh) rotate(25deg);opacity:0}}
.card{width:min(400px,100%);background:rgba(255,255,255,.88);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--rule);border-radius:22px;padding:32px 28px 26px;box-shadow:0 24px 60px rgba(181,140,255,.18);animation:cardIn .7s ease both}
@keyframes cardIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
.brand{font:500 34px "Newsreader",Georgia,serif;margin:0 0 4px;color:#B5577D}
.sub{color:var(--soft);margin:0 0 22px;font-size:14px}
label{display:block;font-weight:600;font-size:14px;margin:14px 0 6px}
.field{display:block;width:100%;min-height:46px;padding:12px 14px;border:1px solid var(--rule);border-radius:12px;font:16px "Instrument Sans",system-ui,sans-serif;color:var(--ink);background:#fff;appearance:none;-webkit-appearance:none;pointer-events:auto;user-select:text;-webkit-user-select:text}
.field:focus{outline:none;border-color:#D7A6FF;box-shadow:0 0 0 4px rgba(181,140,255,.18)}
button{width:100%;margin-top:22px;padding:13px;border:0;border-radius:12px;font:600 16px "Instrument Sans",system-ui,sans-serif;color:#fff;background:linear-gradient(135deg,#7A4FD6,#C2578E);box-shadow:0 8px 20px rgba(160,80,160,.24);cursor:pointer}
button:disabled{opacity:.65;cursor:wait}
.err{min-height:22px;margin:12px 0 0;color:#C2413A;font-size:14px;text-align:center}
.shake{animation:shake .4s}
@keyframes shake{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
.note{margin:24px 0 0;text-align:center;color:var(--rose)}
.because{display:block;font:italic 19px "Newsreader",Georgia,serif;color:#C48AA6}
.name{display:block;margin:2px 0;font:500 clamp(46px,12vw,60px)/1.1 "Newsreader",Georgia,serif;letter-spacing:-.02em;background:linear-gradient(110deg,#FF7AA8,#C38CFF,#7C9CFF,#FF7AA8);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shimmer 6s linear infinite}
@keyframes shimmer{to{background-position:250% 0}}
.loved{font:italic 24px "Newsreader",Georgia,serif}
.always{display:inline-block;position:relative;margin-top:10px;font:600 40px/1 "Caveat",cursive;color:#D0507F}
.heart{display:inline-block;animation:beat 1.4s ease-in-out infinite}
@keyframes beat{15%{transform:scale(1.2)}30%,100%{transform:scale(1)}}
.lyrics-panel{position:fixed;z-index:5;left:50%;bottom:max(12px,env(safe-area-inset-bottom));transform:translateX(-50%);width:min(540px,calc(100vw - 24px));height:min(250px,32vh);min-height:155px;overflow:hidden;border:1px solid #F2D5E1;border-radius:18px;background:rgba(255,255,255,.94);backdrop-filter:blur(16px);box-shadow:0 16px 45px rgba(110,55,95,.16);padding:12px 16px}
.lyrics-top{text-align:center;margin-bottom:4px;color:#B5577D;font:italic 18px "Newsreader",Georgia,serif}
.lyrics-scroll{height:calc(100% - 28px);overflow:auto;text-align:center;padding:4px 4px 18px;scroll-behavior:smooth}
.lyric-line{margin:7px 0;color:#AAA3AE;font:italic 17px/1.4 "Newsreader",Georgia,serif;transition:color .2s,transform .2s}
.lyric-line.active{color:#B5577D;transform:scale(1.02);font-weight:600}
.welcome{position:fixed;inset:0;z-index:10;display:grid;place-items:center;background:#fff;opacity:0;pointer-events:none;transition:opacity .4s;font:italic 32px "Newsreader",Georgia,serif;color:#B5577D}
.welcome.on{opacity:1}
@media(max-height:650px){body{padding-top:12px;padding-bottom:190px}.card{padding:20px 24px}.note{margin-top:12px}.lyrics-panel{height:150px}}
</style>
</head>
<body>
<div class="bg"><i></i><i></i><i></i></div>
<div class="hearts" id="hearts"></div>

<main class="card" id="card">
  <h1 class="brand">Shortlist</h1>
  <p class="sub">Sign in to continue.</p>

  <form id="login-form">
    <label for="u">Username</label>
    <input class="field" id="u" name="username" type="text"
      autocomplete="username" autocapitalize="none" autocorrect="off"
      spellcheck="false" required>

    <label for="p">Password</label>
    <input class="field" id="p" name="password" type="password"
      autocomplete="current-password" required>

    <button id="go" type="submit">Sign in</button>
    <p class="err" id="err" role="alert" aria-live="polite"></p>
  </form>

  <p class="note" aria-label="Because Dimpoo, you are loved. Always.">
    <span class="because">because</span>
    <span class="name">Dimpoo</span>
    <span class="loved">you are loved</span><br>
    <span class="always">always <span class="heart">♥</span></span>
  </p>
</main>

<audio id="song" src="/vimlesh.mp3" autoplay loop playsinline preload="auto"></audio>

<section class="lyrics-panel" id="lyrics-panel" aria-label="Song lyrics">
  <div class="lyrics-top">sing along, Dimpoo ♡</div>
  <div class="lyrics-scroll" id="lyrics-scroll">
    <p class="lyric-line">Loading lyrics…</p>
  </div>
</section>

<div class="welcome" id="welcome"></div>

<script>
(function(){
  var form = document.getElementById("login-form");
  var u = document.getElementById("u");
  var p = document.getElementById("p");
  var go = document.getElementById("go");
  var err = document.getElementById("err");
  var song = document.getElementById("song");
  var lyricsScroll = document.getElementById("lyrics-scroll");
  var lyricLines = [];
  var activeLyric = -1;

  // Keep both login fields editable and ready for typing.
  u.readOnly = false;
  p.readOnly = false;

  // Floating hearts.
  var hearts = document.getElementById("hearts");
  var symbols = ["♥","♡","✦"];
  for (var i = 0; i < 18; i++) {
    var heart = document.createElement("span");
    heart.textContent = symbols[i % symbols.length];
    heart.style.left = (Math.random() * 100) + "vw";
    heart.style.color = ["#FF9EC4","#B58CFF","#9DB0FF"][i % 3];
    heart.style.fontSize = (12 + Math.random() * 16) + "px";
    heart.style.animationDuration = (10 + Math.random() * 12) + "s";
    heart.style.animationDelay = (Math.random() * 10) + "s";
    hearts.appendChild(heart);
  }

  // Load the lyrics from the repository's public root.
  fetch("/lyrics.txt")
    .then(function(response) {
      if (!response.ok) throw new Error("Lyrics unavailable");
      return response.text();
    })
    .then(function(text) {
      lyricLines = text.split(/\\r?\\n/).map(function(line) {
        return line.trim();
      }).filter(Boolean);

      lyricsScroll.textContent = "";
      lyricLines.forEach(function(line) {
        var item = document.createElement("p");
        item.className = "lyric-line";
        item.textContent = line;
        lyricsScroll.appendChild(item);
      });
    })
    .catch(function() {
      lyricsScroll.textContent = "Lyrics could not be loaded.";
    });

  // Start the song on page load. Browsers may require a user gesture
  // before allowing sound, so retry when the visitor first interacts.
  function tryPlay() {
    var result = song.play();
    if (result && typeof result.catch === "function") {
      result.catch(function() {
        // Do not force muted playback; retry with sound after interaction.
      });
    }
  }

  tryPlay();

  function startWithSound() {
    song.muted = false;
    tryPlay();
    document.removeEventListener("pointerdown", startWithSound);
    document.removeEventListener("keydown", startWithSound);
  }

  document.addEventListener("pointerdown", startWithSound);
  document.addEventListener("keydown", startWithSound);

  // Approximate lyric highlighting across the song duration.
  song.addEventListener("timeupdate", function() {
    if (!lyricLines.length || !Number.isFinite(song.duration) || song.duration <= 0) return;

    var index = Math.min(
      lyricLines.length - 1,
      Math.floor((song.currentTime / song.duration) * lyricLines.length)
    );
    if (index === activeLyric) return;
    activeLyric = index;

    var lines = lyricsScroll.querySelectorAll(".lyric-line");
    lines.forEach(function(line, i) {
      line.classList.toggle("active", i === index);
    });

    if (lines[index]) {
      lines[index].scrollIntoView({ block: "center", behavior: "smooth" });
    }
  });

  // Authenticate through the existing middleware endpoint.
  form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (!u.value.trim() || !p.value) {
      err.textContent = "Enter your username and password.";
      return;
    }

    go.disabled = true;
    err.textContent = "";

    fetch("/__login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: u.value.trim(),
        password: p.value
      }),
      credentials: "same-origin"
    })
    .then(function(response) {
      return response.json().catch(function() { return { ok: false }; });
    })
    .then(function(result) {
      if (result.ok) {
        var name = u.value.trim();
        u.value = "";
        p.value = "";

        var welcome = document.getElementById("welcome");
        welcome.textContent = "Welcome, " +
          name.charAt(0).toUpperCase() + name.slice(1) + " ♥";
        welcome.classList.add("on");

        setTimeout(function() { window.location.replace("/"); }, 700);
      } else {
        p.value = "";
        err.textContent = "That username and password don’t match.";
        var card = document.getElementById("card");
        card.classList.remove("shake");
        void card.offsetWidth;
        card.classList.add("shake");
        go.disabled = false;
        p.focus();
      }
    })
    .catch(function() {
      err.textContent = "Couldn’t reach the server. Please try again.";
      go.disabled = false;
    });
  });
})();
</script>
</body>
</html>`;
