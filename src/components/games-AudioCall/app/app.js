// eslint-disable-next-line no-restricted-imports
import { createElement } from 'helpers/dom';
import StartPage from 'components/games-AudioCall/app/components/main/start-page/start-page';

export default class App {
  static render() {
    createElement(document.body, 'div', ['spinner']);
    // createElement(document.querySelector('.spinner'), 'div', ['loader']);
    createElement(document.body, 'div', ['header']);
    createElement(document.body, 'div', ['wrapper']);
    createElement(document.querySelector('.wrapper'), 'div', ['answerBlock']);
  }

  static run() {
    this.render();
    StartPage.init();
  }
}
