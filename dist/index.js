"use strict";(()=>{gsap.registerPlugin(ScrollTrigger,Flip);$(document).ready(()=>{for(var e=document.getElementsByTagName("a"),n=window.location.hostname,i=0;i<e.length;i++){var a=e[i],t=a.hostname;t!==n&&a.setAttribute("target","_blank")}});var u=!1;function v(e,n){let i;return function(...a){let t=this;clearTimeout(i),i=setTimeout(()=>e.apply(t,a),n)}}function S(){let e,n;ScrollTrigger.defaults({markers:!0,anticipatePin:1,ease:"none"});function i(){e&&(e.kill(!0),e=null),n&&(n.kill(!0),n=null),gsap.set("[data-gsap-clearProps]",{clearProps:"all"}),gsap.set("[data-sticky-visual]",{clearProps:"all"}),gsap.set(".pin-spacer",{clearProps:"all"})}function a(){i();let t=$('[data-sticky-visual="animated"] img'),o=0,l=0,c;function d(){return o=0,t.each(function(r){let s=$(this).height();o+=s,r===t.length-1&&(c=o-s)}),c}function g(r){let s=$(r),m=s.length;s.each(function(f){$(this).css("z-index",m-f)})}gsap.set(t,{position:"absolute"}),g(t),e=gsap.timeline({scrollTrigger:{trigger:'[data-sticky-visual="animated"]',start:()=>`top ${$(".nav_wrap").outerHeight()}`,end:()=>`+=${d()}`,pin:!0,scrub:!0,invalidateOnRefresh:!0}}),t.each(function(r){r!==t.length-1&&e.to($(this),{ease:"none",clipPath:"inset(0px 0px 100%)"})})}ScrollTrigger.matchMedia({"(min-width: 992px)":a})}function x(){let e=$(".nav"),n=0,i=v(()=>{let a=window.scrollY;a>n&&a>50&&!u?gsap.to(e,{y:"-200%",duration:1,ease:"power2.out"}):a<n&&gsap.to(e,{y:"0%",duration:1,ease:"power2.out"}),n=a},10);window.addEventListener("scroll",i)}function k(){function e(){u?(u=!1,lenis.start()):(u=!0,lenis.stop())}$('[scroll="toggle"]').on("click",e);let n=[991,767,479],i=window.innerWidth;function a(){let t=window.innerWidth;n.forEach(o=>{u&&(i<=o&&t>o||i>=o&&t<o)&&lenis.start()}),i=t}window.addEventListener("resize",a)}function C(){let e=$(".card"),n=Math.floor(e.length/2),i=e.eq(n),a=-6;e.each(function(o){let l=$(this),c=Math.abs(o-n)*1,d=e.length-Math.abs(o-n);l.css({"--distance":"0em","margin-left":`${a}em`,"margin-right":`${a}em`,"--depth":`${c}em`,"z-index":d})}),i.addClass("middle"),$(".middle").each(function(){let o=$(this);o.prevAll(".card").slice(0,3).each(function(l){$(this).addClass(l===0?"first":l===1?"second":"third")}),o.nextAll(".card").slice(0,3).each(function(l){$(this).addClass(l===0?"first":l===1?"second":"third")})});let t=gsap.timeline({scrollTrigger:{trigger:$(".card-wrap"),start:"top bottom",end:"bottom center",scrub:!0}});t.fromTo($(".card-row"),{"--rowX":"120em","--rotationX":"-30deg","--angle":"80deg"},{"--rowX":"0em","--rotationX":"-0deg","--angle":"90deg",ease:"none"}),t.to(i,{"--zDepth":"8em",ease:"none"}),t.fromTo(i,{"--depth":"-7em","--angle":"90deg"},{"--angle":"0deg",marginLeft:"3em",marginRight:"3em",ease:"none"},"<")}function y(){gsap.timeline({scrollTrigger:{trigger:$(".timeline-box"),start:"top bottom",end:"top center",scrub:!0}}).to($("[data-timeline-mask]"),{height:"40%",ease:"none"},"<")}$(".section.cc-hp-timeline").each(function(e){let n=$(this),i=n.find("[flip-origin]"),a=n.find("[flip-target]"),t=n.find("[data-label-el]"),o=e,l,c;i.each(function(g){let r=`${o}-${g}`;$(this).attr("data-flip-id",r),a.eq(g).attr("data-flip-id",r)});function d(){l&&(l.kill(),gsap.set(a,{clearProps:"all"}),gsap.set(t,{clearProps:"all"}));let g=Flip.getState(i);l=gsap.timeline({scrollTrigger:{trigger:$(".card-wrap"),start:"top 80%",end:"top center",scrub:!0}}),l.add(Flip.from(g,{targets:a,ignore:"height",ease:"none"}));let r=$("[data-label-end]"),s=t[0].getBoundingClientRect(),m=r[0].getBoundingClientRect(),f=m.left+m.width/2-(s.left+s.width/2);l.to(t,{x:`+=${f}`,ease:"none",onUpdate:function(){let p=this.progress(),h=900+(1140-900)*p,w=Math.floor(h/60),T=Math.floor(h%60),b=`${w}:${T.toString().padStart(2,"0")}`;t.find("div").text(b)}},"<0.2"),l.to(t,{backgroundColor:"red",color:"white"},">-0.15")}d(),window.addEventListener("resize",function(){clearTimeout(c),c=setTimeout(function(){d()},250)})});S();x();k();C();y();})();
