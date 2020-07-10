/* eslint-disable import/no-cycle */
import GameBlock from 'components/sprint-game/component/gameBlock/gameBlock';
import { createElement } from 'helpers/dom';

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
    function startTimer() {
      setTimeout(function go() {
        time.textContent = from;
        if (from > to) {
          setTimeout(go, 1000);
        } else if (from < 1) {
          time.style.display = 'none';
          GameBlock.init();
        }
        from -= 1;
      }, 1000);
    }
    startTimer();
    return this.time;
  }
}
