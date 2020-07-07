/* eslint-disable import/no-cycle */
/* eslint-disable import/no-unresolved */
import Service from 'components/games-englishPuzzle/app/service';
import store from 'components/games-englishPuzzle/app/storage';
import SourceData from 'components/games-englishPuzzle/app/components/main/source-data/source-data';
import statisticStore from 'components/games-englishPuzzle/app/statistic-storage';
import Statistic from 'components/games-englishPuzzle/app/components/main/statistic/statistic';

export default class Button {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const buttonBlock = document.createElement('div');
    buttonBlock.classList.add('button-block');

    buttonBlock.innerHTML = `
     <button class="btn btn-primary btn-i-dont-know">Я не знаю</button>
     <button class ="btn btn-primary btn-check">проверить</button>
     <button class ="btn btn-primary btn-continue">дальше</button>
     <button class ="btn btn-primary btn-results">статистика</button>
    `;
    wrapper.append(buttonBlock);
  }

  static btnSolution() {
    const stage = store.getState();
    const wordsArray = stage.requestWords;
    const arrWord = [];

    wordsArray.filter((reading, index) => {
      if (index < 10) {
        arrWord.push(
          reading.textExample
            .replace(/<\/?[^>]+>/g, '')
            .replace(/[.,]/g, '')
            .trim()
            .split(' ')
        );
      }
    });

    const { wordsCount } = stage;
    const bg = stage.img;
    const bgImage = stage.background;

    store.setState({ solution: 'no' });
    const resultLine = document.querySelectorAll('.results-line');
    const sourceLine = document.querySelector('.source-line');
    const arrWordResult = document.querySelectorAll('.result');
    const resultBlock = document.querySelector('.results');
    if (
      document.querySelectorAll('.mistake').length > 0 ||
      arrWordResult.length > 0
    ) {
      resultLine[+wordsCount].innerHTML = '';
      arrWord[+wordsCount].forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('words-card');
        card.classList.add('result');

        card.textContent = item;

        const background = document.createElement('div');
        background.classList.add('bg');

        background.style.backgroundImage = `url("${bg}")`;

        background.style.backgroundPositionY = `${
          wordsCount * -sourceLine.offsetHeight
        }px`;

        const num = arrWord[+wordsCount].length;

        background.style.backgroundPositionX = `${
          (resultBlock.offsetWidth / num) * -index
        }px`;

        if (bgImage === 'none') {
          background.style.opacity = '0';
        } else {
          background.style.opacity = '50%';
        }

        card.append(background);

        resultLine[+wordsCount].append(card);
        sourceLine.innerHTML = '';
      });
      document.querySelector('.btn-i-dont-know').style.display = 'none';
    } else if (arrWord) {
      arrWord[+wordsCount].forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('words-card');
        card.classList.add('result');

        card.textContent = item;

        const background = document.createElement('div');
        background.classList.add('bg');

        background.style.backgroundImage = `url("${bg}")`;

        background.style.backgroundPositionY = `${
          wordsCount * -sourceLine.offsetHeight
        }px`;

        const num = arrWord[+wordsCount].length;

        background.style.backgroundPositionX = `${
          (resultBlock.offsetWidth / num) * -index
        }px`;

        if (bgImage === 'none') {
          background.style.opacity = '0';
        } else {
          background.style.opacity = '50%';
        }

        card.append(background);

        resultLine[+wordsCount].append(card);
        sourceLine.innerHTML = '';
      });
      Service.bidCounter();
    }
    this.btnCheck();
  }

  static btnCheck() {
    const stage = store.getState();
    const count = stage.wordsCount;
    const word = document.querySelectorAll('.result');
    const wordMistake = document.querySelectorAll('.result-mistake');
    const arrWord = [];

    if (word.length === 0 && +count < 10) {
      wordMistake.forEach((item) => {
        arrWord.push(item);
      });
    } else {
      word.forEach((item) => {
        arrWord.push(item);
      });
    }
    Service.bitValidation(arrWord);
  }

  static btnContinue() {
    const stage = store.getState();
    const count = stage.wordsCount;
    store.setState({ wordsCount: stage.wordsCount + 1 });

    if (stage.solution === 'yes') {
      statisticStore.setLearnedState([stage.requestWords[count]]);
      store.setState({ correctChoice: stage.correctChoice + 1 });
    } else {
      statisticStore.setUnexploredState([stage.requestWords[count]]);
    }

    const resultLine = document.querySelectorAll('.results-line');
    const sourceLine = document.querySelector('.source-line');
    const wordMistake = document.querySelectorAll('.result-mistake');

    wordMistake.forEach((item) => {
      item.removeAttribute('draggable', 'true');
      item.classList.remove('result-mistake');
    });
    if (+count !== 9) {
      resultLine.forEach((item) => {
        item.classList.remove('line-active');
      });
      sourceLine.innerHTML = '';
      resultLine[+count + 1].classList.add('line-active');
      SourceData.cardGeneration();
      document.querySelector('.btn-i-dont-know').style.display = 'block';
    }
  }

  static btnResults() {
    Statistic.init();
  }

  static disabledButtons() {
    document.querySelector('.btn-i-dont-know').style.display = 'block';
    document.querySelector('.btn-results').style.display = 'none';
    document.querySelector('.btn-check').style.display = 'none';
    document.querySelector('.btn-continue').style.display = 'none';
  }

  static init() {
    this.render();
    Service.btnClick();
  }
}
