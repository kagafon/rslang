// eslint-disable-next-line no-restricted-imports
import { createElement } from 'helpers/dom';
import StartPage from 'components/games-AudioCall/app/components/main/start-page/start-page';

export default class App {
  static render() {
    createElement(document.body, 'div', ['wrapper']);
    localStorage.removeItem('round');
    localStorage.removeItem('level');
  }

  static run() {
    this.render();
    StartPage.init();
  }
}
