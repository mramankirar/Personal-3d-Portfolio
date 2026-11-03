function photoFallback(img){
  var list = (img.dataset.next || '').split(',').filter(Boolean);
  if(!list.length){
    img.remove();
    document.getElementById('portrait').classList.add('no-photo');
    return;
  }
  img.src = list.shift();
  img.dataset.next = list.join(',');
}