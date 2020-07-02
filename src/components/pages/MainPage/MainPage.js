import { createElement } from 'helpers/dom';
import store from 'components/pages/MainPage/Store';
import router from 'components/Router/';
import { getUserWords } from 'components/pages/MainPage/dataForMain';
class MainPage {
  create() {
    this.container = createElement(
      '',
      'div',
      ['d-flex', 'justify-content-center', 'flex-column', 'mx-4', 'main-page'],
      {},
      ''
    );

    this.jumbotron = createElement(
      this.container,
      'div',
      [
        'jumbotron',
        'd-flex',
        'justify-content-between',
        'align-items-center',
        'flex-column',
      ],
      {},
      ''
    );

    const div1 = createElement(
      this.jumbotron,
      'div',
      ['d-flex', 'justify-content-around', 'align-items-center', 'div-level'],
      {},
      ''
    );

    const lang = createElement(
      div1,
      'p',
      ['d-flex', 'justify-content-between', 'align-items-center'],
      {},
      ''
    );
    createElement(lang, 'div', ['lang-image'], {}, '');
    createElement(lang, 'p', [], {}, 'Английский язык');

    const progressDiv = createElement(div1, 'div', [], {}, '');
    this.progressText = createElement(
      progressDiv,
      'p',
      [],
      {},
      'Выучено слов : 0%'
    );
    const progress = createElement(progressDiv, 'div', ['progress'], {}, '');
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
    ];

    this.wordsDiv = createElement(
      this.container,
      'div',
      ['d-flex', 'justify-content-between', 'div-level2'],
      {},
      ''
    );

    words.forEach((el, index) => {
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
        `${el.text}`
      );
      let icon = '';
      switch (el.state) {
        case 'new':
          icon = 'fiber_new';
          break;
        case 'old':
          icon = 'loop';
          break;
        default:
          icon = 'reply_all';
      }
      createElement(jumbotronLevel, 'span', ['material-icons'], {}, `${icon}`);
    });
  }

  addHandlers() {
    this.wordsDiv.addEventListener('click', (event) => {
      if (event.target.dataset.words) {
        store.setState({ learnedWords: `${event.target.dataset.words}` });
        router.draw('main-page-game');
      }
    });
  }

  async updateProgress() {
    try {
      const data = await getUserWords();
      const words = data.wordsToday;
      const learnWords = words.filter((el) => el.difficulty !== 'new');
      const pr = Math.floor((learnWords.length / words.length) * 100);
      this.progressText.textContent = `Выучено слов: ${pr}%`;
      this.progressBar.style.width = `${pr}%`;
      this.progressBar.textContent = `${pr}%`;
      this.progressBar.ariaValuenow = `${pr}`;
    } catch {
      console.error('ой');
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
