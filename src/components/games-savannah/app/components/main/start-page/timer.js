import { createElement } from 'helpers/dom';
// eslint-disable-next-line import/no-cycle
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
      <span class="control"> Используйте клавиши 1, 2, 3, 4 что бы дать быстрый ответ. 
      находится по центру экрана под тамером</span>
      <audio class='xx' src="assets/audio/savannah/start.mp3"></audio>
    `;
  }

  static initializeTimer() {
    const timerBLock = document.querySelector('.timer-block');
    const audio = document.querySelector('audio');
    audio.play();
    let timerNumber = 4;

    function tick() {
      const timer = document.querySelector('.timer-second');
      // eslint-disable-next-line no-plusplus
      if (--timerNumber === 0) {
        clearInterval(sec);
        timerBLock.remove();
        StartGame.init();
        audio.pause();
      }
      timer.textContent = timerNumber;
    }
    const sec = setInterval(tick, 1000);
    tick();

    const menuLink = document.querySelectorAll('.nav-link');

    menuLink.forEach((item) => {
      item.addEventListener('click', () => {
        clearInterval(sec);
      });
    });
  }

  static resetTimer() {
    clearInterval(this.initializeTimer());
  }

  static init() {
    this.render();
    this.initializeTimer();
  }
}
