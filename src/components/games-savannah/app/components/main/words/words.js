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
      <div data-number='${i}' class='words'>Hello</div>
      `;
      wordsBlock.append(wrapperWords);
    }
    wrapper.append(wordsBlock);
  }

  static rightChoice(item) {
    const answer = document.querySelector('.answerBlock');
    const stage = store.getState();
    item.classList.add('correct');
    answer.classList.remove('transition');
    answer.textContent = '';

    const audio = new Audio();
    audio.src = 'https://pic.pikbest.com/00/43/23/41F888piC5fv.mp3';
    audio.play();

    if (stage.round <= 9 && stage.health !== 0) {
      setTimeout(() => {
        this.clearWords();
        RusWords.wordGeneration();
      }, 1000);
    }
  }

  static incorrectChoice(item) {
    const answer = document.querySelector('.answerBlock');
    const health = document.querySelector('.health');
    health.remove();

    const stage = store.getState();
    item.classList.add('cancel');
    answer.classList.remove('transition');
    answer.textContent = '';

    const audio = new Audio();
    audio.src =
      'https://zvukipro.com/uploads/files/2018-10/1540309251_jg-032316-sfx-feedback-incorrect-25.mp3';
    audio.play();

    if (stage.round <= 9 && stage.health !== 0) {
      setTimeout(() => {
        this.clearWords();
        RusWords.wordGeneration();
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

        setTimeout(() => {
          if (state.round === 9 || state.health === 1) {
            Service.spinnerOn();
            Statistic.init();
          }
        }, 1000);
        console.log(state);
      });
    });
  }

  static wordsTranslate(text) {
    const wordsCard = document.querySelectorAll('.words');

    const randNum = this.randomInteger(0, 3);
    wordsCard[randNum].textContent = text;
  }

  static async wordGeneration() {
    try {
      const stage = store.getState();
      const arrWords = await Service.wordsRequest(stage.groupe);
      const wordsCard = document.querySelectorAll('.words');

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
