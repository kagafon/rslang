/* eslint-disable import/no-cycle */
import { createElement } from 'helpers/dom';
import Statistic from 'components/sprint-game/component/statistic/statistic';
import store from 'components/sprint-game/component/storage';
import Toaster from 'components/Toaster/index';
import Dots from './dots/dots';
import EngWords from './engWords/engWords';
import RusWords from './rusWords/rusWords';
import Buttons from './button/button';
import CheckMark from './CheckMark/check-mark';
import Image from './Image/image';
import Volume from './Volume/volume';
import ButtonsArrow from './buttonArrow/buttonArrow';

let timerId;

export default class GameBlock {
  static render() {
    createElement(document.querySelector('.main'), 'div', ['points'], {}, '0');
    createElement(document.querySelector('.main'), 'div', ['game-block']);
  }

  static startСountdown(from, to) {
    let current = from;
    const time = document.querySelector('.timer');
    const points = document.querySelector('.points');
    time.style.display = 'block';
    time.classList.add('game-timer');
    time.classList.remove('timer');
    let isTime = true;

    timerId = setInterval(function () {
      time.textContent = `0${current}`.slice(-2);
      if (isTime && current < 1) {
        isTime = false;
        clearInterval(timerId);
        time.style.display = 'none';
        store.setState({ points: points.textContent });
        Statistic.init();
        document.removeEventListener('keyup', Buttons.keyUpHandler);
        document.removeEventListener('keyup', ButtonsArrow.keyUpHandler);
      }
      current -= 1;
    }, 1000);
    return timerId;
  }

  static resetTimeout() {
    clearTimeout(timerId);
  }

  static init() {
    this.render();
    this.startСountdown(10, 0);
    Volume.init();
    Dots.init();
    Image.init();
    EngWords.init();
    RusWords.init();
    CheckMark.init();
    Buttons.init();
  }
}
