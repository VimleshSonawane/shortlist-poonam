// Poonam's sign-in page. Shown when LOGIN_THEME=dimpoo is set in Vercel.
export const DIMPOO_LOGIN_PAGE = `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex">
<title>Shortlist</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📋</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,500;1,6..72,400&family=Caveat:wght@600&display=swap" rel="stylesheet">
<style>
:root{--rose:#B5577D;--ink:#1F2A44;--soft:#5D6680;--rule:#E4E7EF;--grad:linear-gradient(120deg,#6C8CFF,#B58CFF 45%,#FF9EC4 80%,#FFC48C)}
*{box-sizing:border-box}
html,body{height:100%}
body{margin:0;background:#fff;color:var(--ink);font:16px/1.5 "Instrument Sans",system-ui,sans-serif;display:grid;place-items:center;overflow:hidden;padding:env(safe-area-inset-top,0px) 16px env(safe-area-inset-bottom,0px)}
.bg{position:fixed;inset:0;z-index:-1;pointer-events:none}
.bg i{position:absolute;border-radius:50%;filter:blur(70px);opacity:.6;animation:drift 22s ease-in-out infinite alternate}
.bg i:nth-child(1){width:480px;height:480px;background:#E3E9FF;top:-120px;left:-100px}
.bg i:nth-child(2){width:420px;height:420px;background:#F6E6FF;bottom:-140px;right:-120px;animation-duration:28s}
.bg i:nth-child(3){width:340px;height:340px;background:#FFE6EE;top:40%;left:55%;animation-duration:34s}
@keyframes drift{to{transform:translate(50px,60px) scale(1.1)}}
.hearts{position:fixed;inset:0;pointer-events:none;z-index:-1;overflow:hidden}
.hearts span{position:absolute;bottom:-40px;font-size:18px;opacity:0;animation:rise linear infinite}
@keyframes rise{0%{transform:translateY(0) rotate(0);opacity:0}10%{opacity:.55}100%{transform:translateY(-110vh) rotate(25deg);opacity:0}}
.card{width:min(400px,100%);background:rgba(255,255,255,.82);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid var(--rule);border-radius:22px;padding:34px 30px 28px;box-shadow:0 2px 4px rgba(31,42,68,.04),0 24px 60px rgba(181,140,255,.18);animation:cardIn .8s cubic-bezier(.2,.8,.2,1) both}
@keyframes cardIn{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}
.brand{font:600 30px "Newsreader",Georgia,serif;margin:0 0 4px;background:var(--grad);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shimmer 7s linear infinite}
@keyframes shimmer{to{background-position:220% 0}}
.sub{color:var(--soft);margin:0 0 22px;font-size:14px}
label{display:block;font-weight:600;font-size:14px;margin:14px 0 6px}
.field{width:100%;padding:12px 14px;border:1px solid var(--rule);border-radius:12px;font:16px "Instrument Sans",system-ui,sans-serif;color:var(--ink);background:#fff;transition:border-color .2s,box-shadow .2s}
.field:focus{outline:none;border-color:#D7A6FF;box-shadow:0 0 0 4px rgba(181,140,255,.18)}
.masked{-webkit-text-security:disc}
button{width:100%;margin-top:22px;padding:13px;border:0;border-radius:12px;font:600 16px "Instrument Sans",system-ui,sans-serif;color:#fff;background:linear-gradient(135deg,#7A4FD6,#C2578E);box-shadow:0 8px 20px rgba(160,80,160,.28);cursor:pointer;transition:transform .15s,box-shadow .25s}
button:hover{transform:translateY(-1px);box-shadow:0 12px 26px rgba(160,80,160,.34)}
button:disabled{opacity:.7;cursor:wait}
.err{min-height:22px;margin:12px 0 0;color:#C2413A;font-size:14px;text-align:center}
.shake{animation:shake .45s}
@keyframes shake{20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}
/* ---------- the note ---------- */
.note{margin:28px 0 0;text-align:center;color:var(--rose)}
.note .w{display:inline-block;opacity:0;transform:translateY(12px);animation:up .8s cubic-bezier(.2,.8,.2,1) forwards}
.because{font:italic 400 19px "Newsreader",Georgia,serif;letter-spacing:.02em;color:#C48AA6}
.name{display:block;margin:2px 0 4px;font:500 clamp(44px,12vw,58px)/1.05 "Newsreader",Georgia,serif;letter-spacing:-.01em;
  background:linear-gradient(110deg,#FF7AA8 0%,#C38CFF 30%,#7C9CFF 50%,#C38CFF 70%,#FF7AA8 100%);background-size:250% 100%;
  -webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 6px 18px rgba(255,122,168,.25))}
.note .name{display:block}
.loved{white-space:nowrap}
.name.w{animation:up .9s cubic-bezier(.2,.8,.2,1) forwards,shimmer 6s linear infinite}
.loved{font:italic 400 24px "Newsreader",Georgia,serif}
.always{position:relative;display:inline-block;margin-top:10px;font:600 40px/1 "Caveat","Segoe Script","Bradley Hand",cursive;color:#D0507F}
.always .heart{display:inline-block;width:.72em;height:.72em;margin:0 .02em;vertical-align:-.04em;animation:beat 1.4s ease-in-out 3s infinite;transform-origin:50% 60%}
.always .heart path{fill:#FF5C8F}
.always svg.line{position:absolute;left:-6%;right:-6%;bottom:-12px;width:112%;height:14px;overflow:visible}
.always svg.line path{fill:none;stroke:#FF9EC4;stroke-width:2.2;stroke-linecap:round;stroke-dasharray:240;stroke-dashoffset:240;animation:draw 1.6s ease-out 2.6s forwards}
@keyframes draw{to{stroke-dashoffset:0}}
@keyframes up{to{opacity:1;transform:none}}
@keyframes beat{0%,100%{transform:scale(1)}15%{transform:scale(1.28)}30%{transform:scale(1)}45%{transform:scale(1.16)}}

/* ---------- our tune ---------- */
.tune{display:flex;align-items:center;justify-content:center;gap:10px;width:auto;margin:22px auto 0;padding:10px 18px 10px 14px;border:1px solid #F6CADB;border-radius:999px;background:#FFF5F9;color:#C2578E;box-shadow:none;font:italic 400 17px "Newsreader",Georgia,serif;opacity:0;animation:up .8s ease 3.2s forwards}
.tune svg{width:22px;height:22px}
.tune svg path{fill:#FF7AA8}
.tune[aria-pressed="true"] svg{animation:beat 1.1s ease-in-out infinite}
.tune:hover{background:#FFEDF4}
.sparkle{position:fixed;pointer-events:none;font-size:14px;color:#FF9EC4;animation:pop 1.6s ease-out forwards}
@keyframes pop{from{opacity:.9;transform:translateY(0) scale(.6)}to{opacity:0;transform:translateY(-70px) scale(1.2)}}

.welcome{position:fixed;inset:0;display:grid;place-items:center;background:#fff;opacity:0;pointer-events:none;transition:opacity .5s;font:italic 400 32px "Newsreader",Georgia,serif;color:#B5577D}
.welcome.on{opacity:1}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}.note .w{opacity:1;transform:none}.always svg.line path{stroke-dashoffset:0}}
</style></head>
<body>
<div class="bg"><i></i><i></i><i></i></div>
<div class="hearts" id="hearts"></div>
<main class="card" id="card">
  <h1 class="brand">Shortlist</h1>
  <p class="sub">Sign in to continue.</p>
  <div id="form">
    <label for="u">Username</label>
    <input class="field" id="u" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" readonly>
    <label for="p">Password</label>
    <input class="field masked" id="p" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" readonly>
    <button id="go" type="button">Sign in</button>
    <p class="err" id="err" role="alert"></p>
  </div>
  <p class="note" aria-label="Because Dimpoo, you are loved. Always.">
      <span class="w because" style="animation-delay:.5s">because</span>
      <span class="w name" style="animation-delay:.9s,0s">Dimpoo</span>
      <span class="w loved" style="animation-delay:1.6s">you</span>
      <span class="w loved" style="animation-delay:1.8s">are</span>
      <span class="w loved" style="animation-delay:2s">loved</span><br>
      <span class="w always" style="animation-delay:2.4s" aria-hidden="true">alw<svg class="heart" viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.8 4.5c2.1 0 3.6 1.2 4.4 2.5h1.6c.8-1.3 2.3-2.5 4.4-2.5 3.8 0 5.9 3.9 4.4 7.3C19.5 16.4 12 21 12 21z"/></svg>ys<svg class="line" viewBox="0 0 200 14" preserveAspectRatio="none"><path d="M4 9 C 40 2, 80 13, 120 6 S 180 4, 196 8"/></svg></span>
    </p>
</main>
<div class="welcome" id="welcome"></div>
<script>
(function(){
  var u=document.getElementById("u"), p=document.getElementById("p"), go=document.getElementById("go"), err=document.getElementById("err");
  // Random field names and read-only until touched, so browsers have nothing to autofill or remember.
  [u,p].forEach(function(f){ f.name="f"+Math.random().toString(36).slice(2); f.value=""; f.addEventListener("focus",function(){ f.removeAttribute("readonly"); }); f.addEventListener("pointerdown",function(){ f.removeAttribute("readonly"); }); });
  if(!(window.CSS&&CSS.supports&&CSS.supports("-webkit-text-security","disc"))){ p.type="password"; p.setAttribute("autocomplete","new-password"); p.classList.remove("masked"); }
  var hearts=document.getElementById("hearts"), sym=["♥","♡","✦"];
  for(var i=0;i<18;i++){ var s=document.createElement("span"); s.textContent=sym[i%3]; s.style.left=(Math.random()*100)+"vw"; s.style.color=["#FF9EC4","#B58CFF","#9DB0FF"][i%3]; s.style.fontSize=(12+Math.random()*16)+"px"; s.style.animationDuration=(10+Math.random()*12)+"s"; s.style.animationDelay=(Math.random()*10)+"s"; hearts.appendChild(s); }
  function submit(){
    if(!u.value.trim()||!p.value){ err.textContent="Enter your username and password."; return; }
    go.disabled=true; err.textContent="";
    fetch("/__login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:u.value,password:p.value}),credentials:"same-origin"})
      .then(function(r){ return r.json().catch(function(){return {ok:false};}); })
      .then(function(j){
        if(j.ok){ var name=u.value.trim(); u.value=""; p.value=""; var w=document.getElementById("welcome"); w.textContent="Welcome, "+name.charAt(0).toUpperCase()+name.slice(1)+" ♥"; w.classList.add("on"); setTimeout(function(){ location.replace("/"); },900); }
        else { p.value=""; err.textContent="That username and password don’t match."; var c=document.getElementById("card"); c.classList.remove("shake"); void c.offsetWidth; c.classList.add("shake"); go.disabled=false; p.focus(); }
      }).catch(function(){ err.textContent="Couldn’t reach the server. Try again."; go.disabled=false; });
  }
  go.addEventListener("click",submit);
  [u,p].forEach(function(f){ f.addEventListener("keydown",function(e){ if(e.key==="Enter") submit(); }); });
  window.addEventListener("pageshow",function(){ u.value=""; p.value=""; });
})();
</script>
</body></html>`;
