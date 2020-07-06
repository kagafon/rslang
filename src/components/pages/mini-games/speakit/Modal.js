import { Modal } from 'bootstrap';
import { createElement } from 'helpers/dom';

const createResultButton = (parent, word, playWordSound) => {
  const btn = createElement(
    parent,
    'button',
    [
      'btn',
      'btn-outline-info',
      'btn-block',
      'd-flex',
      'btn-sm',
      'align-items-center',
    ],
    {},
    ''
  );
  createElement(
    btn,
    'i',
    ['material-icons', 'word-button__image'],
    {},
    'volume_up'
  );
  createElement(btn, 'span', ['ml-2', 'font-weight-bold'], {}, word.word);
  createElement(
    btn,
    'span',
    ['ml-2', 'text-lowercase'],
    {},
    word.transcription
  );
  createElement(btn, 'span', ['ml-2', 'font-italic'], {}, word.translation);
  btn.addEventListener('click', () =>
    playWordSound(word.audioSrc || word.audio)
  );
};

export default class ResultsModal {
  constructor(container, restartGame, playWordSound) {
    this.playWordSound = playWordSound;
    this.modal = createElement(document.body, 'div', ['modal', 'fade'], {
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

    this.title = createElement(
      modalHeader,
      'h3',
      ['text-capitalize', 'mb-0'],
      {},
      'Результат'
    );

    this.modalBody = createElement(modalContent, 'div', ['modal-body']);

    const modalFooter = createElement(modalContent, 'div', [
      'modal-footer',
      'justify-content-around',
    ]);

    createElement(
      modalFooter,
      'button',
      ['btn', 'btn-secondary', 'btn-sm'],
      { type: 'button', 'data-dismiss': 'modal' },
      'Новая игра'
    ).addEventListener('click', restartGame);

    this.modal = new Modal(this.modal, { backdrop: 'static' });
  }

  show(words) {
    this.modalBody.innerHTML = '';
    const successWords = words.filter((x) => x.success);
    const failWords = words.filter((x) => !x.success);
    /* Add success */
    if (successWords.length > 0) {
      createElement(
        createElement(this.modalBody, 'p', ['m-2', 'h5'], {}, 'Знаю'),
        'div',
        ['badge', 'bg-success', 'm-2']
      ).innerText = successWords.length;
      successWords.forEach((y) => {
        createResultButton(this.modalBody, y, this.playWordSound);
      });
    }

    /* Add fail */
    if (failWords.length > 0) {
      createElement(
        createElement(this.modalBody, 'p', ['m-2', 'h5'], {}, 'Ошибки'),
        'div',
        ['badge', 'bg-danger', 'm-2']
      ).innerText = failWords.length;
      failWords.forEach((y) => {
        createResultButton(this.modalBody, y, this.playWordSound);
      });
    }
    this.modal.show();
  }
}
