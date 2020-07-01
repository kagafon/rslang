import { createElement } from 'helpers/dom';
import {
  hideWord,
  playAudio,
  letters,
  volumeUp,
  volumeOff,
  changeProgressBar,
  createLoader,
  checkWordResult,
} from 'helpers/helpersForMainPage';
import store from 'components/pages/MainPage/Store';
import Swiper from 'swiper';
import optionsForSwiper from 'components/pages/MainPage/Swiper';
import modal from 'components/pages/MainPage/modal';
import {
  getSettings,
  getUserWords,
} from 'components/pages/MainPage/dataForMain';
import { User, Words } from 'services/backend';

import Toaster from 'components/Toaster';
import router from 'components/Router/';

class MainPageGame {
  constructor() {
    this.addAction = this.addAction.bind(this);
    this.addSubmitHandler = this.addSubmitHandler.bind(this);
    this.updateSlide = this.updateSlide.bind(this);
    this.addInputHandler = this.addInputHandler.bind(this);
    this.addVolumeHandler = this.addVolumeHandler.bind(this);
    this.addContainerHandler = this.addContainerHandler.bind(this);
    this.adddifficultyButton = this.adddifficultyButton.bind(this);
  }

  async create() {
    console.error(store.getState().learnedWords);
    const preloads = ['image', 'audio', 'audioExample', 'audioMeaning'];
    this.loader = createLoader();
    try {
      const data = await Promise.all([getSettings(), getUserWords(preloads)]);
      this.settings = data[0];
      this.words = data[1];
    } catch (e) {
      Toaster.createToast(`На сегодня нет слов`, 'danger');
      router.draw('main-page');
    } finally {
      this.loader.parentNode.removeChild(this.loader);
    }
    switch (store.getState().learnedWords) {
      case 'new':
        this.words = this.words.filter((el) => el.difficulty === 'new');
        break;
      case 'old':
        this.words = this.words.filter((el) => el.difficulty !== 'new');
        break;
      default:
        this.words;
    }
    if (this.words.length === 0) {
      throw new Error();
    }
  }

  createSwiper() {
    this.container = createElement(
      '',
      'form',
      [
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'flex-column',
        'swipper-form',
        'main-page-game',
      ],
      {},
      ''
    );
    this.swiperContainer = createElement(
      this.container,
      'div',
      ['swiper-container', 'swiper-container-main'],
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
    createElement(this.container, 'div', ['swiper-pagination'], {}, '');
    const progress = createElement(this.container, 'div', ['progress'], {}, '');
    this.progressBar = createElement(
      progress,
      'div',
      ['progress-bar'],
      {
        role: 'progressbar',
        style: `width: ${(1 / this.words.length) * 100}%`,
        'aria-valuenow': `${(1 / this.words.length) * 100}`,
        'aria-valuemin': '0',
        'aria-valuemax': '300',
      },
      ''
    );
    // createElement(this.swiperContainer, 'div', ['swiper-button-prev'], {}, '');
    // createElement(this.swiperContainer, 'div', ['swiper-button-next'], {}, '');
    this.words.forEach((word) => {
      const item = createElement(
        this.swiperWrapper,
        'div',
        ['swiper-slide'],
        { id: word.id },
        ''
      );
      const card = this.createCard(word);
      item.appendChild(card);
    });
  }

  createCard(wordInit) {
    const { buttons, prompts } = this.settings;
    const {
      word,
      image,
      audioSrc,
      imageSrc,
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
    const cardHeaderButtons = createElement(
      cardHeader,
      'div',
      ['d-flex', 'justify-content-center', 'btn-group'],
      { role: 'group' },
      ``
    );
    if (buttons.removeWord)
      createElement(
        cardHeaderButtons,
        'button',
        ['btn', 'btn-danger'],
        { 'data-btn': 'delete', type: 'button', tabindex: -1 },
        `удалить слово`
      );
    if (buttons.gradeWord)
      createElement(
        cardHeaderButtons,
        'button',
        ['btn', 'btn-warning'],
        { 'data-btn': 'complex', type: 'button', tabindex: -1 },
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
      `${word}`
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
        tabindex: -1,
      },
      `${word}`
    );
    createElement(cardBody, 'hr', ['my-5'], {}, ``);
    if (prompts.translation)
      createElement(cardBody, 'p', ['card-text'], {}, `${wordTranslate}`);
    if (prompts.meaning) {
      const sentence = hideWord(word, textMeaning);
      createElement(
        cardBody,
        'p',
        ['card-text', 'card-text-meaning'],
        {},
        `${sentence}`
      );
    }
    if (prompts.example) {
      const sentence = hideWord(word, textExample);
      createElement(
        cardBody,
        'p',
        ['card-text', 'card-text-example'],
        {},
        `${sentence}`
      );
    }
    if (prompts.transcription)
      createElement(cardBody, 'p', ['card-text'], {}, `${transcription}`);
    if (prompts.image) {
      const cardImage = createElement(
        cardBody,
        'div',
        ['card-img_div'],
        {},
        ``
      );
      createElement(cardImage, 'img', ['card-img'], { src: `${imageSrc}` }, ``);
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
    if (buttons.showAnswer)
      createElement(
        cardFooter,
        'button',
        ['btn', 'btn-info'],
        { value: 1, tabindex: -1, type: 'submit', 'data-btn': 'answer' },
        `Показать ответ`
      );

    const ankibtn = createElement(
      cardFooter,
      'div',
      ['btn-group'],
      { role: 'group' },
      ``
    );
    createElement(
      ankibtn,
      'button',
      ['btn', 'btn-sm', 'btn-success'],
      { type: 'submit' },
      `Легко`
    );
    createElement(
      ankibtn,
      'button',
      ['btn', 'btn-sm', 'btn-info'],
      { type: 'submit' },
      `Хорошо`
    );
    createElement(
      ankibtn,
      'button',
      ['btn', 'btn-sm', 'btn-warning'],
      { type: 'submit' },
      `Сложно`
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
    inputWord.style.width = `${backWord.offsetWidth + 1}px`;
    this.input.style.width = `${backWord.offsetWidth}px`;
  }

  findActiveCardWord() {
    const word = this.words.find((el) => {
      if (el.id === this.input.id) {
        return true;
      }
    });
    return word;
  }

  updateSlide() {
    this.input = document.querySelector('.swiper-slide-active input');
    this.volumeBtn = document.querySelector('.swiper-slide-active span.volume');
    this.input.addEventListener('input', this.addInputHandler);
    this.card = document.querySelector('.swiper-slide-active');
    this.setLongWord();
    if (store.getState().isAudioPlayButton) {
      volumeUp(this.volumeBtn);
    } else {
      volumeOff(this.volumeBtn);
    }
    this.progressBar = document.querySelector('.progress-bar');
    this.pagination = document.querySelector(
      '.swiper-pagination.swiper-pagination-fraction'
    );
    changeProgressBar(this.progressBar, this.pagination);
  }

  async addSubmitHandler(event) {
    event.preventDefault();

    this.wordInput = this.findActiveCardWord();
    let {
      word,
      audioSrc,
      audioMeaningSrc,
      audioExampleSrc,
      textMeaning,
      textExample,
      wordTranslate,
      id,
    } = this.wordInput;
    this.wordInput.lastRepeat = new Date().getTime();
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
      this.input.disabled = 'disabled';
      if (event.submitter.innerText === 'ПОКАЗАТЬ ОТВЕТ') {
        this.wordInput = await checkWordResult(this.wordInput, 'no', true);
      } else {
        this.wordInput = await checkWordResult(this.wordInput, 'yes');
      }
      this.inputBackground.classList.add('answer_success');
      this.input.classList.add('success');
      if (!store.getState().isAudioPlay && store.getState().isAudioPlayButton) {
        store.setState({ isAudioPlay: true });
        await playAudio(this.audio, audioSrc);
        if (this.textMeaning) {
          this.textMeaning.textContent = `${textMeaning}`;
          await playAudio(this.audio, audioMeaningSrc);
        }
        if (this.textExample) {
          this.textExample.textContent = `${textExample}`;
          await playAudio(this.audio, audioExampleSrc);
        }
        store.setState({ isAudioPlay: false });
      } else {
        if (this.textMeaning) this.textMeaning.textContent = `${textMeaning}`;
        if (this.textExample) this.textExample.textContent = `${textExample}`;
      }
      setTimeout(() => {
        this.swiper.slideNext();
        this.updateSlide();
      }, 1000);
    } else {
      this.wordInput = await checkWordResult(this.wordInput, 'no', false);
      this.inputBackground.classList.add('answer_error');
      letters(word, this.input.value, this.inputWord);
      this.input.value = '';
      setTimeout(() => {
        this.inputWord.classList.add('hidden1');
      }, 3000);
      this.input.blur();

      if (!store.getState().isAudioPlay && store.getState().isAudioPlayButton) {
        store.setState({ isAudioPlay: true });
        await playAudio(this.audio, audioSrc);
        if (this.textMeaning) await playAudio(this.audio, audioMeaningSrc);
        if (this.textExample) await playAudio(this.audio, audioExampleSrc);
        store.setState({ isAudioPlay: false });
      }
    }
    this.adddifficultyButton(event.submitter.innerText);
    Words.updateUserWord(this.wordInput);
  }

  adddifficultyButton(button) {
    if (button === 'ЛЕГКО') this.wordInput.difficulty = 'easy';
    if (button === 'ХОРОШО') this.wordInput.difficulty = 'medium';
    if (button === 'СЛОЖНО') this.wordInput.difficulty = 'hard';
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
      volumeOff(this.volumeBtn);
      if (this.audio) {
        this.audio.muted = true;
      }
    } else {
      store.setState({ isAudioPlayButton: true });
      volumeUp(this.volumeBtn);
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
    const word = this.findActiveCardWord();
    word.difficulty = 'deleted';
    Toaster.createToast(`слово удалено из изучаемых`, 'danger');
    try {
      Words.updateUserWord(word);
    } catch (e) {
      console.error(e);
      Toaster.createToast(`ошибка сохранения`, 'danger');
    }
  }

  addComplexHandler() {
    const word = this.findActiveCardWord();
    word.difficulty = 'hard';
    Toaster.createToast(`слово добавлено в категорию 'сложные'`, 'danger');
    try {
      Words.updateUserWord(word);
    } catch (e) {
      Toaster.createToast(`ошибка сохранения`, 'danger');
    }
  }

  addAction() {
    this.card = document.querySelector('.swiper-slide-active');
    this.input = document.querySelector('.swiper-slide-active input');
    this.focusInput();
    this.container.addEventListener('submit', this.addSubmitHandler);
    this.input.addEventListener('input', this.addInputHandler);
    this.container.addEventListener('click', this.addContainerHandler);
  }

  async init() {
    try {
      await this.create();
      this.createSwiper();
      return this.container;
    } catch (e) {
      Toaster.createToast(`ошибка загрузки`, 'danger');
      router.draw('main-page');
    }
  }

  postInit() {
    try {
      modal.create();
      this.initSwiper();
      this.addAction();
      this.setLongWord();
    } catch (e) {
      Toaster.createToast(`ошибка загрузки`, 'danger');
      router.draw('main-page');
    }
  }
}

export default MainPageGame;
