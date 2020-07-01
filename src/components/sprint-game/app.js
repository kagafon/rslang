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
      {},
      'Loading...'
    );

    createElement(
      createElement(this.gameContainer, 'div', ['wrapper']),
      'div',
      ['main']
    );
    // createElement(this.gameContainer.querySelector('.main'), 'div', ['points']);
    // createElement(this.gameContainer.querySelector('.main'), 'div', [
    //   'game-timer',
    // ]);
    // createElement(this.gameContainer.querySelector('.main'), 'div', [
    //   'game-block',
    // ]);
    // createElement(this.gameContainer.querySelector('.game-block'), 'div', [
    //   'dots-block',
    // ]);
    // createElement(
    //   this.gameContainer.querySelector('.game-block'),
    //   'img',
    //   ['game-img'],
    //   { src: 'assets/images/sprint-game/dog.png' }
    // );
    // createElement(this.gameContainer.querySelector('.game-block'), 'div', [
    //   'engWord',
    // ]);
    // createElement(this.gameContainer.querySelector('.game-block'), 'div', [
    //   'rusWord',
    // ]);
    // createElement(this.gameContainer.querySelector('.game-block'), 'button', [
    //   'button',
    // ]);
    // createElement(this.gameContainer.querySelector('.game-block'), 'button', [
    //   'button',
    // ]);
    // createElement(this.gameContainer.querySelector('.game-block'), 'div', [
    //   'btn',
    // ]);
    // createElement(this.gameContainer.querySelector('.game-block'), 'div', [
    //   'btn',
    // ]);
    return this.gameContainer;
  }

  postInit() {
    StartPage.init(this.gameContainer);
  }
}
