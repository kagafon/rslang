import { createElement } from 'helpers/dom';
import router from 'components/Router/';

class Modal {
  create() {
    this.modal = createElement(
      document.body,
      'div',
      ['modal', 'modal-view', 'back'],
      {
        tabindex: '-1',
        role: 'dialog',
        id: 'exampleModal',
        'aria-labelledby': 'exampleModalLabel',
        'aria-hidden': 'true',
      },
      ``
    );
    const dialog = createElement(this.modal, 'div', ['modal-dialog'], {}, ``);
    const content = createElement(
      dialog,
      'div',
      ['modal-content', 'modal-view'],
      {},
      ``
    );
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
    this.modalBody = createElement(
      content,
      'div',
      ['modal-body', 'modal-body-back'],
      {},
      ``
    );

    return this.modal;
  }

  setText(head, text, buttons) {
    this.title.textContent = head;
    createElement(this.modalBody, 'div', ['modal-img'], {}, ``);
    text.forEach((el) => {
      if (el.value) {
        createElement(this.modalBody, 'p', [], {}, `${el.text}: ${el.value}`);
      } else {
        createElement(this.modalBody, 'p', [], {}, `${el.text}`);
      }
    });
    if (buttons.action === 'close') {
      const btnContinue = createElement(
        this.modalBody,
        'button',
        ['btn', 'btn-primary', 'btn-sm'],
        { value: 1, tabindex: -1, type: 'submit', id: 'submitt1' },
        `Продолжить`
      );
      btnContinue.addEventListener('click', () => {
        this.modal.parentNode.removeChild(this.modal);
      });
    } else if (buttons.action === 'draw') {
      const btnPage = createElement(
        this.modalBody,
        'button',
        ['btn', 'btn-primary', 'btn-sm'],
        { value: 1, tabindex: -1, type: 'submit', id: 'submitt1' },
        `${buttons.button}`
      );
      btnPage.addEventListener('click', () => {
        router.draw(`${buttons.page}`);
        this.modal.parentNode.removeChild(this.modal);
      });
    }
  }

  show() {
    this.modal.classList.add('show');
  }

  addHideHandler() {
    this.buttonClose.addEventListener('click', () => {
      this.modal.parentNode.removeChild(this.modal);
    });
  }

  init(head, text, buttons) {
    this.create();
    this.setText(head, text, buttons);
    this.addHideHandler();
    this.show();
  }
}

export default new Modal();
