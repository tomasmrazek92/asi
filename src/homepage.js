import { DateTime } from 'luxon';

import { createSwiper } from '$utils/globalFunctions';

$(document).ready(() => {
  // ----- HERO Animation
  ScrollTrigger.matchMedia({
    // Have the animation only on desktop
    '(min-width: 992px)': function () {
      // Hero Section
      $('.hero-intro').each(function () {
        let heroIntro = $(this);
        let heroWrap = $(this).find('.hero-intro_wrap');
        let videoBox = $(this).find('.header01_visual-box');
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top top',
            end: 'center top',
            scrub: 0.2,
            invalidateOnRefresh: true,
          },
          paused: true,
        });

        // --- Set Section
        let videoBoxHeight;
        let videoBoxWidth;

        function setSectionHeight() {
          $(heroIntro).height(heroWrap.height() * 2);
          videoBoxHeight = $('.header01_visual-split').height();
          videoBoxWidth = $('.header01_visual-split').width();
        }

        function setVideoWidth() {
          let paddingGlobal = gsap.getProperty('.padding-global', 'padding-left') * 2;
          return videoBoxWidth + paddingGlobal;
        }

        function calculateVideoMove() {
          let topHeight = $(heroIntro).find('.section').eq(0).outerHeight();
          topHeight *= -1;
          return topHeight - 4;
        }

        // Load
        setSectionHeight();

        // Resize
        function handleResize() {
          if ($(window).width() >= 992) {
            setSectionHeight();
            $(videoBox).width('100vw');
            $(videoBox).css({
              transform: `translateY(${calculateVideoMove()}px)`,
            });
          } else {
            $(heroIntro).add(videoBox).removeAttr('style');
          }
        }

        $(window).on('resize', handleResize);

        // --- Create the Animation
        tl.fromTo(
          videoBox,
          {
            height: '101svh',
            width: () => {
              return '101svw';
            },
            y: () => {
              return calculateVideoMove();
            },
          },
          {
            height: () => {
              return videoBoxHeight;
            },
            width: () => {
              return videoBoxWidth;
            },
            y: 0,
          }
        );
        tl.fromTo(
          '.nav',
          {
            color: 'rgba(255, 255, 255, 1)',
            borderColor: 'rgba(234, 236, 240, 0)',
            backgroundColor: 'rgba(255, 255, 255, 0)',
          },
          {
            keyframes: {
              '30%': {
                color: 'rgba(51, 58, 71, 1)',
              },
              '50%': {
                borderColor: 'rgba(234, 236, 240, 1)',
                backgroundColor: 'rgba(255, 255, 255, 1)',
              },
            },
          },
          '<'
        );
        tl.to(
          '.header01_content',
          {
            keyframes: {
              '25%': { opacity: 1 },
              '50%': { opacity: 0 },
            },
          },
          '<'
        );
        tl.fromTo(
          '[hero-intro-move]',
          {
            y: '5rem',
          },
          {
            y: '0',
          },
          '<'
        );

        // Project the Time and Date
        var currentDate = new Date();

        // Date
        var month = currentDate.toLocaleString('en', { month: 'short' }).toUpperCase(); // Using short month format
        var day = currentDate.getDate();
        var year = currentDate.getFullYear().toString().slice(-2); // Getting the last two digits of the year

        // Time
        var { DateTime } = luxon;
        var userLocalTime = luxon.DateTime.local();
        var convertedTime = userLocalTime.toUTC().toFormat('HHmm');

        $('[hero-date]').text(`${day} ${month} ${year}`);

        $('[hero-time]').text(`${convertedTime}[ZULU]`);

        // Mouse Coordinates
        $(document).mousemove(function (event) {
          $('[mouseX]').text(event.clientX);
          $('[mouseY]').text(event.clientY);
        });
      });
    },
  });
  let main;

  // ---- CAPABILITIES

  // Elems
  let items = $('.cap-slide ');
  let activeClass = 'swiper-slide-active';
  let itemMask = '.cap_item-mask';

  // Functions
  function showPar(el) {
    $(itemMask).hide();
    setTimeout(function () {
      $(el).find(itemMask).fadeIn('fast');
    }, 350);
  }

  function updateVisual(index) {
    let visuals = $('.cap_head-visual-inner img');

    // Hide All
    visuals.hide();

    // Show Current
    visuals.eq(index).show();
  }

  function updateItem(el) {
    let self = $(el);
    let index = self.index();

    // Wait for Trainsition
    showPar(self);

    // Remove All
    items.removeClass(activeClass);

    // Add Current
    self.addClass(activeClass);

    // Show Visual
    updateVisual(index);
  }

  // Actions
  items.on('click', function (el) {
    if ($(window).width() >= 992) {
      updateItem(el);
    }
  });

  /* Swiper */
  let swiper;
  let init = false;

  function swiperMode() {
    const mobile = window.matchMedia('(min-width: 0px) and (max-width: 991px)');
    const desktop = window.matchMedia('(min-width: 992px)');

    // Disable (for desktop)
    if (desktop.matches) {
      if (init) {
        if (swiper) {
          swiper.destroy(true, true);
        }
        init = false;
      }
    }

    // Enable (Mobil)
    else if (mobile.matches) {
      if (!init) {
        init = true;
        swiper = new Swiper('.cap_slider', {
          // Optional parameters
          slidesPerView: 1,
          spaceBetween: 16,
          on: {
            init: () => {
              updateItem($(items.eq(0)));
            },
            slideChangeTransitionStart: (swiper) => {
              var { activeIndex } = swiper;
              updateItem(items.eq(activeIndex));
            },
          },
        });
      }
    }
  }

  /* On Resize*/
  window.addEventListener('resize', function () {
    swiperMode();
  });

  // On Load
  window.addEventListener('load', function () {
    items.eq(0).click();
    swiperMode();
  });
});
