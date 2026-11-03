const projects=[
  {title:"E-Commerce Website — Modern Online Shopping Platform",desc:"Developed a modern, responsive e-commerce platform featuring intuitive navigation, product listings, shopping cart functionality, and a seamless user experience.",img:"Image/projects/e-commerce.jpg",cat:"Website",year:"2026",tags:["HTML5","CSS3","JavaScript"," API"],demo:"https://mramankirar.github.io/e-commerce-website/",code:"https://github.com/mramankirar/e-commerce-website"},
  {title:"Personal Portfolio — Aman Dhakar",desc:"I'm Aman Dhakar, a Computer Science student specializing in Full-Stack Development and Data Analytics. Explore my projects, technical skills, internship experience, and professional journey.",img:"Image/projects/Aman Dhakar Portfolio Hero.png",cat:"Website",year:"2026",tags:["HTML","CSS","JavaScripts"],demo:"",code:""},
  //{title:"Lumen — AI Study Companion",desc:"RAG-powered tutor that turns lecture PDFs into interactive quizzes. 12k students onboarded in the first month at BITS.",img:"https://images.unsplash.com/photo-1677442136019-21780ecad995?w=700&h=420&fit=crop",cat:"product",year:"2024",tags:["Python","LangChain","Pinecone","React"]},
  //{title:"Chromatic — Generative Poster Engine",desc:"An experimental tool that generates print-ready posters from audio. WebGL shaders + Web Audio API. Featured on Hover States.",img:"https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=700&h=420&fit=crop",cat:"experiment",year:"2024",tags:["Three.js","GLSL","Web Audio","Vite"]},
  //{title:"Paper — Minimal Writing Environment",desc:"Distraction-free markdown editor with typewriter mode and beautiful export. 4.8★ on Product Hunt, 8k weekly users.",img:"https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&h=420&fit=crop",cat:"opensource",year:"2023",tags:["TypeScript","ProseMirror","Tailwind"]},
  //{title:"Mesh — 3D Portfolio Starter",desc:"Open-source starter for creative portfolios. One command to deploy a WebGL portfolio with CMS. 2.1k GitHub stars.",img:"https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=700&h=420&fit=crop",cat:"opensource",year:"2023",tags:["Three.js","Astro","MDX","GSAP"]},
];
const timelineData=[
  {year:"2023 — 2027",badge:"B.Tech CSE ",badgeClass:"blue",icon:"◈",title:"ITM Gwalior — B.Tech Computer Science",org:"CGPA 6.7 / 10 · Dean's List · Merit Scholarship",desc:"Computer Science student focused on software engineering, Full-Stack Development, and Data Analytics, with a commitment to continuous learning,  practical problem-solving and building innovative technology solutions."},
  {year:"2022 — 2023",badge:"Class:12",badgeClass:"blue",icon:"◎",title:"Class : 12 — Brijpal Central Academy, Kailaras",org:"Percentage 60 / 100",desc:"Completed Class 12 studies in Mathematics, Physics, and Chemistry. Developed strong analytical and problem-solving skills, building a solid foundation for engineering and technology."},
  {year:"2020 — 2021",badge:"Class:10",badgeClass:"blue",icon:"✦",title:"Class : 10 — Brijpal Central Academy, Kailaras",org:"Percentage 92 / 100",desc:"Class 10 (MP Board): Completed general studies with a primary focus on foundational Science."},
  //{year:"Summer 2025",badge:"Internship",badgeClass:"",icon:"⬢",title:"Frontend Engineer Intern — Linear (Remote)",org:"Design engineering · Design systems",desc:"Shipped the new command palette and reworked the issue detail view. Worked directly with design to prototype interactions in Framer before engineering handoff. Stack: Next.js, tRPC, Radix."},
  //{year:"2024 — 2025",badge:"Part-time",badgeClass:"amber",icon:"✦",title:"Product Engineer — Sparrow (Seed-stage)",org:"Early employee #4 · 0→1 product",desc:"Built the marketing site, dashboard, and onboarding flow for a scheduling tool that grew to 40k users. Owned frontend architecture and the component library."},
 // {year:"2023 — Present",badge:"Community",badgeClass:"",icon:"⬣",title:"Lead — BITS Developer Community",org:"120+ members · 12 workshops · 3 hackathons",desc:"Mentored juniors, ran weekly build sessions, and created an open curriculum for web development used across 4 campuses."},
  //{year:"2023",badge:"Award",badgeClass:"blue",icon:"◎",title:"Smart India Hackathon — National Winner",org:"Team of 4 · Problem statement: ISRO",desc:"Built a satellite imagery pipeline that cut manual analysis time by 70%. Presented to ISRO scientists at Ahmedabad."},
];
const credentials=[
  //{type:"internship",accent:"#3D5BFF",title:"MERN full Stack Development + Project",issuer:"Edu Skills · AICTE",date:"NOV 2026 — Present",status:"In Progress",img:"Image/credentials/Modern MERN Internship Certificate.png",tags:["JavaScript","React.js","Node.js","MongoDB"]},
  //{type:"internship",accent:"#FFB84D",title:"Data Analyst Internship",issuer:"Internship Studio",date:"Oct 2026 — Present",status:"In Progress",img:"Image/credentials/data-analyst-internship.webp",tags:["Excel","Python","SQL","Power BI"]},
  {type:"certificate",accent:"#3D5BFF",title:"Data Analytics with Python & Power BI",issuer:"Edu Skills · AICTE",date:"Sept 2026 — 8 Weeks",status:"Completed",img:"Image/credentials/mern-full-stack-development-project.webp",tags:["Excel","Python","SQL","Power BI"]},
  // ---- SAMPLE ENTRIES: replace title / issuer / date with your real certificates & rewards ----
  {type:"certificate",accent:"#7B61FF",title:"Data Structures and Algorithms in C With Project",issuer:"Edu Skills · AICTE",date:"Sept 2026",status:"Completed",img:"Image/credentials/Data structure & Algorithms In c++ with project.png",tags:["DataStructures","CProgramming","DSA ","SoftwareDevelopment "]},
  {type:"certificate",accent:"#22A06B",title:"Python 101 for Data Science",issuer:"COGNITIVE CLASS",date:"Dec 2024",status:"Completed",img:"Image/credentials/Python 101 for Data Science.png",tags:["Python","OOP","Problem Solving"]},
  {type:"certificate",accent:"#F59E0B",title:"Programming for C++",issuer:"ITM Collage",date:"Nov 2023",status:"Completed",img:"Image/credentials/C++ Internship.png",tags:["C++Programming","OPM","ProblemSolving"]},
  //{type:"certificate",accent:"#0EA5E9",title:"Database Management Systems",issuer:"Online Learning Platform",date:"Jan 2026",status:"Completed",img:"Image/credentials/database-management-systems.webp",tags:["SQL","DBMS","Normalization"]},
  //{type:"reward",accent:"#EF4444",title:"Hackathon Winner — 1st Place",issuer:"College Tech Fest",date:"Feb 2026",status:"Awarded",img:"Image/credentials/hackathon-winner-1st-place.webp",tags:["Teamwork","Innovation","Web App"]},
  //{type:"reward",accent:"#3D5BFF",title:"Best Project Award",issuer:"Department of Computer Science",date:"Dec 2025",status:"Awarded",img:"Image/credentials/best-project-award.webp",tags:["Project","Full Stack"]},
  //{type:"reward",accent:"#14B8A6",title:"Academic Excellence Award",issuer:"University",date:"Nov 2025",status:"Awarded",img:"Image/credentials/academic-excellence-award.webp",tags:["Academics","Top Performer"]},
  // Add more like this (type: "certificate" | "internship" | "reward"; url and img are optional).
  // (2-letter logo hata diya gaya hai) img = photo/scan of the certificate, e.g. "Image/credentials/certificate1.webp" (put the file next to index.html) or a full https:// link:
  // {type:"certificate",accent:"#7B61FF",title:"Certificate name",issuer:"Issuer",date:"Mon YYYY",tags:["Skill"],img:"certs/certificate1.jpg",url:"https://..."},
];
const credLabels={certificate:"Certificate",internship:"Internship",reward:"Reward"};
const credPlural={certificate:"Certificates",internship:"Internships",reward:"Rewards"};
const credIcons={
  certificate:'<svg viewBox="0 0 24 24"><circle cx="12" cy="9" r="6"/><path d="M8.5 14l-1.5 7 5-3 5 3-1.5-7"/></svg>',
  internship:'<svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 012-2h2a2 2 0 012 2v2M3 13h18"/></svg>',
  reward:'<svg viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 01-10 0V4zM17 5h3v2a3 3 0 01-3 3M7 5H4v2a3 3 0 003 3"/></svg>'
};
function renderCredStats(){
  const n=t=>credentials.filter(c=>c.type===t).length;
  document.getElementById('credStats').innerHTML=[
    [credentials.length,'Total<br>credentials'],[n('internship'),'Internships'],[n('certificate'),'Certificates'],[n('reward'),'Rewards']
  ].map(x=>`<div class="cred-stat"><b>${String(x[0]).padStart(2,'0')}</b><span>${x[1]}</span></div>`).join('');
}
function renderCredentials(filter="all"){
  const grid=document.getElementById('credGrid');
  const list=filter==="all"?credentials:credentials.filter(c=>c.type===filter);
  grid.innerHTML=list.map((c,i)=>{
    const live=/ongoing|progress/i.test(c.status||'');
    const badge=`<span class="cred-badge">${credIcons[c.type]||''}${credLabels[c.type]||c.type}</span>`;
    const ph=`<div class=&quot;cred-cover&quot;>${(credIcons[c.type]||'').replace(/"/g,'&quot;')}</div>`;
    const phPlain=`<div class="cred-cover">${credIcons[c.type]||''}</div>`;
    const media=c.img
      ?`<button type="button" class="cred-media" onclick="openCredImg(${credentials.indexOf(c)})" aria-label="View ${c.title}"><img src="${c.img}" alt="${c.title}" loading="lazy" onerror="this.outerHTML='${ph}'">${badge}<span class="cred-zoom">⤢ View full</span></button>`
      :`<div class="cred-media">${phPlain}${badge}</div>`;
    return `
    <article class="cred-card" style="--ac:${c.accent||'#3D5BFF'};animation-delay:${i*60}ms">
      ${media}
      <div class="cred-body">
        <h3>${c.title}</h3>
        <dl class="cred-dl">
          <div><dt>Issued by</dt><dd>${c.issuer}</dd></div>
          <div><dt>${c.type==='internship'?'Duration':'Date'}</dt><dd>${c.date}</dd></div>
        </dl>
        <div class="cred-tags">${(c.tags||[]).map(t=>`<i>${t}</i>`).join('')}</div>
      </div>
      <div class="cred-foot">
        <span class="cred-status ${live?'live':'done'}"><i></i>${c.status||'Completed'}</span>
        ${c.url?`<a class="cred-link" href="${c.url}" target="_blank" rel="noopener">View credential <span>↗</span></a>`:''}
      </div>
    </article>`}).join('');
  observeCredCards();
}
function observeCredCards(){
  const cards=[...document.querySelectorAll('#credGrid .cred-card')];
  if(!('IntersectionObserver' in window)){cards.forEach(c=>c.classList.add('in'));return;}
  const io=new IntersectionObserver(es=>{
    const vis=es.filter(e=>e.isIntersecting);
    vis.forEach((e,i)=>{e.target.style.setProperty('--d',(i*110)+'ms');e.target.classList.add('in');io.unobserve(e.target);});
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  cards.forEach(c=>io.observe(c));
}
function animateCredStats(){
  const box=document.getElementById('credStats');
  const run=()=>{
    box.classList.add('counted');
    box.querySelectorAll('.cred-stat b').forEach(b=>{
      const target=parseInt(b.textContent,10)||0,t0=performance.now(),dur=1300;
      (function tick(now){
        const p=Math.min((now-t0)/dur,1),e=1-Math.pow(1-p,3);
        b.textContent=String(Math.round(target*e)).padStart(2,'0');
        if(p<1) requestAnimationFrame(tick);
      })(t0);
    });
  };
  if(!('IntersectionObserver' in window)){run();return;}
  const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){run();io.disconnect();}},{threshold:.4});
  io.observe(box);
}
(function initCredentials(){
  const types=[...new Set(credentials.map(c=>c.type))];
  const row=document.getElementById('credFilter');
  renderCredStats(); animateCredStats();
  if(types.length>1){
    row.hidden=false;
    const cnt=t=>t==='all'?credentials.length:credentials.filter(c=>c.type===t).length;
    row.innerHTML=['all',...types].map((t,i)=>`<button class="cred-tab${i?'':' active'}" data-cf="${t}">${t==='all'?'All':credPlural[t]||t}<em>${cnt(t)}</em></button>`).join('');
    row.addEventListener('click',e=>{
      const b=e.target.closest('[data-cf]'); if(!b) return;
      row.querySelectorAll('.cred-tab').forEach(x=>x.classList.remove('active'));
      b.classList.add('active'); renderCredentials(b.dataset.cf);
    });
  }
  renderCredentials();
})();
function renderProjects(filter="all"){
  const grid=document.getElementById('projectsGrid');
  const filtered=filter==="all"?projects:projects.filter(p=>p.cat===filter);
  grid.innerHTML=filtered.map(p=>`
    <article class="p-card" onclick="openModal(${projects.indexOf(p)})">
      <div class="p-thumb"><img src="${p.img}" alt="${p.title}" loading="lazy" decoding="async"><div class="p-thumb-top"><span class="pill">${p.cat}</span><span class="pill dark">${p.year}</span></div></div>
      <div class="p-body"><h3>${p.title}</h3><p>${p.desc}</p><div class="p-foot"><div class="p-tags">${p.tags.map(t=>`<i>${t}</i>`).join('')}</div><span class="p-arrow">↗</span></div></div>
    </article>
  `).join('');
}
function renderTimeline(){
  document.getElementById('timeline').innerHTML=timelineData.map(t=>`
    <div class="t-item"><div class="t-dot">${t.icon}</div><div class="t-content"><div><h4><span>${t.org}</span>${t.title}</h4><p>${t.desc}</p></div><div class="t-meta"><span class="t-year">${t.year}</span><span class="t-badge ${t.badgeClass}">${t.badge}</span></div></div></div>
  `).join('');
}
renderProjects(); renderTimeline();
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active'); renderProjects(btn.dataset.filter);
  });
});
function openModal(idx){
  const p=projects[idx];
  document.getElementById('modalImg').src=p.img;
  document.getElementById('modalCat').textContent=p.cat;
  document.getElementById('modalYear').textContent=p.year;
  document.getElementById('modalTitle').textContent=p.title;
  document.getElementById('modalDesc').textContent=p.desc+" — Explore the full case study, architecture notes, and lessons learned. Built with attention to performance, accessibility, and delightful micro-interactions.";
  document.getElementById('modalTags').innerHTML=p.tags.map(t=>`<span class="tag">${t}</span>`).join('');
  [['modalDemo',p.demo],['modalCode',p.code]].forEach(([id,url])=>{
    const a=document.getElementById(id); if(!a) return;
    if(url){ a.href=url; a.hidden=false; } else { a.removeAttribute('href'); a.hidden=true; }
  });
  document.getElementById('modal').classList.add('open'); document.body.style.overflow='hidden';
}
function closeModal(){ document.getElementById('modal').classList.remove('open'); document.body.style.overflow=''; }
window.openModal=openModal; window.closeModal=closeModal;
function showToast(msg){
  const t=document.getElementById('toast');
  document.getElementById('toastMsg').textContent=msg;
  t.classList.add('show'); clearTimeout(t._timer); t._timer=setTimeout(()=>t.classList.remove('show'),2600);
}
window.showToast=showToast;
async function handleSubmit(e){
  e.preventDefault();
  const f=e.target, btn=f.querySelector('button[type="submit"]'), orig=btn.innerHTML;
  const ins=f.querySelectorAll('input'), name=ins[0].value.trim(), email=ins[1].value.trim();
  const topic=f.querySelector('select').value, message=f.querySelector('textarea').value.trim();
  if(message.length<5){ showToast('Please write a short message first.'); return; }
  btn.innerHTML='Sending…'; btn.disabled=true;
  const done=()=>{ btn.innerHTML='Sent ✓'; btn.style.background='var(--ink)'; f.reset(); setTimeout(()=>{ btn.innerHTML=orig; btn.disabled=false; btn.style.background=''; },2000); };
  const M=window.MAIL||{};
  if(M.key){
    const ok=await M.send({subject:'Portfolio message — '+topic,from_name:name,name,email,topic,message});
    if(ok){ done(); showToast("Message sent — I'll reply within 12 hours"); }
    else { btn.innerHTML=orig; btn.disabled=false; showToast('Could not send right now — please try again.'); }
  }else{
    const body=['Name: '+name,'Email: '+email,'Topic: '+topic,'','Message:',message].join('\n');
    window.location.href='mailto:'+(M.email||'mramankirar@gmail.com')+'?subject='+encodeURIComponent('Portfolio message — '+topic)+'&body='+encodeURIComponent(body);
    done(); showToast('Your email app opened — press Send to deliver your message.');
  }
}
window.handleSubmit=handleSubmit;
const hamburger=document.getElementById('hamburger');
const mobileMenu=document.getElementById('mobileMenu');
let menuOpen=false;
hamburger.addEventListener('click',()=>{
  menuOpen=!menuOpen; mobileMenu.classList.toggle('open',menuOpen);
  hamburger.textContent=menuOpen?'✕':'☰'; document.body.style.overflow=menuOpen?'hidden':'';
});
window.closeMenu=()=>{ menuOpen=false; mobileMenu.classList.remove('open'); hamburger.textContent='☰'; document.body.style.overflow=''; };
document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ closeModal(); closeMenu(); }});
