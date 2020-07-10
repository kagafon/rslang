import { createElement } from 'helpers/dom';

import BaseControl from './BaseControl';

export default class ButtonControl extends BaseControl {
  constructor({ label, onClick }) {
    super();
    this.container = createElement(null, 'div', [
      'form-group',
      'd-flex',
      'justify-content-center',
      'm-0',
    ]);
    createElement(
      this.container,
      'button',
      [
        'btn',
        'btn-primary',
        'd-flex',
        'w-75',
        'justify-content-center',
        'align-items-center',
      ],
      { type: 'button', style: 'height: 60px;' },
      label
    ).addEventListener('click', onClick);
  }
}
