import { createElement } from 'helpers/dom';

export default class Dots {
  static render() {
    createElement(document.querySelector('.game-block'), 'div', ['dotsBlock']);
    const dotsBlock = document.querySelector('.dotsBlock');
    for (let i = 0; i < 3; i += 1) {
      createElement(dotsBlock, 'div', ['dots']);
    }
  }

  static init() {
    this.render();
  }
}
