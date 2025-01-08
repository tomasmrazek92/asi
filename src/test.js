document.addEventListener('DOMContentLoaded', (event) => {
  // Mobile Nav
  const mobileNavBtns = document.querySelector('.fz_header-nav-btns');
  const pageBody = document.querySelector('body');
  mobileNavBtns?.addEventListener('click', () => {
    this.x = ((this.x || 0) + 1) % 2;
    if (this.x) {
      pageBody.classList.add('scroll-locked');
    } else {
      pageBody.classList.remove('scroll-locked');
    }
  });

  // Testimonials
  const swiperTestimonials = new Swiper('.fz_carousel', {
    centeredSlides: false,
    loop: () => {},
    // Navigation arrows
    navigation: {
      nextEl: '.fz_carousel-button-next',
      prevEl: '.fz_carousel-button-prev',
    },
    pagination: {
      el: '.fz_carousel-dots',
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      991: {
        slidesPerView: 3,
      },
      // when window width is >= 1600px
      1600: {
        centeredSlides: false,
        slidesPerView: 3,
      },
    },
  });

  // Register GSAP plugins
  gsap.registerPlugin(DrawSVGPlugin, MorphSVGPlugin, ScrollTrigger);

  // GSAP primary btn hover wiggle
  const primaryBtns = document.querySelectorAll('.fz_btn-primary, .fz_btn-primary-2');
  primaryBtns?.forEach((primaryBtn) => {
    const primaryBtnSVG = primaryBtn.querySelector('.fz_btn-primary-bg-path');
    const tlBtnPrimaryBorder = new TimelineMax({ paused: true, reversed: true });
    tlBtnPrimaryBorder.from(primaryBtnSVG, {
      duration: 0.3,
      drawSVG: 0,
    });

    if (primaryBtn && primaryBtnSVG) {
      primaryBtn.addEventListener('mouseover', () => {
        tlBtnPrimaryBorder.play();
      });
      primaryBtn.addEventListener('mouseleave', () => {
        tlBtnPrimaryBorder.reverse();
      });
    }
  });

  // GSAP secondary btn hover wiggle
  const secondaryBtns = document.querySelectorAll('.fz_btn-secondary');
  secondaryBtns?.forEach((secondaryBtn) => {
    const btnSVG = secondaryBtn?.querySelector('.btn-secondary-wiggle');
    const btnSVGStart = btnSVG?.querySelector('#wiggle-start');
    const btnSVGEnd = btnSVG?.querySelector('#wiggle-end');

    const tlBtnSecondaryWiggle = new TimelineMax({ paused: true, reversed: true });
    tlBtnSecondaryWiggle.to(btnSVGStart, 0.1, { morphSVG: btnSVGEnd });

    if (btnSVG && btnSVGStart && btnSVGEnd) {
      secondaryBtn.addEventListener('mouseover', () => {
        tlBtnSecondaryWiggle.play();
      });
      secondaryBtn.addEventListener('mouseleave', () => {
        tlBtnSecondaryWiggle.reverse();
      });
    }
  });
});
