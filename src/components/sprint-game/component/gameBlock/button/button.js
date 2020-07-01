/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
import store from 'components/sprint-game/component/storage';
import Results from 'components/sprint-game/component/results';
import EngWords from 'components/sprint-game/component/gameBlock/engWords/engWords';
import RusWords from 'components/sprint-game/component/gameBlock/rusWords/rusWords';
import statiscticStore from 'components/sprint-game/component/statistic-storage';

export default class Buttons {
  static render() {
    const buttonFalse = createElement(
      document.querySelector('.game-block'),
      'button',
      ['button', 'button-false']
    );
    const buttonTrue = createElement(
      document.querySelector('.game-block'),
      'button',
      ['button', 'button-true']
    );
    buttonFalse.textContent = 'Неверно';
    buttonTrue.textContent = 'Верно';
  }

  static toNextWord() {
    const button = document.querySelectorAll('.button');
    const rusBlock = document.querySelector('.rusWord');

    button.forEach((item) => {
      item.addEventListener('click', () => {
        const stage = store.getState();
        store.setState({ round: stage.round + 1 });
        if (
          rusBlock.textContent ===
            stage.requestWords[stage.round].wordTranslate &&
          item.textContent === 'Верно'
        ) {
          this.rightChoice();
        } else if (
          rusBlock.textContent ===
            stage.requestWords[stage.round].wordTranslate &&
          item.textContent === 'Неверно'
        ) {
          this.unCorrectChoice();
        } else if (
          rusBlock.textContent !==
            stage.requestWords[stage.round].wordTranslate &&
          item.textContent === 'Верно'
        ) {
          this.unCorrectChoice();
        } else if (
          rusBlock.textContent !==
            stage.requestWords[stage.round].wordTranslate &&
          item.textContent === 'Неверно'
        ) {
          this.rightChoice();
        }
      });
    });
  }

  static rightChoice() {
    const state = store.getState();
    EngWords.insertText();
    RusWords.render();
    document.querySelector('.checkOk').style.display = 'block';
    document.querySelector('.checkFalse').style.display = 'none';
    document.querySelector('.game-block').style.borderColor = 'green';
    store.setState({ correctChoice: state.correctChoice + 1 });
    statiscticStore.setLearnedState([state.word]);
    console.log(statiscticStore.getLearnedState());
    Results.init();
  }

  static unCorrectChoice() {
    const state = store.getState();
    EngWords.insertText();
    RusWords.render();
    document.querySelector('.checkOk').style.display = 'none';
    document.querySelector('.checkFalse').style.display = 'block';
    document.querySelector('.game-block').style.borderColor = 'red';
    statiscticStore.setUnexploredState([state.word]);
    Results.init();
  }

  /*
  static rightChoice(item) {

    item.children[0].style.display = 'none';
    item.children[1].style.display = 'block';

    document.querySelector('.hint').style.display = 'none';
    document.querySelector('.next').style.display = 'block';

    arrWordsNumber.forEach((i) => {
      if (i.textContent !== item.children[0].textContent) {
        i.classList.add('words-opacity');
      }
    });

    arrWordsCard.forEach((i) => {
      if (i.textContent !== item.children[3].textContent) {
        i.classList.add('words-opacity');
      }
    });
  }

  static incorrectChoice(item) {
    const arrWordsCard = document.querySelectorAll('.words');
    const arrWordsNumber = document.querySelectorAll('.number-words');
    const stage = store.getState();

    item.children[0].style.display = 'none';
    item.children[2].style.display = 'block';

    document.querySelector('.hint').style.display = 'none';
    document.querySelector('.next').style.display = 'block';

    arrWordsNumber.forEach((i) => {
      if (i.textContent !== item.children[0].textContent) {
        i.classList.add('words-opacity');
      }
    });

    arrWordsCard.forEach((i) => {
      if (i.textContent !== item.children[3].textContent) {
        i.classList.add('words-opacity');
      } else {
        stage.correct.children[0].style.display = 'none';
        stage.correct.children[1].style.display = 'block';
      }
    });
  }

  static wordChoice() {
    const arrWords = document.querySelectorAll('.wrapper-words');
    arrWords.forEach((item) => {
      item.addEventListener('click', () => {
        const state = store.getState();
        const progress = document.querySelector('.progress-bar');

        const width = String(progress.style.width).slice(0, -1);
        progress.style.width = `${+width + 10}%`;

        store.setState({ round: state.round + 1 });

        if (item.children[3].textContent === state.word.wordTranslate) {
          console.log(state.word.wordTranslate);
          store.setState({ correctChoice: state.correctChoice + 1 });
          statiscticStore.setLearnedState([state.word]);

          this.rightChoice(item);
          Results.init();
        } else {
          statiscticStore.setUnexploredState([state.word]);

          this.incorrectChoice(item);
          Results.init();
        }

        setTimeout(() => {
          if (state.round === 9) {
            Service.spinnerOn();
            Statisctic.init();
          }
        }, 2000);
      });
    });
  } */

  static init() {
    this.render();
    this.toNextWord();
  }
}
