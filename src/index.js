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
    console.log($(this));
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
