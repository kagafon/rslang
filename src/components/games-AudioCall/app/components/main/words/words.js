import Service from 'components/games-AudioCall/app/service';
import store from 'components/games-AudioCall/app/components/storage';
import Results from 'components/games-AudioCall/app/components/main/results/results';
// eslint-disable-next-line import/no-cycle
import Statisctic from 'components/games-AudioCall/app/components/main/statistic/statistic';
import Voice from 'components/games-AudioCall/app/components/main/voiceBlock/voice';
import statiscticStore from 'components/games-AudioCall/app/components/statistic-storage';
// eslint-disable-next-line import/no-cycle

export default class RusWords {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const wordsBlock = document.createElement('div');
    wordsBlock.classList.add('wordsblock');

    for (let i = 1; i < 6; i += 1) {
      const wrapperWords = document.createElement('div');
      wrapperWords.classList.add('wrapper-words');
      wrapperWords.innerHTML = `
      <span class="number-words">${i}</span>
      <span class="material-icons md-correct correct icon">
      check_circle
      </span>
      <span class="material-icons md-cancel cancel icon">
      cancel
      </span>
      <button class='words'></button>
      `;
      wordsBlock.append(wrapperWords);
    }
    wrapper.append(wordsBlock);
  }

  static rightChoice(item) {
    const arrWordsCard = document.querySelectorAll('.words');
    const arrWordsNumber = document.querySelectorAll('.number-words');

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
  }

  static wordsTranslate(text) {
    const wordsCard = document.querySelectorAll('.words');
    const cardsWrapper = document.querySelectorAll('.wrapper-words');

    const randNum = this.randomInteger(0, 4);
    wordsCard[randNum].textContent = text;
    store.setState({ correct: cardsWrapper[randNum] });
  }

  static wordGeneration() {
    try {
      const stage = store.getState();
      const wordsCard = document.querySelectorAll('.words');
      const arrWords = stage.requestWords;

      store.setState({ word: arrWords[stage.round] });
      this.wordsTranslate(arrWords[stage.round].wordTranslate);

      const wordsCardFilter = arrWords.filter(function filter(item) {
        return item.wordTranslate !== arrWords[stage.round].wordTranslate;
      });

      wordsCard.forEach((item) => {
        const rndNum = this.randomInteger(0, wordsCardFilter.length - 1);

        if (item.textContent !== arrWords[stage.round].wordTranslate) {
          item.textContent = wordsCardFilter[rndNum].wordTranslate;
          wordsCardFilter.splice(rndNum, 1);
        }
      });
      Service.spinnerOff();
      Voice.autoPlayAudio();
    } catch (error) {}
  }

  static randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  static init() {
    this.render();
    this.wordChoice();
    this.wordGeneration();
  }
}
