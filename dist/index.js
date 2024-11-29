"use strict";(()=>{gsap.registerPlugin(ScrollTrigger,Flip);$(document).ready(()=>{for(var t=document.getElementsByTagName("a"),e=window.location.hostname,n=0;n<t.length;n++){var a=t[n],i=a.hostname;i!==e&&a.setAttribute("target","_blank")}});var g=!1;function v(){return $(window).width()>991}function x(t,e){let n;return function(...a){let i=this;clearTimeout(n),n=setTimeout(()=>t.apply(i,a),e)}}function E(){let t,e;ScrollTrigger.defaults({markers:!0,anticipatePin:1,ease:"none"});function n(){t&&(t.kill(!0),t=null),e&&(e.kill(!0),e=null),gsap.set("[data-gsap-clearProps]",{clearProps:"all"}),gsap.set("[data-sticky-visual]",{clearProps:"all"}),gsap.set(".pin-spacer",{clearProps:"all"})}function a(){n();let i=$('[data-sticky-visual="animated"]').children(),o=0,l=0,s;function d(){return o=0,i.each(function(r){let c=$(this).height();o+=c,r===i.length-1&&(s=o-c)}),s}function m(r){let c=$(r),f=c.length;c.each(function(u){$(this).css("z-index",f-u)})}gsap.set(i,{position:"absolute"}),m(i),t=gsap.timeline({scrollTrigger:{trigger:'[data-sticky-visual="animated"]',start:"center center",end:()=>`+=${d()}`,pin:!0,scrub:!0,invalidateOnRefresh:!0}}),i.each(function(r){r!==i.length-1&&t.to($(this),{ease:"none",clipPath:"inset(0px 0px 100%)"})})}ScrollTrigger.matchMedia({"(min-width: 992px)":a})}function P(){let t=$(".nav"),e=0,n=x(()=>{let a=window.scrollY;a>e&&a>50&&!g?gsap.to(t,{y:"-200%",duration:1,ease:"power2.out"}):a<e&&gsap.to(t,{y:"0%",duration:1,ease:"power2.out"}),e=a},10);window.addEventListener("scroll",n)}function y(){function t(){g?(g=!1,lenis.start()):(g=!0,lenis.stop())}$('[scroll="toggle"]').on("click",t);let e=[991,767,479],n=window.innerWidth;function a(){let i=window.innerWidth;e.forEach(o=>{g&&(n<=o&&i>o||n>=o&&i<o)&&lenis.start()}),n=i}window.addEventListener("resize",a)}function z(){let t=$(".card"),e=Math.floor(t.length/2),n=t.eq(e),a=-6;t.each(function(o){let l=$(this),s=Math.abs(o-e)*1,d=t.length-Math.abs(o-e);o<e?l.addClass("before-middle"):o>e?l.addClass("after-middle"):l.addClass("middle-item"),l.css({"--distance":"0em","margin-left":`${a}em`,"margin-right":`${a}em`,"--depth":`${s}em`,"z-index":d})}),n.addClass("middle"),$(".middle").each(function(){let o=$(this);o.prevAll(".card").slice(0,3).each(function(l){$(this).addClass(l===0?"first":l===1?"second":"third")}),o.nextAll(".card").slice(0,3).each(function(l){$(this).addClass(l===0?"first":l===1?"second":"third")})});let i=gsap.timeline({scrollTrigger:{trigger:$(".card-wrap"),start:"top bottom",end:"bottom center",scrub:!0}});i.fromTo($(".card-row"),{"--rowX":"120em","--rotationX":"-30deg","--angle":"80deg"},{"--rowX":"0em","--rotationX":"-0deg","--angle":"90deg",ease:"none"}),i.to(t.filter(".before-middle"),{"--zDepth":"-12em",ease:"none"}),i.to(t.filter(".after-middle"),{"--zDepth":"12em",ease:"none"},"<"),i.fromTo(n,{"--depth":"-7em","--angle":"90deg"},{"--angle":"0deg",ease:"none"},"<"),i.to(n,{"--zDepth":"5em",ease:"none"}),i.to(t.not(n),{"--depth":"5em",ease:"none"},"<")}function D(){$(".section.cc-hp-timeline").each(function(t){let e=$(this),n=e.find(".timeline-wrap"),a=e.find("[flip-origin]"),i=e.find("[flip-target]"),o=e.find("[data-label-el]"),l=t,s,d;a.each(function(r){let c=`${l}-${r}`;$(this).attr("data-flip-id",c),i.eq(r).attr("data-flip-id",c)});function m(){let r=v();s&&(s.kill(),gsap.set(n,{clearProps:"all"}),gsap.set(i,{clearProps:"all"}),gsap.set(o,{clearProps:"all"}));let c=Flip.getState(a);s=gsap.timeline({scrollTrigger:{trigger:$(".timeline-box"),start:"top bottom",end:"top center",scrub:!0}}),s.add(Flip.from(c,{targets:i,ignore:"height",ease:"none"}));function f(){let T=this.progress(),b=0+(180-0)*T,k=Math.floor(b/60),C=Math.floor(b%60),S=`${k}:${C.toString().padStart(2,"0")}`;T===0?o.find("div").text("Now"):o.find("div").text("+"+S+"h")}let u=$("[data-label-end]"),h=o.filter(":visible")[0].getBoundingClientRect(),p=u[0].getBoundingClientRect(),w=p.left+p.width/2-(h.left+h.width/2);s.to(r?o:n,{x:r?`+=${w}`:`-=${w}`,ease:"none",onUpdate:f},"<0.2"),s.to(o,{backgroundColor:"red",color:"white",duration:0})}m(),window.addEventListener("resize",function(){clearTimeout(d),d=setTimeout(function(){m()},250)})})}function I(){let t=$("[data-timeline-mask]"),e,n;function a(){let i=v();e&&(e.kill(),gsap.set(t,{clearProps:"all"})),e=gsap.timeline({scrollTrigger:{trigger:$(".visual-box.cc-new-gen"),start:"bottom bottom",endTrigger:$(".timeline-box"),end:"bottom bottom",scrub:!0}}),i&&e.to($("[data-timeline-mask]"),{height:"70%",yPercent:-30,ease:"none"},"<")}a(),window.addEventListener("resize",function(){clearTimeout(n),n=setTimeout(function(){a()},250)})}E();P();y();z();I();D();})();
