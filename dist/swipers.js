"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/globalFunctions.js
  var swipers = [];
  var createSwiper = (componentSelector, swiperSelector, classSelector, options) => {
    const arrows = ".slider-arrow";
    const pagination = ".swiper-navigation";
    $(componentSelector).each(function() {
      let index = $(this).index();
      let instanceClass = `${classSelector}_${index}`;
      $(this).find(swiperSelector).addClass(instanceClass);
      $(this).find(arrows).addClass(instanceClass);
      $(this).find(pagination).addClass(instanceClass);
      let swiperOptions = Object.assign({}, options, {
        speed: 250,
        navigation: {
          prevEl: `${arrows}.prev.${instanceClass}`,
          nextEl: `${arrows}.next.${instanceClass}`
        },
        pagination: {
          el: `${pagination}.${instanceClass}`,
          type: "bullets",
          bulletActiveClass: "w-active",
          bulletClass: "w-slider-dot"
        }
      });
      for (let key in options) {
        if (key in swiperOptions) {
          swiperOptions[key] = options[key];
        }
      }
      let swiper = new Swiper(`${swiperSelector}.${instanceClass}`, swiperOptions);
      swipers[classSelector] = swipers[classSelector] || {};
      swipers[classSelector][index] = swiper;
    });
  };

  // src/swipers.js
  if ($(".company_content").length) {
    createSwiper(".company_content", ".company_slider", "company-swiper", {
      slidesPerView: 2,
      spaceBetween: 16
    });
  }
  if ($(".career_component").length) {
    createSwiper(".career_component", ".career_slider", "career-swiper", {
      slidesPerView: 1.25,
      spaceBetween: 16,
      breakpoints: {
        // when window width is >= 480px
        479: {
          slidesPerView: 2,
          spaceBetween: 24
        }
      }
    });
  }
  if ($(".stories_component").length) {
    const slideLength = $(".stories_slider .swiper-slide").length;
    if (slideLength === 0) {
      $(".stories_component").closest(".section").hide();
    } else if (slideLength === 1) {
      $(".stories_slider .swiper-slide").css("max-width", "54rem");
      $(".stories_component .arrows-group").hide();
    } else {
      createSwiper(".stories_component", ".stories_slider-cms", "stories-swiper", {
        slidesPerView: "auto",
        spaceBetween: 16
      });
    }
  }
  if ($(".platform-prev_component").length) {
    createSwiper(".platform-prev_component", ".platform-prev_slider", "platprevs-swiper", {
      slidesPerView: "auto",
      spaceBetween: 0
    });
  }
})();
//# sourceMappingURL=swipers.js.map
