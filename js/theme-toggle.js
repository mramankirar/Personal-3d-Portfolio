/* ===== Day / Night theme toggle ===== */
(function(){
  var root=document.documentElement,btn=document.getElementById('themeToggle'),meta=document.querySelector('meta[name="theme-color"]');
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* stars */
  var box=document.getElementById('stars');
  if(box){
    var n=window.innerWidth<700?40:70,f=document.createDocumentFragment();
    for(var i=0;i<n;i++){
      var s=document.createElement('i'),z=Math.random();
      var size=z>0.9?2.6:z>0.55?1.7:1.1;
      s.style.cssText='left:'+(Math.random()*100).toFixed(2)+'%;top:'+(Math.random()*100).toFixed(2)+'%;width:'+size+'px;height:'+size+'px;--d:'+(2.5+Math.random()*4).toFixed(2)+'s;--l:-'+(Math.random()*6).toFixed(2)+'s';
      if(z>0.9) s.className='big';
      if(Math.random()>0.8) s.style.background='#FFD9A0';
      f.appendChild(s);
    }
    box.appendChild(f);
  }

  function isNight(){return root.getAttribute('data-theme')==='night';}
  function apply(t){
    root.setAttribute('data-theme',t);
    try{localStorage.setItem('theme',t);}catch(e){}
    if(meta) meta.setAttribute('content',t==='night'?'#080C1B':'#F6F4EF');
    var label=t==='night'?'Switch to day theme':'Switch to night theme';
    btn.setAttribute('aria-label',label);btn.title=label;
  }
  apply(isNight()?'night':'day');

  btn.addEventListener('click',function(){
    var next=isNight()?'day':'night';
    if(document.startViewTransition&&!reduce){
      var r=btn.getBoundingClientRect(),x=r.left+r.width/2,y=r.top+r.height/2;
      var rad=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
      var vt=document.startViewTransition(function(){apply(next);});
      vt.ready.then(function(){
        root.animate({clipPath:['circle(0px at '+x+'px '+y+'px)','circle('+rad+'px at '+x+'px '+y+'px)']},
          {duration:750,easing:'cubic-bezier(0.22,1,0.36,1)',pseudoElement:'::view-transition-new(root)'});
      }).catch(function(){});
    }else{
      root.classList.add('theme-anim');apply(next);
      setTimeout(function(){root.classList.remove('theme-anim');},700);
    }
  });
})();
