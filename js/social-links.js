/* ===== SOCIAL LINKS — apni asli links sirf yahin badlo, poori site me apne aap lag jaayengi ===== */
(function(){
  var SOCIAL={
    github:   'https://github.com/mramankirar',
    linkedin: 'https://www.linkedin.com/in/amandhakar1480/',
    x:        '',   // apni real link yahan daalo (khaali = button hide)
    readcv:   '',
    dribbble: '',
    email:    'mailto:mramankirar@gmail.com'
  };
  document.querySelectorAll('a[data-social]').forEach(function(a){
    var url=SOCIAL[a.dataset.social];
    if(!url){a.style.display='none';return;}
    a.setAttribute('href',url);
    if(/^https?:/i.test(url)){a.target='_blank';a.rel='noopener noreferrer';}
  });
})();
