/* FPS meter: URL ke end me ?fps lagao (jaise  portfolio.html?fps) */
if(location.search.indexOf('fps')>-1){
  var el=document.createElement('div');el.id='fpsMeter';el.textContent='-- fps';document.body.appendChild(el);
  var n=0,t=performance.now();
  (function loop(){n++;var now=performance.now();
    if(now-t>=500){el.textContent=Math.round(n*1000/(now-t))+' fps';n=0;t=now;}
    requestAnimationFrame(loop);})();
}
