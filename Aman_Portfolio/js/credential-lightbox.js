function openCredImg(i){const c=credentials[i];if(!c||!c.img)return;document.getElementById('credLbImg').src=c.img;document.getElementById('credLbCap').textContent=c.title+' — '+c.issuer;document.getElementById('credLb').classList.add('open');document.body.style.overflow='hidden'}
function closeCredImg(){document.getElementById('credLb').classList.remove('open');document.body.style.overflow=''}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeCredImg()});
window.openCredImg=openCredImg;window.closeCredImg=closeCredImg;
