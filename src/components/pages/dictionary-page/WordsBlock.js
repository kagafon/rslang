import { createElement } from 'helpers/dom';

import classMap from './wordTypes';

const updateWordColor = (word) => {
  word.uiElement.removeAttribute('class');
  word.uiElement.classList.add(
    'btn',
    'btn-sm',
    `btn-${classMap[word.difficulty].class}`
  );
};

export default class WordsBlock {
  static render(container, titles, words, buttonAction) {
    const block = createElement(container, 'div', ['words-block']);
    const blockHeader = createElement(block, 'div', ['words-block-header']);
    titles.forEach((title) =>
      createElement(blockHeader, 'h3', ['h3'], {}, title)
    );
    const blockBody = createElement(block, 'div', ['words-block-body']);

    words.forEach((word) => {
      Object.assign(word, {
        uiElement: createElement(blockBody, 'button', [], {}, word.word),
        updateWordColor: updateWordColor.bind(null, word),
      }).uiElement.addEventListener('click', () => buttonAction(word));
      word.updateWordColor();
    });
    return block;
  }
}
