/* Frontpage Captain — Barrierefreiheits-Panel (eigenständig, auf jeder Seite).
   Grünes Männchen unten links: Schrift, Kontrast, Bewegung, Vorlesen (Web Speech). */
(function(){
  var root=document.documentElement, body=document.body;
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var A; try{A=JSON.parse(localStorage.getItem('fpc_a11y_v2')||'null');}catch(e){A=null;}
  if(!A) A={fs:1, hc:false, motion:reduce};
  function save(){try{localStorage.setItem('fpc_a11y_v2',JSON.stringify(A));}catch(e){}}
  function applyFs(){root.style.setProperty('--fs',A.fs);}
  function applyHc(){
    body.classList.toggle('contrast',A.hc);
    if(A.hc){root.setAttribute('data-contrast','1');root.style.setProperty('--muted','#e8f0ff');}
    else{root.removeAttribute('data-contrast');root.style.setProperty('--muted','#9fb2d6');}
  }
  function applyMotion(){body.classList.toggle('no-motion',A.motion);}
  applyFs();applyHc();applyMotion();

  window.a11yToggle=function(){var p=document.getElementById('a11yPanel');if(!p)return;
    var open=p.classList.toggle('on');var l=document.getElementById('a11yLaunch');if(l)l.setAttribute('aria-expanded',open?'true':'false');};
  window.a11yClose=function(){var p=document.getElementById('a11yPanel');if(p)p.classList.remove('on');};
  window.a11yFs=function(d){A.fs=Math.round(Math.max(.85,Math.min(1.45,A.fs+d))*100)/100;applyFs();save();};
  window.a11yReset=function(){A.fs=1;applyFs();save();};
  window.a11yHc=function(){A.hc=!A.hc;applyHc();save();upd();};
  window.a11yMotion=function(){A.motion=!A.motion;applyMotion();save();upd();};

  /* ---- Vorlesen (Web Speech) ---- */
  var speaking=false;
  var OK=('speechSynthesis' in window)&&(typeof SpeechSynthesisUtterance!=='undefined');
  function lang(){var l=(root.getAttribute('lang')||'de').slice(0,2).toLowerCase();
    return {de:'de-DE',en:'en-US',fr:'fr-FR',nl:'nl-NL',ar:'ar-SA'}[l]||'de-DE';}
  function readText(){
    var parts=[]; var main=document.querySelector('main')||document.body;
    main.querySelectorAll('h1,h2,h3,h4,p,li,summary').forEach(function(el){
      if(el.closest('[aria-hidden="true"]'))return;
      if(el.offsetParent===null)return;            /* unsichtbares überspringen */
      var t=(el.textContent||'').replace(/\s+/g,' ').trim();
      if(t && t.length>1) parts.push(t);
    });
    return parts.join('. ');
  }
  window.a11ySpeak=function(){
    if(!OK)return;
    if(speaking){ try{speechSynthesis.cancel();}catch(e){} speaking=false; upd(); return; }
    var t=readText(); if(!t)return;
    try{
      speechSynthesis.cancel();
      var u=new SpeechSynthesisUtterance(t);
      u.lang=lang(); u.rate=1; u.pitch=1;
      u.onend=function(){speaking=false;upd();};
      u.onerror=function(){speaking=false;upd();};
      speaking=true; upd(); speechSynthesis.speak(u);
    }catch(e){ speaking=false; upd(); }
  };

  function upd(){
    var sb=document.getElementById('a11ySpeakBtn');
    if(sb){ sb.classList.toggle('speaking',speaking); sb.style.display=OK?'':'none';
      var l=sb.querySelector('.lbl'); if(l)l.textContent=speaking?'Vorlesen stoppen':'Seite vorlesen'; }
    var hb=document.getElementById('a11yHcBtn'); if(hb){hb.classList.toggle('on',A.hc);hb.setAttribute('aria-pressed',A.hc?'true':'false');}
    var mb=document.getElementById('a11yMotionBtn'); if(mb){mb.classList.toggle('on',A.motion);mb.setAttribute('aria-pressed',A.motion?'true':'false');}
  }
  document.addEventListener('keydown',function(e){ if(e.key==='Escape'){ var p=document.getElementById('a11yPanel'); if(p)p.classList.remove('on'); } });
  /* Sprachen-Umschalter ändert lang -> laufendes Vorlesen stoppen */
  window.addEventListener('languagechange',function(){ if(speaking){try{speechSynthesis.cancel();}catch(e){} speaking=false; upd();} });
  upd();
})();
