import { createElement } from 'helpers/dom';

export default class SettingsBlock {
  static render(container, title, elements) {
    const block = createElement(container, 'div', ['settings-block']);
    const blockHeader = createElement(block, 'div', ['settings-block-header']);
    createElement(blockHeader, 'h3', ['h3'], {}, title);
    const blockBody = createElement(block, 'div', ['settings-block-body']);
    elements.forEach((element) => {
      element.render(blockBody);
    });

    return block;
  }
  // static render(parentElement, headerText, elements) {
  //   const card = createElement(parentElement, 'div', ['card']);
  //   if (headerText) createElement(card, 'div', ['card-header'], {}, headerText);
  //   const cardBody = createElement(card, 'div', ['card-body']);
  //   elements.forEach((element) => {
  //     element.render(cardBody);
  //   });
  //   return card;
  // }
}
