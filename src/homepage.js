import { DateTime } from 'luxon';

function checkIfDesktop() {
  return $(window).width() > 991;
}

// #region Hero Animation
function animateHPHero() {
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
            immediateRender: true,
            invalidateOnRefresh: true,
          },
        });

        // --- Set Section
        let videoBoxHeight;
        let videoBoxWidth;

        function setSectionHeight() {
          $(heroIntro).height(heroWrap.height() * 2);
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
    var { DateTime } = luxon;

    function updateDateTime() {
      // Get UTC (ZULU) date and time
      var utcDateTime = DateTime.utc();

      // Format ZULU date components
      var zuluMonth = utcDateTime.toFormat('MMM').toUpperCase(); // Short month name
      var zuluDay = utcDateTime.toFormat('dd'); // Day of month
      var zuluYear = utcDateTime.toFormat('yyyy'); // Full year
      var zuluTime = utcDateTime.toFormat('HH:mm:ss'); // Time in 24-hour format

      // Update the DOM elements
      $('[dateDay]').text(zuluDay);
      $('[dateMonth]').text(zuluMonth);
      $('[dateYear]').text(zuluYear);
      $('[dataTime]').text(zuluTime);

      // Schedule next update at the start of next second
      setTimeout(updateDateTime, 1000 - new Date().getMilliseconds());
    }

    // Initial call
    updateDateTime();
  }

  // Init Reveal
  function initReveal() {
    if (window.innerWidth >= 992) {
      $('.hp-intro_wrap').css('color', '#333A47');
      $('.hp-intro_wrap').fadeTo('fast', 1, function () {
        $('.preloader-div').hide();
      });
    } else {
      $('.hp-intro_wrap').css('opacity', '1');
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
}
// #endregion

// #region Timeline Animation

// Global Functions
function animateCards() {
  const cards = $('.card');
  const middleIndex = Math.floor(cards.length / 2);
  const middleCard = cards.eq(middleIndex);
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
  middleCard.addClass('middle');
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
      scrub: 1,
    },
  });

  tl.fromTo(
    $('.card-row'),
    { '--rowX': '80em', '--rotationX': '-30deg', '--angle': '80deg' },
    { '--rowX': '0em', '--rotationX': '-0deg', '--angle': '90deg', ease: 'none' }
  );

  tl.to(cards.filter('.before-middle'), {
    '--zDepth': () => {
      return checkIfDesktop() ? '-12em' : '-6em';
    },
    ease: 'none',
  });
  tl.to(
    cards.filter('.after-middle'),
    {
      '--zDepth': () => {
        return checkIfDesktop() ? '12em' : '6em';
      },
      ease: 'none',
    },
    '<'
  );
  tl.fromTo(
    middleCard,
    {
      '--depth': '-7em',
      '--angle': '90deg',
    },
    { '--angle': '0deg', ease: 'none' },
    '<'
  );
  tl.to(middleCard, {
    '--zDepth': '5em',
    ease: 'none',
  });
  tl.to(
    cards.not(middleCard),
    {
      '--depth': '5em',
      ease: 'none',
    },
    '<'
  );
}
function moveTimeline() {
  $('.section.cc-hp-timeline').each(function (index) {
    let componentEl = $(this),
      timelineEl = componentEl.find('.timeline-wrap'),
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

    function createTimeline() {
      let isDesktop = checkIfDesktop();

      if (timeline) {
        timeline.kill();
        gsap.set(timelineEl, { clearProps: 'all' });
        gsap.set(targetEl, { clearProps: 'all' });
        gsap.set(labelEl, { clearProps: 'all' });
      }

      const state = Flip.getState(originEl);
      timeline = gsap.timeline({
        scrollTrigger: {
          trigger: $('.timeline-box'),
          start: 'top bottom',
          endTrigger: $('.card-wrap'),
          end: 'center center',
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

      function updateTime() {
        // Animate the time during the movement
        const startTime = 0 * 60;
        const endTime = 3 * 60;
        const progress = this.progress();
        const currentTime = startTime + (endTime - startTime) * progress;
        const hours = Math.floor(currentTime / 60); // Extract hours
        const minutes = Math.floor(currentTime % 60); // Extract minutes
        const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')}`; // Format as HH:MM
        if (progress === 0) {
          labelEl.find('div').text('Now');
        } else {
          labelEl.find('div').text('+' + formattedTime + 'h'); // Update the label's text
        }
      }
      // Target elements
      const labelEnd = $('[data-label-end]');

      // Get positions and widths
      const labelBounds = labelEl.filter(':visible')[0].getBoundingClientRect();
      const targetBounds = labelEnd[0].getBoundingClientRect();

      // Calculate the x-axis offset needed to center labelEl with targetEl
      const offsetX =
        targetBounds.left + targetBounds.width / 2 - (labelBounds.left + labelBounds.width / 2);

      timeline.to(
        isDesktop ? labelEl : timelineEl,
        {
          x: isDesktop ? `+=${offsetX}` : `-=${offsetX}`,
          ease: 'none',
          onUpdate: updateTime,
        },
        '<'
      );

      timeline.to(labelEl, { backgroundColor: 'red', color: 'white', duration: 0 }, '-=0.025');
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
}

// Desktop Only
function moveImage() {
  let mask = $('[data-timeline-mask]');
  let heading = $('[data-timeline-heading]');
  let tl, resizeTimer;

  function initTl() {
    let isDesktop = checkIfDesktop();

    if (tl) {
      tl.kill();
      gsap.set(mask, { clearProps: 'all' });
      gsap.set(heading, { clearProps: 'all' });
    }

    tl = gsap.timeline({
      scrollTrigger: {
        trigger: $('.visual-box.cc-new-gen'),
        start: 'bottom bottom',
        endTrigger: $('.card-wrap'),
        end: 'center center',
        scrub: 1,
      },
    });
    if (isDesktop) {
      tl.to(
        [mask, heading],
        {
          y: '-76rem',
          ease: 'none',
        },
        '<'
      );
      tl.to(
        mask,
        {
          height: '80%',
        },
        '<'
      );
    }
  }

  // Init
  initTl();

  // On resize
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      initTl();
    }, 250);
  });
}

// #endregion

// #region tabVideos
function initVideoTabs() {
  $('.tabs-wrap').each(function () {
    setupTabContainer(this);
  });
}

function setupTabContainer(el) {
  const state = {
    tabsContainer: $(el),
    tabs: $(el).find('.tabs-item'),
    visuals: $(el).find('.tabs-visual'),
    videos: $(el).find('video'),
    currentVideoIndex: 0,
    swiper: null,
  };

  if (!state.videos.length) return;

  function setupSwiper(state) {
    function initSwiper(state) {
      // Track current breakpoint state
      const isMobile = window.innerWidth < 992;

      // If we have an existing swiper, check if we need to reinit
      if (state.swiper) {
        // Only reinit if crossing the breakpoint
        if (state.isMobile !== isMobile) {
          state.swiper.destroy(true, true);
        } else {
          // Same breakpoint, no need to reinit
          return;
        }
      }

      // Update the breakpoint state
      state.isMobile = isMobile;

      // Define base settings that are common for both breakpoints
      const baseSettings = {
        slidesPerView: 1,
        spaceBetween: 4,
        centeredSlides: true,
        on: {
          slideChange: (swiper) => {
            switchVideo(state, swiper.realIndex);
          },
        },
      };

      // Add fade effect for desktop
      if (!state.isMobile) {
        state.swiper = new Swiper(state.tabsContainer[0], {
          ...baseSettings,
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          threshold: 20,
        });
      } else {
        // Mobile version without fade effect
        state.swiper = new Swiper(state.tabsContainer[0], {
          ...baseSettings,
          threshold: 5,
        });
      }
    }

    // Initial init
    initSwiper(state);

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initSwiper(state);
      }, 250);
    });
  }

  async function preloadVideos(state) {
    try {
      const loadPromises = state.videos
        .map((index, video) => {
          return new Promise((resolve) => {
            if (video.readyState >= 3) {
              // HAVE_FUTURE_DATA
              resolve();
              return;
            }

            const events = ['loadedmetadata', 'canplay'];
            const handleLoaded = () => {
              events.forEach((event) => video.removeEventListener(event, handleLoaded));
              resolve();
            };
            events.forEach((event) => video.addEventListener(event, handleLoaded));

            video.muted = true;
            video.load();
            video.pause();
          });
        })
        .get();

      await Promise.all(loadPromises);
    } catch (error) {
      console.error('Error preloading videos:', error);
    }
  }

  // Videos
  async function playVideo(state, video, index) {
    try {
      video.muted = true;

      // Reset video if it's already started
      if (video.currentTime > 0) {
        video.currentTime = 0;
      }

      // Set up playing event listener before attempting to play
      const playingPromise = new Promise((resolve) => {
        video.addEventListener('playing', resolve, { once: true });
      });

      if (!video.duration) {
        await new Promise((resolve) => {
          video.addEventListener('loadedmetadata', resolve, { once: true });
        });
      }

      if (video.readyState < 3) {
        await new Promise((resolve) => {
          video.addEventListener('canplay', resolve, { once: true });
        });
      }

      video.play();
      animateProgress(state, index, video);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error playing video:', error);
      }
    }
  }
  function pauseAllVideos(state) {
    state.videos.each(function () {
      this.pause();
    });

    state.tabs.each(function () {
      const progressBar = $(this).find('.tabs-item_progress');
      gsap.killTweensOf(progressBar);
    });
  }

  function resumeVideo(state) {
    const video = state.videos.eq(state.currentVideoIndex).get(0);
    if (!video) return;

    playVideo(state, video, state.currentVideoIndex);
  }
  function handleVideoEnd(state, index) {
    state.swiper.slideTo((index + 1) % state.tabs.length);
  }
  function switchVideo(state, index) {
    state.currentVideoIndex = index;
    pauseAllVideos(state);

    const video = state.videos.eq(index).get(0);
    if (!video) return;

    playVideo(state, video, index);
  }

  // Events
  function setupEventListeners(state) {
    // Video end handlers
    state.videos.each((index, video) => {
      $(video).on('ended', () => {
        handleVideoEnd(state, index);
      });
    });

    state.tabs.on('click', function (event) {
      let index = $(event.currentTarget).index();
      state.swiper.slideTo(index);
    });
  }
  function setupIntersectionObserver(state) {
    let hasPreloaded = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!hasPreloaded) {
              hasPreloaded = true;
              preloadVideos(state);
            }
            // Only resume the current video
            const currentIndex = state.swiper ? state.swiper.realIndex : 0;
            resumeVideo(state, currentIndex);
          } else {
            // When section leaves viewport, pause all videos
            pauseAllVideos(state);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Only observe the container element instead of individual videos
    observer.observe(state.tabsContainer[0]);

    // We don't need switchObserver anymore since we're observing the container
    state.switchObserver = () => {
      // Either remove this entirely or keep it empty for compatibility
    };
  }

  function animateProgress(state, index, video) {
    if (!video.duration) return;

    let activeClass = 'w--current';
    state.tabs.removeClass(activeClass);

    // Clear
    $('.tabs-item_progress').hide();

    const activeTab = state.tabs.eq(index);
    const progressBar = activeTab.find('.tabs-item_progress');
    progressBar.show();
    activeTab.addClass(activeClass);

    gsap.fromTo(
      progressBar,
      { scaleX: video.currentTime / video.duration },
      {
        scaleX: 1,
        duration: video.duration - video.currentTime,
        ease: 'none',
        transformOrigin: 'left center',
        onComplete: () => progressBar.hide(),
      }
    );
  }

  // Init
  setupSwiper(state);
  setupEventListeners(state);
  setupIntersectionObserver(state);
}

// #endregion

// Init
$(document).ready(function () {
  animateHPHero();
  moveTimeline();
  animateCards();
  moveImage();
  initVideoTabs();
});
