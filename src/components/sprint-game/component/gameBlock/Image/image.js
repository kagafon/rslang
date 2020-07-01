import { createElement } from 'helpers/dom';

export default class Image {
  static render() {
    createElement(document.querySelector('.game-block'), 'img', ['img-game'], {
      src: 'assets/images/sprint-game/dog.png',
    });
  }

  static init() {
    this.render();
  }
}
