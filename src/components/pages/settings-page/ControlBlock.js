import { createElement } from 'helpers/dom';

export default class ControlBlock {
  static render(container, title, elements) {
    const block = createElement(container, 'div', ['control-area']);
    const blockHeader = createElement(block, 'div', ['control-area-header']);
    createElement(blockHeader, 'h3', ['h3'], {}, title);
    const blockBody = createElement(block, 'div', ['control-area-body']);
    elements.forEach((element) => {
      element.render(blockBody);
    });

    return block;
  }
}
