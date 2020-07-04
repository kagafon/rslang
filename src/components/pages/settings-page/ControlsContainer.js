import { createElement } from 'helpers/dom';
import BaseControl from './BaseControl';

export default class ControlsContainer extends BaseControl {
  constructor({ label, items }) {
    super();
    this.container = createElement(null, 'div', ['control-area']);
    const blockHeader = createElement(this.container, 'div', [
      'control-area-header',
    ]);
    createElement(blockHeader, 'h5', ['h5'], {}, label);
    const blockBody = createElement(this.container, 'div', [
      'control-area-body',
    ]);

    items.map((item) => new item.ClassName(item).render(blockBody));
  }
}
