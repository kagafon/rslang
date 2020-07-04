import { createElement } from 'helpers/dom';

import BaseControl from './BaseControl';

export default class LabelControl extends BaseControl {
  constructor({ label, value }) {
    super();
    this.container = createElement(null, 'div');
    createElement(this.container, 'label', [], {}, label);
    this.control = createElement(
      this.container,
      'div',
      ['h5', 'text-primary'],
      {},
      value
    );
  }
}
