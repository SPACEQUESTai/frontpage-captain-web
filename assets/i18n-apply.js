/* Frontpage Captain — i18n Engine (Unterseiten). Liest window.FPC_I18N (assets/i18n.js). setLang() global. */
(function(){
  function setLang(l){
    var D=window.FPC_I18N||{}; var d=D[l]||D.de||{};
    document.querySelectorAll('[data-i18n]').forEach(function(el){var k=el.getAttribute('data-i18n');if(d[k]!=null)el.innerHTML=d[k];});
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){var k=el.getAttribute('data-i18n-ph');if(d[k]!=null)el.setAttribute('placeholder',d[k]);});
    var h=document.documentElement;h.setAttribute('lang',l);h.setAttribute('dir',l==='ar'?'rtl':'ltr');
    document.querySelectorAll('.langsw button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-lang')===l);});
    try{localStorage.setItem('fpc_lang',l);}catch(e){}
  }
  window.setLang=setLang;
  function init(){
    var saved=null;try{saved=localStorage.getItem('fpc_lang');}catch(e){}
    var nav=(navigator.language||'de').slice(0,2).toLowerCase();
    var ok={de:1,en:1,fr:1,nl:1,ar:1};
    setLang(saved&&ok[saved]?saved:(ok[nav]?nav:'de'));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
