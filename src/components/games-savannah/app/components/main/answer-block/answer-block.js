import store from 'components/games-savannah/app/components/storage';
import { createElement } from 'helpers/dom';

export default class Answer {
  static render() {
    const stage = store.getState();
    // createElement(document.querySelector('.header'), 'div', ['answerBlock']);
    const answerBlock = document.querySelector('.answerBlock');
    answerBlock.textContent = stage.word.word;
    // answerBlock.classList.add('transition');
    this.answertTimer();
  }

  static answertTimer() {
    const answer = document.querySelector('.answerBlock');
    answer.classList.add('transition');
    answer.addEventListener('transitionend', () => {
    });
  }

  static init() {
    this.render();
  }
}
