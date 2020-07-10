import { createElement } from 'helpers/dom';

export default class Dots {
  static render() {
    createElement(document.querySelector('.game-block'), 'div', [
      'dotsBlock',
      'backViolet',
    ]);
    const dotsBlock = document.querySelector('.dotsBlock');
    for (let i = 0; i < 3; i += 1) {
      createElement(dotsBlock, 'div', ['dots']);
    }
    createElement(
      document.querySelector('.game-block'),
      'div',
      ['points-text'],
      { style: 'display: block' },
      '0'
    );
  }

  static init() {
    this.render();
  }
}
