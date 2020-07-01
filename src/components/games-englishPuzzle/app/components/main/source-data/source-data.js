import Service from 'components/games-englishPuzzle/app/service';
import store from 'components/games-englishPuzzle/app/storage';

export default class SourceData {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const words = document.createElement('div');
    words.classList.add('source-data');
    words.innerHTML = `
    <div class="source-line"></div>
    `;
    wrapper.append(words);
  }

  static cardGeneration() {
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

    arrWord.forEach((item) => {
      item
        .sort(function () {
          return 0.5 - Math.random();
        })
        .join(' ')
        .split(' ');
    });

    console.log(arrWord);

    const sourceLine = document.querySelector('.source-line');

    const wordsCount = localStorage.getItem('wordsCount');

    for (let j = 0; j < arrWord[+wordsCount].length; j += 1) {
      const card = document.createElement('div');
      card.classList.add('words-card');
      card.setAttribute('draggable', 'true');
      card.classList.add('source');

      card.textContent = arrWord[+wordsCount][j];

      if (card.textContent) {
        sourceLine.append(card);
      }
    }

    Service.puzzleMovement();
  }

  static init() {
    this.render();
    this.cardGeneration();
  }
}

export const sourceData = new SourceData();
