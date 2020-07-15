/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import { createElement } from 'helpers/dom';
import StartPage from './component/start-page/start-page';
import Timer from './component/timer/timer';
import Buttons from './component/button/button';
import GameBlock from './component/gameBlock';

export default class AppSprint {
  init() {
    this.gameContainer = document.createElement('div');
    this.gameContainer.classList.add('game-container', 'sprint');

    createElement(
      createElement(
        createElement(this.gameContainer, 'div', ['spinner']),
        'div',
        ['spinner-border', 'text-secondary'],
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

  beforeClose() {
    document.removeEventListener('keyup', Buttons.keyUpHandler);
    Timer.resetTime();
    GameBlock.resetTimeout();
  }

  postInit() {
    StartPage.init(this.gameContainer);
  }
}
