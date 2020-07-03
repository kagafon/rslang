import { createElement } from 'helpers/dom';
import createCard from 'components/pages/MainPage/Card';
import {
  playAudio,
  letters,
  volumeUp,
  volumeOff,
  changeProgressBar,
  createLoader,
  checkWordResult,
  showStat,
} from 'helpers/helpersForMainPage';
import store from 'components/pages/MainPage/Store';
import Swiper from 'swiper';
import optionsForSwiper from 'components/pages/MainPage/Swiper';
// import modal from 'components/pages/MainPage/modal';
import { getUserWords } from 'components/pages/MainPage/dataForMain';
import { Words } from 'services/backend';

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
  }

  async create() {
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
    // console.error(store.getState().learnedWords);
    this.loader = createLoader();
    try {
      const data = await getUserWords();
      this.words = data.wordsToday;
      this.settings = data.settings;
    } catch (e) {
      Toaster.createToast(`На сегодня нет слов`, 'danger');
      throw new Error();
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
      Toaster.createToast(`в этой категории пока нет слов`, 'danger');
      throw new Error();
    }
    // console.error(this.words);
  }

  createSwiper() {
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
    this.words.forEach((word) => {
      const item = createElement(
        this.swiperWrapper,
        'div',
        ['swiper-slide'],
        { id: word.id },
        ''
      );
      const { buttons, prompts } = this.settings;
      const card = createCard(word, buttons, prompts);

      item.appendChild(card);
    });
    console.error(this.swiperContainer);
  }

  initSwiper() {
    this.swiper = new Swiper(this.swiperContainer, optionsForSwiper);
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

  async addSubmitHandler(event) {
    event.preventDefault();
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
    this.translations = document.querySelectorAll(
      '.swiper-slide-active p.translate'
    );
    this.inputWord.innerHTML = '';
    this.inputWord.classList.remove('hidden1', 'hidden2');
    this.inputBackground.classList.remove('answer_success', 'answer_error');
    if (this.input.value === word) {
      this.input.disabled = 'disabled';
      this.submittBtn.style.userSelect = 'none';
      this.submittBtnAnswer.style.userSelect = 'none';
      // this.input.disabled = 'disabled';
      if (event.submitter.innerText === 'ПОКАЗАТЬ ОТВЕТ') {
        const dataUpdate = await checkWordResult(this.wordInput, 'no', true);
        this.wordInput = dataUpdate.word;
      } else {
        const dataUpdate = await checkWordResult(this.wordInput, 'yes');
        this.wordInput = dataUpdate.word;
        const stat = dataUpdate.stat;
        if (stat.passedCards === this.settings.learning.maxCardsPerDay) {
          showStat('Серия завершена', [
            { text: 'Карточек завершено', value: stat.passedCards },
            {
              text: 'Правильные ответы',
              value: `${Math.floor(
                (stat.correctAnswers / stat.passedCards) * 100
              )}%`,
            },
            { text: 'Новые слова', value: stat.learnedWords },
            {
              text: 'Самая длинная серия правльных ответов',
              value: stat.answerSeries,
            },
          ]);
        }
      }
      if (this.translations.length !== 0) {
        this.translations.forEach((el) => {
          el.style.display = 'block';
        });
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
      const dataUpdate = await checkWordResult(this.wordInput, 'no', false);
      this.wordInput = dataUpdate.word;
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
    Words.updateUserWord(this.wordInput);
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
    if (event.target.dataset.btn === 'easy') {
      this.wordInput.difficulty = 'easy';
      Toaster.createToast(`это слово легкое для Вас`, 'danger');
    }
    if (event.target.dataset.btn === 'medium') {
      this.wordInput.difficulty = 'medium';
      Toaster.createToast(`это слово стоит повторить`, 'danger');
    }
    if (event.target.dataset.btn === 'hard') {
      this.wordInput.difficulty = 'hard';
      Toaster.createToast(`это трудное слово, но Вы справитесь!`, 'danger');
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
  updateSlide() {
    this.input = document.querySelector('.swiper-slide-active input');
    this.volumeBtn = document.querySelector('.swiper-slide-active span.volume');
    this.submittBtn = document.querySelector('.swiper-slide-active #submitt1');
    this.submittBtnAnswer = document.querySelector(
      '.swiper-slide-active #submitt2'
    );
    console.error(this.submittBtn);
    this.card = document.querySelector('.swiper-slide-active');
    this.input.addEventListener('input', this.addInputHandler);
    this.wordInput = this.findActiveCardWord();
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
  addAction() {
    this.form = document.querySelector('.swipper-form');
    this.updateSlide();
    this.input.focus();
    this.container.addEventListener('submit', this.addSubmitHandler);
    this.container.addEventListener('click', this.addContainerHandler);
  }

  async init() {
    try {
      await this.create();
      this.createSwiper();
      return this.container;
    } catch (e) {
      router.draw('main-page');
      return this.container;
    }
  }

  postInit() {
    try {
      this.initSwiper();
      this.addAction();
      this.setLongWord();
    } catch (e) {
      console.error(e);
      Toaster.createToast(`ошибка загрузки`, 'danger');
      router.draw('main-page');
    }
  }
}

export default MainPageGame;
