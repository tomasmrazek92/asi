$(document).ready(() => {
  // ------ MENU
  gsap.registerPlugin(ScrollTrigger);

  // -- Base
  var menuOpenAnim = false;
  const navbar = '.navbar_wrapper';
  const menuLinksBox = '.nav_links';
  const menuLinks = '.nav_links-inner';
  const menuLinksItems = '.nav_link';
  const dropDownTitle = '[nav-description]';
  const dropDownDesc = '.nav_dropdown-menu_description p';
  const menuButton = '.nav_ham';

  // -- Menu Animation
  function createNavReveal() {
    let navReveal = gsap
      .timeline({
        paused: true,
        onComplete: () => {
          disableScroll();
        },
        onReverseComplete: () => {
          $(navbar).removeClass('open');
        },
      })
      .fromTo(menuLinksBox, { display: 'none' }, { display: 'flex' }, '<')
      .fromTo(menuLinks, { yPercent: -100 }, { yPercent: 0 }, '<');
    return navReveal;
  }

  // Scroll Disabler
  let scrollPosition;
  const disableScroll = () => {
    if (!menuOpenAnim) {
      scrollPosition = $(window).scrollTop();
      $('html, body').scrollTop(0).addClass('overflow-hidden');
    } else {
      $('html, body').scrollTop(scrollPosition).removeClass('overflow-hidden');
    }
    menuOpenAnim = !menuOpenAnim;
  };

  let navReveal;
  let hamAnim;

  // GSAP's matchMedia
  ScrollTrigger.matchMedia({
    '(max-width: 991px)': function () {
      // Apply the animation only on screens with a max-width of 991px
      navReveal = createNavReveal();
      hamAnim = menuToggle();
    },
  });

  // -- Actions
  // Open on Click
  $(menuButton).on('click', () => openMenu());

  // Add class on scroll
  window.onscroll = () => {
    let scrollHeight = $(navbar).height();
    if ($(navbar)) {
      if (window.scrollY > scrollHeight / 2) {
        $(navbar).addClass('pinned');
      } else {
        $(navbar).removeClass('pinned');
      }
    }
  };

  // Add "open" class to navbar if dropdown is open
  $(document).on('click', function (event) {
    if ($(window).width() >= 992) {
      // Click outside of menu
      setTimeout(function () {
        if ($('.w-dropdown-toggle').hasClass('w--open')) {
          $(navbar).add('body').addClass('open');
        } else {
          $(navbar).add('body').removeClass('open');
        }
      }, 20);
    }
  });

  // Dropdown Link Click Desktop
  $(document).ready(function () {
    // Function to handle the dropdown click
    function handleDropdownClick() {
      let firstLink = $(this)
        .closest('.w-dropdown')
        .find('.nav_dropdown-menu_links')
        .find(menuLinksItems)
        .eq(0);
      if ($(window).width() >= 992) {
        firstLink.addClass('active');
      } else {
        firstLink.removeClass('active');
      }
      gsap.timeline().fromTo(
        $(this).closest('.w-dropdown').find('.nav_dropdown-list'),
        { css: { minHeight: '25rem' } },
        {
          css: { minHeight: '28rem' },
          duration: 0.75,
          ease: Power2.easeOut,
        }
      );
    }
    // Check window width on window resize
    $('.w-dropdown-toggle').on('click', handleDropdownClick);
  });

  // Dropdown Texts
  $('.nav_dropdown-menu_links')
    .find(menuLinksItems)
    .on('mouseenter', function () {
      // Find the index of the current menu link and text
      var currentIndex = $(this).index();
      var name = $(this).children('div').eq(0).children().eq(0).text();

      // Find the corresponding text inside nav_dropdown-menu_description
      var closestMenu = $(this).closest('.nav_dropdown-menu');
      var descriptions = closestMenu.find(dropDownDesc);
      var title = closestMenu.find(dropDownTitle);
      var pTag = descriptions.eq(currentIndex);

      // Hide all p tags and fadeIn the current index
      $(menuLinksItems).removeClass('active');
      $(descriptions).hide();
      title.text(name);
      $(pTag, title).fadeTo('fast', 1);
    });

  // -- Functions
  function openMenu() {
    if (navReveal) {
      playMenuAnimation();
    }
  }

  function playMenuAnimation() {
    if (!menuOpenAnim) {
      navReveal.play();
      hamAnim.play();
      $(navbar).addClass('open');
    } else {
      navReveal.reverse();
      hamAnim.reverse();
      disableScroll();
    }
  }

  function menuToggle() {
    var tl = new TimelineMax({ paused: true });
    tl.fromTo($(menuButton).find('.nav_ham-line').eq(0), 0.2, { y: '0' }, { y: '4' })
      .fromTo($(menuButton).find('.nav_ham-line').eq(2), 0.2, { y: '0' }, { y: '-4' }, '<')
      .fromTo(
        $(menuButton).find('.nav_ham-line').eq(1),
        0.2,
        { xPercent: 0, opacity: 1 },
        { xPercent: 100, opacity: 0 },
        '<'
      )
      .fromTo($(menuButton).find('.nav_ham-line').eq(0), 0.2, { rotationZ: 0 }, { rotationZ: 45 })
      .fromTo(
        $(menuButton).find('.nav_ham-line').eq(2),
        0.2,
        { rotationZ: 0 },
        { rotationZ: -45 },
        '<'
      );

    return tl;
  }
});
