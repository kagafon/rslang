import { createElement } from 'helpers/dom';
import StartPage from 'components/games-AudioCall/app/components/main/start-page/start-page';

export default class App {
  init() {
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('game-container', 'audioCall');

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

    createElement(this.gameContainer, 'div', ['header']);
    createElement(
      createElement(this.gameContainer, 'div', ['wrapper']),
      'div',
      ['answerBlock']
    );

    return this.gameContainer;
  }

  postInit() {
    StartPage.init(this.gameContainer);
  }
}
