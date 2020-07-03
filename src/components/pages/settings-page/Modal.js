import { Modal } from 'bootstrap';
import { createElement } from 'helpers/dom';
import RangeControl from './RangeControl';

export default class IntervalsWindow {
  constructor(container, title) {
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

    this.title = createElement(modalHeader, 'h3', ['mb-0'], {}, title);

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
      'Закрыть'
    );

    this.modal = new Modal(this.modal);
  }

  show(title, labels, names, source, max, min) {
    this.title.innerText = title;
    this.modalBody.innerText = '';
    this.source = source;
    this.controls = labels.map((x, idx) => {
      const control = new RangeControl({
        label: x,
        name: names[idx],
        readonly: false,
        source,
        max: max[idx],
        min: min[idx],
      }).render(this.modalBody);
      control.addEventListener('change', (evt) => {
        this.source[names[idx]] = evt.currentTarget.value;
      });
      return control;
    });

    this.modal.show();
  }
}
