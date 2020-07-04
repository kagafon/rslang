import { createElement } from 'helpers/dom';

export default class StartPage {
  constructor(container, startRound) {
    this.container = createElement(container, 'div', ['start-page', 'hidden']);
    createElement(
      this.container,
      'h4',
      ['h4', 'start-page__title'],
      {},
      'Speak It'
    );
    createElement(this.container, 'div', [
      'start-page__description',
    ]).innerHTML =
      'Тренировка <strong>Speak It</strong> предназначена для развития понимания речи и постановке произношения';
    createElement(
      this.container,
      'div',
      ['level-select__title'],
      {},
      'Выберите уровень'
    );
    const buttonsContainer = createElement(this.container, 'div', [
      'level-select__buttons',
    ]);
    [1, 2, 3, 4, 5, 6].forEach((x) => {
      createElement(
        buttonsContainer,
        'button',
        ['btn', 'btn-primary'],
        { type: 'button' },
        x
      ).addEventListener('click', () => {
        startRound(x - 1);
      });
    });
    createElement(
      this.container,
      'button',
      ['btn', 'btn-primary', 'mt-3'],
      { type: 'button' },
      'Изучаемые слова'
    ).addEventListener('click', () => {
      startRound(-1);
    });
  }

  hide() {
    this.container.classList.add('hidden');
  }

  show() {
    this.container.classList.remove('hidden');
  }
}
