import { createElement } from 'helpers/dom';
import StartPage from 'components/sprint-game/component/start-page/start-page';

export default class AppSprint {
  init() {
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('game-container', 'sprint');

    createElement(
      createElement(
        createElement(this.gameContainer, 'div', ['spinner']),
        'div',
        ['spinner-border', 'text-warning'],
        { role: 'status' }
      ),
      'span',
      ['sr-only'],
      {}
    );

    createElement(
      createElement(this.gameContainer, 'div', ['wrapper']),
      'div',
      ['main']
    );

    return this.gameContainer;
  }

  postInit() {
    StartPage.init(this.gameContainer);
  }
}
