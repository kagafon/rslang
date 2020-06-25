import { createElement } from 'helpers/dom';

class Modal {
  create() {
    this.modal = createElement(
      document.body,
      'div',
      ['modal'],
      {
        tabindex: '-1',
        role: 'dialog',
        id: 'exampleModal',
        'aria-labelledby': 'exampleModalLabel',
        'aria-hidden': 'true',
        show: true,
      },
      ``
    );
    const dialog = createElement(this.modal, 'div', ['modal-dialog'], {}, ``);
    const content = createElement(dialog, 'div', ['modal-content'], {}, ``);
    const header = createElement(content, 'div', ['modal-header'], {}, ``);
    const title = createElement(
      header,
      'h5',
      ['modal-title'],
      { id: 'exampleModalLabel' },
      `Предупреждение`
    );
    const buttonClose = createElement(
      header,
      'button',
      ['close'],
      { type: 'button', 'data-dismiss': 'modal', 'aria-label': 'Close' },
      ``
    );
    createElement(
      buttonClose,
      'span',
      ['material-icons', 'modal-close'],
      { 'aria-hidden': 'true' },
      `close`
    );
    const modalBody = createElement(content, 'div', ['modal-body'], {}, ``);
    createElement(modalBody, 'p', [], {}, `dddd`);
    return this.modal;
  }

  setText(text) {
    const p = this.modal.querySelector('.modal-body p');
    p.textContent = text;
  }
  show() {
    this.modal.classList.add('show');
  }

  hide() {
    this.modal.classList.remove('show');
  }

  init() {
    this.create();
  }
}

export default new Modal();
