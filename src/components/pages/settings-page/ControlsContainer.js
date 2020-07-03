import { createElement } from 'helpers/dom';
import BaseControl from './BaseControl';

export default class ControlsContainer extends BaseControl {
  constructor({ label, items }) {
    super();
    this.container = createElement(null, 'div', ['settings-block']);
    const blockHeader = createElement(this.container, 'div', [
      'settings-block-header',
    ]);
    createElement(blockHeader, 'h5', ['h5'], {}, label);
    const blockBody = createElement(this.container, 'div', [
      'settings-block-body',
    ]);

    items.map((item) => new item.ClassName(item).render(blockBody));
  }
}
