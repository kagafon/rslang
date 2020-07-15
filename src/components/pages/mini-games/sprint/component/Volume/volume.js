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
      {},
      'volume_up'
    );
    createElement(audioIcon, 'audio', ['audio', 'audio1'], {
      preload: true,
      muted: true,
      src: 'assets/images/sprint-game/Piu.mp3',
    });
    createElement(audioIcon, 'audio', ['audio', 'audio2'], {
      preload: true,
      src: 'assets/images/sprint-game/whoosh.mp3',
    });
    return audioBlock;
  }
}
