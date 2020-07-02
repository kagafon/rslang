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
    this.title = createElement(
      header,
      'h5',
      ['modal-title'],
      { id: 'exampleModalLabel' },
      `Предупреждение`
    );
    this.buttonClose = createElement(
      header,
      'button',
      ['close'],
      { type: 'button', 'data-dismiss': 'modal', 'aria-label': 'Close' },
      ``
    );
    createElement(
      this.buttonClose,
      'span',
      ['material-icons', 'modal-close'],
      { 'aria-hidden': 'true' },
      `close`
    );
    this.modalBody = createElement(content, 'div', ['modal-body'], {}, ``);

    return this.modal;
  }

  setText(head, text) {
    this.title.textContent = head;
    console.error(text);
    text.forEach((el) => {
      createElement(this.modalBody, 'p', [], {}, `${el.text}: ${el.value}`);
    });
  }

  show() {
    this.modal.classList.add('show');
  }

  addHideHandler() {
    this.buttonClose.addEventListener('click', () => {
      this.modal.parentNode.removeChild(this.modal);
    });
  }

  init(head, text) {
    this.create();
    this.addHideHandler();
    this.setText(head, text);
    this.show();
  }
}

export default new Modal();
