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

  static keyUpHandler(event) {
    const btnFalse = document.querySelector('.btn-false');
    const btnTrue = document.querySelector('.btn-true');
    if (event.keyCode === 37) {
      btnFalse.style.opacity = 1;
      btnTrue.style.opacity = 0.7;
    } else if (event.keyCode === 39) {
      btnFalse.style.opacity = 0.7;
      btnTrue.style.opacity = 1;
    }
  }

  static pressKeyBoard() {
    document.removeEventListener('keyup', this.keyUpHandler);
    document.addEventListener('keyup', this.keyUpHandler);
  }
}
