import { createElement } from 'helpers/dom';
import { Words } from 'services/backend';
import Toaster from 'components/Toaster';
import StartPage from './StartPage';

export default class SpeakItPage {
  constructor() {
    this.container = createElement(null, 'div', ['game-speakit']);
    this.startPage = new StartPage(this.container, this.startRound.bind(this));
  }

  startRound(round) {
    Toaster.createToast('Start Round ' + round, 'info');
  }

  init() {
    this.startPage.show();
    return this.container;
  }
}
