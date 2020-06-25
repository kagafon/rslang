import { Modal } from 'bootstrap';
import { createElement } from 'helpers/dom';
import { FILE_BASE_URL } from 'services/config';
import { User } from 'services/backend';

export default class WordDetails {
  constructor(container, playSound) {
    const user = User.getCurrentUser();
    this.fieldsToShow = [
      {
        title: null,
        element: (parent, word) =>
          createElement(parent, 'div', ['word-image'], {
            style: `background-image:url(${FILE_BASE_URL}${word.image});`,
          }),
        hide: !user.settings.prompts.image,
      },
      { title: 'Перевод', name: 'wordTranslate' },
      {
        title: 'Транскрипция',
        name: 'transcription',
        hide: !user.settings.prompts.transcription,
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
      { title: 'Посл. показ', name: 'lastTimeShown' },
      { title: 'След. показ', name: 'nextTimeShown' },
      {
        title: 'Значение',
        name: 'textMeaningTranslate',
        hide: !user.settings.prompts.meaning,
      },
      { title: 'Пример', name: 'textExample' },
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
    const modalHeader = createElement(modalContent, 'div', ['modal-header']);
    this.title = createElement(modalHeader, 'h5', ['text-capitalize']);

    this.modalBody = createElement(modalContent, 'div', ['modal-body']);

    const modalFooter = createElement(modalContent, 'div', ['modal-footer']);
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

    const easyBtn = createElement(
      buttonGroup,
      'button',
      ['btn', 'btn-sm', 'btn-success'],
      { type: 'button' },
      'Легко'
    );

    const mediumBtn = createElement(
      buttonGroup,
      'button',
      ['btn', 'btn-sm', 'btn-secondary'],
      { type: 'button' },
      'Хорошо'
    );

    const hardBtn = createElement(
      buttonGroup,
      'button',
      ['btn', 'btn-sm', 'btn-warning'],
      { type: 'button' },
      'Сложно'
    );

    const deleteBtn = createElement(
      modalFooter,
      'button',
      ['btn', 'btn-danger', 'btn-sm', 'ml-auto'],
      { type: 'button' },
      'Удалить'
    );

    const closeBtn = createElement(
      modalFooter,
      'button',
      ['btn', 'btn-info', 'btn-sm', 'ml-auto'],
      { type: 'button', 'data-dismiss': 'modal' },
      'Закрыть'
    );
    this.modal = new Modal(this.modal);
  }

  show(word) {
    this.word = word;
    this.title.innerText = word.word;
    this.modalBody.innerText = '';
    this.fieldsToShow.forEach((fld) => {
      if (!fld.hide) {
        if (fld.title) createElement(this.modalBody, 'div', [], {}, fld.title);

        if (fld.element) {
          fld.element(this.modalBody, this.word);
        } else {
          createElement(this.modalBody, 'div', [], {
            'data-name': fld.name,
          }).innerHTML = this.word[fld.name];
        }
      }
    });
    this.modal.show();
  }

  setWordDifficulty(difficulty) {
    this.word.difficulty = difficulty;
  }
}
