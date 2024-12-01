function initSplit() {
  let typeSplit;
  let tl;
  let windowWidth = $(window).innerWidth();
  const desktopBreakpoint = 992;

  // Split the text up
  function runSplit() {
    typeSplit = new SplitType('[data-mission-text]', {
      types: 'words, chars',
    });
  }

  // Create the animation
  function createAnimation() {
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-mission-text]',
        start: 'center bottom',
        end: 'bottom center',
        scrub: 0.1,
      },
    });

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
    runSplit();
    createAnimation();
  }

  // Function to kill the animation and revert split
  function killAnimation() {
    if (typeSplit) {
      typeSplit.revert();
      typeSplit = null; // Ensure we clear the reference
      if (tl) {
        tl.kill();
        tl = null; // Ensure we clear the timeline reference
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    }
  }

  // Initial check
  initAnimation();

  // Update on window resize
  window.addEventListener('resize', function () {
    initAnimation();
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

$(document).ready(function () {
  initSplit();
  teamSwipers();
});
