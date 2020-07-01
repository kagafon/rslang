/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
import store from 'components/sprint-game/component/storage';
// import Results from 'components/sprint-game/component/results';
import EngWords from 'components/sprint-game/component/gameBlock/engWords/engWords';
import RusWords from 'components/sprint-game/component/gameBlock/rusWords/rusWords';
import Volume from 'components/sprint-game/component/gameBlock/Volume/volume';
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
    const checkOk = document.querySelector('.checkOk');
    checkOk.style.display = 'block';
    document.querySelector('.checkFalse').style.display = 'none';
    document.querySelector('.game-block').style.borderColor = 'green';
    store.setState({ correctChoice: state.correctChoice + 1 });
    statiscticStore.setLearnedState([state.word]);
    this.countPoints();
    // Results.init();
  }

  static unCorrectChoice() {
    const state = store.getState();
    EngWords.insertText();
    RusWords.render();
    document.querySelector('.checkOk').style.display = 'none';
    document.querySelector('.checkFalse').style.display = 'block';
    document.querySelector('.game-block').style.borderColor = 'red';
    const dotsBlock = document.querySelector('.dotsBlock');
    statiscticStore.setUnexploredState([state.word]);
    const checkOk = document.querySelector('.checkOk');
    const dot = document.querySelectorAll('.dots');
    if (checkOk.style.display === 'none') {
      dot[0].style.display = 'block';
      dot[2].style.display = 'block';
      dot.forEach((item) => {
        item.classList.remove('green');
      });
      dotsBlock.classList.remove('backRed');
      dotsBlock.classList.remove('backOrange');
      dotsBlock.classList.remove('backPink');
      dotsBlock.classList.remove('backBlue');
      dotsBlock.classList.remove('backYellow');
      dotsBlock.classList.add('backViolet');
    }
    // Results.init();
  }

  static countPoints() {
    const dotsBlock = document.querySelector('.dotsBlock');
    const points = document.querySelector('.points');
    const checkOk = document.querySelector('.checkOk');
    const dot = document.querySelectorAll('.dots');

    if (
      checkOk.style.display === 'block' &&
      dotsBlock.classList.contains('backRed')
    ) {
      points.textContent = Number(points.textContent) + 80;
    } else if (
      checkOk.style.display === 'block' &&
      dot[2].classList.contains('green') &&
      dotsBlock.classList.contains('backOrange')
    ) {
      dot[0].style.display = 'none';
      dot[2].style.display = 'none';
      points.textContent = Number(points.textContent) + 80;
      dotsBlock.classList.add('backRed');
      dotsBlock.classList.remove('backOrange');
    } else if (
      checkOk.style.display === 'block' &&
      dot[1].classList.contains('green') &&
      dotsBlock.classList.contains('backOrange')
    ) {
      dot[2].classList.add('green');
      points.textContent = Number(points.textContent) + 80;
    } else if (
      checkOk.style.display === 'block' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backOrange')
    ) {
      dot[1].classList.add('green');
      points.textContent = Number(points.textContent) + 80;
    } else if (
      checkOk.style.display === 'block' &&
      dot[2].classList.contains('green') &&
      dotsBlock.classList.contains('backPink')
    ) {
      dot.forEach((item) => {
        item.classList.remove('green');
      });
      dot[0].classList.add('green');
      points.textContent = Number(points.textContent) + 80;
      dotsBlock.classList.add('backOrange');
      dotsBlock.classList.remove('backPink');
    } else if (
      checkOk.style.display === 'block' &&
      dot[1].classList.contains('green') &&
      dotsBlock.classList.contains('backPink')
    ) {
      dot[2].classList.add('green');
      points.textContent = Number(points.textContent) + 40;
    } else if (
      checkOk.style.display === 'block' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backPink')
    ) {
      dot[1].classList.add('green');
      points.textContent = Number(points.textContent) + 40;
    } else if (
      checkOk.style.display === 'block' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backPink')
    ) {
      dot[1].classList.add('green');
      points.textContent = Number(points.textContent) + 40;
    } else if (
      checkOk.style.display === 'block' &&
      dot[2].classList.contains('green') &&
      dotsBlock.classList.contains('backBlue')
    ) {
      dot.forEach((item) => {
        item.classList.remove('green');
      });
      dot[0].classList.add('green');
      points.textContent = Number(points.textContent) + 40;
      dotsBlock.classList.add('backPink');
      dotsBlock.classList.remove('backBlue');
    } else if (
      checkOk.style.display === 'block' &&
      dot[1].classList.contains('green') &&
      dotsBlock.classList.contains('backBlue')
    ) {
      dot[2].classList.add('green');
      points.textContent = Number(points.textContent) + 20;
    } else if (
      checkOk.style.display === 'block' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backBlue')
    ) {
      dot[1].classList.add('green');
      points.textContent = Number(points.textContent) + 20;
    } else if (
      checkOk.style.display === 'block' &&
      dot[2].classList.contains('green') &&
      dotsBlock.classList.contains('backYellow')
    ) {
      dot.forEach((item) => {
        item.classList.remove('green');
      });
      dot[0].classList.add('green');
      points.textContent = Number(points.textContent) + 20;
      dotsBlock.classList.add('backBlue');
      dotsBlock.classList.remove('backYellow');
    } else if (
      checkOk.style.display === 'block' &&
      dot[1].classList.contains('green') &&
      dotsBlock.classList.contains('backYellow')
    ) {
      dot[2].classList.add('green');
      points.textContent = Number(points.textContent) + 10;
    } else if (
      checkOk.style.display === 'block' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backYellow')
    ) {
      dot[1].classList.add('green');
      points.textContent = Number(points.textContent) + 10;
    } else if (
      checkOk.style.display === 'block' &&
      !dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backViolet')
    ) {
      console.log('d');
      dot[0].classList.add('green');
      dotsBlock.classList.add('backYellow');
      dotsBlock.classList.remove('backViolet');
      points.textContent = Number(points.textContent) + 10;
    }
  }

  static init() {
    this.render();
    this.toNextWord();
  }
}
