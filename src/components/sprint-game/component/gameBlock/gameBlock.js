import { createElement } from 'helpers/dom';

import Points from './points/points';
import Dots from './dots/dots';
import EngWords from './engWords/engWords';
import RusWords from './rusWords/rusWords';
import Buttons from './button/button';
import ButtonArrow from './buttonArrow/buttonArrow';
import CheckMark from './CheckMark/check-mark';
import Image from './Image/image';
import Volume from './Volume/volume';

export default class GameBlock {
  static render() {
    createElement(document.querySelector('.main'), 'div', ['game-block']);
  }

  static init() {
    Points.init();
    this.render();
    Dots.init();
    Image.init();
    EngWords.init();
    RusWords.init();
    CheckMark.init();
    Buttons.init();
    ButtonArrow.init();
    Volume.init();
  }
}
