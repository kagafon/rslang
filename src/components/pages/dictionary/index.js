import { createElement } from 'helpers/dom';
import { Words } from 'services/backend';
import { FILE_BASE_URL } from 'services/config';

import Table from './Table';
import Modal from './Modal';

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
            { style: `width: ${x.learnLevel || 0}%;` }
          ),
        sort: (a, b) => a.learnLevel - b.learnLevel,
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
        icon: 'assets/images/icons/volume_up-24px.svg',
        text: '',
        action: (x, target) => this.playSound(x, target),
        className: ['btn-secondary', 'play-button'],
      },
      {
        icon: 'assets/images/icons/create-24px.svg',
        text: '',
        action: (x) => this.showDetails(x),
        className: ['btn-info', 'edit-button'],
      },
    ];
    this.container = createElement(null, 'div', ['container', 'dictionary']);
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
//    this.drawModal();
  }

  async loadWords() {
    this.words = await Words.getWordsForRound(0, 0, 30);
    //TO REMOVE
    this.words.forEach((x) => {
      x.learnLevel = Math.floor(Math.random() * 100);
      const rnd = Math.random();
      x.difficulty = rnd > 0.5 ? 'difficult' : rnd < 0.2 ? 'new' : 'easy';
    });
    this.table.reloadRows(this.words);
  }

  showDetails(word) {
    this.modal.show(word);
  }

  playSound(x, target) {
    this.audioButtonsToClear.push(target);
    this.audio.src = `${FILE_BASE_URL}${x.audio}`;
    target.classList.add('playing');
  }

  init() {
    return this.container;
  }
}

export default Dictionary;
