import { createElement } from 'helpers/dom';
import store from 'components/pages/MainPage/Store';
import router from 'components/Router/';
import { getUserWords } from 'components/pages/MainPage/dataForMain';
import { createLoader } from 'helpers/helpersForMainPage';
class MainPage {
  create() {
    this.container = createElement(
      '',
      'div',
      ['d-flex', 'justify-content-center', 'flex-column', 'mx-4', 'main-page'],
      {},
      ''
    );

    this.jumbotron = createElement(this.container, 'div', [
      'jumbotron',
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'flex-column',
    ]);

    const div1 = createElement(this.jumbotron, 'div', [
      'd-flex',
      'justify-content-around',
      'align-items-center',
      'div-level',
    ]);

    const lang = createElement(div1, 'p', [
      'd-flex',
      'justify-content-between',
      'align-items-center',
    ]);
    createElement(lang, 'div', ['lang-image']);
    createElement(lang, 'p', [], {}, 'Английский язык');

    const progressDiv = createElement(div1, 'div');
    this.progressText = createElement(
      progressDiv,
      'p',
      [],
      {},
      'Пройдено сегодня слов : 0%'
    );
    const progress = createElement(progressDiv, 'div', ['progress']);
    this.progressBar = createElement(
      progress,
      'div',
      ['progress-bar'],
      {
        role: 'progressbar',
        style: 'width: 0%;',
        'aria-valuenow': '0',
        'aria-valuemin': '0',
        'aria-valuemax': '100',
      },
      '0%'
    );

    const words = [
      { text: 'изучать только новые слова', state: 'new' },
      { text: 'повторение изученных слов', state: 'old' },
      { text: 'изучать все слова', state: 'all' },
      { text: 'изучать сложные слова', state: 'hard' },
    ];

    this.wordsDiv = createElement(this.container, 'div', [
      'd-flex',
      'justify-content-between',
      'flex-wrap',
      'div-level2',
    ]);

    words.forEach((el) => {
      const jumbotronLevel = createElement(
        this.wordsDiv,
        'div',
        [
          'jumbotron',
          'jumbotron-level',
          'd-flex',
          'justify-content-center',
          'align-items-center',
          'flex-column',
        ],
        { 'data-words': `${el.state}` },
        ``
      );
      const centerDiv = createElement(
        jumbotronLevel,
        'div',
        [
          'd-flex',
          'justify-content-center',
          'align-items-center',
          'flex-column',
          'text-center',
        ],
        { 'data-words': `${el.state}` },
        ``
      );
      let icon = '';
      switch (el.state) {
        case 'new':
          icon = 'fiber_new';
          break;
        case 'old':
          icon = 'loop';
          break;
        case 'hard':
          icon = 'psychology';
          break;
        default:
          icon = 'reply_all';
      }
      createElement(centerDiv, 'span', ['material-icons'], {}, `${icon}`);
      createElement(centerDiv, 'span', [], {}, `${el.text}`);
      createElement(centerDiv, 'span', [], { id: `${el.state}` });
    });
  }

  addHandlers() {
    this.wordsDiv.addEventListener('click', (event) => {
      switch (event.target.dataset.words) {
        case 'new':
          store.setState({ words: this.newWords });
          break;
        case 'old':
          store.setState({ words: this.learnedWords });
          break;
        case 'hard':
          store.setState({ words: this.hardWords });
          break;
        case 'all':
          store.setState({ words: this.allWords });
          break;
      }
      router.draw('main-page-game');
    });
  }

  async updateProgress() {
    this.loader = createLoader();
    try {
      const data = await getUserWords();
      const {
        newWords,
        learnedWords,
        allWords,
        learnedTodyUserWords,
        hardWords,
      } = data.words;
      this.newWords = newWords;
      this.learnedWords = learnedWords;
      this.allWords = allWords;
      this.learnedTodyUserWords = learnedTodyUserWords;
      this.hardWords = hardWords;
      let preloads = [];
      const { image, example, meaning } = data.settings.prompts;
      if (image) preloads.push('image');
      preloads.push('audio');
      if (example) preloads.push('audioExample');
      if (meaning) preloads.push('audioMeaning');

      store.setState({ userSettings: data.settings, userPreloads: preloads });

      const pr = Math.floor(
        (this.learnedTodyUserWords / data.settings.learning.maxCardsPerDay) *
          100
      );
      this.progressText.textContent = `Пройдено   слов: ${pr}%`;
      this.progressBar.style.width = `${pr}%`;
      this.progressBar.textContent = `${pr}%`;
      this.progressBar.ariaValuenow = `${pr}`;

      const buttonsWords = this.container.querySelectorAll('div[data-words]');
      buttonsWords.forEach((el) => {
        switch (el.dataset.words) {
          case 'new':
            el.querySelector(
              '#new'
            ).textContent = `всего: ${this.newWords.length}`;
            break;
          case 'old':
            el.querySelector(
              '#old'
            ).textContent = `всего: ${this.learnedWords.length}`;
            break;
          case 'hard':
            el.querySelector(
              '#hard'
            ).textContent = `всего: ${this.hardWords.length}`;
            break;
          case 'all':
            el.querySelector(
              '#all'
            ).textContent = `всего: ${this.allWords.length}`;
        }
      });
    } catch (e) {
      return this.loader;
    } finally {
      this.loader.parentNode.removeChild(this.loader);
    }
  }

  async init() {
    this.create();
    this.addHandlers();
    try {
      await this.updateProgress();
      return this.container;
    } catch {
      return this.container;
    }
  }
}

export default MainPage;
