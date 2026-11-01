/* ===== Experience section animations ===== */
(function(){
  if(typeof gsap==='undefined'||typeof ScrollTrigger==='undefined') return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.exp-item').forEach(function(c){c.classList.add('exp-in');});return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* stats: count-up (4, 3, 40k+, 120+) */
  document.querySelectorAll('#experience .cred-stat b').forEach(function(b){
    var m=b.textContent.trim().match(/^(\d+)(.*)$/); if(!m) return;
    var end=parseInt(m[1],10),suf=m[2],o={v:0};
    b.textContent='0'+suf;
    ScrollTrigger.create({trigger:b,start:'top 90%',once:true,onEnter:function(){
      gsap.to(o,{v:end,duration:1.6,ease:'power3.out',onUpdate:function(){b.textContent=Math.round(o.v)+suf;},onComplete:function(){b.textContent=end+suf;}});
    }});
  });

  /* cards: slide up, then logo pop -> bullets -> tags */
  document.querySelectorAll('#experience .exp-item').forEach(function(card){
    var logo=card.querySelector('.exp-logo'),
        head=card.querySelector('.exp-head h3'),
        org=card.querySelector('.exp-org'),
        side=card.querySelectorAll('.exp-period,.exp-type'),
        pts=card.querySelectorAll('.exp-points li'),
        tags=card.querySelectorAll('.exp-tags i');
    var tl=gsap.timeline({paused:true,defaults:{ease:'power3.out'},
      onStart:function(){card.classList.add('exp-anim');},
      onComplete:function(){card.classList.remove('exp-anim');gsap.set(card,{clearProps:'transform,opacity'});}});
    tl.from(card,{y:56,opacity:0,scale:0.975,duration:0.85})
      .from(side,{x:-16,opacity:0,duration:0.55,stagger:0.08},0.1)
      .from(logo,{scale:0.4,rotate:-18,opacity:0,duration:0.7,ease:'back.out(1.8)'},0.2)
      .from([head,org],{y:12,opacity:0,duration:0.55,stagger:0.08},0.3)
      .from(pts,{x:-18,opacity:0,duration:0.55,stagger:0.12},0.45)
      .from(tags,{y:10,opacity:0,scale:0.9,duration:0.4,stagger:0.05},0.7);
    ScrollTrigger.create({trigger:card,start:'top 88%',once:true,onEnter:function(){card.classList.add('exp-in');tl.play();}});
  });
})();
