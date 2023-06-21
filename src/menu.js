$(document).ready(() => {
  // ------ MENU
  gsap.registerPlugin(ScrollTrigger);

  // -- Base
  var menuOpenAnim = false;
  var dropdownOpen = false;
  const navbar = '.navbar_wrapper';
  const menuLinksBox = '.nav_links';
  const menuLinks = '.nav_links-inner';
  const menuLinksItems = '.nav_link';
  const dropdownItem = '.nav_dropdown';
  const drodownLink = dropdownItem + '>' + menuLinksItems;
  const dropdownBox = ' .nav_dropdown-menu-box';
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

  // Toggle state for .nav_dropdown click
  function toggleNavDropdownState(self, state) {
    const link = self.closest(dropdownItem).find('> .nav_link');
    const menu = self.closest(dropdownItem).find(dropdownBox);

    $(menuLinksItems).add(dropdownBox).removeClass('w--open');

    if (!dropdownOpen && !state) {
      // States
      dropdownOpen = true;
      selectHighlight(self);

      // Class handling
      link.add(menu).addClass('w--open');
      $(navbar).add('body').addClass('open');

      // Animation
      dropdownAnim(self);
    } else if (!state) {
      selectHighlight(self);
      link.add(menu).addClass('w--open');
      // Animation
      dropdownAnim(self);
    }
  }

  $(drodownLink).on('click', function () {
    toggleNavDropdownState($(this), $(this).hasClass('w--open'));
  });

  // Close the dropdown if clicked outside
  function closeNavDropdown() {
    let list = $(dropdownBox).find('.nav_dropdown-list:visible');
    let duration = 350;
    if ($(window).width() >= 992) {
      $(list)
        .animate({ opacity: 0, minHeight: '25rem' }, duration, function () {
          $(list).attr('style', '');
        })
        .css('overflow', 'visible');

      setTimeout(function () {
        dropdownOpen = false;
        $(menuLinksItems).add(dropdownBox).removeClass('w--open');
        $(navbar).add('body').removeClass('open');
      }, duration / 2); // Halfway through the animation
    } else {
      $(menuLinksItems).add(dropdownBox).removeClass('w--open');
      $('body').removeClass('open');
    }
  }

  $(document).on('click', function (e) {
    if (!$(e.target).closest('.nav').length) {
      closeNavDropdown();
    }
  });

  // Dropdown Texts
  $('.nav_dropdown-menu_links')
    .find(menuLinksItems)
    .on('mouseenter', function () {
      updateDropdownText($(this));
    });

  // -- Functions
  // Responsive Menu Open
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
      closeNavDropdown();
      disableScroll();
    }
  }

  // Handle the Menu Hamburger
  function menuToggle() {
    var tl = new TimelineMax({ paused: true });
    tl.fromTo($(menuButton).find('.nav_ham-line').eq(0), 0.2, { y: '0' }, { y: '6' })
      .fromTo($(menuButton).find('.nav_ham-line').eq(2), 0.2, { y: '0' }, { y: '-6' }, '<')
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

  // Handle the dropdown Text
  function updateDropdownText(elem, hover) {
    // Find the index of the current menu link and text
    var self = $(elem);
    var currentIndex = self.index();
    var name = self.children('div').eq(0).children().eq(0).text();

    // Find the corresponding text inside nav_dropdown-menu_description
    var closestMenu = self.closest('.nav_dropdown-menu');
    var descriptions = closestMenu.find(dropDownDesc);
    var title = closestMenu.find(dropDownTitle);
    var pTag = descriptions.eq(currentIndex);

    // Hide all p tags and fadeIn the current index
    $(menuLinksItems).removeClass('active');
    self.addClass('active');
    $(descriptions).hide();
    title.text(name);
    $(pTag, title).fadeTo('fast', 1);
  }
  // Handle the dropdown click
  function selectHighlight(self) {
    let menuLinks = $(self)
      .closest(dropdownItem)
      .find('.nav_dropdown-menu_links')
      .find(menuLinksItems);
    let currentItem = menuLinks.filter('.w--current');
    let firstLink = menuLinks.eq(0);
    if ($(window).width() >= 992) {
      if (currentItem.length === 0) {
        console.log(firstLink);
        firstLink.addClass('active');
        updateDropdownText(firstLink);
      } else {
        currentItem.addClass('active');
        updateDropdownText(currentItem);
      }
    } else {
      firstLink.removeClass('active');
      currentItem.removeClass('active');
    }
  }

  const dropdownAnim = (self) => {
    // Animation
    return gsap.timeline().fromTo(
      $(self).closest(dropdownItem).find('.nav_dropdown-list'),
      { css: { minHeight: '25rem' } },
      {
        css: { minHeight: '28rem' },
        duration: 0.75,
        ease: Power2.easeOut,
      }
    );
  };
});
