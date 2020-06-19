import { createElement } from 'helpers/dom';
import router from 'components/Router/';

class MainPage {
  create() {
    this.container = createElement(
      '',
      'div',
      [
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'flex-column',
        'mx-4',
      ],
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

    const div2 = createElement(
      this.jumbotron,
      'div',
      ['d-flex', 'align-items-center', 'div-level', 'flex-column'],
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
    createElement(progressDiv, 'p', [], {}, 'Выучено слов : 25%');
    const progress = createElement(progressDiv, 'div', ['progress'], {}, '');
    this.progressBar = createElement(
      progress,
      'div',
      ['progress-bar'],
      {
        role: 'progressbar',
        style: 'width: 25%;',
        'aria-valuenow': '25',
        'aria-valuemin': '0',
        'aria-valuemax': '100',
      },
      '25%'
    );

    const words = [
      'изучать только новые слова',
      'только повторение',
      'изучать все слова',
    ];

    words.forEach((el, index) => {
      const div = createElement(
        div2,
        'div',
        [
          'custom-control',
          'custom-radio',
          'custom-control-inline',
          `control-m${index + 1}`,
        ],
        {},
        ''
      );
      createElement(
        div,
        'input',
        ['custom-control-input'],
        {
          type: 'radio',
          id: `customRadioInline${index + 1}`,
          name: 'customRadioInline1',
        },
        ''
      );
      createElement(
        div,
        'label',
        ['custom-control-label'],
        { for: `customRadioInline${index + 1}` },
        `${el}`
      );
    });

    this.startButton = createElement(
      this.container,
      'button',
      ['btn', 'btn-primary', 'btn_start_main'],
      {},
      'Начать обучение'
    );
  }

  addHandlers() {
    this.startButton.addEventListener('click', () => {
      router.draw('main-page-game');
    });
  }

  init() {
    this.create();
    this.addHandlers();
    return this.container;
  }
}

export default MainPage;
