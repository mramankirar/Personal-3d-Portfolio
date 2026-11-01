/* theme: apply saved choice before first paint (no flash). Default = day */
(function(){var t='day';try{t=localStorage.getItem('theme')||'day'}catch(e){}
document.documentElement.setAttribute('data-theme',t==='night'?'night':'day');
var m=document.querySelector('meta[name="theme-color"]');if(m&&t==='night')m.setAttribute('content','#080C1B');})();
