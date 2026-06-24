const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== Header scrolled state ===== */
const hdr=document.getElementById('hdr');
if(hdr){const onScroll=()=>{hdr.classList.toggle('scrolled',window.scrollY>30)};
onScroll();window.addEventListener('scroll',onScroll,{passive:true});}

/* ===== A11y: Schriftgröße + Kontrast ===== */
let fs=1;const root=document.documentElement;
const _fp=document.getElementById('fsPlus');if(_fp)_fp.onclick=()=>{fs=Math.min(1.4,fs+.1);root.style.setProperty('--fs',fs)};
const _fm=document.getElementById('fsMinus');if(_fm)_fm.onclick=()=>{fs=Math.max(.85,fs-.1);root.style.setProperty('--fs',fs)};
const _ct=document.getElementById('contrast');if(_ct)_ct.onclick=()=>{
  const on=root.getAttribute('data-contrast')==='1';
  if(on){root.removeAttribute('data-contrast');document.body.classList.remove('contrast');root.style.setProperty('--muted','#9fb2d6')}
  else{root.setAttribute('data-contrast','1');document.body.classList.add('contrast');root.style.setProperty('--muted','#e8f0ff')}
};

/* ===== Reveals beim Scrollen (natives Scrollen, kein Lenis -> kein Haken) ===== */
const reveals=[...document.querySelectorAll('.reveal')];
if(!REDUCED && window.gsap && window.ScrollTrigger){
  gsap.registerPlugin(ScrollTrigger);
  reveals.forEach((el)=>{
    gsap.fromTo(el,{opacity:0,y:34},{opacity:1,y:0,duration:.9,ease:'power3.out',
      scrollTrigger:{trigger:el,start:'top 88%'}});
  });
}else{
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.15});
  reveals.forEach(el=>io.observe(el));
}

/* ===== Cinematic Headline-Intro: blendet dramatisch ein, bleibt dann stehen ===== */
(function(){
  const lns=[...document.querySelectorAll('.hero h1 .ln')];
  if(!lns.length) return;               // nur auf der Startseite (Hero vorhanden) -> keine GSAP-Warnung auf Unterseiten
  const eb=document.querySelector('.hero .eyebrow');
  const sub=document.querySelector('.hero p.sub');
  const fm=document.querySelector('.hero .form');
  const tk=document.querySelector('.hero .ticks');
  const kino=document.querySelector('.hero h1 .kino');
  if(REDUCED || !window.gsap) return;   // sonst ist alles regulaer sofort sichtbar
  const items=[eb,...lns,sub,fm,tk].filter(Boolean);
  gsap.set(items,{opacity:0});
  const tl=gsap.timeline({delay:.2});
  if(eb) tl.fromTo(eb,{opacity:0,y:14},{opacity:1,y:0,duration:.55,ease:'power2.out'});
  tl.fromTo(lns,{opacity:0,y:42,filter:'blur(16px)',scale:.95},
    {opacity:1,y:0,filter:'blur(0px)',scale:1,duration:1.0,ease:'power3.out',stagger:.24},'-=.15');
  if(kino) tl.fromTo(kino,{textShadow:'0 0 0 rgba(54,224,207,0)'},
    {textShadow:'0 0 28px rgba(54,224,207,.6)',duration:.7,ease:'power2.out',yoyo:true,repeat:1},'-=.4');
  if(sub) tl.fromTo(sub,{opacity:0,y:20},{opacity:1,y:0,duration:.65,ease:'power2.out'},'-=.5');
  if(fm) tl.fromTo(fm,{opacity:0,y:20},{opacity:1,y:0,duration:.6,ease:'power2.out'},'-=.45');
  if(tk) tl.fromTo(tk,{opacity:0,y:16},{opacity:1,y:0,duration:.5,ease:'power2.out'},'-=.35');
})();

/* ===== Hero-Video (das echte Auge) + Verwandlungs-Clip ===== */
(function(){
  const eye=document.getElementById('eye');
  if(eye && REDUCED){ try{eye.removeAttribute('autoplay');eye.pause();}catch(e){} }
  else if(eye){ const p=eye.play&&eye.play(); if(p&&p.catch)p.catch(()=>{}); }
  ['scaneye','priceeye'].forEach(id=>{
    const v=document.getElementById(id); if(!v) return;
    if(REDUCED){ try{v.removeAttribute('autoplay');v.pause();}catch(e){} }
    else { const ps=v.play&&v.play(); if(ps&&ps.catch)ps.catch(()=>{}); }
  });

  // Verwandlungs-Moment: Adresse rein -> das Auge liest -> Uebergabe ans Motor-Tool (erst sehen, dann zahlen).
  const TOOL='vorschau.html';
  const form=document.querySelector('.hero .form');
  const ov=document.getElementById('transition');
  const tv=document.getElementById('transvid');
  const msg=ov?ov.querySelector('.tmsg'):null;
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const inp=form.querySelector('input');
      const raw=((inp||{}).value||'').trim();
      if(!raw){ if(inp) inp.focus(); return; }
      const go=()=>{ location.href=TOOL+'?url='+encodeURIComponent(raw); };
      if(!ov||!tv||REDUCED){ go(); return; }   // ohne Clip direkt weiter
      if(msg) msg.textContent='Das Auge liest '+raw+' …';
      ov.classList.add('on'); ov.setAttribute('aria-hidden','false');
      try{ tv.currentTime=0; const pp=tv.play(); if(pp&&pp.catch)pp.catch(()=>{}); }catch(e){}
      let done=false; const fire=()=>{ if(done) return; done=true;
        if(msg) msg.textContent='Verbindung zum Motor …'; go(); };
      setTimeout(fire,11000);  // volle Verwandlungs-Sequenz laufen lassen (Clip ~10s), dann Uebergang
      tv.onended=fire;         // sobald der Clip durch ist, weiter zum Motor-Tool
    });
  }
})();
