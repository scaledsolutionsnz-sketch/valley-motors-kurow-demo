(function(){
  "use strict";
  // Intro overlay
  window.addEventListener("load",function(){
    var intro=document.getElementById("intro");
    if(intro){setTimeout(function(){intro.classList.add("done");},1350);}
  });

  // Hero rotating slides
  var slides=document.querySelectorAll(".hero-slide");
  if(slides.length>1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    var i=0;
    setInterval(function(){
      slides[i].classList.remove("active");
      i=(i+1)%slides.length;
      slides[i].classList.add("active");
    },5500);
  }

  // Mobile menu
  var burger=document.getElementById("burger"),menu=document.getElementById("mobileMenu");
  if(burger&&menu){
    burger.addEventListener("click",function(){menu.classList.toggle("open");});
    menu.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){menu.classList.remove("open");});});
  }

  // Reveal on scroll
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target);}});
  },{threshold:.14});
  document.querySelectorAll(".reveal").forEach(function(el){io.observe(el);});

  // Gmail compose links (built in JS so no raw address in HTML)
  document.querySelectorAll("a[data-gmail]").forEach(function(a){
    var user=a.getAttribute("data-user")||"",domain=a.getAttribute("data-domain")||"";
    var base="https://mail.google.com/mail/?view=cm&fs=1";
    if(user&&domain){base+="&to="+encodeURIComponent(user+"@"+domain);}
    base+="&su="+(a.getAttribute("data-su")||"")+"&body="+(a.getAttribute("data-body")||"");
    a.href=base;a.target="_blank";a.rel="noopener";
  });
})();
