/* eslint-disable @typescript-eslint/no-this-alias */

import { initAutoVideo } from './fs-videos';

// Initialize the auto video functionality
gsap.registerPlugin(ScrollTrigger, Flip);

// Global Scope
let lenis;
var isScrollDisabled = false;

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
function trggerExternalLinks() {
  // Find all <a> tags in the document and look for external
  var links = document.getElementsByTagName('a');

  // Get the current domain
  var currentDomain = window.location.hostname;

  // Loop through each link
  for (var i = 0; i < links.length; i++) {
    var link = links[i];

    // Get the link's domain
    var linkDomain = link.hostname;

    // Check if the link is an external link
    if (linkDomain !== currentDomain) {
      // Set the target attribute to "_blank"
      link.setAttribute('target', '_blank');
    }
  }
}

// #region Lenis
function initLenis() {
  if (Webflow.env('editor') === undefined) {
    lenis = new Lenis({
      lerp: 0.075,
      wheelMultiplier: 0.7,
      gestureOrientation: 'vertical',
      normalizeWheel: false,
      smoothTouch: false,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    window.lenisInstance = lenis;
  }
  $('[data-lenis-start]').on('click', function () {
    lenis.start();
  });
  $('[data-lenis-stop]').on('click', function () {
    lenis.stop();
  });
  $('[data-lenis-toggle]').on('click', function () {
    $(this).toggleClass('stop-scroll');
    if ($(this).hasClass('stop-scroll')) {
      lenis.stop();
    } else {
      lenis.start();
    }
  });

  // Watch for height changes in the body element
  const { body } = document;

  const observer = new ResizeObserver(() => {
    lenis.resize();
  });

  // Start observing the body
  observer.observe(body);

  // Lenis animation loop
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

// #endregion

// #region nav
function scrollNav() {
  // Variables
  const navbar = $('.nav');
  const navWrap = $('.nav_wrap');
  let lastScroll = 0;

  // Scroll handler with debouncing
  const handleScroll = debounce(() => {
    const currentScroll = window.scrollY;

    const checkOpenState = navbar.find('.w--open').length >= 1;
    if (currentScroll > lastScroll && currentScroll > 50 && !isScrollDisabled && !checkOpenState) {
      // Scroll down - hide navbar
      gsap.to(navWrap, { pointerEvents: 'none' });
      gsap.to(navbar, { y: '-200%', duration: 1, ease: 'power2.out' });
    } else if (currentScroll < lastScroll) {
      // Scroll up - show navbar
      gsap.to(navWrap, { pointerEvents: 'auto' });
      gsap.to(navbar, { y: '0%', duration: 1, ease: 'power2.out' });
    }

    lastScroll = currentScroll;
  }, 1);

  // Attach scroll listener
  window.addEventListener('scroll', handleScroll);
}
function scrollDisabler() {
  function toggleScroll() {
    if (isScrollDisabled) {
      isScrollDisabled = false;
      lenis.start();
    } else {
      isScrollDisabled = true;
      lenis.stop();
    }
  }

  // Click Event
  $('[scroll="toggle"]').on('click', toggleScroll);

  // Run on resize
  const breakpoints = [991, 767, 479];
  let lastWidth = window.innerWidth;

  // Function to check breakpoints on window resize
  function checkBreakpoints() {
    const currentWidth = window.innerWidth;

    breakpoints.forEach((breakpoint) => {
      if (isScrollDisabled) {
        if (
          (lastWidth <= breakpoint && currentWidth > breakpoint) ||
          (lastWidth >= breakpoint && currentWidth < breakpoint)
        ) {
          lenis.start();
        }
      }
    });

    // Update lastWidth for the next call
    lastWidth = currentWidth;
  }
  window.addEventListener('resize', checkBreakpoints);
}

// #endregion

// #region dfCards
function dfCards() {
  let dfCardsTL;
  let scrollTriggerInstance;

  ScrollTrigger.defaults({
    anticipatePin: 1,
    ease: 'none',
  });

  function destroyScrollAnimation() {
    if (dfCardsTL) {
      dfCardsTL.kill(true);
      dfCardsTL = null;
    }

    if (scrollTriggerInstance) {
      scrollTriggerInstance.kill(true);
      scrollTriggerInstance = null;
    }

    // Optional: Clear any inline styles added by GSAP
    gsap.set('[data-gsap-clearProps]', { clearProps: 'all' });
    gsap.set('[data-sticky-visual]', { clearProps: 'all' });
    gsap.set('.pin-spacer', { clearProps: 'all' });
  }

  function initScrollAnimation() {
    destroyScrollAnimation();

    let dfCards = $('[data-sticky-visual="animated"]').children();

    if (!dfCards.length) {
      return;
    }

    function setDynamicZIndex(selector) {
      const elements = $(selector);
      const maxZIndex = elements.length;

      elements.each(function (index) {
        $(this).css('z-index', maxZIndex - index);
      });
    }

    function setDynamicGapTop() {
      let windowHeight = $(window).height();
      let distance = windowHeight - dfCards.eq(0).height();
      let gap = distance / 2;
      $('.sticky-header').css('margin-bottom', `-${gap}px`);
      ScrollTrigger.refresh();
    }

    // Debounce function to limit resize calculations
    function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }

    // Create debounced resize handler
    const debouncedSetGap = debounce(setDynamicGapTop, 250);

    // Add resize listener
    $(window).on('resize.dynamicGap', debouncedSetGap);

    // Init
    gsap.set(dfCards, { position: 'absolute' });
    setDynamicZIndex(dfCards);

    const dfCardsTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.sticky-section_list',
        start: () => {
          const firstLi = document.querySelector('.sticky-section_list li:first-child');
          const firstLiRect = firstLi.getBoundingClientRect();
          return `${firstLiRect.height / 2}px center`;
        },
        end: () => {
          const lastLi = document.querySelector('.sticky-section_list li:last-child');
          const lastLiRect = lastLi.getBoundingClientRect();
          const lastLiCenter = $('.sticky-section_list').height() - lastLiRect.height / 2;
          return `${lastLiCenter}px center`;
        },
        pin: '[data-sticky-visual="animated"]',
        scrub: true,
        invalidateOnRefresh: true,
        onLeave: () => {
          const video = dfCards.eq(dfCards.length - 1).find('video')[0];
          playVideo(video);
        },
      },
    });

    // Move the header
    setDynamicGapTop();

    // Main animation setup
    dfCards.each(function (index) {
      const nextVideo = index < dfCards.length - 1 ? dfCards.eq(index + 1).find('video')[0] : null;
      let isPlaying = false;

      if (index !== dfCards.length - 1) {
        dfCardsTL.to($(this), {
          ease: 'none',
          clipPath: 'inset(0px 0px 100%)',
          onUpdate: function () {
            const progress = this.progress();

            if (progress >= 0.5 && !isPlaying) {
              isPlaying = true;
              playVideo(nextVideo);
            }
          },
        });
      }
    });

    // Utility functions
    const handleVideoPromise = (promise) => {
      if (promise !== undefined) {
        return promise.catch((err) => console.warn('Video operation error:', err));
      }
      return Promise.resolve();
    };

    const pauseAllVideos = () => {
      const pausePromises = [];
      dfCards.find('video').each(function () {
        pausePromises.push(handleVideoPromise(this.pause()));
      });
      return Promise.all(pausePromises);
    };

    const playVideo = (video) => {
      if (video) {
        return handleVideoPromise(video.play());
      }
      return Promise.resolve();
    };

    // Clean up function
    return function cleanup() {
      $(window).off('resize.dynamicGap');
    };
  }

  /***** GSAP Resize Handle *****/
  let cleanupFunction;

  ScrollTrigger.matchMedia({
    // desktop
    '(min-width: 992px)': function () {
      // Store cleanup function
      cleanupFunction = initScrollAnimation();
    },
    '(max-width: 991px)': function () {
      // Clean up when leaving desktop breakpoint
      if (cleanupFunction) {
        cleanupFunction();
        cleanupFunction = null;
      }
    },
  });
}
// #endregion

// Init
$(document).ready(function () {
  scrollNav();
  scrollDisabler();
  initLenis();
  trggerExternalLinks();
  dfCards();
  initAutoVideo();
});
