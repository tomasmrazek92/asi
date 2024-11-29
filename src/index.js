gsap.registerPlugin(ScrollTrigger, Flip);

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

function animateCards() {
  const cards = $('.card');
  const middleIndex = Math.floor(cards.length / 2);
  const middleCube = cards.eq(middleIndex);
  let margin = -6;

  // Split the middle
  cards.each(function (index) {
    const card = $(this);
    let distance = Math.abs(index - middleIndex) * 1;
    let zIndex = cards.length - Math.abs(index - middleIndex);

    // Apply classes based on position relative to the middle index
    if (index < middleIndex) {
      card.addClass('before-middle');
    } else if (index > middleIndex) {
      card.addClass('after-middle');
    } else {
      card.addClass('middle-item');
    }

    // Apply styles
    card.css({
      '--distance': '0em',
      'margin-left': `${margin}em`,
      'margin-right': `${margin}em`,
      '--depth': `${distance}em`,
      'z-index': zIndex,
    });
  });

  // Target colors
  middleCube.addClass('middle');
  $('.middle').each(function () {
    const $middle = $(this);

    // Target the 3 previous siblings
    $middle
      .prevAll('.card')
      .slice(0, 3)
      .each(function (index) {
        $(this).addClass(index === 0 ? 'first' : index === 1 ? 'second' : 'third');
      });

    // Target the 3 following siblings
    $middle
      .nextAll('.card')
      .slice(0, 3)
      .each(function (index) {
        $(this).addClass(index === 0 ? 'first' : index === 1 ? 'second' : 'third');
      });
  });

  // Animate the timeline
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $('.card-wrap'),
      start: 'top bottom',
      end: 'bottom center',
      scrub: true,
    },
  });

  tl.fromTo(
    $('.card-row'),
    { '--rowX': '120em', '--rotationX': '-30deg', '--angle': '80deg' },
    { '--rowX': '0em', '--rotationX': '-0deg', '--angle': '90deg', ease: 'none' }
  );

  tl.to(middleCube, {
    '--zDepth': '12em',
    ease: 'none',
  });
  tl.to(
    cards.filter('.before-middle'),
    {
      '--zDepth': '-12em',
      ease: 'none',
    },
    '<'
  );
  tl.to(
    cards.filter('.after-middle'),
    {
      '--zDepth': '12em',
      ease: 'none',
    },
    '<'
  );

  tl.fromTo(
    middleCube,
    {
      '--depth': '-7em',
      '--angle': '90deg',
    },
    { '--angle': '0deg', ease: 'none' },
    '<'
  );
}
function moveImage() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $('.timeline-box'),
      start: 'top bottom',
      end: 'top center',
      scrub: true,
    },
  });
  tl.to(
    $('[data-timeline-mask]'),
    {
      height: '70%',
      yPercent: -30,
      ease: 'none',
    },
    '<'
  );
}

// scrollflip component
$('.section.cc-hp-timeline').each(function (index) {
  let componentEl = $(this),
    originEl = componentEl.find('[flip-origin]'),
    targetEl = componentEl.find('[flip-target]'),
    labelEl = componentEl.find('[data-label-el]');
  let componentIndex = index,
    timeline,
    resizeTimer;
  // asign matching data flip ids
  originEl.each(function (index) {
    let flipId = `${componentIndex}-${index}`;
    $(this).attr('data-flip-id', flipId);
    targetEl.eq(index).attr('data-flip-id', flipId);
  });
  // create timeline
  function createTimeline() {
    if (timeline) {
      timeline.kill();
      gsap.set(targetEl, { clearProps: 'all' });
      gsap.set(labelEl, { clearProps: 'all' });
    }
    const state = Flip.getState(originEl);
    timeline = gsap.timeline({
      scrollTrigger: {
        trigger: $('.card-wrap'),
        start: 'top 80%',
        end: 'top center',
        scrub: true,
      },
    });
    timeline.add(
      Flip.from(state, {
        targets: targetEl,
        ignore: 'height',
        ease: 'none',
      })
    );

    // Target elements
    const labelEnd = $('[data-label-end]');

    // Get positions and widths
    const labelBounds = labelEl[0].getBoundingClientRect();
    const targetBounds = labelEnd[0].getBoundingClientRect();

    // Calculate the x-axis offset needed to center labelEl with targetEl
    const offsetX =
      targetBounds.left + targetBounds.width / 2 - (labelBounds.left + labelBounds.width / 2);

    // GSAP animation to move labelEl to the calculated offset
    timeline.to(
      labelEl,
      {
        x: `+=${offsetX}`,
        ease: 'none',
        onUpdate: function () {
          // Animate the time during the movement
          const startTime = 0 * 60; // 15:00 in minutes
          const endTime = 3 * 60; // 19:00 in minutes
          const progress = this.progress(); // Get the animation progress (0 to 1)
          const currentTime = startTime + (endTime - startTime) * progress; // Interpolate time
          const hours = Math.floor(currentTime / 60); // Extract hours
          const minutes = Math.floor(currentTime % 60); // Extract minutes
          const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`; // Format as HH:MM
          labelEl.find('div').text('+' + formattedTime + 'h'); // Update the label's text
        },
      },
      '<0.2'
    );
    timeline.to(labelEl, { backgroundColor: 'red', color: 'white', duration: 0 });
  }

  createTimeline();

  // update on window resize
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      createTimeline();
    }, 250);
  });
});

// Init
dfCards();
scrollNav();
scrollDisabler();
animateCards();
moveImage();
