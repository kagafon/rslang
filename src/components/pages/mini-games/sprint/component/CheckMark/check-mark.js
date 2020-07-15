import { createElement } from 'helpers/dom';

export default class CheckMark {
  static render() {
    createElement(
      document.querySelector('.game-block'),
      'div',
      ['material-icons', 'md-correct', 'correct', 'icon', 'checkOk'],
      { id: 'ok' },
      'check_circle'
    );
    createElement(
      document.querySelector('.game-block'),
      'div',
      ['material-icons', 'md-cancel', 'cancel', 'icon', 'checkFalse'],
      { id: 'cancel' },
      'cancel'
    );
  }

  static init() {
    this.render();
  }
}
