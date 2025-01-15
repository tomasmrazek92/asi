import { initializeSnappySnapItems } from './utils/globalFunctions';

function initSplit(els) {
  $(els).each(function () {
    let typeSplit;
    let tl;
    let scrollTriggerInstance;

    let wrap = $(this);
    let text = wrap.find('[data-animation-text]');
    let crosshair = wrap.find('[data-animation-crosshair]');

    // Split the text up
    function runSplit() {
      // Revert any existing split before creating a new one
      if (typeSplit) {
        typeSplit.revert();
      }

      typeSplit = new SplitType(text, {
        types: 'words',
      });
    }

    function getScrollTriggerSettings() {
      const width = window.innerWidth;

      if (width < 768) {
        // Mobile
        return {
          start: 'top center',
          end: 'bottom center',
        };
      }
      if (width < 1024) {
        // Tablet
        return {
          start: 'top 60%',
          end: 'bottom 40%',
        };
      } // Desktop
      return {
        start: 'center bottom',
        end: 'bottom center',
      };
    }

    // Clean up existing animations and splits
    function cleanup() {
      // Kill specific ScrollTrigger instance if it exists
      if (scrollTriggerInstance) {
        scrollTriggerInstance.kill();
      }

      // Kill GSAP timeline if it exists
      if (tl) {
        tl.kill();
      }

      // Reset crosshair properties
      if (crosshair.length) {
        gsap.set(crosshair, {
          clearProps: 'all',
        });
      }

      // Revert split text if it exists
      if (typeSplit) {
        typeSplit.revert();
      }
    }

    // Create the animation
    function createAnimation() {
      const scrollSettings = getScrollTriggerSettings();

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: scrollSettings.start,
          end: scrollSettings.end,
          scrub: 0.1,
        },
      });

      // Store the ScrollTrigger instance
      scrollTriggerInstance = ScrollTrigger.getAll().pop();

      text.find('.word').each(function (index) {
        let isHighlight = $(this).closest('[data-highlight-red]').length;
        tl.to($(this), {
          color: () => {
            return isHighlight ? 'red' : 'black';
          },
          duration: 0.2,
          ease: 'none',
        });
      });

      if (crosshair.length) {
        tl.to(
          crosshair,
          {
            y: () => gsap.getProperty(text[0], 'height'),
            ease: 'none',
            duration: tl.duration() * 1,
          },
          0
        );
      }
    }

    // Function to initialize the split and animation
    function initAnimation() {
      cleanup(); // Clean up existing instances
      runSplit(); // Create new split
      createAnimation(); // Create new animation
    }

    // Initial setup
    initAnimation();

    // Add resize handler with debounce
    let resizeTimeout;
    let previousWidth = window.innerWidth;

    window.addEventListener('resize', () => {
      const currentWidth = window.innerWidth;

      if (currentWidth !== previousWidth) {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          initAnimation();
          previousWidth = currentWidth;
        }, 250);
      }
    });
  });
}

function teamSwipers() {
  const swiperTeamBot = new Swiper('.team-slider-meta', {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    spaceBetween: 4,
    centeredSlides: true,
    loopAdditionalSlides: 20,
    loop: true,
    allowTouchMove: false, // Disable swipe
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-arrow.next',
      prevEl: '.swiper-arrow.prev',
    },
  });

  const swiperTeamTop = new Swiper('.team-slider', {
    slidesPerView: 1,
    spaceBetween: 4,
    centeredSlides: true,
    loopAdditionalSlides: 20,
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-arrow.next',
      prevEl: '.swiper-arrow.prev',
    },
    // Controller
    controller: {
      control: swiperTeamBot,
    },
  });
}

// #region stickySection

// #endregion

$(document).ready(function () {
  let isInitialize = false;
  const htmlEl = document.documentElement;

  const initialize = (container) => {
    if (isInitialize || typeof window.lenisInstance === 'undefined') return;
    isInitialize = true;
    initializeSnappySnapItems({
      itemsContainerId: 'offices',
      getTopOffset: () => {
        return parseInt($('.nav_wrap').css('height'));
      },
      getItemOffset: () => {
        return parseInt($('[data-rs-item-offset]').css('height'));
      },
      onInit: ({ recalculatePosition }) => {
        // observe changes to the element's size and position
        const resizeObserver = new ResizeObserver(recalculatePosition);
        resizeObserver.observe(document.body);
        if ('ontouchstart' in window) {
          window.addEventListener('scroll', recalculatePosition);
        } else {
          window.lenisInstance.on('scroll', recalculatePosition);
        }
      },
    });
  };

  let observer = new MutationObserver(function (mutations) {
    if (htmlEl.className.includes('lenis')) {
      initialize();
    }
  });

  observer.observe(htmlEl, {
    attributes: true,
    attributeFilter: ['class'],
  });

  initialize();
  initSplit('[data-animation-wrap]');
  teamSwipers();
});
