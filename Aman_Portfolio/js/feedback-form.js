(function(){
  // Email delivery is configured in js/mail-config.js (paste your Web3Forms Access Key there).
  const FEEDBACK_EMAIL=(window.MAIL&&MAIL.email)||"mramankirar@gmail.com";
  const $=id=>document.getElementById(id);
  const form=$('fbForm'); if(!form) return;
  const labels=["Poor","Fair","Good","Very good","Excellent"];
  let rating=0;
  const stars=[...document.querySelectorAll('#fbRate button')];
  const paint=n=>stars.forEach((b,i)=>b.classList.toggle('on',i<n));
  const setRate=n=>{
    rating=n;paint(n);
    stars.forEach((b,i)=>b.setAttribute('aria-checked',String(i+1===n)));
    $('fbRateText').textContent=n?n+' / 5 — '+labels[n-1]:'Select a rating';
    $('fbErrRate').textContent='';$('fbRate').closest('.fb-block').classList.remove('invalid');
  };
  stars.forEach(b=>{
    b.addEventListener('click',()=>setRate(+b.dataset.v));
    b.addEventListener('mouseenter',()=>paint(+b.dataset.v));
    b.addEventListener('focus',()=>paint(+b.dataset.v));
  });
  $('fbRate').addEventListener('mouseleave',()=>paint(rating));
  $('fbRate').addEventListener('keydown',e=>{
    if(e.key==='ArrowRight'||e.key==='ArrowUp'){e.preventDefault();setRate(Math.min(5,rating+1));stars[Math.min(5,rating)-1].focus();}
    if(e.key==='ArrowLeft'||e.key==='ArrowDown'){e.preventDefault();setRate(Math.max(1,rating-1));stars[Math.max(1,rating)-1].focus();}
  });
  $('fbChips').addEventListener('click',e=>{
    const b=e.target.closest('button');if(!b)return;
    b.setAttribute('aria-pressed',String(b.getAttribute('aria-pressed')!=='true'));
  });
  const msg=$('fbMsg');
  msg.addEventListener('input',()=>{$('fbCount').textContent=msg.value.length+' / 600';msg.closest('.field').classList.remove('invalid');$('fbErrMsg').textContent='';});
  $('fbEmail').addEventListener('input',()=>{$('fbEmail').closest('.field').classList.remove('invalid');$('fbErrEmail').textContent='';});

  function validate(){
    let ok=true;
    if(!rating){$('fbErrRate').textContent='Please choose a rating.';$('fbRate').closest('.fb-block').classList.add('invalid');ok=false;}
    const em=$('fbEmail').value.trim();
    if(em&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)){$('fbErrEmail').textContent='Enter a valid email address.';$('fbEmail').closest('.field').classList.add('invalid');ok=false;}
    if(msg.value.trim().length<10){$('fbErrMsg').textContent='Please write at least 10 characters.';msg.closest('.field').classList.add('invalid');ok=false;}
    return ok;
  }
  function finish(text){
    $('fbDoneMsg').textContent=text;
    form.hidden=true;$('fbDone').hidden=false;
  }
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if($('fbHp').value) return;
    if(!validate()){const first=form.querySelector('.invalid');if(first)first.scrollIntoView({behavior:'smooth',block:'center'});return;}
    const topics=[...document.querySelectorAll('#fbChips [aria-pressed="true"]')].map(b=>b.textContent);
    const data={rating,topics,name:$('fbName').value.trim(),email:$('fbEmail').value.trim(),role:$('fbRole').value,message:msg.value.trim(),page:location.href,submitted:new Date().toISOString()};
    const btn=$('fbSubmit'),orig=btn.innerHTML;btn.disabled=true;btn.innerHTML='Submitting…';
    const body=['Rating: '+rating+'/5 ('+labels[rating-1]+')','Topics: '+(topics.join(', ')||'—'),'Role: '+(data.role||'—'),'Name: '+(data.name||'Anonymous'),'Email: '+(data.email||'—'),'','Feedback:',data.message].join('\n');
    if(window.MAIL&&MAIL.key){
      const ok=await MAIL.send({subject:'Portfolio feedback — '+rating+'/5',from_name:data.name||'Anonymous',name:data.name||'Anonymous',email:data.email||undefined,message:body});
      if(ok) finish('Your feedback has been received. I read every response and use it to keep improving.');
      else if(window.showToast) showToast('Could not send right now — please try again.');
    }else{
      window.location.href='mailto:'+FEEDBACK_EMAIL+'?subject='+encodeURIComponent('Portfolio feedback — '+rating+'/5')+'&body='+encodeURIComponent(body);
      finish('Your email app has opened with your feedback ready — just press Send to deliver it. Thank you!');
    }
    btn.disabled=false;btn.innerHTML=orig;
  });
  $('fbAgain').addEventListener('click',()=>{
    form.reset();setRate(0);$('fbCount').textContent='0 / 600';
    document.querySelectorAll('#fbChips button').forEach(b=>b.setAttribute('aria-pressed','false'));
    $('fbDone').hidden=true;form.hidden=false;
  });
})();
