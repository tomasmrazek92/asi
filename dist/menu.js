"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/menu.js
  var menuOpenAnim = false;
  var navbar = ".navbar_wrapper";
  var menuLinksBox = ".nav_links";
  var menuLinks = ".nav_links-inner";
  var menuLinksItems = ".nav_link";
  var dropDownDesc = ".nav_dropdown-menu_description p";
  var menuButton = ".nav_ham";
  function createNavReveal() {
    let navReveal2 = gsap.timeline({
      paused: true,
      onComplete: () => {
        disableScroll();
      }
    }).fromTo(menuLinksBox, { display: "none" }, { display: "flex" }, "<").fromTo(menuLinks, { yPercent: -100 }, { yPercent: 0 }, "<");
    return navReveal2;
  }
  var scrollPosition;
  var disableScroll = () => {
    if (!menuOpenAnim) {
      scrollPosition = $(window).scrollTop();
      $("html, body").scrollTop(0).addClass("overflow-hidden");
    } else {
      $("html, body").scrollTop(scrollPosition).removeClass("overflow-hidden");
    }
    menuOpenAnim = !menuOpenAnim;
  };
  var navReveal;
  var hamAnim;
  ScrollTrigger.matchMedia({
    "(max-width: 991px)": function() {
      navReveal = createNavReveal();
      hamAnim = menuToggle();
    }
  });
  $(menuButton).on("click", () => openMenu());
  window.onscroll = () => {
    let scrollHeight = $(navbar).height();
    if ($(navbar)) {
      if (window.scrollY > scrollHeight / 2) {
        $(navbar).addClass("pinned");
      } else {
        $(navbar).removeClass("pinned");
      }
    }
  };
  $(document).on("click", function(event) {
    var nav_dropdown = ".nav_dropdown";
    console.log($(event.target));
    if (!$(event.target).is(nav_dropdown) && !$(event.target).parents().is(nav_dropdown) || $(event.target).closest(nav_dropdown).find(".w-dropdown-toggle").hasClass("w--open")) {
      $(navbar).removeClass("open");
      return;
    }
    if (!$(navbar).hasClass("pinned")) {
      $(navbar).addClass("open");
    }
  });
  $(".nav_dropdown-menu_links").find(menuLinksItems).on("mouseenter", function() {
    var currentIndex = $(this).index();
    console.log(currentIndex);
    var pTag = $(this).closest(".nav_dropdown-menu").find(dropDownDesc).eq(currentIndex);
    console.log(pTag);
    $(dropDownDesc).hide();
    pTag.fadeTo("fast", 1);
  });
  function openMenu() {
    if (navReveal) {
      playMenuAnimation();
    }
  }
  function playMenuAnimation() {
    if (!menuOpenAnim) {
      navReveal.play();
      hamAnim.play();
    } else {
      navReveal.reverse();
      hamAnim.reverse();
      disableScroll();
    }
  }
  function menuToggle() {
    var tl = new TimelineMax({ paused: true });
    tl.fromTo($(menuButton).find(".nav_ham-line").eq(0), 0.2, { y: "0" }, { y: "4" }).fromTo($(menuButton).find(".nav_ham-line").eq(2), 0.2, { y: "0" }, { y: "-4" }, "<").fromTo(
      $(menuButton).find(".nav_ham-line").eq(1),
      0.2,
      { xPercent: 0, opacity: 1 },
      { xPercent: 100, opacity: 0 },
      "<"
    ).fromTo($(menuButton).find(".nav_ham-line").eq(0), 0.2, { rotationZ: 0 }, { rotationZ: 45 }).fromTo(
      $(menuButton).find(".nav_ham-line").eq(2),
      0.2,
      { rotationZ: 0 },
      { rotationZ: -45 },
      "<"
    );
    return tl;
  }
})();
//# sourceMappingURL=menu.js.map
