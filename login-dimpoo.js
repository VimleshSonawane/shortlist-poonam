
export const DIMPOO_LOGIN_PAGE = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<title>Shortlist ♡</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&family=Caveat:wght@600&display=swap" rel="stylesheet">
<style>
:root{--rose:#B5577D;--ink:#29253A;--soft:#777187;--pink:#FF83AD;--purple:#B58CFF}
*{box-sizing:border-box}
html,body{width:100%;height:100%;margin:0}
body{overflow:hidden;background:#FFFDFE;color:var(--ink);font-family:"Instrument Sans",sans-serif}
.background{position:fixed;inset:0;z-index:-3;overflow:hidden;background:linear-gradient(135deg,#FFF9FC,#F9F6FF 50%,#FFF8F5)}
.orb{position:absolute;border-radius:50%;filter:blur(75px);opacity:.65;animation:float 16s ease-in-out infinite alternate}
.orb.one{width:48vw;height:48vw;background:#E5D9FF;left:-12vw;top:-15vw}
.orb.two{width:42vw;height:42vw;background:#FFD9E8;right:8vw;bottom:-22vw;animation-delay:-4s}
.orb.three{width:25vw;height:25vw;background:#DDE6FF;left:30vw;top:20vh;animation-delay:-8s}
@keyframes float{to{transform:translate(35px,30px) scale(1.1)}}

.hearts{position:fixed;inset:0;pointer-events:none;z-index:-1;overflow:hidden}
.hearts span{position:absolute;bottom:-35px;opacity:0;animation:rise linear infinite}
@keyframes rise{10%{opacity:.5}100%{transform:translateY(-110vh) rotate(35deg);opacity:0}}

.lyrics-stage{position:absolute;left:5vw;top:50%;transform:translateY(-50%);width:min(57vw,900px);height:78vh;display:flex;flex-direction:column;justify-content:center}
.eyebrow{font-size:11px;letter-spacing:.3em;text-transform:uppercase;color:#B18AA8;margin:0 0 18px 8px}
.song-title{font:italic clamp(35px,5vw,66px)/1 "Newsreader",Georgia,serif;letter-spacing:-.035em;margin:0 0 18px 5px;background:linear-gradient(100deg,#B5577D,#A184E8,#E68DAF);background-clip:text;-webkit-background-clip:text;color:transparent}
.lyrics-window{position:relative;overflow:hidden;height:min(56vh,590px);mask-image:linear-gradient(transparent,#000 12%,#000 86%,transparent);-webkit-mask-image:linear-gradient(transparent,#000 12%,#000 86%,transparent)}
.lyrics-scroll{height:100%;overflow-y:auto;scroll-behavior:smooth;padding:45px 18px 45px 5px;scrollbar-width:none}
.lyrics-scroll::-webkit-scrollbar{display:none}
.lyric-line{font:italic clamp(22px,2.6vw,36px)/1.45 "Newsreader",Georgia,serif;letter-spacing:-.01em;margin:17px 0;color:#B8B0C0;opacity:.5;transform:scale(.97);transform-origin:left center;transition:color .6s,opacity .6s,transform .6s,text-shadow .6s}
.lyric-line.active{color:#A64779;opacity:1;transform:scale(1);text-shadow:0 5px 28px rgba(218,113,163,.2);animation:lyricReveal .7s cubic-bezier(.2,.8,.2,1) both}
@keyframes lyricReveal{from{opacity:.35;transform:translateY(12px) scale(.97);filter:blur(3px)}to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}
.lyric-line.past{opacity:.7;color:#C18AA9}
.lyrics-caption{font-size:11px;letter-spacing:.15em;color:#B1A5B5;margin:14px 0 0 8px;text-transform:uppercase}

.login-area{position:fixed;right:4vw;top:5vh;width:min(330px,31vw);z-index:3}
.login-card{background:rgba(255,255,255,.78);border:1px solid rgba(229,209,228,.9);border-radius:24px;padding:25px 25px 22px;box-shadow:0 20px 70px rgba(122,82,140,.12);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);animation:cardIn .9s ease both}
@keyframes cardIn{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:none}}
.brand{font:500 29px "Newsreader",Georgia,serif;margin:0;color:#A64F82}
.subtitle{font-size:13px;color:var(--soft);margin:4px 0 18px}
label{display:block;font-size:12px;font-weight:600;margin:13px 0 6px;color:#51485D}
.field{display:block;width:100%;height:44px;padding:10px 12px;border:1px solid #E9DFEB;border-radius:10px;background:rgba(255,255,255,.94);font:15px "Instrument Sans",sans-serif;color:var(--ink);pointer-events:auto;user-select:text;-webkit-user-select:text}
.field:focus{outline:none;border-color:#C69BDE;box-shadow:0 0 0 3px #F3E7FA}
#go{width:100%;margin-top:19px;padding:12px;border:0;border-radius:11px;background:linear-gradient(110deg,#A65A9A,#8C75D6,#D77DA5);color:white;font:600 14px "Instrument Sans",sans-serif;cursor:pointer;box-shadow:0 8px 18px #BA8FC32B;transition:transform .2s}
#go:hover{transform:translateY(-2px)}
#go:disabled{opacity:.65;cursor:wait}
.err{min-height:17px;font-size:12px;line-height:1.4;color:#BD385E;margin:10px 0 0;text-align:center}
.shake{animation:shake .4s}
@keyframes shake{25%,75%{transform:translateX(-5px)}50%{transform:translateX(5px)}}

.love-note{text-align:center;margin:21px 0 0;padding:0 0 5px;animation:noteIn 1.2s .35s both}
@keyframes noteIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.because{display:block;font:italic 17px "Newsreader",Georgia,serif;color:#C08AA8}
.dimpoo{display:block;font:500 clamp(39px,4vw,53px)/1.05 "Newsreader",Georgia,serif;letter-spacing:-.035em;margin:3px 0 7px;background:linear-gradient(110deg,#FF7AA8,#B18AF4,#7D9CFA,#FF7AA8);background-size:250% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shimmer 7s linear infinite}
@keyframes shimmer{to{background-position:250% 0}}
.loved{display:block;font:italic 23px "Newsreader",Georgia,serif;color:#A95D89}
.always{display:inline-block;position:relative;margin-top:8px;font:600 35px/1 "Caveat",cursive;color:#D0507F}
.heart{display:inline-block;color:#FF6499;animation:heartbeat 1.4s ease-in-out infinite}
@keyframes heartbeat{15%{transform:scale(1.25)}30%,100%{transform:scale(1)}}

.audio-note{position:fixed;right:4vw;bottom:3vh;color:#A99AAE;font-size:10px;letter-spacing:.14em;text-transform:uppercase}
.welcome{position:fixed;inset:0;z-index:10;display:grid;place-items:center;background:#FFF9FC;opacity:0;pointer-events:none;transition:opacity .5s;font:italic 32px "Newsreader",Georgia,serif;color:#B5577D}
.welcome.on{opacity:1}

@media(max-width:700px){
 body{overflow-y:auto;overflow-x:hidden;min-height:100%;height:auto}
 .background{position:fixed}
 .lyrics-stage{left:6vw;top:3vh;transform:none;width:88vw;height:45vh;display:block}
 .eyebrow{font-size:9px;margin-bottom:10px}
 .song-title{font-size:38px;margin-bottom:8px}
 .lyrics-window{height:30vh}
 .lyrics-scroll{padding:20px 8px 30px 4px}
 .lyric-line{font-size:25px;line-height:1.35;margin:13px 0}
 .lyrics-caption{margin-top:4px;font-size:9px}
 .login-area{position:relative;top:auto;right:auto;width:min(360px,88vw);margin:51vh auto 25px}
 .login-card{padding:21px 22px 19px}
 .brand{font-size:26px}
 .love-note{margin-top:17px}
 .dimpoo{font-size:49px}
 .loved{font-size:21px}
 .audio-note{display:none}
}
@media(max-height:650px) and (min-width:701px){
 .login-area{top:2vh;right:2vw;width:290px}
 .login-card{padding:17px 20px}
 .love-note{margin-top:12px}
 .dimpoo{font-size:42px}
 .always{font-size:30px}
 .lyrics-stage{height:90vh}
 .lyrics-window{height:65vh}
 .lyric-line{margin:10px 0;font-size:clamp(20px,2.1vw,29px)}
}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation:none!important;scroll-behavior:auto!important;transition:none!important}}
</style>
</head>
<body>
<div class="background"><i class="orb one"></i><i class="orb two"></i><i class="orb three"></i></div>
<div class="hearts" id="hearts"></div>

<section class="lyrics-stage" aria-label="Song lyrics">
  <p class="eyebrow">a little song for you</p>
  <h1 class="song-title">You're my reflection.</h1>
  <div class="lyrics-window">
    <div class="lyrics-scroll" id="lyrics-scroll">
      <p class="lyric-line active">Loading our lyrics…</p>
    </div>
  </div>
  <p class="lyrics-caption">every line reminds me of you ♡</p>
</section>

<aside class="login-area">
  <main class="login-card" id="card">
    <h2 class="brand">Shortlist</h2>
    <p class="subtitle">A little place, just for you.</p>
    <form id="login-form">
      <label for="u">Username</label>
      <input class="field" id="u" name="username" type="text" autocomplete="username" autocapitalize="none" autocorrect="off" spellcheck="false" required>
      <label for="p">Password</label>
      <input class="field" id="p" name="password" type="password" autocomplete="current-password" required>
      <button id="go" type="submit">Sign in ♡</button>
      <p class="err" id="err" role="alert" aria-live="polite"></p>
    </form>
    <div class="love-note">
      <span class="because">because</span>
      <span class="dimpoo">Dimpoo</span>
      <span class="loved">you are loved</span>
      <span class="always">always <span class="heart">♥</span></span>
    </div>
  </main>
</aside>

<audio id="song" src="/vimlesh.mp3" preload="auto" autoplay loop playsinline></audio>
<div class="audio-note">our song · just for you</div>
<div class="welcome" id="welcome"></div>

<script>
(function(){
  var form=document.getElementById("login-form");
  var u=document.getElementById("u");
  var p=document.getElementById("p");
  var go=document.getElementById("go");
  var err=document.getElementById("err");
  var song=document.getElementById("song");
  var lyricsScroll=document.getElementById("lyrics-scroll");
  var lyricLines=[];
  var activeLyric=-1;
  var START_AT=11;
  var seekDone=false;

  // Floating hearts.
  var hearts=document.getElementById("hearts");
  var symbols=["♥","♡","✦"];
  for(var i=0;i<20;i++){
    var h=document.createElement("span");
    h.textContent=symbols[i%symbols.length];
    h.style.left=(Math.random()*100)+"vw";
    h.style.fontSize=(12+Math.random()*17)+"px";
    h.style.color=["#FF9EC4","#B58CFF","#9DB0FF"][i%3];
    h.style.animationDuration=(11+Math.random()*13)+"s";
    h.style.animationDelay=(Math.random()*12)+"s";
    hearts.appendChild(h);
  }

  // Load each lyric line from lyrics.txt.
  fetch("/lyrics.txt").then(function(response){
    if(!response.ok) throw new Error("Lyrics unavailable");
    return response.text();
  }).then(function(text){
    lyricLines=text.split(/\\r?\\n/).map(function(line){
      return line.trim();
    }).filter(Boolean);

    lyricsScroll.textContent="";
    lyricLines.forEach(function(line){
      var el=document.createElement("p");
      el.className="lyric-line";
      el.textContent=line;
      lyricsScroll.appendChild(el);
    });
    updateLyrics();
  }).catch(function(){
    lyricsScroll.textContent="Our lyrics couldn't load. Please refresh the page.";
  });

  // Seek to 00:11 before starting playback.
  function seekToStart(){
    if(seekDone) return;
    if(!Number.isFinite(song.duration) || song.duration<=START_AT) return;
    seekDone=true;
    try{ song.currentTime=START_AT; }catch(e){}
  }

  song.addEventListener("loadedmetadata",function(){
    seekToStart();
    attemptPlay();
  });

  function attemptPlay(){
    if(!seekDone) seekToStart();
    var result=song.play();
    if(result && typeof result.catch==="function"){
      result.catch(function(){
        // Browser autoplay policy may require a tap or keypress.
      });
    }
  }

  function startAfterGesture(){
    if(!seekDone) seekToStart();
    attemptPlay();
    document.removeEventListener("pointerdown",startAfterGesture);
    document.removeEventListener("keydown",startAfterGesture);
  }

  song.addEventListener("canplay",function(){
    if(!seekDone) seekToStart();
  });
  attemptPlay();
  document.addEventListener("pointerdown",startAfterGesture);
  document.addEventListener("keydown",startAfterGesture);

  function updateLyrics(){
    if(!lyricLines.length || !Number.isFinite(song.duration) || song.duration<=START_AT) return;

    // Map the lyrics across the remaining song, starting at 00:11.
    var progress=Math.max(0,Math.min(1,(song.currentTime-START_AT)/(song.duration-START_AT)));
    var next=Math.min(lyricLines.length-1,Math.floor(progress*lyricLines.length));
    if(next===activeLyric) return;
    activeLyric=next;

    var all=lyricsScroll.querySelectorAll(".lyric-line");
    all.forEach(function(line,index){
      line.classList.toggle("active",index===next);
      line.classList.toggle("past",index<next);
    });

    if(all[next]){
      all[next].scrollIntoView({block:"center",behavior:"smooth"});
    }
  }

  song.addEventListener("timeupdate",updateLyrics);
  song.addEventListener("seeked",updateLyrics);

  form.addEventListener("submit",function(event){
    event.preventDefault();
    if(!u.value.trim() || !p.value){
      err.textContent="Enter your username and password.";
      return;
    }

    go.disabled=true;
    err.textContent="";

    fetch("/__login",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({username:u.value.trim(),password:p.value}),
      credentials:"same-origin"
    }).then(function(response){
      return response.json().catch(function(){return {ok:false};});
    }).then(function(result){
      if(result.ok){
        var name=u.value.trim();
        u.value="";
        p.value="";
        var welcome=document.getElementById("welcome");
        welcome.textContent="Welcome, "+name.charAt(0).toUpperCase()+name.slice(1)+" ♥";
        welcome.classList.add("on");
        setTimeout(function(){window.location.replace("/");},800);
      }else{
        p.value="";
        err.textContent="That username and password don’t match.";
        var card=document.getElementById("card");
        card.classList.remove("shake");
        void card.offsetWidth;
        card.classList.add("shake");
        go.disabled=false;
        p.focus();
      }
    }).catch(function(){
      err.textContent="Couldn't reach the server. Please try again.";
      go.disabled=false;
    });
  });
})();
</script>
</body>
</html>`;
