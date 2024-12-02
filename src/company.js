function initSplit() {
  let typeSplit;
  let tl;
  let scrollTriggerInstance;

  // Split the text up
  function runSplit() {
    // Revert any existing split before creating a new one
    if (typeSplit) {
      typeSplit.revert();
    }

    typeSplit = new SplitType('[data-mission-text]', {
      types: 'words',
    });
  }

  // Get scroll trigger settings based on current breakpoint
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
    gsap.set('.company_crosshair', {
      clearProps: 'all',
    });

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
        trigger: '[data-mission-text]',
        start: scrollSettings.start,
        end: scrollSettings.end,
        scrub: 0.1,
        // markers: true,
      },
    });

    // Store the ScrollTrigger instance
    scrollTriggerInstance = ScrollTrigger.getAll().pop();

    $('[data-mission-text] .word').each(function (index) {
      let isHighlight = $(this).closest('[data-highlight-red]').length;
      tl.to($(this), {
        color: () => {
          return isHighlight ? 'red' : 'black';
        },
        duration: 0.2,
        ease: 'none',
      });
    });

    tl.to(
      '.company_crosshair',
      {
        y: () => gsap.getProperty('[data-mission-text]', 'height'),
        ease: 'none',
        duration: tl.duration() * 1,
      },
      0
    );
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
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      initAnimation();
    }, 250);
  });

  // Optional: Clean up on component unmount if needed
  // return cleanup;
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

$(document).ready(function () {
  initSplit();
  teamSwipers();
});
