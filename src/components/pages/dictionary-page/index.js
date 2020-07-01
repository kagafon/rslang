import { createElement } from 'helpers/dom';
import { Words } from 'services/backend';
import { FILE_BASE_URL } from 'services/config';

import Toaster from 'components/Toaster';
import Modal from './Modal';
import WordsBlock from './WordsBlock';
import ControlBlock from './ControlBlock';
import classMap from './wordTypes';

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
class Dictionary {
  constructor() {
    this.container = createElement(null, 'div', [
      'container-fluid',
      'dictionary',
    ]);
    this.controlBlock = new ControlBlock(
      this.container,
      this.refresh.bind(this)
    );
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

    this.modal = new Modal(this.container, this.playSound.bind(this));

    this.loadWords();
  }

  async loadWords() {
    this.showSpinner();
    try {
      this.words = await Words.getAllUserWords();
      this.refresh();
    } catch (err) {
      Toaster.createToast(`Ошибка получения слов: ${err}`, 'danger');
    }
    this.hideSpinner();
  }

  async showDetails(word) {
    this.showSpinner();
    try {
      if (!word.imageSrc || !word.audioSrc) {
        Object.assign(
          word,
          await Words.getUserWordById(word.id, ['image', 'audio'])
        );
      }
      this.modal.show(word);
    } catch (err) {
      Toaster.createToast(
        `Ошибка получения информации о слове: ${err}`,
        'danger'
      );
    }
    this.hideSpinner();
  }

  async refresh() {
    const minWordsPerGroup = 7;
    const words = this.words.filter((x) => classMap[x.difficulty].selected);

    if (this.wordBlocks) {
      await Promise.allSettled(
        this.wordBlocks.map(
          (x) =>
            new Promise((resolve) => {
              x.addEventListener('transitionend', (evt) => {
                evt.currentTarget.remove();
                resolve();
              });
              x.classList.add('fade-out');
            })
        )
      );
    }
    this.wordBlocks = [];
    if (words.length > 0) {
      const wordGroups = words.reduce((acc, x) => {
        const firstLetter = x.word[0].toUpperCase();
        if (!acc[firstLetter]) acc[firstLetter] = [x];
        else acc[firstLetter].push(x);
        return acc;
      }, {});

      const lastBlock = alphabet.reduce(
        (acc, x) => {
          if (wordGroups[x]) {
            if (acc.items.length + wordGroups[x].length > minWordsPerGroup) {
              this.wordBlocks.push(
                WordsBlock.render(
                  this.container,
                  acc.name,
                  acc.items,
                  this.showDetails.bind(this)
                )
              );
              acc.name = [];
              acc.items = [];
            }
            acc.name.push(x);
            acc.items.push(...wordGroups[x]);
          }
          return acc;
        },
        { name: [], items: [] }
      );
      if (lastBlock.items.length > 0) {
        this.wordBlocks.push(
          WordsBlock.render(
            this.container,
            lastBlock.name,
            lastBlock.items,
            this.showDetails.bind(this)
          )
        );
      }
    } else {
      Toaster.createToast(`По вашему запросу ничего не найдено`, 'info');
    }
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
