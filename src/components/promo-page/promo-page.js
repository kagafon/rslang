/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
import Swiper from 'swiper';
import optionsForSwiper from './optionsForSwiper';

export default class promoPage {
  init() {
    this.parent = createElement(null, 'div', ['parent'], {}, '');
    this.swiperContainer = createElement(
      this.parent,
      'div',
      ['swiper-container'],
      {},
      ''
    );
    this.swiperWrapper = createElement(
      this.swiperContainer,
      'div',
      ['swiper-wrapper'],
      {},
      ''
    );
    const item1 = createElement(
      this.swiperWrapper,
      'img',
      ['swiper-slide'],
      {
        src: 'assets/images/promo-page/29d246cc8954f12113b3b86b0051464e.jpg',
      },
      ''
    );
    const item2 = createElement(
      this.swiperWrapper,
      'img',
      ['swiper-slide'],
      {
        src: 'assets/images/promo-page/0_ef4fa_320c2e95_orig-640x360.jpg',
      },
      ''
    );
    const item3 = createElement(
      this.swiperWrapper,
      'img',
      ['swiper-slide'],
      {
        src: 'assets/images/promo-page/1519728910159193202.jpg',
      },
      ''
    );
    const item4 = createElement(
      this.swiperWrapper,
      'img',
      ['swiper-slide'],
      {
        src: 'assets/images/promo-page/3643a446463165.585530c44d950.jpg',
      },
      ''
    );
    const item5 = createElement(
      this.swiperWrapper,
      'img',
      ['swiper-slide'],
      {
        src: 'assets/images/promo-page/57d92f3657b3a.jpg',
      },
      ''
    );
    const item6 = createElement(
      this.swiperWrapper,
      'img',
      ['swiper-slide'],
      {
        src: 'assets/images/promo-page/priroda-gory-utki-ozero-peizazh.jpg',
      },
      ''
    );
    const item7 = createElement(
      this.swiperWrapper,
      'img',
      ['swiper-slide'],
      {
        src: 'assets/images/promo-page/russia-flag-button-square-xs.png',
      },
      ''
    );
    const item8 = createElement(
      this.swiperWrapper,
      'img',
      ['swiper-slide'],
      {
        src:
          'assets/images/promo-page/united-states-of-america-flag-button-square-xs.png',
      },
      ''
    );
    const item9 = createElement(
      this.swiperWrapper,
      'img',
      ['swiper-slide'],
      {
        src:
          'assets/images/promo-page/viaduk-poezd-transport-zvezdy-liudi-peizazh-minimalizm-gory.jpg',
      },
      ''
    );
    const item10 = createElement(
      this.swiperWrapper,
      'video',
      ['swiper-slide'],
      {
        style: 'width: 400; height: 300',
        controls: 'controls',
        preload: 'true',
        poster: 'assets/images/russia-flag-button-square-xs.png',
      },
      ''
    );
    const source = createElement(
      item10,
      'source',
      ['source'],
      {
        src: 'assets/images/promo-page/videoplayback.mp4',
        type: 'video/mp4;',
      },
      ''
    );
    const btnPrev = createElement(
      this.swiperContainer,
      'div',
      ['swiper-button-prev'],
      {},
      ''
    );
    const btnNext = createElement(
      this.swiperContainer,
      'div',
      ['swiper-button-next'],
      {},
      ''
    );
    this.postInit();
    this.slideNext(btnNext);
    this.slidePrev(btnPrev);
    return this.parent;
  }
}
