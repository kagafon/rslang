import { createElement } from 'helpers/dom';
import store from 'components/sprint-game/component/storage';

export default class EngWords {
  static render() {
    createElement(document.querySelector('.game-block'), 'div', ['engWord']);
  }

  static insertText() {
    const stage = store.getState();
    const questionBlock = document.querySelector('.engWord');
    questionBlock.textContent = stage.requestWords[stage.round].word;
    store.setState({ word: stage.requestWords[stage.round].word });
  }

  static init() {
    this.render();
    this.insertText();
  }
}
