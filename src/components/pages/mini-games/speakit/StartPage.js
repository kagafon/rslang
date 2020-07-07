import { createElement } from 'helpers/dom';

export default class StartPage {
  constructor(container, prepareForRound, startRound) {
    this.container = createElement(container, 'div', ['start-page', 'hidden']);
    const placeholder = createElement(this.container, 'div', [
      'start-page__placeholder',
    ]);
    this.readyToStart = null;
    this.transitionEndHandler = (evt) => {
      evt.currentTarget.removeEventListener('click', this.transitionEndHandler);
      if (this.readyToStart) {
        startRound();
        this.readyToStart = null;
      }
    };
    this.container.addEventListener('transitionend', this.transitionEndHandler);
    createElement(
      placeholder,
      'h4',
      ['h4', 'start-page__title'],
      {},
      'Speak It'
    );
    createElement(placeholder, 'div', ['start-page__description']).innerHTML =
      'Тренировка <strong>Speak It</strong> предназначена для развития понимания речи и постановки произношения.';
    createElement(
      placeholder,
      'div',
      ['level-select__title'],
      {},
      'Выберите уровень'
    );
    const buttonsContainer = createElement(placeholder, 'div', [
      'level-select__buttons',
    ]);
    [1, 2, 3, 4, 5, 6].forEach((x) => {
      createElement(
        buttonsContainer,
        'button',
        ['btn', 'btn-primary'],
        { type: 'button' },
        x
      ).addEventListener('click', async () => {
        if (await prepareForRound(x - 1)) {
          this.readyToStart = true;
          this.hide();
        }
      });
    });
    createElement(
      placeholder,
      'button',
      ['btn', 'btn-primary', 'mt-3'],
      { type: 'button' },
      'Изучаемые слова'
    ).addEventListener('click', async () => {
      if (await prepareForRound(-1)) {
        this.readyToStart = true;
        this.hide();
      }
    });
  }

  hide() {
    const transitionEnd = (evt) => {
      evt.currentTarget.removeEventListener('transitionend', transitionEnd);
      this.container.classList.add('d-none');
    };
    this.container.addEventListener('transitionend', transitionEnd);
    this.container.classList.add('hidden');
  }

  show() {
    this.container.classList.remove('hidden', 'd-none');
  }
}
