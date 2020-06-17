import ProgressBar from './progress-bar/progress-bar';
// eslint-disable-next-line no-restricted-imports
import { createElement } from '../../../../../../helpers/dom';

export default class Header {
  static render() {
    createElement(document.body, 'div', ['header']);
  }

  static init() {
    this.render();
    ProgressBar.init();
  }
}
