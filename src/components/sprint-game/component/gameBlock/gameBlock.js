/* eslint-disable import/no-cycle */
import { createElement } from 'helpers/dom';
// import Results from 'components/sprint-game/component/results';
import Statistic from 'components/sprint-game/component/statistic/statistic';
import Service from 'components/sprint-game/component/service';

import Points from './points/points';
import Dots from './dots/dots';
import EngWords from './engWords/engWords';
import RusWords from './rusWords/rusWords';
import Buttons from './button/button';
import CheckMark from './CheckMark/check-mark';
import Image from './Image/image';
import Volume from './Volume/volume';

export default class GameBlock {
  static render() {
    createElement(document.querySelector('.main'), 'div', ['game-block']);
  }

  static countTime(from, to) {
    const time = document.querySelector('.timer');
    // const audioBlock = document.querySelector('.audio-block');
    time.style.display = 'block';
    time.classList.add('game-timer');
    time.classList.remove('timer');
    function startTimer() {
      setTimeout(function go() {
        time.textContent = `0${from}`.slice(-2);
        if (from > to) {
          setTimeout(go, 1000);
        } else if (from < 1) {
          setTimeout(() => {
            Service.spinnerOn();
            time.style.display = 'none';
            // audioBlock.style.display = 'none';
            Statistic.init();
          }, 1000);
          Service.spinnerOff();
        }
        from -= 1;
      }, 1000);
    }
    startTimer();
    return this.time;
  }

  static init() {
    this.countTime(60, 0);
    Points.init();
    this.render();
    Dots.init();
    Image.init();
    EngWords.init();
    RusWords.init();
    CheckMark.init();
    Volume.init();
    Buttons.init();
  }
}
