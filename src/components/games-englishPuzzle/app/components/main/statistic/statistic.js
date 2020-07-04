/* eslint-disable import/no-unresolved */
import Service from 'components/games-englishPuzzle/app/service';
import { createElement } from 'helpers/dom';
import store from 'components/games-englishPuzzle/app/storage';
import statisticStore from 'components/games-englishPuzzle/app/statistic-storage';
// eslint-disable-next-line import/no-cycle
import StartPage from 'components/games-englishPuzzle/app/components/start-window/start-window';
// eslint-disable-next-line import/no-cycle
import { User } from 'services/backend';

export default class Statisctic {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const header = document.querySelector('.header');
    const stage = store.getState();

    header.innerHTML = '';
    wrapper.innerHTML = '';

    const statisticBlock = createElement(wrapper, 'div', ['statistic-block']);

    statisticBlock.innerHTML = `
     <div class="statistic">
        <div class='results-img'></div>
        <span class='img-description'>тут будет описание картины</span>
     <div class="final-slider">
     <div class="final-error">
     <span> ОШИБОК: </span>
    ${10 - stage.correctChoice}
    </div>
      <div class="final invalid"></div>
      <div class="final-line"></div>
      <div class="final-correct">ЗНАЮ: 
      <span> ${stage.correctChoice}</span>
    </div>
      <div class="final valid"></div>
    </div>
      <button type="button" class="btn btn-primary final-btn">начать заново</button>
    </div>
    </div>
    `;
    // Service.spinnerOff();
  }

  static unexploredWords() {
    const learned = statisticStore.getState();
    const learnedWords = learned.learned;
    const unexploredWords = learned.unexplored;
    let arr;
    const arrLearnedWords = store.getState();

    if (unexploredWords.length === 0 && learnedWords.length === 0) {
      arr = arrLearnedWords.requestWords.filter(function filter(item, index) {
        return index <= 9;
      });
    } else {
      arr = unexploredWords;
    }

    arr.forEach((item) => {
      const text = item.textExample
        .replace(/<\/?[^>]+>/g, '')
        .replace(/[.,]/g, '');

      const audioUrl = item.audioExample.replace('files/', '');
      const src = `https://raw.githubusercontent.com/furrrmanov/rslang-data/master/files/${audioUrl}`;

      const invalidBlock = document.querySelector('.invalid');
      const itemBlock = document.createElement('div');
      itemBlock.classList.add('final-answer');
      itemBlock.innerHTML = `
      <div class="final-audio">
        <span class="material-icons md-22 md-light">
          volume_up
        </span>
        <audio src=${src}></audio>
      </div>
      <span class='final-answer-tr'>-</span>
      <div class='final-answer-ru'>${text}</div>
      `;
      invalidBlock.append(itemBlock);
    });
  }

  static learnedWords() {
    const learnedWords = statisticStore.getState();

    learnedWords.learned.forEach((item) => {
      const text = item.textExample
        .replace(/<\/?[^>]+>/g, '')
        .replace(/[.,]/g, '');

      const audioUrl = item.audioExample.replace('files/', '');
      const src = `https://raw.githubusercontent.com/furrrmanov/rslang-data/master/files/${audioUrl}`;

      const validBlock = document.querySelector('.valid');
      const itemBlock = document.createElement('div');
      itemBlock.classList.add('final-answer');
      itemBlock.innerHTML = `
    <div class="final-audio">
      <span class="material-icons md-22 md-light">
        volume_up
      </span>
      <audio src=${src}></audio>
      </div>
      <span class='final-answer-tr'>-</span>
      <div class='final-answer-ru'>${text}</div>
    `;
      validBlock.append(itemBlock);
    });
  }

  static playAudio() {
    const arrAudio = document.querySelectorAll('.final-audio');
    arrAudio.forEach((item) => {
      item.addEventListener('click', () => {
        item.children[1].play();
      });
    });
  }

  static reboot() {
    const bntReboot = document.querySelector('.final-btn');

    bntReboot.addEventListener('click', () => {
      document.querySelector('.wrapper').innerHTML = '';
      document.querySelector('.header').innerHTML = '';
      createElement(document.querySelector('.wrapper'), 'div', ['answerBlock']);
      createElement(document.querySelector('.header'), 'div', ['hints-block']);
      statisticStore.clearState();
      StartPage.render(document.querySelector('.game-container'));
    });
  }

  static postGametStatistic() {
    const stage = store.getState();
    const date = new Date();
    const { correctChoice } = stage;
    User.saveGameStatistics('savannah', date.getTime(), +correctChoice, 10);
  }

  static init() {
    this.render();
    this.unexploredWords();
    this.learnedWords();
    this.playAudio();
    this.reboot();
    // this.postGametStatistic();
  }
}
