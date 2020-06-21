import Service from 'components/games-AudioCall/app/service';
import store from 'components/games-AudioCall/app/components/storage';

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
      <span class="material-icons md-correct correct">
      check_circle
      </span>
      <span class="material-icons md-cancel cancel">
      cancel
      </span>
      <button class='words'>Hello</button>
      `;
      wordsBlock.append(wrapperWords);
    }
    wrapper.append(wordsBlock);
  }

  static wordChoice() {
    const arrWords = document.querySelectorAll('.words');
    arrWords.forEach((item) => {
      item.addEventListener('click', () => {
        const state = store.getState();
        const progress = document.querySelector('.progress-bar');
        const width = String(progress.style.width).slice(0, -1);
        progress.style.width = `${+width + 10}%`;

        store.setState({ round: state.round + 1 });

        if(item.textContent === state.word.wordTranslate) {
         
        }
      });
    });
  }

  static async wordGeneration() {
    const stage = store.getState();
    const arrWords = await Service.wordsRequest(stage.groupe);
    const wordsCard = document.querySelectorAll('.words');

    // arrWords.sort(() => {
    //   return Math.random() - 0.5;
    // });

    store.setState({ word: arrWords[stage.round] });
    this.wordsTranslate(arrWords[stage.round].wordTranslate);

    wordsCard.forEach((item) => {
      const rndNum = this.randomInteger(0, 9);
      if (item.textContent !== arrWords[stage.round].wordTranslate) {
        item.textContent = arrWords[rndNum].wordTranslate;
      }
    });
    console.log(arrWords);
  }

  static randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  static wordsTranslate(text) {
    const wordsCard = document.querySelectorAll('.words');

    const randNum = this.randomInteger(0, 4);
    wordsCard[randNum].textContent = text;
  }

  static init() {
    this.render();
    this.wordChoice();
    this.wordGeneration();
  }
}
