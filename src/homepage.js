import { DateTime } from 'luxon';

import { createSwiper } from '$utils/globalFunctions';

$(document).ready(() => {
  gsap.registerPlugin(ScrollTrigger);

  // --- HERO Animation
  ScrollTrigger.matchMedia({
    // Have the animation only on desktop
    '(min-width: 992px)': function () {
      // Hero Section
      $('.section.cc-hp-hero').each(function () {
        let heroIntro = $(this);
        let heroWrap = $(this).find('.hp-intro_wrap');
        let videoBox = $(this).find('.hp-intro_visual-box');
        let splitBox = $(this).find('.hp-intro_visual-split');
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top top',
            end: '80% center',
            scrub: 0.2,
            markers: true,
            immediateRender: true,
            invalidateOnRefresh: true,
          },
        });

        // --- Set Section
        let videoBoxHeight;
        let videoBoxWidth;

        function setSectionHeight() {
          $(heroIntro).height(heroWrap.height() * 2);
          console.log(heroWrap.height() * 2);
          videoBoxHeight = splitBox.height();
          videoBoxWidth = splitBox.width();
        }

        function calculateVideoMove() {
          let topHeight = $(heroIntro).find('.row').eq(0).outerHeight();
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
        tl.to(
          '.hp-intro_visual-content',
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
        tl.to(
          '.hp-intro_overlay',
          {
            opacity: 0,
          },
          '<'
        );
      });
    },
  });

  // Project the Time and Date
  function initTime() {
    var currentDate = new Date();

    // Date
    var month = currentDate.toLocaleString('en', { month: 'short' }).toUpperCase(); // Using short month format
    var day = currentDate.getDate();
    var year = currentDate.getFullYear().toString(); // Getting the last two digits of the year

    $('[dateDay]').text(day);
    $('[dateMonth]').text(month);
    $('[dateYear]').text(year);

    // Time
    var { DateTime } = luxon;

    function updateTime() {
      var userLocalTime = DateTime.local();
      var convertedTime = userLocalTime.toUTC().toFormat('HH:mm:ss');
      $('[dataTime]').text(convertedTime);

      // Schedule the next update for the exact start of the next second
      setTimeout(updateTime, 1000 - new Date().getMilliseconds());
    }

    // Initial call
    updateTime();
  }

  // Init Reveal
  function initReveal() {
    if (window.innerWidth >= 992) {
      $('.hero-intro_wrap').css('color', '#333A47');
      $('.hero-intro_wrap').fadeTo('fast', 1, function () {
        $('.preloader-div').hide();
      });
    } else {
      $('.hero-intro_wrap').css('opacity', '1');
      $('.preloader-div').hide();
    }
  }

  $(window).on('resize', initReveal);
  initTime();
  initReveal();

  // Video Load
  var $video = $('[data-hero-video] video');
  var fadeDuration = 500;

  $video
    .on('canplay', function () {
      $video.fadeTo(fadeDuration, 1); // Fade in the video when it is ready to play
    })
    .one('timeupdate', function () {
      setTimeout(function () {
        $video.fadeTo(fadeDuration, 1);
      }, 1000);
    });

  $video.get(0).play(); // Trigger the play event manually
});
