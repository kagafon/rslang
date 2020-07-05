import { createElement } from 'helpers/dom';

export default class ButtonsArrow {
  static init() {
    const buttonLeft = createElement(document.querySelector('.main'), 'btn', [
      'btn',
      'btn-false',
    ]);
    const buttonRight = createElement(document.querySelector('.main'), 'btn', [
      'btn',
      'btn-true',
    ]);
    this.pressKeyBoard();
  }

  static pressKeyBoard() {
    const btnFalse = document.querySelector('.btn-false');
    const btnTrue = document.querySelector('.btn-true');

    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 37) {
        btnFalse.style.opacity = 1;
        btnTrue.style.opacity = 0.7;
      } else if (event.keyCode === 39) {
        btnFalse.style.opacity = 0.7;
        btnTrue.style.opacity = 1;
      }
    });
  }
}
