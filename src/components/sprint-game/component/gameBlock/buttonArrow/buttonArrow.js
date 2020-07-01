import { createElement } from 'helpers/dom';

export default class ButtonsArrow {
  static render() {
    const buttonLeft = createElement(document.querySelector('.main'), 'div', [
      'btn',
      'btn-false',
    ]);
    const buttonRight = createElement(document.querySelector('.main'), 'btn', [
      'btn',
      'btn-true',
    ]);
  }

  static init() {
    this.render();
  }
}
