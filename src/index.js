$(document).ready(() => {
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
});

// Global Scope
var isScrollDisabled = false;

// Function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}
function dfCards() {
  let dfCardsTL;
  let scrollTriggerInstance;

  ScrollTrigger.defaults({
    markers: true,
    anticipatePin: 1,
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

    let dfCards = $('[data-sticky-visual="animated"] img');
    let totalHeight = 0;
    let lastHeight = 0;
    let adjustedHeight;

    function calculateSectionHeight() {
      totalHeight = 0;
      dfCards.each(function (index) {
        let height = $(this).height();
        totalHeight += height;

        if (index === dfCards.length - 1) {
          adjustedHeight = totalHeight - height;
        }
      });
      return adjustedHeight;
    }

    function setDynamicZIndex(selector) {
      const elements = $(selector);
      const maxZIndex = elements.length;

      elements.each(function (index) {
        $(this).css('z-index', maxZIndex - index);
      });
    }

    gsap.set(dfCards, { position: 'absolute' });
    setDynamicZIndex(dfCards);

    dfCardsTL = gsap.timeline({
      scrollTrigger: {
        trigger: '[data-sticky-visual="animated"]',
        start: () => `top ${$('.nav_wrap').outerHeight()}`,
        end: () => `+=${calculateSectionHeight()}`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    dfCards.each(function (index) {
      if (index !== dfCards.length - 1) {
        dfCardsTL.to($(this), {
          ease: 'none',
          clipPath: 'inset(0px 0px 100%)',
        });
      }
    });
  }

  /***** GSAP Resize Handle *****/
  ScrollTrigger.matchMedia({
    // desktop
    '(min-width: 992px)': initScrollAnimation,
  });
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
function scrollNav() {
  // Variables
  const navbar = $('.nav');
  let lastScroll = 0;

  // Scroll handler with debouncing
  const handleScroll = debounce(() => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 50 && !isScrollDisabled) {
      // Scroll down - hide navbar
      gsap.to(navbar, { y: '-200%', duration: 1, ease: 'power2.out' });
    } else if (currentScroll < lastScroll) {
      // Scroll up - show navbar
      gsap.to(navbar, { y: '0%', duration: 1, ease: 'power2.out' });
    }

    lastScroll = currentScroll;
  }, 10);

  // Attach scroll listener
  window.addEventListener('scroll', handleScroll);
}

// Init
dfCards();
scrollNav();
scrollDisabler();
