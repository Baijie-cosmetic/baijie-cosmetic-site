(function(){
  function initProductGallery(){
    var gallery=document.querySelector('.product-gallery-block');
    var main=document.querySelector('.product-main-image');
    if(!gallery||!main||gallery.dataset.enhanced==='true') return;
    gallery.dataset.enhanced='true';
    var thumbLinks=Array.prototype.slice.call(document.querySelectorAll('.product-gallery-thumbs a'));
    var sources=thumbLinks.map(function(a){return a.getAttribute('href') || (a.querySelector('img') && a.querySelector('img').getAttribute('src'));}).filter(Boolean);
    if(!sources.length){sources=[main.getAttribute('src')];}
    var idx=Math.max(0,sources.indexOf(main.getAttribute('src')));
    function setActive(){thumbLinks.forEach(function(a,i){a.classList.toggle('active',i===idx);});}
    function show(i){idx=(i+sources.length)%sources.length;main.setAttribute('src',sources[idx]);setActive();}
    thumbLinks.forEach(function(a,i){
      a.removeAttribute('target');
      a.addEventListener('click',function(e){e.preventDefault();show(i);});
    });
    setActive();
    var lightbox=document.createElement('div');
    lightbox.className='product-lightbox';
    lightbox.innerHTML='<button class="product-lightbox-close" type="button" aria-label="Close">×</button><button class="product-lightbox-prev" type="button" aria-label="Previous image">‹</button><img alt="Product image preview"><button class="product-lightbox-next" type="button" aria-label="Next image">›</button>';
    document.body.appendChild(lightbox);
    var lbImg=lightbox.querySelector('img');
    function openLightbox(){lbImg.setAttribute('src',sources[idx]);lightbox.classList.add('open');document.body.style.overflow='hidden';}
    function closeLightbox(){lightbox.classList.remove('open');document.body.style.overflow='';}
    main.addEventListener('click',function(e){e.preventDefault();openLightbox();});
    lightbox.querySelector('.product-lightbox-close').addEventListener('click',closeLightbox);
    lightbox.querySelector('.product-lightbox-next').addEventListener('click',function(e){e.stopPropagation();show(idx+1);lbImg.setAttribute('src',sources[idx]);});
    lightbox.querySelector('.product-lightbox-prev').addEventListener('click',function(e){e.stopPropagation();show(idx-1);lbImg.setAttribute('src',sources[idx]);});
    lightbox.addEventListener('click',function(e){if(e.target===lightbox) closeLightbox();});
    document.addEventListener('keydown',function(e){
      if(!lightbox.classList.contains('open')) return;
      if(e.key==='Escape') closeLightbox();
      if(e.key==='ArrowRight'){show(idx+1);lbImg.setAttribute('src',sources[idx]);}
      if(e.key==='ArrowLeft'){show(idx-1);lbImg.setAttribute('src',sources[idx]);}
    });
    var isMobile=window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
    if(isMobile && sources.length>1){setInterval(function(){show(idx+1);},3500);}
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initProductGallery); else initProductGallery();
})();
