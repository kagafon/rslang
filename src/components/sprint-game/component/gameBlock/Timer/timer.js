/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
import './style.scss';

export default class Timer {
  static render() {
    const timer = createElement(
      null,
      'div',
      ['countdown'],
      { id: 'countdown' },
      ''
    );
    const countNumber = createElement(
      timer,
      'div',
      ['countdown-number'],
      {},
      ''
    );
    const spanNumber = createElement(
      countNumber,
      'span',
      ['countdown-time', 'seconds'],
      {},
      ''
    );
    this.startTimer(10, 0, spanNumber);
    return timer;
  }

  startTimer(from, to, second) {
    let current = from;

    setTimeout(function go() {
      second.innerHTML = `0${current}`.slice(-2);
      if (current > to) {
        setTimeout(go, 1000);
      } else {
        second.innerHTML = `Time is Up`;
      }
      current -= 1;
    }, 1000);
  }

  static init() {
    this.render();
  }
}
