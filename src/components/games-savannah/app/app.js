import { createElement } from 'helpers/dom';
import StartPage from './components/start-page/start-page';

export default class App {
  static render() {
    createElement(document.body, 'div', ['wrapper']);
  }

  static run() {
    this.render();
    StartPage.init();
  }
}
