import Swiper from 'swiper';

new Swiper('.swiper-container', {
  // slidesPerGroup: 2,
  // updateOnWindowResize: true,
  // roundLengths: true,
  // nested: true,
  // centerInsufficientSlides: false,
  // centeredSlides: true,
  // loop: false,
  // loopFillGroupWithBlank: true,
  // pagination: {
  //   el: '.swiper-pagination',
  //   clickable: true,
  // },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // keyboard: {
  //   enabled: true,
  //   onlyInViewport: true,
  // },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 10,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
      slidesPerGroup: 1,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 25,
    },
  },
});

export default Swiper;
