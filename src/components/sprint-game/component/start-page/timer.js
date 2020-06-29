/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
import './style.scss';

export default class Timer {
  init() {
    const timerDiv = createElement(
      null,
      'div',
      ['countdown'],
      { id: 'countdown' },
      ''
    );
    const countNumber = createElement(
      timerDiv,
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
    const message = createElement(
      null,
      'div',
      ['deadline-message'],
      { id: 'deadline-message' },
      ''
    );
    this.startTimer(7, 0, spanNumber);
    return timerDiv;
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
}
