import { DateTime } from 'luxon';

import { createSwiper } from '$utils/globalFunctions';

$(document).ready(() => {
  gsap.registerPlugin(ScrollTrigger);

  // --- HERO Animation
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
            y: '10rem',
          },
          {
            y: '0',
          },
          '<'
        );
        tl.fromTo(
          '[hero-label-move]',
          {
            y: '2rem',
          },
          {
            y: '0',
          },
          '<'
        );
        tl.to('.header01_video-overlay', {
          opacity: 0,
        });

        // Project the Time and Date
        var currentDate = new Date();

        // Date
        var month = currentDate.toLocaleString('en', { month: 'short' }).toUpperCase(); // Using short month format
        var day = currentDate.getDate();
        var year = currentDate.getFullYear().toString().slice(-2); // Getting the last two digits of the year

        $('[dateDay]').text(day);
        $('[dateMonth]').text(month);
        $('[dateYear]').text(year);

        // Time
        var { DateTime } = luxon;

        function updateTime() {
          var userLocalTime = DateTime.local();
          var convertedTime = userLocalTime.toUTC().toFormat('HHmm');
          $('[dataTime]').text(convertedTime);
        }

        // Load
        updateTime();
        // Real Time
        setInterval(updateTime, 30000);

        // Mouse Coordinates
        $(document).mousemove(function (event) {
          $('[mouseX]').text(event.clientX);
          $('[mouseY]').text(event.clientY);
        });
      });
    },
  });

  // Init Reveal
  if (window.innerWidth >= 992) {
    $('.hero-intro_wrap').css('color', '#333A47');
    $('.hero-intro_wrap').fadeTo('fast', 1, function () {
      $('.preloader-div').hide();
    });
  }

  // Video Load
  var $video = $('.header01_visual-box video');
  var fadeDuration = 1000; // 1000 milliseconds

  $video
    .on('play', function () {
      console.log('Loaded');
      $video.fadeTo(fadeDuration, 1);
    })
    .one('timeupdate', function () {
      setTimeout(function () {
        console.log('Timeout triggered');
        $video.fadeTo(fadeDuration, 1);
      }, 3000); // 3000 milliseconds (3 seconds)
    });

  let main;

  // ---- CAPABILITIES
  // Elems
  const responsive = '(min-width: 992px)';
  let isInitialized = false;
  let shouldAnimate = true;

  const tabLinks = $('.cap-slide');
  const activeClass = 'swiper-slide-active';
  const progressLine = $('.cap_item-progress-line');
  const itemMask = '.cap_item-mask';
  let visuals = $('.cap_head-visual-inner img');
  const duration = 5000;
  let tabTimeline = gsap.timeline({ paused: true });

  // Visual
  function updateVisual(index) {
    // Hide All
    visuals.hide();
    $(itemMask).hide();

    // Show Visual
    visuals.eq(index).fadeTo('fast', 1);

    // Update Text
    setTimeout(function () {
      tabLinks.eq(index).find(itemMask).fadeTo('fast', 1);
    }, 350);
  }

  // Tab Logic
  function switchTab() {
    if (!shouldAnimate) {
      return;
    }
    const currentTab = tabLinks.filter('.' + activeClass);
    currentTab.find(progressLine).animate({ width: '100%' }, duration, function () {
      if (shouldAnimate) {
        // Reset
        resetTabs();

        // Add
        const currentIndex = currentTab.index();
        let nextIndex = currentIndex >= tabLinks.length - 1 ? 0 : currentIndex + 1;

        // Ensure that the nextIndex is not the same as the currentIndex
        if (nextIndex === currentIndex) {
          nextIndex = currentIndex >= tabLinks.length - 2 ? 0 : currentIndex + 2;
        }

        // Switch Tabs
        tabLinks.eq(nextIndex).addClass(activeClass);
        switchTab();
        updateVisual(nextIndex);
      }
    });
  }

  const initTabs = () => {
    isInitialized = true;
    tabLinks.eq(0).addClass(activeClass);

    // Start looped animation
    switchTab();

    // User Click
    tabLinks.on('click', function () {
      if ($(window).width() >= 992) {
        const nextIndex = $(this).index();
        stopAnimation();
        $(this).addClass(activeClass);
        $(this).find(progressLine).animate({ width: '100%' }, 200);
        updateVisual(nextIndex);
      }
    });
  };

  // Progress Bar
  const resetTabs = () => {
    tabTimeline.clear();
    tabLinks.removeClass(activeClass);
    progressLine.css('width', '0');
    visuals.hide();
    $(itemMask).hide();
  };

  const stopAnimation = () => {
    shouldAnimate = false;
    tabLinks.find(progressLine).stop(true, true);
    resetTabs();
  };

  // Actions
  $(window).on('load resize', function () {
    if (window.matchMedia(responsive).matches) {
      if (!isInitialized) {
        // Define a ScrollTrigger for the .tabs element
        const trigger = ScrollTrigger.create({
          trigger: '.cap_component',
          start: 'top center',
          onEnter: () => {
            initTabs();
            trigger.kill(); // Remove the ScrollTrigger once the function has been called
          },
        });
      }
    } else {
      if (isInitialized) {
        stopAnimation();
        isInitialized = false;
      }
    }
  });

  // -- Swiper
  let swiper;
  let init = false;
  const sliderCodes = $('.tabs_slider .cardb_visual .dashboard_code-block');

  function swiperMode() {
    const mobile = window.matchMedia('(min-width: 0px) and (max-width: 991px)');
    const desktop = window.matchMedia(responsive);

    function handleSwiperSlide(swiperInstance) {
      // Get Active Indexs
      const { activeIndex } = swiperInstance;

      // Update Visual
      updateVisual(activeIndex);

      // Run ProgressBar
      progressLine.stop(true, true);
      progressLine.css('width', '0');
      $(swiperInstance.slides[activeIndex]).find(progressLine).animate({ width: '100%' }, duration);
    }

    // Disable (for desktop)
    if (desktop.matches) {
      if (init) {
        swiper.destroy(true, true);
        init = false;
      }
    }

    // Enable (for Mobile)
    else if (mobile.matches) {
      if (!init) {
        init = true;
        swiper = new Swiper('.cap_slider', {
          // Optional parameters
          slidesPerView: 1,
          spaceBetween: 16,
          speed: 250,
          autoplay: {
            delay: duration,
          },
          loop: true,
          observer: true,
          slideToClickedSlide: true,
          on: {
            init: (swiperInstance) => {
              handleSwiperSlide(swiperInstance);
            },
            transitionEnd: (swiperInstance) => {
              handleSwiperSlide(swiperInstance);
            },
          },
        });
      }
    }
  }

  // Load
  window.addEventListener('load', function () {
    swiperMode();
  });

  // Resize
  window.addEventListener('resize', function () {
    swiperMode();
  });
});
