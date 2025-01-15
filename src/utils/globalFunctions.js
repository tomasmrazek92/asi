export const swipers = [];

export const createSwiper = (componentSelector, swiperSelector, classSelector, options) => {
  // Globals
  const arrows = '.slider-arrow';
  const pagination = '.swiper-navigation';
  // For Each
  $(componentSelector).each(function () {
    // Tag Instance
    let index = $(this).index();
    let instanceClass = `${classSelector}_${index}`;
    $(this).find(swiperSelector).addClass(instanceClass);
    $(this).find(arrows).addClass(instanceClass);
    $(this).find(pagination).addClass(instanceClass);

    // Build Options
    let swiperOptions = Object.assign({}, options, {
      speed: 250,
      navigation: {
        prevEl: `${arrows}.prev.${instanceClass}`,
        nextEl: `${arrows}.next.${instanceClass}`,
      },
      pagination: {
        el: `${pagination}.${instanceClass}`,
        type: 'bullets',
        bulletActiveClass: 'w-active',
        bulletClass: 'w-slider-dot',
        clickable: true,
      },
    });

    // Update Options
    for (let key in options) {
      if (key in swiperOptions) {
        swiperOptions[key] = options[key];
      }
    }

    // Init Slider
    let swiper = new Swiper(`${swiperSelector}.${instanceClass}`, swiperOptions);

    // Push to Global for possible references
    // store swiper instance in object using classSelector as key
    swipers[classSelector] = swipers[classSelector] || {};
    swipers[classSelector][index] = swiper;
  });
};

export const initializeSnappySnapItems = ({
  itemsContainerId,
  getTopOffset,
  getItemOffset,
  onInit,
}) => {
  const itemsContainer = document.querySelector(`[data-rs-container='${itemsContainerId}']`);

  const items = itemsContainer.querySelectorAll('[data-rs-item]');

  const childElements = Array.from(items);
  const childElementsCount = childElements.length;

  const recalculatePosition = () => {
    const itemOffset = getItemOffset?.() || 100;
    const topOffset = getTopOffset?.() || 0;
    const itemsContainerRect = itemsContainer.getBoundingClientRect();
    const lastItemHeight = childElements[childElementsCount - 1].getBoundingClientRect().height;
    const lastItemContentRect = childElements[childElementsCount - 1]
      .querySelector('[data-rs-item-content]')
      .getBoundingClientRect();

    const totalSnappedHeightCount = (childElementsCount - 1) * itemOffset + lastItemHeight;

    const mainContainerBottomOffset = -Math.max(
      0,
      totalSnappedHeightCount - itemsContainerRect.bottom + topOffset
    );

    let totalItemsHeight = 0;

    childElements.forEach((childElement, index) => {
      const childRect = childElement.getBoundingClientRect();
      totalItemsHeight += childRect.height;
      const { top } = childRect;

      const thisItemOffset = itemOffset * index + topOffset;
      childElement.style.width = '100%';
      if (mainContainerBottomOffset < 0) {
        itemsContainer.style.position = `relative`;
        childElement.style.position = 'absolute';
        childElement.style.top = 'auto';
        childElement.style.bottom = `${
          totalSnappedHeightCount - childRect.height - thisItemOffset
        }px`;
      } else {
        itemsContainer.style.position = `static`;
        childElement.style.position = 'sticky';
        childElement.style.top = `${thisItemOffset - mainContainerBottomOffset}px`;
        childElement.style.bottom = 'auto';
      }
    });

    itemsContainer.style.height = `${totalItemsHeight}px`;
  };

  // initial calculation
  recalculatePosition();
  onInit?.({
    recalculatePosition,
  });
};
