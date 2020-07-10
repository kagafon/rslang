/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
import store from 'components/sprint-game/component/storage';
import EngWords from 'components/sprint-game/component/gameBlock/engWords/engWords';
import RusWords from 'components/sprint-game/component/gameBlock/rusWords/rusWords';
import statisticStore from 'components/sprint-game/component/statistic-storage';
import ButtonsArrow from 'components/sprint-game/component/gameBlock/buttonArrow/buttonArrow';

export default class Buttons {
  static render() {
    const buttonFalse = createElement(
      document.querySelector('.game-block'),
      'button',
      ['button', 'button-false'],
      {},
      'Неверно'
    );
    const buttonTrue = createElement(
      document.querySelector('.game-block'),
      'button',
      ['button', 'button-true'],
      {},
      'Верно'
    );
  }

  static toNextWord() {
    const button = document.querySelectorAll('.button');
    const rusBlock = document.querySelector('.rusWord');
    const audioSrc = document.querySelector('.audio2');
    button.forEach((item) => {
      item.addEventListener('click', () => {
        const stage = store.getState();
        store.setState({ round: stage.round + 1 });
        audioSrc.play();
        setTimeout(() => {
          document.querySelector('.game-block').style.borderColor = 'violet';
          document.querySelector('.checkFalse').style.opacity = '0';
          document.querySelector('.checkOk').style.opacity = '0';
          document.querySelector('.points-text').style.opacity = '0';
        }, 500);
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

  static keyUpHandler(event) {
    const rusBlock = document.querySelector('.rusWord');
    const audioSrc = document.querySelector('.audio2');

    const stage = store.getState();
    store.setState({ round: stage.round + 1 });
    audioSrc.play();
    setTimeout(() => {
      document.querySelector('.game-block').style.borderColor = 'violet';
      document.querySelector('.checkFalse').style.opacity = '0';
      document.querySelector('.checkOk').style.opacity = '0';
      document.querySelector('.points-text').style.opacity = '0';
    }, 500);
    if (
      rusBlock.textContent === stage.requestWords[stage.round].wordTranslate &&
      event.keyCode === 39
    ) {
      Buttons.rightChoice();
    } else if (
      rusBlock.textContent === stage.requestWords[stage.round].wordTranslate &&
      event.keyCode === 37
    ) {
      Buttons.unCorrectChoice();
    } else if (
      rusBlock.textContent !== stage.requestWords[stage.round].wordTranslate &&
      event.keyCode === 39
    ) {
      Buttons.unCorrectChoice();
    } else if (
      rusBlock.textContent !== stage.requestWords[stage.round].wordTranslate &&
      event.keyCode === 37
    ) {
      Buttons.rightChoice();
    }
  }

  static rightChoice() {
    const state = store.getState();
    EngWords.init();
    RusWords.init();
    document.querySelector('.checkOk').style.opacity = '1';
    document.querySelector('.checkFalse').style.opacity = '0';
    document.querySelector('.game-block').style.borderColor = 'green';
    document.querySelector('.points-text').style.opacity = '1';

    store.setState({ correctChoice: state.correctChoice + 1 });
    statisticStore.setLearnedState([state.word]);
    this.countPoints();
  }

  static unCorrectChoice() {
    const state = store.getState();
    EngWords.init();
    RusWords.init();
    const pointText = document.querySelector('.points-text');
    const dotsBlock = document.querySelector('.dotsBlock');
    const checkOk = document.querySelector('.checkOk');
    const dot = document.querySelectorAll('.dots');

    pointText.textContent = '';
    document.querySelector('.checkOk').style.opacity = '0';
    document.querySelector('.checkFalse').style.opacity = '1';
    document.querySelector('.game-block').style.borderColor = 'red';
    document.querySelector('.img1').style.display = 'block';
    document.querySelector('.img2').style.display = 'none';
    document.querySelector('.img3').style.display = 'none';
    document.querySelector('.img4').style.display = 'none';

    statisticStore.setUnexploredState([state.word]);

    if (checkOk.style.opacity === '0') {
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
  }

  static countPoints() {
    const dotsBlock = document.querySelector('.dotsBlock');
    const points = document.querySelector('.points');
    const checkOk = document.querySelector('.checkOk');
    const dot = document.querySelectorAll('.dots');
    const audio = document.querySelector('.audio1');
    const pointText = document.querySelector('.points-text');
    const img1 = document.querySelector('.img1');
    const img2 = document.querySelector('.img2');
    const img3 = document.querySelector('.img3');
    const img4 = document.querySelector('.img4');

    if (
      checkOk.style.opacity === '1' &&
      dotsBlock.classList.contains('backRed')
    ) {
      points.textContent = +points.textContent + 80;
      pointText.textContent = '+80 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[2].classList.contains('green') &&
      dotsBlock.classList.contains('backOrange')
    ) {
      dot[0].style.display = 'none';
      dot[2].style.display = 'none';
      points.textContent = +points.textContent + 80;
      pointText.textContent = '+80 баллов';
      dotsBlock.classList.add('backRed');
      dotsBlock.classList.remove('backOrange');
      audio.play();
    } else if (
      checkOk.style.opacity === '1' &&
      dot[1].classList.contains('green') &&
      dotsBlock.classList.contains('backOrange')
    ) {
      dot[2].classList.add('green');
      points.textContent = +points.textContent + 80;
      pointText.textContent = '+80 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backOrange')
    ) {
      dot[1].classList.add('green');
      points.textContent = +points.textContent + 80;
      pointText.textContent = '+80 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      !dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backOrange')
    ) {
      dot[0].classList.add('green');
      points.textContent = +points.textContent + 80;
      pointText.textContent = '+80 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[2].classList.contains('green') &&
      dotsBlock.classList.contains('backPink')
    ) {
      dot.forEach((item) => {
        item.classList.remove('green');
      });
      points.textContent = +points.textContent + 80;
      pointText.textContent = '+80 баллов';
      dotsBlock.classList.add('backOrange');
      dotsBlock.classList.remove('backPink');
      img3.style.display = 'none';
      img4.style.display = 'block';
      audio.play();
    } else if (
      checkOk.style.opacity === '1' &&
      dot[1].classList.contains('green') &&
      dotsBlock.classList.contains('backPink')
    ) {
      dot[2].classList.add('green');
      points.textContent = +points.textContent + 40;
      pointText.textContent = '+40 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backPink')
    ) {
      dot[1].classList.add('green');
      points.textContent = +points.textContent + 40;
      pointText.textContent = '+40 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      !dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backPink')
    ) {
      dot[0].classList.add('green');
      points.textContent = +points.textContent + 40;
      pointText.textContent = '+40 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[2].classList.contains('green') &&
      dotsBlock.classList.contains('backBlue')
    ) {
      dot.forEach((item) => {
        item.classList.remove('green');
      });
      points.textContent = +points.textContent + 40;
      pointText.textContent = '+40 баллов';
      dotsBlock.classList.add('backPink');
      dotsBlock.classList.remove('backBlue');
      img2.style.display = 'none';
      img3.style.display = 'block';
      audio.play();
    } else if (
      checkOk.style.opacity === '1' &&
      dot[1].classList.contains('green') &&
      dotsBlock.classList.contains('backBlue')
    ) {
      dot[2].classList.add('green');
      points.textContent = +points.textContent + 20;
      pointText.textContent = '+20 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backBlue')
    ) {
      dot[1].classList.add('green');
      points.textContent = +points.textContent + 20;
      pointText.textContent = '+20 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      !dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backBlue')
    ) {
      dot[0].classList.add('green');
      points.textContent = +points.textContent + 20;
      pointText.textContent = '+20 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[2].classList.contains('green') &&
      dotsBlock.classList.contains('backYellow')
    ) {
      dot.forEach((item) => {
        item.classList.remove('green');
      });
      points.textContent = +points.textContent + 20;
      pointText.textContent = '+20 баллов';
      dotsBlock.classList.add('backBlue');
      dotsBlock.classList.remove('backYellow');
      img1.style.display = 'none';
      img2.style.display = 'block';
      audio.play();
    } else if (
      checkOk.style.opacity === '1' &&
      dot[1].classList.contains('green') &&
      dotsBlock.classList.contains('backYellow')
    ) {
      dot[2].classList.add('green');
      points.textContent = +points.textContent + 10;
      pointText.textContent = '+10 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backYellow')
    ) {
      dot[1].classList.add('green');
      points.textContent = +points.textContent + 10;
      pointText.textContent = '+10 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      !dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backViolet')
    ) {
      dot[0].classList.add('green');
      dotsBlock.classList.add('backYellow');
      dotsBlock.classList.remove('backViolet');
      points.textContent = +points.textContent + 10;
      pointText.textContent = '+10 баллов';
    }
    return points.textContent;
  }

  static audioOff() {
    const audioBlock = document.querySelector('.audio-block');
    const volume = document.querySelector('.volume');
    const audio = document.querySelectorAll('.audio');

    audioBlock.addEventListener('click', () => {
      audio.forEach((item) => {
        if (item.volume === 1) {
          volume.style.color = 'black';
          item.volume = 0;
        } else {
          volume.style.color = 'blueviolet';
          item.volume = 1;
        }
      });
    });
  }

  static init() {
    this.render();
    this.toNextWord();
    ButtonsArrow.init();
    document.removeEventListener('keyup', this.keyUpHandler);
    document.addEventListener('keyup', this.keyUpHandler);
    this.audioOff();
  }
}
