/* eslint-disable import/no-cycle */
import GameBlock from 'components/pages/mini-games/sprint/component/gameBlock';
import { createElement } from 'helpers/dom';

let timeId;
export default class Timer {
  static init() {
    const timer = createElement(document.querySelector('.main'), 'div', [
      'timer',
    ]);
    const count = createElement(timer, 'div', ['count']);
    const time = createElement(count, 'span', ['time']);
    this.startСount(3, 0, time);
    return timer;
  }

  static startСount(from, to, time) {
    let current = from;

    timeId = setInterval(function () {
      time.textContent = `${current}`;
      if (current === to) {
        clearInterval(timeId);
        time.style.display = 'none';
        GameBlock.init();
      }
      current -= 1;
    }, 1000);
    return timeId;
  }

  static resetTime() {
    clearTimeout(timeId);
  }
}
