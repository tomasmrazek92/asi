"use strict";(()=>{var i=!1,o=".navbar_wrapper",p=".nav_links",f=".nav_links-inner",u=".nav_link",h="[nav-description]",w=".nav_dropdown-menu_description p",e=".nav_ham";function T(){return gsap.timeline({paused:!0,onComplete:()=>{v()}}).fromTo(p,{display:"none"},{display:"flex"},"<").fromTo(f,{yPercent:-100},{yPercent:0},"<")}var c,v=()=>{i?$("html, body").scrollTop(c).removeClass("overflow-hidden"):(c=$(window).scrollTop(),$("html, body").scrollTop(0).addClass("overflow-hidden")),i=!i},a,t;ScrollTrigger.matchMedia({"(max-width: 991px)":function(){a=T(),t=x()}});$(e).on("click",()=>_());window.onscroll=()=>{let n=$(o).height();$(o)&&(window.scrollY>n/2?$(o).addClass("pinned"):$(o).removeClass("pinned"))};$(document).on("click",function(n){var l=".nav_dropdown";setTimeout(function(){$(".w-dropdown-toggle").hasClass("w--open")?$(o).addClass("open"):$(o).removeClass("open")},10)});$(".nav_dropdown-menu_links").find(u).on("mouseenter",function(){var n=$(this).index(),l=$(this).children("div").eq(0).children().eq(0).text(),r=$(this).closest(".nav_dropdown-menu"),s=r.find(w),d=r.find(h),m=s.eq(n);$(s).hide(),d.text(l),$(m,d).fadeTo("fast",1)});function _(){a&&y()}function y(){i?(a.reverse(),t.reverse(),v()):(a.play(),t.play())}function x(){var n=new TimelineMax({paused:!0});return n.fromTo($(e).find(".nav_ham-line").eq(0),.2,{y:"0"},{y:"4"}).fromTo($(e).find(".nav_ham-line").eq(2),.2,{y:"0"},{y:"-4"},"<").fromTo($(e).find(".nav_ham-line").eq(1),.2,{xPercent:0,opacity:1},{xPercent:100,opacity:0},"<").fromTo($(e).find(".nav_ham-line").eq(0),.2,{rotationZ:0},{rotationZ:45}).fromTo($(e).find(".nav_ham-line").eq(2),.2,{rotationZ:0},{rotationZ:-45},"<"),n}})();