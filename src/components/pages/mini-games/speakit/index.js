import { createElement } from 'helpers/dom';
import { Words } from 'services/backend';
import Toaster from 'components/Toaster';
import StartPage from './StartPage';
import GamePage from './GamePage';

export default class SpeakItPage {
  constructor() {
    this.container = createElement(null, 'div', ['game-speakit']);
    this.startPage = new StartPage(
      this.container,
      this.prepareForRound.bind(this),
      this.startRound.bind(this)
    );
    this.gamePage = new GamePage(this.container, this.startNewGame.bind(this));
    this.spinner = createElement(null, 'div', ['spinner-container']);
    createElement(this.spinner, 'div', ['modal-backdrop', 'fade', 'show']);
    createElement(
      createElement(this.spinner, 'div', ['spinner-border'], {
        role: 'status',
      }),
      'span',
      ['sr-only']
    );
    this.spinner.addEventListener('transitionend', (evt) => {
      if (!this.spinnerShown) evt.currentTarget.remove();
    });
  }

  async prepareForRound(level) {
    let retValue = true;
    this.showSpinner();
    try {
      this.words = await Words.getWordsForRound(
        level,
        Math.floor(Math.random() * 59),
        10,
        ['image', 'audio']
      );
    } catch (err) {
      Toaster.createToast(`Ошибка получения данных для игры: ${err}`, 'danger');
      this.words = [];
      retValue = false;
    }
    if (this.words.length < 10) {
      Toaster.createToast(
        'Недостаточно слов для игры (необходимо минимум 10 слов)',
        'danger'
      );
      this.words = [];
      retValue = false;
    }
    if (retValue) {
      this.level = level;
    } else {
      this.level = null;
    }
    this.hideSpinner();
    return retValue;
  }

  startRound() {
    Toaster.createToast('Start Round ' + this.level, 'info');
    this.gamePage.startRound(this.words);
  }

  init() {
    this.startPage.show();
    return this.container;
  }

  beforeClose() {
    this.gamePage.recognition.stop();
  }

  startNewGame() {
    this.startPage.show();
  }

  showSpinner() {
    if (!this.spinnerShown) {
      this.spinnerShown = true;
      this.spinner.classList.add('hidden');
      this.container.appendChild(this.spinner);
      this.spinner.classList.remove('hidden');
    }
  }

  hideSpinner() {
    this.spinnerShown = false;
    this.spinner.classList.add('hidden');
  }
}
