import { createElement } from 'helpers/dom';

export default class Points {
  static render() {
    createElement(document.querySelector('.main'), 'div', ['points']);
  }

  static init() {
    this.render();
  }
}
