import { createElement } from 'helpers/dom';
import StartGame from './start-game';

export default class Timer {
  static render() {
    createElement(document.querySelector('.wrapper'), 'div', ['timer-block']);
    const timerBLock = document.querySelector('.timer-block');
    timerBLock.innerHTML = `
      <div class="timer">
        <span class="timer-second"></span>
      </div>
      <span class="material-icons keyboard">
        keyboard_hide
      </span>
      <span class="control"> Используйте клавиша 1, 2, 3, 4 что бы дать быстрый ответ. 
      находится по центру экрана под тамером</span>
    `;
  }

  static initializeTimer() {
    const timerBLock = document.querySelector('.timer-block');
    let timerNumber = 0;

    function tick() {
      const timer = document.querySelector('.timer-second');
      // eslint-disable-next-line no-plusplus
      if (++timerNumber === 4) {
        clearInterval(sec);
        timerBLock.remove();
        StartGame.init();
      }
      timer.textContent = timerNumber;
    }
    const sec = setInterval(tick, 1000);
    tick();
  }

  static init() {
    this.render();
    this.initializeTimer();
  }
}
