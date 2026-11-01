(function(){
'use strict';
// Lenis smooth scroll (single driver: GSAP ticker)
const USE_LENIS = false; // true karne ke liye upar Lenis <script> tag bhi uncomment karo
const lenis = (USE_LENIS && typeof Lenis!=='undefined')
  ? new Lenis({ lerp:0.09, smoothWheel:true, wheelMultiplier:1 })
  : { /* fallback: Lenis load nahi hua to normal scroll chalega, error nahi aayega */
      scroll:0,
      on(_,fn){ window.addEventListener('scroll',()=>fn({scroll:window.scrollY,limit:document.documentElement.scrollHeight-window.innerHeight}),{passive:true}); },
      raf(){},
      scrollTo(el,o={}){ window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY+(o.offset||0),behavior:'smooth'}); }
    };
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=> lenis.raf(time*1000));
gsap.ticker.lagSmoothing(0);
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id.length<2) return;
    const el=document.querySelector(id);
    if(!el) return;
    e.preventDefault();
    lenis.scrollTo(el,{offset:-70,duration:1.1});
  });
});

// Loader
let progress=0;
const bar=document.getElementById('loaderProgress');
const loaderText=document.getElementById('loaderText');
const loader=document.getElementById('loader');
const iv=setInterval(()=>{
  progress+=Math.random()*16+7;
  if(progress>=100){ progress=100; clearInterval(iv); bar.style.width='100%'; loaderText.textContent='Ready — welcome'; setTimeout(()=>{ loader.classList.add('hidden'); heroIn(); }, 520); }
  else { bar.style.width=progress+'%'; loaderText.textContent=`Loading — ${Math.round(progress)}%`; }
},110);
function heroIn(){
  gsap.to('.hero-title .line span',{y:0,duration:0.95,stagger:0.08,ease:'expo.out',delay:0.08});
  gsap.from('.hero-sub, .hero-actions, .hero-meta, .eyebrow',{y:16,opacity:0,duration:0.7,stagger:0.07,ease:'power3.out',delay:0.5});
  gsap.from('.stage-shell',{y:28,opacity:0,duration:1,ease:'expo.out',delay:0.35});
}

// 3D tilt (rAF-throttled)
function rafMove(el, fn, reset){
  let pending=false, ev=null;
  el.addEventListener('mousemove',e=>{
    ev=e; if(pending) return; pending=true;
    requestAnimationFrame(()=>{ pending=false; fn(el,ev); });
  },{passive:true});
  el.addEventListener('mouseleave',()=>{ pending=false; reset(el); },{passive:true});
}
if(window.matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('[data-tilt]').forEach(card=>rafMove(card,(c,e)=>{
    const r=c.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    c.style.transform=`perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateZ(6px)`;
  },c=>{ c.style.transform=''; }));
  document.querySelectorAll('.p-card').forEach(card=>rafMove(card,(c,e)=>{
    const r=c.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
    c.style.transform=`perspective(900px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-5px)`;
  },c=>{ c.style.transform=''; }));
  document.querySelectorAll('[data-magnetic]').forEach(btn=>rafMove(btn,(b,e)=>{
    const r=b.getBoundingClientRect();
    b.style.transform=`translate(${(e.clientX-(r.left+r.width/2))*0.22}px,${(e.clientY-(r.top+r.height/2))*0.28}px)`;
  },b=>{ b.style.transform=''; }));
}

// Progress + nav
const progressEl=document.getElementById('progress');
const nav=document.getElementById('navbar');
const secs=[...document.querySelectorAll('section[id]')].map(sec=>({sec,link:document.querySelector(`.nav-links a[href="#${sec.id}"]`)})).filter(x=>x.link);
let ticking=false, lastScroll=0, lastLimit=0, lastScrolled=null, lastActive=null;
let secPos=[];
const calcSecs=()=>{ secPos=secs.map(({sec,link})=>({link,top:sec.offsetTop-140,bottom:sec.offsetTop-140+sec.offsetHeight})); };
calcSecs();
window.addEventListener('load',calcSecs);
window.addEventListener('resize',calcSecs,{passive:true});
setTimeout(calcSecs,1500);
lenis.on('scroll',({scroll,limit})=>{
  lastScroll=scroll; lastLimit=limit;
  if(ticking) return; ticking=true;
  requestAnimationFrame(()=>{
    ticking=false;
    progressEl.style.transform='scaleX('+(lastLimit? (lastScroll/lastLimit):0)+')';
    const sc=lastScroll>18;
    if(sc!==lastScrolled){ lastScrolled=sc; nav.classList.toggle('scrolled',sc); }
    let act=null;
    for(const p of secPos){ if(lastScroll>=p.top && lastScroll<p.bottom){ act=p.link; } }
    if(act!==lastActive){ secPos.forEach(p=>p.link.classList.toggle('active',p.link===act)); lastActive=act; }
  });
});

// hero card stage follows mouse subtly (lightweight)
const stageEl=document.getElementById('stageShell');
if(stageEl && window.matchMedia('(pointer:fine)').matches){
  const qx=gsap.quickTo(stageEl,'rotationY',{duration:0.7,ease:'power3.out'});
  const qy=gsap.quickTo(stageEl,'rotationX',{duration:0.7,ease:'power3.out'});
  window.addEventListener('mousemove',e=>{
    qx(((e.clientX/window.innerWidth)-0.5)*0.55*7);
    qy(-((e.clientY/window.innerHeight)-0.5)*0.32*6);
  },{passive:true});
}

// reveal + bars + scrollTrigger
gsap.registerPlugin(ScrollTrigger);
const reveals=document.querySelectorAll('.reveal');
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
},{threshold:0.14});
reveals.forEach(r=>io.observe(r));
gsap.utils.toArray('.p-card').forEach((card,i)=>{
  gsap.from(card,{scrollTrigger:{trigger:card,start:'top 92%'}, y:20, opacity:0, duration:0.6, delay:i*0.04, ease:'power3.out'});
});
gsap.utils.toArray('.t-item').forEach(item=>{
  gsap.from(item,{scrollTrigger:{trigger:item,start:'top 93%'}, x:-12, opacity:0, duration:0.5, ease:'power2.out'});
});
})();
