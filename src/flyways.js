$(document).ready(() => {
  gsap.registerPlugin(ScrollTrigger);

  // --- HERO Animation Deskop
  ScrollTrigger.matchMedia({
    // Have the animation only on desktop
    '(min-width: 992px)': function () {
      // Hero Section
      $('#darkHero').each(function () {
        let self = $(this);
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: self,
            start: 'top top',
            end: 'center top',
            scrub: 0.2,
            invalidateOnRefresh: true,
            markers: true,
          },
        });

        // --- Create the Animation
        tl.fromTo(
          ['.flyway-hero_bg', '.navbar'],
          {
            css: { maxWidth: '100vw' },
          },
          {
            css: { maxWidth: '144rem' },
          }
        );
      });
    },
  });

  // --- Remove Dark BG
  $(window).on('load resize scroll', function () {
    let metatheme = document.querySelector('meta[name="theme-color"]');
    $('#darkHero').each(function () {
      if (isScrolledIntoView($(this))) {
        if (!$('html').hasClass('overflow-hidden')) {
          $('.navbar_wrapper').addClass('dark');
          metatheme.setAttribute('content', '#15181E');
        }
      } else {
        $('.navbar_wrapper').removeClass('dark');
        metatheme.setAttribute('content', '#ffffff');
      }
    });
  });

  function isScrolledIntoView(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return elemTop <= docViewBottom && elemBottom >= docViewTop;
  }
});
