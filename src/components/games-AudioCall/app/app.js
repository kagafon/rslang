// eslint-disable-next-line no-restricted-imports
import { createElement } from '../../../helpers/dom';
import Header from './components/main/header/header';

export default class App {
  static render() {
    createElement(document.body, 'div', ['wrapper']);
  }

  static run() {
    Header.init();
    this.render();
  }
}
