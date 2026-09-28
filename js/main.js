(function(){
  "use strict";
  // Intro overlay
  // Intro overlay: once per visit, short, never for reduced motion
  var intro=document.getElementById("intro");
  if(intro){
    var seen=false;
    try{seen=sessionStorage.getItem("vm-intro")==="1";sessionStorage.setItem("vm-intro","1");}catch(e){}
    if(seen||window.matchMedia("(prefers-reduced-motion: reduce)").matches){intro.remove();}
    else{
      var hide=function(){intro.classList.add("done");setTimeout(function(){intro.remove();},800);};
      window.addEventListener("load",function(){setTimeout(hide,700);});
      setTimeout(hide,2200); // never hold the page on a slow connection
    }
  }

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
    var setOpen=function(open){
      menu.classList.toggle("open",open);
      burger.setAttribute("aria-expanded",String(open));
      burger.setAttribute("aria-label",open?"Close menu":"Open menu");
    };
    burger.addEventListener("click",function(){setOpen(!menu.classList.contains("open"));});
    menu.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){setOpen(false);});});
    document.addEventListener("keydown",function(e){if(e.key==="Escape"&&menu.classList.contains("open")){setOpen(false);burger.focus();}});
  }

  // Reveal on scroll
  if(!("IntersectionObserver" in window)){document.querySelectorAll(".reveal").forEach(function(el){el.classList.add("in");});return;}
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
