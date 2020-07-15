// eslint-disable-next-line no-restricted-imports
import { createElement } from 'helpers/dom';
// eslint-disable-next-line import/no-cycle
import StartPage from 'components/games-savannah/app/components/main/start-page/start-page';
import Timer from 'components/games-savannah/app/components/main/start-page/timer';
import RusWords from 'components/games-savannah/app/components/main/words/words';

export default class App {
  init() {
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('game-container', 'savannah');

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

    createElement(createElement(this.gameContainer, 'div', ['header']), 'div', [
      'answerBlock',
    ]);

    createElement(this.gameContainer, 'div', ['wrapper']);

    return this.gameContainer;
  }

  // eslint-disable-next-line class-methods-use-this
  beforeClose() {
    document.removeEventListener('keydown', RusWords.keyboardChoice, false);
  }

  postInit() {
    StartPage.init(this.gameContainer);
  }
}
