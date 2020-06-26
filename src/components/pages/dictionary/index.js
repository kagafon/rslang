import { createElement } from 'helpers/dom';
import { Words } from 'services/backend';
import { FILE_BASE_URL } from 'services/config';

import Table from './Table';
import Modal from './Modal';

const LEARN_LEVEL_CUP = 20;

const getLearnLevel = (word) => {
  const answers = word.correctAnswers * 2 - word.totalAnswers;
  return answers > LEARN_LEVEL_CUP
    ? 100
    : Math.floor((answers * 100) / LEARN_LEVEL_CUP);
};

class Dictionary {
  constructor() {
    this.columnsToShow = [
      {
        name: 'learnLevel',
        title: 'Прогресс',
        className: ['col-2'],
        element: (parent, x) =>
          createElement(
            createElement(parent, 'div', ['progress']),
            'div',
            ['progress-bar', 'progress-bar-striped', 'bg-info'],
            {
              style: `width: ${getLearnLevel(x)}%;`,
            }
          ),
        sort: (a, b) => getLearnLevel(a) - getLearnLevel(b),
      },
      {
        name: 'word',
        title: 'Слово',
        className: ['col-2'],
        sort: (a, b) => a.word.localeCompare(b.word),
      },
      {
        name: 'wordTranslate',
        title: 'Перевод',
        className: ['d-none', 'd-sm-table-cell', 'col-2'],
        sort: (a, b) => a.wordTranslate.localeCompare(b.wordTranslate),
      },
      {
        name: 'transcription',
        title: 'Транскрипция',
        className: ['d-none', 'd-md-table-cell', 'col-2'],
      },
      { name: 'action', title: '', className: ['col-1'] },
    ];
    this.actions = [
      {
        text: '',
        action: (x, target) => this.playSound(x, target),
        className: ['btn-secondary', 'd-flex'],
        icon: 'volume_up',
      },
      {
        text: '',
        action: (x) => this.showDetails(x),
        className: ['btn-info', 'd-flex'],
        icon: 'create',
      },
    ];
    this.container = createElement(null, 'div', ['container', 'dictionary']);

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
    this.showSpinner();

    this.audio = new Audio();
    this.audioButtonsToClear = [];
    this.audio.addEventListener('ended', () => {
      while (this.audioButtonsToClear.length)
        this.audioButtonsToClear.pop().classList.remove('playing');
    });
    this.audio.autoplay = 'true';

    this.table = new Table(this.container, this.columnsToShow, this.actions);
    this.modal = new Modal(this.container, this.playSound.bind(this));

    this.loadWords();
  }

  async loadWords() {
    this.showSpinner();
    try {
      this.words = await Words.getAllUserWords();
      this.table.reloadRows(this.words);
    } catch (err) {
      console.log(err);
    }
    this.hideSpinner();
  }

  async showDetails(word) {
    this.showSpinner();
    try {
      this.modal.show(await Words.getUserWordById(word.id, ['image', 'audio']));
    } catch (err) {
      console.log(err);
    }
    this.hideSpinner();
  }

  playSound(x, target) {
    this.audioButtonsToClear.push(target);
    this.audio.src = `${FILE_BASE_URL}${x.audio}`;
    target.classList.add('playing');
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

  init() {
    return this.container;
  }
}

export default Dictionary;
