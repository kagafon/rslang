import { createElement } from 'helpers/dom';

import BaseControl from './BaseControl';

export default class RangeControl extends BaseControl {
  constructor({
    label,
    name,
    value,
    readonly,
    source,
    max,
    min,
    preprocessValue,
    shift,
  }) {
    super();
    this.container = createElement(null, 'div', ['form-group']);
    this.source = source;

    createElement(this.container, 'label', [], { for: name }, label);
    const sliderContainer = createElement(this.container, 'div', ['d-flex']);
    this.control = createElement(
      sliderContainer,
      'input',
      ['form-control-range', 'form-control-range-sm'],
      {
        id: name,
        value: (value !== undefined ? value : source[name]) - (shift || 0),
        type: 'range',
        autocomplete: 'off',
        ...(readonly ? { readonly } : {}),
        ...(max !== undefined ? { max } : {}),
        ...(min !== undefined ? { min } : {}),
      }
    );
    const valueContainer = createElement(
      sliderContainer,
      'div',
      ['text-primary', 'text-center', 'flex-fill', 'h5', 'mb-0', 'ml-2'],
      { style: 'min-width: 20px;' },
      (value !== undefined ? value : source[name]) - (shift || 0)
    );
    this.control.addEventListener('input', (evt) => {
      valueContainer.innerText = evt.currentTarget.value;
      this.source[name] = preprocessValue
        ? preprocessValue(parseInt(evt.currentTarget.value, 10) + (shift || 0))
        : parseInt(evt.currentTarget.value, 10) + (shift || 0);
    });
  }
}
