import { createElement } from 'helpers/dom';

import BaseControl from './BaseControl';

export default class ToggleControl extends BaseControl {
  constructor({ label, name, value, readonly, source }) {
    super();
    this.source = source;
    this.container = createElement(null, 'div', ['form-group']);
    const control = createElement(this.container, 'div', [
      'custom-control',
      'custom-switch',
    ]);
    this.control = createElement(
      control,
      'input',
      ['form-control', 'custom-control-input'],
      {
        id: name,
        type: 'checkbox',
        autocomplete: 'off',
        ...(readonly ? { readonly } : {}),
        ...(value !== undefined || source[name] ? { checked: '' } : {}),
      }
    );
    createElement(
      control,
      'label',
      ['custom-control-label'],
      { for: name },
      label
    );
    this.control.addEventListener('change', (evt) => {
      this.source[name] = evt.currentTarget.checked;
    });
  }
}
