// OLD Compare
const navItems = document.querySelectorAll('.cap_navigation-item');
const anchors = $('.cap-anchor_box .cap-anchor')
  .map(function () {
    return '#' + $(this).attr('id');
  })
  .get();

const findCurrentAnchorIndex = () => {
  for (let i = 0; i < navItems.length; i++) {
    if (navItems[i].classList.contains('w--current')) {
      return i;
    }
  }
  return -1;
};

const scrollToAnchor = (id) => {
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
};

const handleNavItemClick = (item, index, event) => {
  if (mobile.matches) {
    event.preventDefault();
    event.stopPropagation();
    navItems.forEach((item) => item.classList.remove('w--current'));
    item.classList.add('w--current');
    const slideIndex = index;
    capSwiper.slideTo(slideIndex);
  }
};

const mobile = window.matchMedia('(max-width: 991px)');
const desktop = window.matchMedia('(min-width: 992px)');
let capSwiper = null;

const swiperMode = () => {
  const arrowPrev = $('.cap_slider-actions .slider-arrow');
  arrowPrev.addClass('capabilities-arrow');

  if (desktop.matches) {
    if (capSwiper) {
      capSwiper.destroy(true, true);
      capSwiper = null;
      $(navItems).removeClass('w--current');
    }
  } else if (mobile.matches) {
    $(navItems).removeClass('w--current');
    $(navItems).eq(0).addClass('w--current');
    if (!capSwiper) {
      capSwiper = new Swiper('.cap_content', {
        slidesPerView: 1,
        spaceBetween: 24,
        speed: 250,
        observer: true,
        centeredSlides: true,
        navigation: {
          prevEl: '.slider-arrow.prev.capabilities-arrow',
          nextEl: '.slider-arrow.next.capabilities-arrow',
        },
        on: {
          slideChange: () => {
            navItems.forEach((item, index) => {
              if (index === capSwiper.activeIndex) {
                item.classList.add('w--current');
              } else {
                item.classList.remove('w--current');
              }
            });
          },
        },
      });
    }
  }
};

// Events
window.addEventListener('load', () => {
  swiperMode();
});

window.addEventListener('resize', () => {
  swiperMode();
});

navItems.forEach((item, index) => {
  item.addEventListener('click', (event) => {
    handleNavItemClick(item, index, event);
  });
});

// Desktop Arrows Click
$('.cap_slider-actions.desktop .slider-arrow.prev').click(() => {
  const currentAnchorIndex = findCurrentAnchorIndex();
  if (currentAnchorIndex > 0) {
    scrollToAnchor(anchors[currentAnchorIndex - 1]);
  } else {
    scrollToAnchor(anchors[anchors.length - 1]);
  }
});

$('.cap_slider-actions.desktop .slider-arrow.next').click(() => {
  const currentAnchorIndex = findCurrentAnchorIndex();
  if (currentAnchorIndex < anchors.length - 1) {
    scrollToAnchor(anchors[currentAnchorIndex + 1]);
  } else {
    scrollToAnchor(anchors[0]);
  }
});

let arrowLeft = $('.w-icon-slider-left');
let arrowRight = $('.w-icon-slider-right');
let customArrows = $('.about__investor-arrow');

customArrows.on('click', function (element) {
  getDirection(element);
});

function getDirection(element) {
  customArrows.each(function () {
    let directionID = $(this).attr('id');

    if (directionID === 'link-left') {
      if (arrowLeft.is(':hidden')) {
        $(this).hide();
      } else {
        $(this).show();
      }
    }

    if (directionID === 'link-right') {
      if (arrowRight.is(':hidden')) {
        $(this).hide();
      } else {
        $(this).show();
      }
    }
  });

  let clickedDirection = $(element).attr('id');
  if (clickedDirection === 'link-left') {
    arrowLeft.click();
  }
  if (clickedDirection === 'link-right') {
    arrowRight.click();
  }
}

getDirection();
