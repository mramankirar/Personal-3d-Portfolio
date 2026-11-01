/* scroll ke time heavy cheezein pause, scroll rukne ke 120ms baad wapas */
(function(){
  var root=document.documentElement,t=null,on=false;
  window.addEventListener('scroll',function(){
    if(!on){on=true;root.classList.add('is-scrolling');}
    clearTimeout(t);
    t=setTimeout(function(){on=false;root.classList.remove('is-scrolling');},120);
  },{passive:true});
})();
