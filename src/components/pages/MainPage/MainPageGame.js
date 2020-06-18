import { createElement } from 'helpers/dom';

class MainPageGame {
  create() {
    this.container = createElement(
      '',
      'div',
      ['d-flex', 'justify-content-center', 'align-items-center', 'flex-column'],
      {},
      'Game'
    );
  }

  init() {
    this.create();
    return this.container;
  }
}

export default MainPageGame;
