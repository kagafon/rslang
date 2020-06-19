// eslint-disable-next-line no-restricted-imports
import { createElement } from '../../../helpers/dom';
import Header from './components/main/header/header';
import Voice from './components/main/voiceBlock/voice';
import StartPage from './components/main/start-page/start-page';

export default class App {
  static render() {
    createElement(document.body, 'div', ['wrapper']);
  }

  static run() {
    // Header.init();
    this.render();
    // Voice.init();
    // Results.init();
    // Words.init();
    // Button.init();
    // Service.wordsReauest();
    StartPage.init();
  }
}
