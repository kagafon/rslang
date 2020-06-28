/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
import Swiper from 'swiper';
import optionsForSwiper from './optionsForSwiper';
import 'stylesheets/promo-page/style.scss';

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
    const describeGame = createElement(
      this.parent,
      'div',
      ['discribe-game'],
      {},
      ''
    );
    const divRule = createElement(describeGame, 'div', ['learn'], {}, '');
    const imgRule = createElement(
      divRule,
      'img',
      ['img-game'],
      { src: 'assets/images/promo-page/russia-flag-button-square-xs.png' },
      ''
    );
    const titleRule = createElement(
      divRule,
      'h3',
      ['title'],
      {},
      'Правило интервального повторения'
    );
    const pRule = createElement(
      titleRule,
      'p',
      ['describe'],
      {},
      'Изучение новых слов.'
    );
    const olRule = createElement(pRule, 'ul', ['describe'], {}, '');
    const liRule = createElement(
      olRule,
      'li',
      ['describe'],
      { type: 'circle' },
      'Угадали - слово повториться(для закрепления материала):'
    );
    const olliRule = createElement(liRule, 'ol', ['describe'], {}, '');
    const olliRule1 = createElement(
      olliRule,
      'li',
      ['describe'],
      { type: 'square' },
      'Сложное слово - через день'
    );
    const olliRule3 = createElement(
      olliRule,
      'li',
      ['describe'],
      { type: 'square' },
      'Среднее - через три дня'
    );
    const olliRule5 = createElement(
      olliRule,
      'li',
      ['describe'],
      { type: 'square' },
      'Легкое - через семь дней'
    );
    const olliRule4 = createElement(
      olRule,
      'li',
      ['describe'],
      { type: 'circle' },
      'Не угадали - слово повториться через час.'
    );
    const divAllRule = createElement(describeGame, 'div', ['game'], {}, '');
    const imgAllRule = createElement(
      divAllRule,
      'img',
      ['img-game'],
      { src: 'assets/images/promo-page/russia-flag-button-square-xs.png' },
      ''
    );
    const titleAllRule = createElement(
      divAllRule,
      'h3',
      ['title'],
      {},
      'Правила игры'
    );
    const pAllRule = createElement(
      titleAllRule,
      'p',
      ['describe'],
      {},
      'На стартовой странице каждой игры пользователь выбирает уровень сложности. В "изучаемые слова" можно играть только, если количество изученных слов больше 10.'
    );
    const divLearn = createElement(describeGame, 'div', ['game'], {}, '');
    const imgLearn = createElement(
      divLearn,
      'img',
      ['img-game'],
      { src: 'assets/images/promo-page/russia-flag-button-square-xs.png' },
      ''
    );
    const titleLearn = createElement(
      divLearn,
      'h3',
      ['title'],
      {},
      'Изучение новых слов'
    );
    const pLearn = createElement(
      titleLearn,
      'p',
      ['describe'],
      {},
      'В настройках приложения пользователь указывает интенсивность ежедневного обучения. Карточки с обучающими словами содержат перевод слова, произношение и пример использования.'
    );
    const divSpeakit = createElement(describeGame, 'div', ['game'], {}, '');
    const imgSpeakIt = createElement(
      divSpeakit,
      'img',
      ['img-game'],
      { src: 'assets/images/promo-page/russia-flag-button-square-xs.png' },
      ''
    );
    const titleSpeakIt = createElement(
      divSpeakit,
      'h3',
      ['title'],
      {},
      'SpeakIt'
    );
    const pSpeakIt = createElement(
      titleSpeakIt,
      'p',
      ['describe'],
      {},
      `Игрок нажимает на слово, чтобы услышать его звучание. Затем произносит это слово в микрофон до достижения правильного варианта.`
    );
    const divPuzzle = createElement(describeGame, 'div', ['game'], {}, '');
    const imgPuzzle = createElement(
      divPuzzle,
      'img',
      ['img-game'],
      { src: 'assets/images/promo-page/russia-flag-button-square-xs.png' },
      ''
    );
    const titlePuzzle = createElement(
      divPuzzle,
      'h3',
      ['title'],
      {},
      'English Puzzle'
    );
    const pPuzzle = createElement(
      titlePuzzle,
      'p',
      ['describe'],
      {},
      'Игроку дано предложение на русском языке. Необходимо сделать его перевод из приведенных слов на английском.'
    );
    const divSavanna = createElement(describeGame, 'div', ['game'], {}, '');
    const imgSavanna = createElement(
      divSavanna,
      'img',
      ['img-game'],
      { src: 'assets/images/promo-page/russia-flag-button-square-xs.png' },
      ''
    );
    const titleSavanna = createElement(
      divSavanna,
      'h3',
      ['title'],
      {},
      'Саванна'
    );
    const pSavanna = createElement(
      titleSavanna,
      'p',
      ['describe'],
      {},
      'Дано слово. Игрок должен выбрать правильный перевод за определенное время.'
    );
    const divCall = createElement(describeGame, 'div', ['game'], {}, '');
    const imgCall = createElement(
      divCall,
      'img',
      ['img-game'],
      { src: 'assets/images/promo-page/russia-flag-button-square-xs.png' },
      ''
    );
    const titleCall = createElement(divCall, 'h3', ['title'], {}, 'Аудиовызов');
    const pCall = createElement(
      titleCall,
      'p',
      ['describe'],
      {},
      'В игре подбираем произнесённому на английском языке слову русский перевод.'
    );
    const divMaster = createElement(describeGame, 'div', ['game'], {}, '');
    const imgMaster = createElement(
      divMaster,
      'img',
      ['img-game'],
      { src: 'assets/images/promo-page/russia-flag-button-square-xs.png' },
      ''
    );
    const titleMaster = createElement(
      divMaster,
      'h3',
      ['title'],
      {},
      'Мастер фраз'
    );
    const pMaster = createElement(
      titleMaster,
      'p',
      ['describe'],
      {},
      'Составьте фразу по первым буквам произнесенных слов.'
    );
    const divSprint = createElement(describeGame, 'div', ['game'], {}, '');
    const imgSprint = createElement(
      divSprint,
      'img',
      ['img-game'],
      { src: 'assets/images/promo-page/russia-flag-button-square-xs.png' },
      ''
    );
    const titleSprint = createElement(divSprint, 'h3', ['title'], {}, 'Sprint');
    const pSprint = createElement(
      titleSprint,
      'p',
      ['describe'],
      {},
      'Дано слово и перевод, а также два варианта ответа - верно или нет. Игрок выбирает один из них.'
    );
    this.initSwiper();
    this.slideNext(btnNext);
    this.slidePrev(btnPrev);
    return this.parent;
  }

  initSwiper() {
    this.swiper = new Swiper(this.swiperContainer, optionsForSwiper);
  }

  slidePrev(btn) {
    btn.addEventListener('click', () => {
      this.swiper.slidePrev();
    });
  }

  slideNext(button) {
    button.addEventListener('click', () => {
      this.swiper.slideNext();
    });
  }
}
