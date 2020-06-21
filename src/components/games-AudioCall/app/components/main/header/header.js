import { createElement } from 'helpers/dom';
import ProgressBar from './progress-bar/progress-bar';

export default class Header {
  static render() {
    // createElement(document.body, 'div', ['header']);
  }

  static init() {
    this.render();
    ProgressBar.init();
  }
}
