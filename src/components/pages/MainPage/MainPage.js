import { createElement } from 'helpers/dom';
// import router from 'components/Router/';

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
      ['d-flex', 'justify-content-around', 'align-items-center', 'div-level'],
      {},
      ''
    );

    const level = createElement(
      div1,
      'p',
      ['d-flex', 'justify-content-between', 'align-items-center'],
      {},
      ''
    );
    createElement(level, 'p', [], {}, 'Уровень');
    this.divForMenu = createElement(
      level,
      'div',
      ['btn-group'],
      { role: 'group', 'aria-labelledby': 'Button group with nested dropdown' },
      ''
    );
    this.dropDownMenuBtn = createElement(
      this.divForMenu,
      'button',
      ['btn', 'btn-secondary', 'dropdown-toggle', 'drop_down-button'],
      {
        'data-toggle': 'dropdown',
        'aria-haspopup': 'true',
        'aria-expanded': 'false',
      },
      '1'
    );
    this.dropDownMenu = createElement(
      this.divForMenu,
      'div',
      ['dropdown-menu'],
      { 'aria-labelledby': 'btnGroupDrop1' },
      ''
    );
    const levels = ['1', '2', '3', '4', '5', '6'];
    levels.forEach((level) => {
      createElement(this.dropDownMenu, 'a', ['dropdown-item'], {}, `${level}`);
    });

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
        ['custom-control', 'custom-radio', 'custom-control-inline'],
        {},
        ''
      );
      createElement(
        div,
        'input',
        ['custom-control-input'],
        {
          type: 'radio',
          id: `customRadioInline${index}`,
          name: 'customRadioInline1',
        },
        ''
      );
      createElement(
        div,
        'label',
        ['custom-control-label'],
        { for: `customRadioInline${index}` },
        `${el}`
      );
    });

    // this.startButton = createElement(
    //   this.jumbotron,
    //   'button',
    //   ['btn', 'btn-primary', 'btn_start_main'],
    //   {},
    //   'Начать обучение'
    // );
  }

  // addHandlers() {
  //   this.startButton.addEventListener('click', () => {
  //     router.draw('main-page-game');
  //   });
  // }

  init() {
    this.create();
    // this.addHandlers();
    return this.container;
  }
}

export default MainPage;
