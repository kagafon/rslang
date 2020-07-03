import { createElement } from 'helpers/dom';

import BaseControl from './BaseControl';

export default class GroupControl extends BaseControl {
  constructor({ label, source, max, min, preprocessValue, showModal }) {
    super();
    this.source = source;
    this.container = createElement(null, 'div', ['form-group', 'd-flex']);
    const controlArea = createElement(this.container, 'div', ['flex-fill']);

    createElement(controlArea, 'label', [], { for: 'newWordsPerDay' }, label);

    const sliderContainer = createElement(controlArea, 'div', [
      'd-flex',
      'align-items-center',
    ]);
    this.control = createElement(
      sliderContainer,
      'input',
      ['form-control-range', 'form-control-range-sm'],
      {
        id: 'newWordsPerDay',
        value: source.newWordsPerDay,
        type: 'range',
        autocomplete: 'off',
        ...(max !== undefined ? { max } : {}),
        ...(min !== undefined ? { min } : {}),
      }
    );
    const valueContainer = createElement(
      sliderContainer,
      'div',
      ['text-primary', 'text-center', 'flex-fill', 'h5', 'mb-0', 'mx-2'],
      {},
      source.newWordsPerDay
    );
    const btn = createElement(
      sliderContainer,
      'button',
      ['btn', 'btn-primary', 'btn-sm', 'd-flex'],
      { type: 'button' }
    );
    createElement(btn, 'i', ['material-icons'], {}, 'timer');
    btn.addEventListener('click', () =>
      showModal(
        'Базовые интервалы (мин)',
        ['Новое', 'Легко', 'Хорошо', 'Сложно'],
        ['new', 'easy', 'medium', 'hard'],
        source.baseInterval,
        [90, 90, 90, 90],
        [1, 1, 1, 1]
      )
    );
    this.control.addEventListener('input', (evt) => {
      valueContainer.innerText = evt.currentTarget.value;
      this.source.newWordsPerDay = preprocessValue
        ? preprocessValue(evt.currentTarget.value)
        : evt.currentTarget.value;
    });
  }
}
