import { createElement } from 'helpers/dom';
import {
  showWord,
  hideWord,
  playAudio,
  letters,
} from 'helpers/helpersForMainPage';
import constans from 'components/pages/MainPage/constant';
import store from 'components/pages/MainPage/Store';
import Swiper from 'swiper';
import optionsForSwiper from 'components/pages/MainPage/Swiper';
import modal from 'components/pages/MainPage/modal';

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
    this.addVolumeHandler = this.addVolumeHandler.bind(this);
    this.addContainerHandler = this.addContainerHandler.bind(this);
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
        { 'data-btn': 'delete', type: 'button' },
        `удалить слово`
      );
    if (complexButton)
      createElement(
        cardHeaderButtons,
        'button',
        ['btn', 'btn-warning'],
        { 'data-btn': 'complex', type: 'button' },
        `сложное слово`
      );
    createElement(
      cardHeader,
      'span',
      ['material-icons', 'md-100', 'volume'],
      { 'data-btn': 'volume' },
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
      {},
      ` ${word} `
    );
    createElement(cardBody, 'span', ['input-word', 'form-control'], {}, ``);
    createElement(
      cardBody,
      'input',
      ['form-control'],
      {
        type: 'text',
        autocomplete: 'off',
        id: `${id}`,
        'aria-label': `${word}`,
        'aria-describedby': 'basic-addon1',
        tabindex: 1,
      },
      `${word}`
    );
    createElement(cardBody, 'hr', ['my-4'], {}, ``);
    if (showWordTranslate)
      createElement(cardBody, 'p', ['card-text'], {}, `${wordTranslate}`);
    if (showTextMeaning) {
      const sentence = hideWord(word, textMeaning);
      createElement(
        cardBody,
        'p',
        ['card-text', 'card-text-meaning'],
        {},
        `${sentence}`
      );
    }
    if (showTextExample) {
      const sentence = hideWord(word, textExample);
      createElement(
        cardBody,
        'p',
        ['card-text', 'card-text-example'],
        {},
        `${sentence}`
      );
    }
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
    createElement(
      cardFooter,
      'button',
      ['btn', 'btn-primary'],
      { value: 1, tabindex: -1, type: 'submit' },
      `Далее`
    );
    if (answerButton)
      createElement(
        cardFooter,
        'button',
        ['btn', 'btn-info'],
        { value: 1, tabindex: -1, type: 'submit', 'data-btn': 'answer' },
        `Показать ответ`
      );

    return card;
  }

  initSwiper() {
    this.swiper = new Swiper(this.swiperContainer, optionsForSwiper);
  }

  focusInput() {
    this.input.focus();
  }

  setLongWord() {
    const backWord = this.card.querySelector('.input-background_back');
    const inputWord = this.card.querySelector('.input-word');
    inputWord.style.width = `${backWord.offsetWidth}px`;
    this.input.style.width = `${backWord.offsetWidth}px`;
  }

  findActiveCardWord() {
    const word = words.find((el) => {
      if (el.id === Number(this.input.id)) {
        return true;
      }
    });
    return word;
  }

  focusInputNext() {
    this.swiper.slideNext();
    this.input = document.querySelector('.swiper-slide-active input');
    this.input.addEventListener('input', this.addInputHandler);

    this.card = document.querySelector('.swiper-slide-active');
    this.setLongWord();
  }

  async addSubmitHandler() {
    event.preventDefault();
    this.wordInput = words.find((el) => {
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
    } = this.wordInput;
    this.audio = new Audio();
    this.inputBackground = document.querySelector(
      '.swiper-slide-active span.input-background'
    );
    this.inputWord = document.querySelector(
      '.swiper-slide-active span.input-word'
    );
    this.textMeaning = document.querySelector(
      '.swiper-slide-active p.card-text-meaning'
    );
    this.textExample = document.querySelector(
      '.swiper-slide-active p.card-text-example'
    );
    this.inputWord.innerHTML = '';
    this.inputWord.classList.remove('hidden1', 'hidden2');
    this.inputBackground.classList.remove('answer_success', 'answer_error');
    if (this.input.value === word) {
      this.inputBackground.classList.add('answer_success');
      this.input.classList.add('success');
      if (!store.getState().isAudioPlay && store.getState().isAudioPlayButton) {
        store.setState({ isAudioPlay: true });
        await playAudio(this.audio, audio);
        if (this.textMeaning) {
          this.textMeaning.textContent = `${textMeaning}`;
          await playAudio(this.audio, audioMeaning);
        }
        if (this.textExample) {
          this.textExample.textContent = `${textExample}`;
          await playAudio(this.audio, audioExample);
        }
        store.setState({ isAudioPlay: false });
      } else {
        if (this.textMeaning) this.textMeaning.textContent = `${textMeaning}`;
        if (this.textExample) this.textExample.textContent = `${textExample}`;
      }
      setTimeout(() => this.focusInputNext(), 2000);
    } else {
      this.inputBackground.classList.add('answer_error');

      letters(word, this.input.value, this.inputWord);

      this.input.value = '';
      setTimeout(() => {
        this.inputWord.classList.add('hidden1');
      }, 3000);
      this.input.blur();

      if (!store.getState().isAudioPlay && store.getState().isAudioPlayButton) {
        store.setState({ isAudioPlay: true });
        await playAudio(this.audio, audio);
        if (this.textMeaning) await playAudio(this.audio, audioMeaning);
        if (this.textExample) await playAudio(this.audio, audioExample);
        store.setState({ isAudioPlay: false });
      }
    }
  }

  addInputHandler() {
    if (this.inputBackground || this.inputWord) {
      this.inputBackground.classList.remove('answer_success', 'answer_error');
      this.inputWord.classList.remove('hidden1');
      this.inputWord.classList.add('hidden2');
    }
  }

  addContainerHandler(event) {
    if (event.target.dataset.btn === 'volume') {
      this.volumeBtn = event.target;
      this.addVolumeHandler();
    }
    if (event.target.dataset.btn === 'answer') {
      this.answerBtn = event.target;
      this.addAnswerHandler();
    }
    if (event.target.dataset.btn === 'delete') {
      this.deleteBtn = event.target;
      this.addDeleteHandler();
    }
    if (event.target.dataset.btn === 'complex') {
      this.complexBtn = event.target;
      this.addComplexHandler();
    }
  }

  addVolumeHandler() {
    if (store.getState().isAudioPlayButton) {
      store.setState({ isAudioPlayButton: false });
      this.volumeBtn.classList.add('off');
      this.volumeBtn.textContent = 'volume_off';
      if (this.audio) {
        this.audio.muted = true;
      }
    } else {
      store.setState({ isAudioPlayButton: true });
      this.volumeBtn.classList.remove('off');
      this.volumeBtn.textContent = 'volume_up';
      if (this.audio) {
        this.audio.muted = false;
      }
    }
  }

  addAnswerHandler() {
    const answerInput = this.findActiveCardWord();
    this.input.value = `${answerInput.word}`;
  }

  addDeleteHandler() {
    const answerInput = this.findActiveCardWord();
    const deleteWordsArr = store.getState().deleteWords || [];
    deleteWordsArr.push(answerInput);
    store.setState({ deleteWords: deleteWordsArr });
    console.error(`Слова, которые удалили`, store.getState().deleteWords);
    modal.setText('Вы удалили слово из изучаемых');
    modal.show();
    setTimeout(() => modal.hide(), 3000);
  }

  addComplexHandler() {
    const answerInput = this.findActiveCardWord();
    const complexWordsArr = store.getState().complexWords || [];
    complexWordsArr.push(answerInput);
    store.setState({ complexWords: complexWordsArr });
    console.error(`Сложные слова`, store.getState().complexWords);
    modal.setText('Вы поместили слово в категорию Сложные');
    modal.show();
    setTimeout(() => modal.hide(), 3000);
  }

  addAction() {
    this.card = document.querySelector('.swiper-slide-active');
    this.input = document.querySelector('.swiper-slide-active input');
    this.focusInput();
    this.container.addEventListener('submit', this.addSubmitHandler);
    this.input.addEventListener('input', this.addInputHandler);
    this.container.addEventListener('click', this.addContainerHandler);
  }

  init() {
    this.create();
    this.createSwiper();
    return this.container;
  }

  postInit() {
    modal.create();
    this.initSwiper();
    this.addAction();
    this.setLongWord();
  }
}

export default MainPageGame;
