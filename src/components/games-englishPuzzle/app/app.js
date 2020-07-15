// eslint-disable-next-line import/no-unresolved
import StartPage from 'components/games-englishPuzzle/app/components/start-window/start-window';
import { createElement } from 'helpers/dom';

export default class AppPuzzle {
  init() {
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('game-container', 'englishPuzzle');

    createElement(createElement(this.gameContainer, 'div', ['header']), 'div', [
      'hints-block',
    ]);

    createElement(
      createElement(
        createElement(this.gameContainer, 'div', ['spinner']),
        'div',
        ['spinner-border', 'text-warning'],
        { role: 'status' }
      ),
      'span',
      ['sr-only'],
      {},
      'Loading...'
    );

    createElement(this.gameContainer, 'div', ['wrapper']);

    return this.gameContainer;
  }

  postInit() {
    StartPage.init(this.gameContainer);
  }
}
