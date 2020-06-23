import { createElement } from 'helpers/dom';
import constans from 'components/pages/MainPage/constant';
import Swiper from 'swiper';
import optionsForSwiper from 'components/pages/MainPage/Swiper';

const { words, settings, URL } = constans;
const {
  delebeButton,
  answerButton,
  complexButton,
  showWordTranslate,
  showTextMeaning,
  showTextExample,
  showTranscription,
  showImage,
  newWordNumber,
  cardsNumber,
} = settings;
class MainPageGame {
  constructor() {
    this.addAction = this.addAction.bind(this);
    this.addSubmitHandler = this.addSubmitHandler.bind(this);
    this.focusInputNext = this.focusInputNext.bind(this);
    this.addInputHandler = this.addInputHandler.bind(this);
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

  createSwiper() {
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
    // createElement(this.swiperContainer, 'div', ['swiper-button-prev'], {}, '');
    // createElement(this.swiperContainer, 'div', ['swiper-button-next'], {}, '');
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
    const cardHeader = createElement(
      card,
      'div',
      ['card-header', 'd-flex', 'justify-content-between'],
      {},
      ``
    );
    const cardHeaderButtons = createElement(cardHeader, 'div', [], {}, ``);
    if (delebeButton)
      createElement(
        cardHeaderButtons,
        'button',
        ['btn', 'btn-danger'],
        {},
        `удалить слово`
      );
    if (complexButton)
      createElement(
        cardHeaderButtons,
        'button',
        ['btn', 'btn-warning'],
        {},
        `сложное слово`
      );
    createElement(
      cardHeader,
      'span',
      ['material-icons', 'md-100', 'md-light'],
      {},
      `volume_up`
    );
    const cardBody = createElement(
      card,
      'div',
      [
        'card-body',
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'flex-column',
      ],
      {},
      ``
    );
    createElement(
      cardBody,
      'span',
      ['input-background', 'input-background_back'],
      {
        style: `width:${(word.length + 1) * 13}px`,
      },
      ``
    );
    createElement(
      cardBody,
      'span',
      ['input-word', 'form-control'],
      {
        style: `width:${(word.length + 1) * 13}px`,
      },
      ``
    );
    createElement(
      cardBody,
      'input',
      ['form-control'],
      {
        type: 'text',
        autocomplete: 'off',
        // placeholder: `${word}`,
        id: `${id}`,
        style: `width:${(word.length + 1) * 13}px`,
        'aria-label': `${word}`,
        'aria-describedby': 'basic-addon1',
        tabindex: 1,
      },
      `${word}`
    );
    createElement(cardBody, 'hr', ['my-4'], {}, ``);
    if (showWordTranslate)
      createElement(cardBody, 'p', ['card-text'], {}, `${wordTranslate}`);
    if (showTextMeaning)
      createElement(cardBody, 'p', ['card-text'], {}, `${textMeaning}`);
    if (showTextExample)
      createElement(cardBody, 'p', ['card-text'], {}, `${textExample}`);
    if (showTranscription)
      createElement(cardBody, 'p', ['card-text'], {}, `${transcription}`);
    if (showImage) {
      const cardImage = createElement(
        cardBody,
        'div',
        ['card-img_div'],
        {},
        ``
      );
      createElement(
        cardImage,
        'img',
        ['card-img'],
        { src: `${URL}${image}` },
        ``
      );
    }

    const cardFooter = createElement(
      card,
      'div',
      ['card-footer', 'd-flex', 'justify-content-between'],
      {},
      ``
    );
    if (answerButton)
      createElement(
        cardFooter,
        'button',
        ['btn', 'btn-info'],
        { value: 1, tabindex: -1, type: 'button' },
        `Показать ответ`
      );
    createElement(
      cardFooter,
      'button',
      ['btn', 'btn-primary'],
      { value: 1, tabindex: -1, type: 'submit' },
      `Далее`
    );
    return card;
  }

  initSwiper() {
    this.swiper = new Swiper(this.swiperContainer, optionsForSwiper);
  }

  focusInput() {
    this.input = document.querySelector('.swiper-slide-active input');
    this.input.focus();
  }

  focusInputNext() {
    this.swiper.slideNext();
    this.input = document.querySelector('.swiper-slide-active input');
    this.input.addEventListener('input', this.addInputHandler);
    // this.input.focus();
  }

  addSubmitHandler() {
    event.preventDefault();
    const wordInput = words.find((el) => {
      if (el.id === Number(this.input.id)) {
        return true;
      }
    });
    const {
      word,
      audio,
      audioMeaning,
      audioExample,
      textMeaning,
      textExample,
      wordTranslate,
      id,
    } = wordInput;
    this.inputBackground = document.querySelector(
      '.swiper-slide-active span.input-background'
    );
    this.inputWord = document.querySelector(
      '.swiper-slide-active span.input-word'
    );
    this.inputWord.innerHTML = '';
    this.inputWord.classList.remove('hidden1', 'hidden2');
    this.inputBackground.classList.remove('answer_success', 'answer_error');
    if (this.input.value === word) {
      this.inputBackground.classList.add('answer_success');
      this.input.classList.add('success');
      setTimeout(this.focusInputNext, 2000);
    } else {
      this.inputBackground.classList.add('answer_error');

      const errorAnswer = this.input.value.split('');
      const correctAnswer = word.split('');
      errorAnswer.forEach((letter, index) => {
        if (letter === correctAnswer[index]) {
          createElement(
            this.inputWord,
            'span',
            ['letter_success'],
            {},
            `${letter}`
          );
        } else {
          createElement(
            this.inputWord,
            'span',
            ['letter_error'],
            {},
            `${letter}`
          );
        }
      });
      this.input.value = '';
      setTimeout(() => {
        this.inputWord.classList.add('hidden1');
      }, 3000);
      this.input.blur();
    }
  }

  addInputHandler() {
    this.inputBackground.classList.remove('answer_success', 'answer_error');
    this.inputWord.classList.remove('hidden1');
    this.inputWord.classList.add('hidden2');
  }

  addAction() {
    this.audio = new Audio();
    this.focusInput();
    this.container.addEventListener('submit', this.addSubmitHandler);
    this.input.addEventListener('input', this.addInputHandler);
  }

  init() {
    this.create();
    this.createSwiper();
    return this.container;
  }

  postInit() {
    this.initSwiper();
    this.addAction();
  }
}

export default MainPageGame;
