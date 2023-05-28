"use strict";(()=>{var G=class extends Error{};var y=class extends G{constructor(){super("Zone is an abstract class")}};var p=class{get type(){throw new y}get name(){throw new y}get ianaName(){return this.name}get isUniversal(){throw new y}offsetName(e,r){throw new y}formatOffset(e,r){throw new y}offset(e){throw new y}equals(e){throw new y}get isValid(){throw new y}};var z={};function Ke(t){return z[t]||(z[t]=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:t,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",era:"short"})),z[t]}var Qe={year:0,month:1,day:2,era:3,hour:4,minute:5,second:6};function Xe(t,e){let r=t.format(e).replace(/\u200E/g,""),n=/(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(r),[,s,a,u,i,l,h,S]=n;return[u,s,a,i,l,h,S]}function et(t,e){let r=t.formatToParts(e),n=[];for(let s=0;s<r.length;s++){let{type:a,value:u}=r[s],i=Qe[a];a==="era"?n[i]=u:g(i)||(n[i]=parseInt(u,10))}return n}var R={},c=class extends p{static create(e){return R[e]||(R[e]=new c(e)),R[e]}static resetCache(){R={},z={}}static isValidSpecifier(e){return this.isValidZone(e)}static isValidZone(e){if(!e)return!1;try{return new Intl.DateTimeFormat("en-US",{timeZone:e}).format(),!0}catch{return!1}}constructor(e){super(),this.zoneName=e,this.valid=c.isValidZone(e)}get type(){return"iana"}get name(){return this.zoneName}get isUniversal(){return!1}offsetName(e,{format:r,locale:n}){return P(e,r,n,this.name)}formatOffset(e,r){return x(this.offset(e),r)}offset(e){let r=new Date(e);if(isNaN(r))return NaN;let n=Ke(this.name),[s,a,u,i,l,h,S]=n.formatToParts?et(n,r):Xe(n,r);i==="BC"&&(s=-Math.abs(s)+1);let b=J({year:s,month:a,day:u,hour:l===24?0:l,minute:h,second:S,millisecond:0}),_=+r,O=_%1e3;return _-=O>=0?O:1e3+O,(b-_)/(60*1e3)}equals(e){return e.type==="iana"&&e.name===this.name}get isValid(){return this.valid}};var B=null,f=class extends p{static get utcInstance(){return B===null&&(B=new f(0)),B}static instance(e){return e===0?f.utcInstance:new f(e)}static parseSpecifier(e){if(e){let r=e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);if(r)return new f(A(r[1],r[2]))}return null}constructor(e){super(),this.fixed=e}get type(){return"fixed"}get name(){return this.fixed===0?"UTC":`UTC${x(this.fixed,"narrow")}`}get ianaName(){return this.fixed===0?"Etc/UTC":`Etc/GMT${x(-this.fixed,"narrow")}`}offsetName(){return this.name}formatOffset(e,r){return x(this.fixed,r)}get isUniversal(){return!0}offset(){return this.fixed}equals(e){return e.type==="fixed"&&e.fixed===this.fixed}get isValid(){return!0}};function g(t){return typeof t=="undefined"}function I(t,e=2){let r=t<0,n;return r?n="-"+(""+-t).padStart(e,"0"):n=(""+t).padStart(e,"0"),n}function X(t){if(!(g(t)||t===null||t===""))return parseInt(t,10)}function ee(t){if(!(g(t)||t===null||t==="")){let e=parseFloat("0."+t)*1e3;return Math.floor(e)}}function J(t){let e=Date.UTC(t.year,t.month-1,t.day,t.hour,t.minute,t.second,t.millisecond);return t.year<100&&t.year>=0&&(e=new Date(e),e.setUTCFullYear(t.year,t.month-1,t.day)),+e}function P(t,e,r,n=null){let s=new Date(t),a={hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"};n&&(a.timeZone=n);let u={timeZoneName:e,...a},i=new Intl.DateTimeFormat(r,u).formatToParts(s).find(l=>l.type.toLowerCase()==="timezonename");return i?i.value:null}function A(t,e){let r=parseInt(t,10);Number.isNaN(r)&&(r=0);let n=parseInt(e,10)||0,s=r<0||Object.is(r,-0)?-n:n;return r*60+s}function x(t,e){let r=Math.trunc(Math.abs(t/60)),n=Math.trunc(Math.abs(t%60)),s=t>=0?"+":"-";switch(e){case"short":return`${s}${I(r,2)}:${I(n,2)}`;case"narrow":return`${s}${r}${n>0?`:${n}`:""}`;case"techie":return`${s}${I(r,2)}${I(n,2)}`;default:throw new RangeError(`Value format ${e} is out of range for property format`)}}var He=/[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;function D(...t){let e=t.reduce((r,n)=>r+n.source,"");return RegExp(`^${e}$`)}function F(...t){return e=>t.reduce(([r,n,s],a)=>{let[u,i,l]=a(e,s);return[{...r,...u},i||n,l]},[{},null,1]).slice(0,2)}function Ze(...t){return(e,r)=>{let n={},s;for(s=0;s<t.length;s++)n[t[s]]=X(e[r+s]);return[n,null,r+s]}}var We=/(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,at=`(?:${We.source}?(?:\\[(${He.source})\\])?)?`,re=/(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,Ue=RegExp(`${re.source}${at}`),ne=RegExp(`(?:T${Ue.source})?`),ot=/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,ut=/(\d{4})-?W(\d\d)(?:-?(\d))?/,lt=/(\d{4})-?(\d{3})/,ct=Ze("weekYear","weekNumber","weekDay"),ft=Ze("year","ordinal"),dt=/(\d{4})-(\d\d)-(\d\d)/,Re=RegExp(`${re.source} ?(?:${We.source}|(${He.source}))?`),mt=RegExp(`(?: ${Re.source})?`);function v(t,e,r){let n=t[e];return g(n)?r:X(n)}function ht(t,e){return[{year:v(t,e),month:v(t,e+1,1),day:v(t,e+2,1)},null,e+3]}function k(t,e){return[{hours:v(t,e,0),minutes:v(t,e+1,0),seconds:v(t,e+2,0),milliseconds:ee(t[e+3])},null,e+4]}function V(t,e){let r=!t[e]&&!t[e+1],n=A(t[e+1],t[e+2]),s=r?null:f.instance(n);return[{},s,e+3]}function H(t,e){let r=t[e]?c.create(t[e]):null;return[{},r,e+1]}var Cr=RegExp(`^T?${re.source}$`);var Ar={GMT:0,EDT:-4*60,EST:-5*60,CDT:-5*60,CST:-6*60,MDT:-6*60,MST:-7*60,PDT:-7*60,PST:-8*60};var $r=D(ot,ne),Vr=D(ut,ne),Hr=D(lt,ne),Zr=D(Ue),Wr=F(ht,k,V,H),Ur=F(ct,k,V,H),Rr=F(ft,k,V,H),zr=F(k,V,H);var qr=F(k);var Yr=D(dt,mt),Gr=D(Re),Pr=F(k,V,H);var ze={weeks:{days:7,hours:7*24,minutes:7*24*60,seconds:7*24*60*60,milliseconds:7*24*60*60*1e3},days:{hours:24,minutes:24*60,seconds:24*60*60,milliseconds:24*60*60*1e3},hours:{minutes:60,seconds:60*60,milliseconds:60*60*1e3},minutes:{seconds:60,milliseconds:60*1e3},seconds:{milliseconds:1e3}},on={years:{quarters:4,months:12,weeks:52,days:365,hours:365*24,minutes:365*24*60,seconds:365*24*60*60,milliseconds:365*24*60*60*1e3},quarters:{months:3,weeks:13,days:91,hours:91*24,minutes:91*24*60,seconds:91*24*60*60,milliseconds:91*24*60*60*1e3},months:{weeks:4,days:30,hours:30*24,minutes:30*24*60,seconds:30*24*60*60,milliseconds:30*24*60*60*1e3},...ze},m=146097/400,N=146097/4800,un={years:{quarters:4,months:12,weeks:m/7,days:m,hours:m*24,minutes:m*24*60,seconds:m*24*60*60,milliseconds:m*24*60*60*1e3},quarters:{months:3,weeks:m/28,days:m/4,hours:m*24/4,minutes:m*24*60/4,seconds:m*24*60*60/4,milliseconds:m*24*60*60*1e3/4},months:{weeks:N/7,days:N,hours:N*24,minutes:N*24*60,seconds:N*24*60*60,milliseconds:N*24*60*60*1e3},...ze},gt=["years","quarters","months","weeks","days","hours","minutes","seconds","milliseconds"],ln=gt.slice(0).reverse();var wt={arab:"[\u0660-\u0669]",arabext:"[\u06F0-\u06F9]",bali:"[\u1B50-\u1B59]",beng:"[\u09E6-\u09EF]",deva:"[\u0966-\u096F]",fullwide:"[\uFF10-\uFF19]",gujr:"[\u0AE6-\u0AEF]",hanidec:"[\u3007|\u4E00|\u4E8C|\u4E09|\u56DB|\u4E94|\u516D|\u4E03|\u516B|\u4E5D]",khmr:"[\u17E0-\u17E9]",knda:"[\u0CE6-\u0CEF]",laoo:"[\u0ED0-\u0ED9]",limb:"[\u1946-\u194F]",mlym:"[\u0D66-\u0D6F]",mong:"[\u1810-\u1819]",mymr:"[\u1040-\u1049]",orya:"[\u0B66-\u0B6F]",tamldec:"[\u0BE6-\u0BEF]",telu:"[\u0C66-\u0C6F]",thai:"[\u0E50-\u0E59]",tibt:"[\u0F20-\u0F29]",latn:"\\d"};var kn=wt.hanidec.replace(/[\[|\]]/g,"").split("");var St=String.fromCharCode(160),Ot=`[ ${St}]`,Wn=new RegExp(Ot,"g");$(document).ready(()=>{gsap.registerPlugin(ScrollTrigger),ScrollTrigger.matchMedia({"(min-width: 992px)":function(){$(".hero-intro").each(function(){let o=$(this),w=$(this).find(".hero-intro_wrap"),d=$(this).find(".header01_visual-box"),T=gsap.timeline({scrollTrigger:{trigger:$(this),start:"top top",end:"center top",scrub:.2,invalidateOnRefresh:!0}}),L,C;function de(){$(o).height(w.height()*2),L=$(".header01_visual-split").height(),C=$(".header01_visual-split").width()}function Nt(){let E=gsap.getProperty(".padding-global","padding-left")*2;return C+E}function me(){let E=$(o).find(".section").eq(0).outerHeight();return E*=-1,E-4}de();function Ye(){$(window).width()>=992?(de(),$(d).width("100vw"),$(d).css({transform:`translateY(${me()}px)`})):$(o).add(d).removeAttr("style")}$(window).on("resize",Ye),T.fromTo(d,{height:"101svh",width:()=>"101svw",y:()=>me()},{height:()=>L,width:()=>C,y:0}),T.fromTo(".nav",{color:"rgba(255, 255, 255, 1)",borderColor:"rgba(225, 228, 234, 0)",backgroundColor:"rgba(255, 255, 255, 0)"},{keyframes:{"30%":{color:"rgba(51, 58, 71, 1)"},"50%":{borderColor:"rgba(225, 228, 234, 1)",backgroundColor:"rgba(255, 255, 255, 1)"}}},"<"),T.to(".header01_content",{keyframes:{"25%":{opacity:1},"50%":{opacity:0}}},"<"),T.fromTo("[hero-intro-move]",{y:"10rem"},{y:"0"},"<"),T.fromTo("[hero-label-move]",{y:"2rem"},{y:"0"},"<"),T.to(".header01_video-overlay",{opacity:0});var Y=new Date,Ge=Y.toLocaleString("en",{month:"short"}).toUpperCase(),Pe=Y.getDate(),Je=Y.getFullYear().toString().slice(-2);$("[dateDay]").text(Pe),$("[dateMonth]").text(Ge),$("[dateYear]").text(Je);var{DateTime:je}=luxon;function he(){var E=je.local(),Be=E.toUTC().toFormat("HHmm");$("[dataTime]").text(Be)}he(),setInterval(he,3e4),$(document).mousemove(function(E){$("[mouseX]").text(E.clientX),$("[mouseY]").text(E.clientY)})})}});function t(){window.innerWidth>=992?($(".hero-intro_wrap").css("color","#333A47"),$(".hero-intro_wrap").fadeTo("fast",1,function(){$(".preloader-div").hide()})):($(".hero-intro_wrap").css("opacity","1"),$(".preloader-div").hide())}$(window).on("resize",t),t();var e=$(".header01_visual-box video"),r=1e3;e.on("play",function(){e.fadeTo(r,1)}).one("timeupdate",function(){setTimeout(function(){e.fadeTo(r,1)},1e3)});let n,s="(min-width: 992px)",a=!1,u=!0,i=$(".cap-slide"),l="swiper-slide-active",h=$(".cap_item-progress-line"),S=".cap_item-mask",Z=$(".cap_head-visual-inner .image"),b=5e3,_=gsap.timeline({paused:!0});function O(o){console.log(o),Z.hide(),$(S).hide(),Z.eq(o).fadeTo("fast",1),setTimeout(function(){i.eq(o).find(S).fadeTo("fast",1)},150)}function oe(){if(!u)return;let o=i.filter("."+l);o.find(h).animate({width:"100%"},b,function(){if(u){ue();let w=o.index(),d=w>=i.length-1?0:w+1;d===w&&(d=w>=i.length-2?0:w+2),i.eq(d).addClass(l),oe(),O(d)}})}let qe=()=>{a=!0,i.eq(0).addClass(l),oe(),i.on("click",function(){if($(window).width()>=992){let o=$(this).index();le(),$(this).addClass(l),$(this).find(h).animate({width:"100%"},200),O(o)}})},ue=()=>{_.clear(),i.removeClass(l),h.css("width","0"),Z.hide(),$(S).hide()},le=()=>{u=!1,i.find(h).stop(!0,!0),ue()};$(window).on("load resize",function(){if(window.matchMedia(s).matches){if(!a){let o=ScrollTrigger.create({trigger:".cap_component",start:"top center",onEnter:()=>{qe(),o.kill()}})}}else a&&(le(),a=!1)});let ce,W=!1,kt=$(".tabs_slider .cardb_visual .dashboard_code-block");function fe(){let o=window.matchMedia("(min-width: 0px) and (max-width: 991px)"),w=window.matchMedia(s);function d(T){let{realIndex:L,activeIndex:C}=T;O(L),h.stop(!0,!0),h.css("width","0"),console.log($(T.slides[L])),$(T.slides[C]).find(h).animate({width:"100%"},b)}w.matches?W&&(ce.destroy(!0,!0),W=!1):o.matches&&(W||(W=!0,ce=new Swiper(".cap_slider",{slidesPerView:1,spaceBetween:16,speed:250,autoplay:{delay:b},loop:!0,observer:!0,slideToClickedSlide:!0,on:{init:function(){console.log(this),d(this)},realIndexChange:function(){console.log("Change"),d(this)}}})))}window.addEventListener("load",function(){fe()}),window.addEventListener("resize",function(){fe()})});})();
