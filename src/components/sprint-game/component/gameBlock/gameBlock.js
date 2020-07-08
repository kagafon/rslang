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

export default class GameBlock {
  static render() {
    createElement(document.querySelector('.main'), 'div', ['points'], {}, '0');
    createElement(document.querySelector('.main'), 'div', ['game-block']);
  }

  static startСountdown(from, to) {
    const time = document.querySelector('.timer');
    const points = document.querySelector('.points');
    let isTime = true;
    time.style.display = 'block';
    time.classList.add('game-timer');
    time.classList.remove('timer');
    function startTimer() {
      setTimeout(function go() {
        time.textContent = `0${from}`.slice(-2);
        if (isTime && from > to) {
          setTimeout(go, 1000);
          from -= 1;
        } else if (from < 1) {
          isTime = false;
          time.style.display = 'none';
          Toaster.createToast('Игра окончена', 'danger');
          store.setState({ points: points.textContent });
          setTimeout(() => {
            Statistic.init();
          }, 1000);
        }
      }, 1000);
    }
    startTimer();
    return this.time;
  }

  static init() {
    this.render();
    this.startСountdown(60, 0);
    Volume.init();
    Dots.init();
    Image.init();
    EngWords.init();
    RusWords.init();
    CheckMark.init();
    Buttons.init();
  }
}
