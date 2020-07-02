import { createElement } from 'helpers/dom';

export default class Volume {
  static init() {
    const audioBlock = createElement(
      document.querySelector('.game-block'),
      'div',
      ['audio-block']
    );
    const audioIcon = createElement(
      audioBlock,
      'span',
      ['material-icons', 'md-100', 'md-light', 'volume'],
      { style: 'font-size: 40px; color: rgba(146, 85, 215, 0.57)' },
      'volume_up'
    );
    const audioSrc = createElement(audioIcon, 'audio', ['audio'], {
      preload: true,
      src: 'assets/images/sprint-game/Piu.mp3',
    });
    return audioBlock;
  }
}
