import { createElement } from 'helpers/dom';

import BaseControl from './BaseControl';

export default class TextControl extends BaseControl {
  constructor({
    label,
    name,
    value,
    type,
    readonly,
    source,
    max,
    min,
    preprocessValue,
  }) {
    super();
    this.container = createElement(null, 'div', ['form-group']);
    this.source = source;

    createElement(this.container, 'label', [], { for: name }, label);
    this.control = createElement(
      createElement(this.container, 'div', []),
      'input',
      ['form-control', 'form-control-sm'],
      {
        id: name,
        value: value !== undefined ? value : source[name],
        type: type || 'text',
        autocomplete: 'off',
        ...(readonly ? { readonly } : {}),
        ...(max !== undefined ? { max } : {}),
        ...(min !== undefined ? { min } : {}),
      }
    );
    this.control.addEventListener('input', (evt) => {
      this.source[name] = preprocessValue
        ? preprocessValue(evt.currentTarget.value)
        : evt.currentTarget.value;
    });
  }
}
