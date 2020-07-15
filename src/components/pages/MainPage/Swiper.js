export default {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  simulateTouch: false,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
  preventInteractionOnTransition: true,
  on: {
    transitionEnd: () => {
      const input = document.querySelector('.swiper-slide-active input');
      if (input) input.focus();
    },
  },
};
