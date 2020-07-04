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
    store.setState({ solution: 'yes' });
    const wordsArray = stage.requestWords;
    const arrWord = [];

    // eslint-disable-next-line array-callback-return
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
        .sort(function Sort() {
          return 0.5 - Math.random();
        })
        .join(' ')
        .split(' ');
    });

    const sourceLine = document.querySelector('.source-line');

    const { wordsCount } = stage;

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

    this.cardsWidth();
    Service.puzzleMovement();

    setTimeout(() => {
      if (stage.autoPlay === 'yes') {
        Service.audioPlay();
      }
    }, 1000);
  }

  static cardsWidth() {
    const sourceLine = document.querySelector('.source-line');
    const card = sourceLine.querySelectorAll('.words-card');

    card.forEach((item) => {
      item.style.width = `${item.offsetWidth}px`;
    });
  }

  static init() {
    this.render();
    this.cardGeneration();
  }
}
