import { createElement } from 'helpers/dom';
import store from 'components/sprint-game/component/storage';
import Service from 'components/sprint-game/component/service';

export default class RusWords {
  static render() {
    createElement(document.querySelector('.game-block'), 'div', ['rusWord']);
  }

  static insertWordTranslate() {
    const stage = store.getState();
    const rusWord = document.querySelector('.rusWord');
    const rndNum = Service.randomInteger(stage.round, stage.round + 2);
    rusWord.textContent = stage.requestWords[rndNum].wordTranslate;
  }

  static init() {
    this.render();
    this.insertWordTranslate();
  }
}
