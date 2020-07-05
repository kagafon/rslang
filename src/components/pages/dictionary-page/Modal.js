import { Modal } from 'bootstrap';
import { createElement } from 'helpers/dom';
import Toaster from 'components/Toaster';
import { FILE_BASE_URL } from 'services/config';
import { User, Words } from 'services/backend';
import classMap from './wordTypes';

const titleBadgeClasses = ['badge'];
export default class WordDetails {
  constructor(container, playSound) {
    const user = User.getCurrentUser();
    this.fieldsToShow = [
      {
        title: null,
        element: (parent, word) =>
          createElement(parent, 'div', ['word-image'], {
            style: `background-image:url(${
              word.imageSrc ? word.imageSrc : `${FILE_BASE_URL}${word.image}`
            });`,
          }),
        hide: !user.settings.prompts.image,
      },
      {
        title: 'Перевод',
        name: 'wordTranslate',
        hide: !user.settings.prompts.translation,
      },
      {
        title: 'Транскрипция',
        name: 'transcription',
        hide: !user.settings.prompts.transcription,
      },
      {
        title: 'Значение',
        name: 'textMeaningTranslate',
        hide: !user.settings.prompts.meaning,
      },
      {
        title: 'Пример',
        name: 'textExample',
        hide: !user.settings.prompts.example,
      },
      {
        title: 'Прогресс',
        element: (parent, word) =>
          createElement(
            createElement(parent, 'div', ['progress']),
            'div',
            ['progress-bar', 'progress-bar-striped', 'bg-info'],
            { style: `width: ${word.learnLevel || 0}%;` }
          ),
      },
      { title: 'Повторов', name: 'repeatTimes' },
      {
        title: 'Посл. показ',
        name: 'lastRepeat',
        element: (parent, word) =>
          createElement(
            parent,
            'div',
            [],
            {},
            word.lastRepeat ? word.lastRepeat.toLocaleString() : 'Не определено'
          ),
        defaultValue: 'Не определено',
      },
      {
        title: 'След. показ',
        name: 'nextRepeat',
        element: (parent, word) =>
          createElement(
            parent,
            'div',
            [],
            {},
            word.nextRepeat ? word.nextRepeat.toLocaleString() : 'Не определено'
          ),
        defaultValue: 'Не определено',
      },
    ];
    this.modal = createElement(container, 'div', ['modal', 'fade'], {
      role: 'dialog',
    });
    const modalDialog = createElement(
      this.modal,
      'div',
      ['modal-dialog', 'modal-dialog-centered'],
      {
        role: 'document',
      }
    );
    const modalContent = createElement(modalDialog, 'div', ['modal-content']);
    const modalHeader = createElement(modalContent, 'div', [
      'modal-header',
      'align-items-center',
    ]);

    this.title = createElement(modalHeader, 'h3', ['text-capitalize', 'mb-0']);

    this.modalBody = createElement(modalContent, 'div', ['modal-body']);

    const modalFooter = createElement(modalContent, 'div', [
      'modal-footer',
      'justify-content-around',
    ]);
    const buttonGroup = createElement(modalFooter, 'div', ['btn-group'], {
      role: 'group',
    });

    const playBtn = createElement(modalHeader, 'button', [
      'btn',
      'btn-sm',
      'btn-secondary',
      'ml-auto',
      'd-flex',
    ]);
    createElement(playBtn, 'i', ['material-icons'], {}, 'volume_up');
    playBtn.addEventListener('click', (evt) =>
      playSound(this.word, evt.currentTarget)
    );
    this.controlButtons = [];
    const easyBtn = createElement(
      buttonGroup,
      'button',
      ['btn', 'btn-sm', 'btn-success'],
      { type: 'button' },
      'Легко'
    );
    easyBtn.addEventListener(
      'click',
      this.setWordDifficulty.bind(this, 'easy')
    );
    this.controlButtons.push(easyBtn);

    const mediumBtn = createElement(
      buttonGroup,
      'button',
      ['btn', 'btn-sm', 'btn-info'],
      { type: 'button' },
      'Хорошо'
    );
    mediumBtn.addEventListener(
      'click',
      this.setWordDifficulty.bind(this, 'medium')
    );
    this.controlButtons.push(mediumBtn);

    const hardBtn = createElement(
      buttonGroup,
      'button',
      ['btn', 'btn-sm', 'btn-warning'],
      { type: 'button' },
      'Сложно'
    );
    hardBtn.addEventListener(
      'click',
      this.setWordDifficulty.bind(this, 'hard')
    );
    this.controlButtons.push(hardBtn);

    this.deleteBtn = createElement(modalFooter, 'button', [], {
      type: 'button',
    });
    this.controlButtons.push(this.deleteBtn);

    createElement(
      modalFooter,
      'button',
      ['btn', 'btn-secondary', 'btn-sm'],
      { type: 'button', 'data-dismiss': 'modal' },
      'Закрыть'
    );

    this.buttonSpinner = createElement(null, 'div');
    createElement(this.buttonSpinner, 'span', [
      'spinner-border',
      'spinner-border-sm',
    ]);
    createElement(this.buttonSpinner, 'span', [], {}, 'Сохр...');

    this.modal = new Modal(this.modal);
  }

  styleDeleteButton() {
    if (this.deleteBtnListener) {
      this.deleteBtn.removeEventListener('click', this.deleteBtnListener);
    }
    if (this.word.difficulty === 'deleted') {
      this.deleteBtn.className = '';
      this.deleteBtn.classList.add('btn', 'btn-primary', 'btn-sm');
      this.deleteBtn.innerText = 'Вернуть';
      this.deleteBtnListener = this.setWordDifficulty.bind(this, 'new');
    } else {
      this.deleteBtn.className = '';
      this.deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
      this.deleteBtn.innerText = 'Удалить';
      this.deleteBtnListener = this.setWordDifficulty.bind(this, 'deleted');
    }
    this.deleteBtn.addEventListener('click', this.deleteBtnListener);
  }

  show(word) {
    this.word = word;
    this.title.innerText = word.word;
    this.addTitleBadge();
    this.modalBody.innerText = '';
    this.fieldsToShow.forEach((fld) => {
      if (!fld.hide) {
        if (fld.title) createElement(this.modalBody, 'div', [], {}, fld.title);

        if (fld.element) {
          fld.element(this.modalBody, this.word);
        } else {
          createElement(this.modalBody, 'div', [], {
            'data-name': fld.name,
          }).innerHTML =
            this.word[fld.name] === undefined || this.word[fld.name] === null
              ? fld.defaultValue
              : this.word[fld.name];
        }
      }
    });
    this.styleDeleteButton();
    this.modal.show();
  }

  enableControlButtons() {
    this.controlButtons.forEach((x) => x.removeAttribute('disabled'));
  }

  disableControlButtons() {
    this.controlButtons.forEach((x) => x.setAttribute('disabled', ''));
  }

  addTitleBadge() {
    this.titleBadge = createElement(
      this.title,
      'span',
      [...titleBadgeClasses, `badge-${classMap[this.word.difficulty].class}`],
      {},
      classMap[this.word.difficulty].title
    );
  }

  async setWordDifficulty(difficulty, evt) {
    if (difficulty !== this.word.difficulty) {
      this.disableControlButtons();
      const btn = evt.currentTarget;
      const btnText = btn.innerText;
      btn.innerText = '';
      btn.appendChild(this.buttonSpinner);

      try {
        await Words.updateUserWord({ ...this.word, difficulty });
        this.word.difficulty = difficulty;
        this.title.innerText = this.word.word;
        this.addTitleBadge();
        this.word.updateWordColor(); // Update color on main page
      } catch (err) {
        Toaster.createToast(`Ошибка сохранения: ${err}`, 'danger');
      }
      this.buttonSpinner.remove();
      btn.innerText = btnText;
      this.styleDeleteButton();
      this.enableControlButtons();
    }
  }
}
