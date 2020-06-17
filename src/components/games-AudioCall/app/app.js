// eslint-disable-next-line no-restricted-imports
import { createElement } from '../../../helpers/dom';
import Header from './components/main/header/header';
import Voice from './components/main/voiceBlock/voice';
import Words from './components/main/words/words';
import Button from './components/main/button/button';
import Results from './components/main/results/results';

export default class App {
  static render() {
    createElement(document.body, 'div', ['wrapper']);
    createElement(document.querySelector('.wrapper'), 'div', ['answerBlock']);
  }

  static run() {
    Header.init();
    this.render();
    // Voice.init();
    Results.init();
    Words.init();
    Button.init();
  }
}
