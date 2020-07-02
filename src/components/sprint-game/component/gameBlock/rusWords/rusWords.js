import { createElement } from 'helpers/dom';
import store from 'components/sprint-game/component/storage';
import Service from 'components/sprint-game/component/service';

export default class RusWords {
  static render() {
    const stage = store.getState();
    createElement(document.querySelector('.game-block'), 'div', ['rusWord']);
    const rusWord = document.querySelector('.rusWord');
    const rndNum = this.randomInteger(stage.round, stage.round + 2);
    rusWord.textContent = stage.requestWords[rndNum].wordTranslate;
  }

  static randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  static init() {
    this.render();
  }
}
