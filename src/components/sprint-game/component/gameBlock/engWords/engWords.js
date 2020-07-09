import { createElement } from 'helpers/dom';
import store from 'components/sprint-game/component/storage';

export default class EngWords {
  static init() {
    createElement(document.querySelector('.game-block'), 'div', ['engWord']);
    this.insertText();
  }

  static insertText() {
    const stage = store.getState();
    const engWord = document.querySelector('.engWord');

    engWord.textContent = stage.requestWords[stage.round].word;
    store.setState({ word: stage.requestWords[stage.round] });
  }
}
