// eslint-disable-next-line no-restricted-imports
import { createElement } from '../../../helpers/dom';
import Header from './components/main/header/header';
import Voice from './components/main/voiceBlock/voice';
import Words from './components/main/words/words';
import Button from './components/main/button/button';

export default class App {
  static render() {
    createElement(document.body, 'div', ['wrapper']);
  }

  static run() {
    Header.init();
    this.render();
    Voice.init();
    Words.init();
    Button.init();
  }
}
