import { createElement } from 'helpers/dom';

export default class Image {
  static render() {
    createElement(
      document.querySelector('.game-block'),
      'img',
      ['img-game', 'img1'],
      {
        src: 'assets/images/sprint-game/1.jpg',
        alt: 'train x1',
      }
    );
    createElement(
      document.querySelector('.game-block'),
      'img',
      ['img-game', 'img2'],
      {
        src: 'assets/images/sprint-game/2.jpg',
        alt: 'train x2',
      }
    );
    createElement(
      document.querySelector('.game-block'),
      'img',
      ['img-game', 'img3'],
      {
        src: 'assets/images/sprint-game/3.jpg',
        alt: 'train x4',
      }
    );
    createElement(
      document.querySelector('.game-block'),
      'img',
      ['img-game', 'img4'],
      {
        src: 'assets/images/sprint-game/4.jpg',
        alt: 'train x8',
      }
    );
  }

  static init() {
    this.render();
  }
}
