import { createElement } from 'helpers/dom';
import words from 'components/pages/MainPage/constant';
import Swiper from 'swiper';
// import swiper from 'components/pages/MainPage/Swiper';

class MainPageGame {
  constructor() {
    this.addAction = this.addAction.bind(this);
  }
  create() {
    this.container = createElement(
      '',
      'form',
      [
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'flex-column',
        'swipper-form',
      ],
      {},
      ''
    );
  }

  createCarusel() {
    this.swiperContainer = createElement(
      this.container,
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
    createElement(this.swiperContainer, 'div', ['swiper-button-prev'], {}, '');
    createElement(this.swiperContainer, 'div', ['swiper-button-next'], {}, '');
    words.forEach((word) => {
      const item = createElement(
        this.swiperWrapper,
        'div',
        ['swiper-slide'],
        {},
        ''
      );
      const card = this.createCard(word);
      item.appendChild(card);
    });
  }

  createCard(wordInit) {
    const {
      word,
      image,
      audio,
      audioMeaning,
      audioExample,
      textMeaning,
      textExample,
      transcription,
      wordTranslate,
      textMeaningTranslate,
      textExampleTranslate,
      id,
    } = wordInit;
    const card = createElement('', 'div', ['card', 'card_size'], {}, '');
    createElement(card, 'div', ['card-header'], {}, `Новое слово`);
    const cardBody = createElement(card, 'div', ['card-body'], {}, ``);
    createElement(
      cardBody,
      'input',
      ['form-control'],
      {
        type: 'text',
        // placeholder: `${wordTranslate}`,
        id: `${id}`,
        'aria-label': `${word}`,
        'aria-describedby': 'basic-addon1',
        tabindex: 1,
      },
      `${word}`
    );
    createElement(cardBody, 'hr', ['my-4'], {}, ``);
    createElement(cardBody, 'p', ['card-text'], {}, `${wordTranslate}`);
    const cardFooter = createElement(card, 'div', ['card-footer'], {}, ``);
    createElement(
      cardFooter,
      'button',
      ['btn', 'btn-primary'],
      { value: 1, tabindex: -1, type: 'submit' },
      `Я не знаю`
    );
    return card;
  }

  addAction() {
    new Swiper('.swiper-container', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    // Now you can use all slider methods like
    // mySwiper.slideNext();
    // this.audio = new Audio();
    this.container.addEventListener('submit', (event) => {
      event.preventDefault();
      console.error(swiper);
      swiper.slideNext.bind(swiper)();
      // const word = words.find((el) => {
      //   if (el.id === Number(this.input.id)) {
      //     return true;
      //   }
      // });
      // if (this.input.value === word.word) {
      //   this.audio.src = `https://raw.githubusercontent.com/CharlieBlbl/rslang-data/master/${word.audio}`;
      //   this.audio.autoplay = true;
      //   function ggg() {
      //     document.querySelector('.carousel-control-next-icon').click();
      //     this.form = this.container.querySelector(
      //       '.carousel-item.active form'
      //     );
      //   }

      //   setTimeout(ggg, 2000);
      //   console.error('sss');
      // } else {
      //   console.error('error');
      // }
    });
  }

  init() {
    this.create();
    this.createCarusel();
    // this.addAction();
    setTimeout(this.addAction, 3000);
    return this.container;
  }
}

export default MainPageGame;
