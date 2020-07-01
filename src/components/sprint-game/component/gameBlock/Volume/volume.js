import { createElement } from 'helpers/dom';

export default class Volume {
  static render() {
    createElement(
      document.querySelector('.main'),
      'span',
      ['material-icons', 'md-100', 'md-light', 'volume'],
      {
        style: 'font-size: 40px; position: relative; right: -130px; top: 13px',
      },
      'volume_up'
    );
    createElement(document.querySelector('.main'), 'audio', ['audio'], {
      src: 'assets/images/sprint-game/Piu.mp3',
    });
  }

  static init() {
    this.render();
  }
}
