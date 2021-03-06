/* eslint-disable import/no-cycle */
import Service from 'components/games-savannah/app/service';
import store from 'components/games-savannah/app/components/storage';
import statiscticStore from 'components/games-savannah/app/components/statistic-storage';
import Answer from 'components/games-savannah/app/components/main/answer-block/answer-block';
import Statistic from 'components/games-savannah/app/components/main/statistic/statistic';

export default class RusWords {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const wordsBlock = document.createElement('div');
    wordsBlock.classList.add('wordsblock');

    for (let i = 1; i < 5; i += 1) {
      const wrapperWords = document.createElement('div');
      wrapperWords.classList.add('wrapper-words');
      wrapperWords.innerHTML = `
      <div data-number='${i}' class='words'></div>
      `;
      wordsBlock.append(wrapperWords);
    }
    wrapper.append(wordsBlock);
  }

  static rightChoice(item) {
    const answer = document.querySelector('.answerBlock');
    const stage = store.getState();
    item.classList.add('correct');

    document.removeEventListener('keydown', this.keyboardChoice, false);

    answer.textContent = '';

    if (stage.volume !== 'off') {
      const audio = new Audio();
      audio.src = 'assets/audio/savannah/correct.mp3';
      audio.play();
    }

    if (stage.round <= 9 && stage.health !== 0) {
      setTimeout(() => {
        this.clearWords();
        RusWords.wordGeneration();
      }, 1000);
    } else {
      setTimeout(() => {
        Service.spinnerOn();
        Statistic.init();
      }, 1000);
    }
  }

  static incorrectChoice(item) {
    const answer = document.querySelector('.answerBlock');
    const stage = store.getState();
    const health = document.querySelector('.health');
    const wordsCard = document.querySelectorAll('.wrapper-words');

    document.removeEventListener('keydown', this.keyboardChoice, false);

    wordsCard.forEach((i) => {
      if (i.children[0].textContent === stage.word.wordTranslate) {
        i.classList.add('correct');
      }
    });

    try {
      health.remove();
    } catch (error) {}

    item.classList.add('cancel');
    answer.textContent = '';

    const audio = new Audio();
    audio.src = 'assets/audio/savannah/error.mp3';
    audio.play();

    if (stage.round <= 9 && stage.health !== 0) {
      setTimeout(() => {
        this.clearWords();
        RusWords.wordGeneration();
      }, 1000);
    } else {
      setTimeout(() => {
        Service.spinnerOn();
        Statistic.init();
      }, 1000);
    }
  }

  static wordChoice() {
    const arrWords = document.querySelectorAll('.wrapper-words');

    arrWords.forEach((item) => {
      item.addEventListener('click', () => {
        const state = store.getState();
        store.setState({ round: state.round + 1 });
        if (item.children[0].textContent === state.word.wordTranslate) {
          store.setState({ correctChoice: state.correctChoice + 1 });
          statiscticStore.setLearnedState([state.word]);
          this.rightChoice(item);
        } else {
          store.setState({ health: state.health - 1 });
          statiscticStore.setUnexploredState([state.word]);
          this.incorrectChoice(item);
        }
      });
    });
    document.addEventListener('keydown', this.keyboardChoice, false);
  }

  static keyboardChoice(event) {
    const stage = store.getState();
    const target = event.key;

    const arrWords = document.querySelectorAll('.wrapper-words');

    if (target === '1' || target === '2' || target === '3' || target === '4') {
      store.setState({ round: stage.round + 1 });

      let word;

      switch (target) {
        case '1':
          word = arrWords[0].children[0].textContent;
          break;
        case '2':
          word = arrWords[1].children[0].textContent;
          break;
        case '3':
          word = arrWords[2].children[0].textContent;
          break;
        case '4':
          word = arrWords[3].children[0].textContent;
          break;
        default:
      }

      if (word === stage.word.wordTranslate) {
        store.setState({ correctChoice: stage.correctChoice + 1 });
        statiscticStore.setLearnedState([stage.word]);

        RusWords.rightChoice(arrWords[+target - 1]);
      } else {
        store.setState({ health: stage.health - 1 });
        statiscticStore.setUnexploredState([stage.word]);

        RusWords.incorrectChoice(arrWords[+target - 1]);
      }
    }
  }

  static wordsTranslate(text) {
    const wordsCard = document.querySelectorAll('.words');

    const randNum = this.randomInteger(0, 3);
    wordsCard[randNum].textContent = text;
  }

  static wordGeneration() {
    try {
      const stage = store.getState();
      const wordsCard = document.querySelectorAll('.words');

      const arrWords = stage.requestWords;

      document.addEventListener('keydown', this.keyboardChoice, false);

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
      Answer.init();
    } catch (eroor) {}
  }

  static clearWords() {
    const arrWordsCard = document.querySelectorAll('.wrapper-words');
    arrWordsCard.forEach((item) => {
      item.classList.remove('correct');
      item.classList.remove('cancel');
    });

    const arrWords = document.querySelectorAll('.words');
    arrWords.forEach((item) => {
      item.textContent = '';
    });
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
