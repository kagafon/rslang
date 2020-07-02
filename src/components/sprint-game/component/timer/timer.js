/* eslint-disable import/no-cycle */
import GameBlock from 'components/sprint-game/component/gameBlock/gameBlock';
import { createElement } from 'helpers/dom';

export default class Timer {
  static init() {
    const timer = createElement(document.querySelector('.main'), 'div', [
      'timer',
    ]);
    const count = createElement(timer, 'div', ['count']);
    const second = createElement(count, 'span', ['time']);
    this.time(3, 0, second);
    return timer;
  }

  static time(from, to, second) {
    function startTimer() {
      setTimeout(function go() {
        second.textContent = from;
        if (from > to) {
          setTimeout(go, 1000);
        } else if (from < 1) {
          second.style.display = 'none';
          // audioBlock.style.display = 'block';
          GameBlock.init();
        }
        from -= 1;
      }, 1000);
    }
    startTimer();
    return this.second;
  }
}
