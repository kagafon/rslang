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

  static toNextWordKeyBoard() {
    const rusBlock = document.querySelector('.rusWord');
    const audioSrc = document.querySelector('.audio2');
    document.addEventListener('keyup', (event) => {
      const stage = store.getState();
      store.setState({ round: stage.round + 1 });
      audioSrc.play();
      console.log(stage.round);
      setTimeout(() => {
        document.querySelector('.game-block').style.borderColor = 'violet';
        document.querySelector('.checkFalse').style.opacity = '0';
        document.querySelector('.checkOk').style.opacity = '0';
        document.querySelector('.points-text').style.opacity = '0';
      }, 500);
      if (
        rusBlock.textContent ===
          stage.requestWords[stage.round].wordTranslate &&
        event.keyCode === 39
      ) {
        this.rightChoice();
      } else if (
        rusBlock.textContent ===
          stage.requestWords[stage.round].wordTranslate &&
        event.keyCode === 37
      ) {
        this.unCorrectChoice();
      } else if (
        rusBlock.textContent !==
          stage.requestWords[stage.round].wordTranslate &&
        event.keyCode === 39
      ) {
        this.unCorrectChoice();
      } else if (
        rusBlock.textContent !==
          stage.requestWords[stage.round].wordTranslate &&
        event.keyCode === 37
      ) {
        this.rightChoice();
      }
    });
  }

  static rightChoice() {
    const state = store.getState();
    EngWords.init();
    RusWords.init();
    document.querySelector('.checkOk').style.opacity = '1';
    document.querySelector('.checkFalse').style.opacity = '0';
    document.querySelector('.game-block').style.borderColor = 'green';
    document.querySelector('.points-text').style.opacity = '1';
    console.log(store.getState().correctChoice);

    store.setState({ correctChoice: state.correctChoice + 1 });
    statisticStore.setLearnedState([state.word]);
    console.log(store.getState().word);
    console.log(statisticStore.getState().learned);
    this.countPoints();
  }

  static unCorrectChoice() {
    const state = store.getState();
    EngWords.init();
    RusWords.init();
    const pointText = document.querySelector('.points-text');
    pointText.textContent = ''
    document.querySelector('.checkOk').style.opacity = '0';
    document.querySelector('.checkFalse').style.opacity = '1';
    document.querySelector('.game-block').style.borderColor = 'red';
    const dotsBlock = document.querySelector('.dotsBlock');
    statisticStore.setUnexploredState([state.word]);
    console.log(store.getState().word);
    console.log(statisticStore.getState().learned);
    const checkOk = document.querySelector('.checkOk');
    const dot = document.querySelectorAll('.dots');
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

    if (
      checkOk.style.opacity === '1' &&
      dotsBlock.classList.contains('backRed')
    ) {
      points.textContent = Number(points.textContent) + 80;
      pointText.textContent = '+80 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[2].classList.contains('green') &&
      dotsBlock.classList.contains('backOrange')
    ) {
      dot[0].style.display = 'none';
      dot[2].style.display = 'none';
      points.textContent = Number(points.textContent) + 80;
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
      points.textContent = Number(points.textContent) + 80;
      pointText.textContent = '+80 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backOrange')
    ) {
      dot[1].classList.add('green');
      points.textContent = Number(points.textContent) + 80;
      pointText.textContent = '+80 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      !dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backOrange')
    ) {
      dot[0].classList.add('green');
      points.textContent = Number(points.textContent) + 80;
      pointText.textContent = '+80 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[2].classList.contains('green') &&
      dotsBlock.classList.contains('backPink')
    ) {
      dot.forEach((item) => {
        item.classList.remove('green');
      });
      points.textContent = Number(points.textContent) + 80;
      pointText.textContent = '+80 баллов';
      dotsBlock.classList.add('backOrange');
      dotsBlock.classList.remove('backPink');
      audio.play();
    } else if (
      checkOk.style.opacity === '1' &&
      dot[1].classList.contains('green') &&
      dotsBlock.classList.contains('backPink')
    ) {
      dot[2].classList.add('green');
      points.textContent = Number(points.textContent) + 40;
      pointText.textContent = '+40 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backPink')
    ) {
      dot[1].classList.add('green');
      points.textContent = Number(points.textContent) + 40;
      pointText.textContent = '+40 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      !dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backPink')
    ) {
      dot[0].classList.add('green');
      points.textContent = Number(points.textContent) + 40;
      pointText.textContent = '+40 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[2].classList.contains('green') &&
      dotsBlock.classList.contains('backBlue')
    ) {
      dot.forEach((item) => {
        item.classList.remove('green');
      });
      points.textContent = Number(points.textContent) + 40;
      pointText.textContent = '+40 баллов';
      dotsBlock.classList.add('backPink');
      dotsBlock.classList.remove('backBlue');
      audio.play();
    } else if (
      checkOk.style.opacity === '1' &&
      dot[1].classList.contains('green') &&
      dotsBlock.classList.contains('backBlue')
    ) {
      dot[2].classList.add('green');
      points.textContent = Number(points.textContent) + 20;
      pointText.textContent = '+20 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backBlue')
    ) {
      dot[1].classList.add('green');
      points.textContent = Number(points.textContent) + 20;
      pointText.textContent = '+20 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      !dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backBlue')
    ) {
      dot[0].classList.add('green');
      points.textContent = Number(points.textContent) + 20;
      pointText.textContent = '+20 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[2].classList.contains('green') &&
      dotsBlock.classList.contains('backYellow')
    ) {
      dot.forEach((item) => {
        item.classList.remove('green');
      });
      points.textContent = Number(points.textContent) + 20;
      pointText.textContent = '+20 баллов';
      dotsBlock.classList.add('backBlue');
      dotsBlock.classList.remove('backYellow');
      audio.play();
    } else if (
      checkOk.style.opacity === '1' &&
      dot[1].classList.contains('green') &&
      dotsBlock.classList.contains('backYellow')
    ) {
      dot[2].classList.add('green');
      points.textContent = Number(points.textContent) + 10;
      pointText.textContent = '+10 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backYellow')
    ) {
      dot[1].classList.add('green');
      points.textContent = Number(points.textContent) + 10;
      pointText.textContent = '+10 баллов';
    } else if (
      checkOk.style.opacity === '1' &&
      !dot[0].classList.contains('green') &&
      dotsBlock.classList.contains('backViolet')
    ) {
      dot[0].classList.add('green');
      dotsBlock.classList.add('backYellow');
      dotsBlock.classList.remove('backViolet');
      points.textContent = Number(points.textContent) + 10;
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

    setTimeout(() => {
      document.querySelector('.game-block').style.borderColor = 'violet';
    }, 1000);
  }

  static init() {
    this.render();
    this.toNextWord();
    ButtonsArrow.init();
    this.toNextWordKeyBoard();
    this.audioOff();
  }
}
