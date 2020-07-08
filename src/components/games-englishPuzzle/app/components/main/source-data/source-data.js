/* eslint-disable import/no-cycle */
import Service from 'components/games-englishPuzzle/app/service';
import store from 'components/games-englishPuzzle/app/storage';
import { User } from 'services/backend';
import getCroppedImageUrl from 'components/games-englishPuzzle/app/image';
import paintings1 from 'components/games-englishPuzzle/app/components/data/level1';
import paintings2 from 'components/games-englishPuzzle/app/components/data/level2';
import paintings3 from 'components/games-englishPuzzle/app/components/data/level3';
import paintings4 from 'components/games-englishPuzzle/app/components/data/level4';
import paintings5 from 'components/games-englishPuzzle/app/components/data/level5';
import paintings6 from 'components/games-englishPuzzle/app/components/data/level6';

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

  static async cardGeneration() {
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
    const resultBlock = document.querySelector('.results');
    const resultLine = document.querySelector('.results-line');

    const { wordsCount } = stage;
    const { level } = stage;
    const bgImage = stage.background;

    const page = User.getCurrentUser().settings.games.puzzle.levelPages[0];
    const url = this.backGroundUrl(level);
    const imgAutor = url[page].author;
    const imgName = url[page].name;
    const imageUrl = `https://raw.githubusercontent.com/jules0802/rslang_data_paintings/master/${url[page].cutSrc}`;

    const bg = await getCroppedImageUrl(
      imageUrl,
      resultBlock.offsetWidth,
      resultBlock.offsetHeight
    );

    store.setState({ img: bg });
    store.setState({ imgDescription: `${`${imgAutor} - ${imgName}`}` });

    for (let j = 0; j < arrWord[+wordsCount].length; j += 1) {
      const card = document.createElement('div');
      card.classList.add('words-card');
      card.setAttribute('draggable', 'true');
      card.classList.add('source');

      card.textContent = arrWord[+wordsCount][j];

      const background = document.createElement('div');
      background.classList.add('bg');

      background.style.backgroundImage = `url("${bg}")`;

      background.style.backgroundPositionY = `${
        wordsCount * -resultLine.offsetHeight
      }px`;

      const num = arrWord[+wordsCount].length;

      background.style.backgroundPositionX = `${
        (resultBlock.offsetWidth / num) * -j
      }px`;

      if (bgImage === 'none') {
        background.style.opacity = '0';
      } else {
        background.style.opacity = '50%';
      }

      card.append(background);

      if (card.textContent) {
        sourceLine.append(card);
      }
    }

    this.cardsWidth();
    Service.puzzleMovement();
    Service.spinnerOff();

    setTimeout(() => {
      if (stage.autoPlay === 'yes') {
        Service.audioPlay();
      }
    }, 1000);
  }

  static backGroundUrl(num) {
    let url = '';

    switch (num) {
      case 0:
        url = paintings1;
        break;
      case 1:
        url = paintings2;
        break;
      case 2:
        url = paintings3;
        break;
      case 3:
        url = paintings4;
        break;
      case 4:
        url = paintings5;
        break;
      case 5:
        url = paintings6;
        break;
      default:
    }
    return url;
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
