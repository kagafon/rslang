/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-cycle
import Service from 'components/games-englishPuzzle/app/service';
import Toaster from 'components/Toaster';
import { createElement } from 'helpers/dom';
import store from 'components/games-englishPuzzle/app/storage';
import statisticStore from 'components/games-englishPuzzle/app/statistic-storage';
// eslint-disable-next-line import/no-cycle
import StartPage from 'components/games-englishPuzzle/app/components/start-window/start-window';
// eslint-disable-next-line import/no-cycle
import { User } from 'services/backend';

export default class Statisctic {
  static render() {
    Service.spinnerOn();
    const wrapper = document.querySelector('.wrapper');
    const header = document.querySelector('.header');
    const stage = store.getState();
    const learned = statisticStore.getState();
    const unexploredWords = learned.unexplored;
    const learnedWords = learned.learned;

    header.innerHTML = '';
    wrapper.innerHTML = '';

    const statisticBlock = createElement(wrapper, 'div', ['statistic-block']);

    statisticBlock.innerHTML = `
     <div class="statistic">
        <div class='results-img'></div>
        <span class='img-description'>${stage.imgDescription}</span>
     <div class="final-slider">
     <div class="final-error">
     <span> ОШИБОК: </span>
    ${unexploredWords.length}
    </div>
      <div class="final invalid"></div>
      <div class="final-line"></div>
      <div class="final-correct">ЗНАЮ: 
      <span> ${learnedWords.length}</span>
    </div>
      <div class="final valid"></div>
    </div>
      <button type="button" class="btn btn-primary final-btn">начать заново</button>
    </div>
    </div>
    `;

    const img = document.querySelector('.results-img');
    img.style.backgroundImage = `url("${stage.img}")`;
    img.style.backgroundSize = 'cover';
    Service.spinnerOff();
  }

  static unexploredWords() {
    const learned = statisticStore.getState();
    const unexploredWords = learned.unexplored;

    unexploredWords.forEach((item) => {
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

  static rebootStatictic() {
    const menuLink = document.querySelectorAll('.nav-link');

    menuLink.forEach((item) => {
      item.addEventListener('click', () => {
        statisticStore.clearState();
      });
    });
  }

  static async postGametStatistic() {
    try {
      const stage = store.getState();
      const date = new Date();
      const { correctChoice } = stage;

      this.userPage();
      User.saveSettings();
      await User.saveGameStatistics(
        'engpuz',
        date.getTime(),
        +correctChoice,
        10
      );
    } catch (error) {
      Toaster.createToast(`Ошибка сохранения результата: ${error}`, 'warning');
    }
  }

  static userPage() {
    const stage = store.getState();

    const { level } = stage;
    const page = User.getCurrentUser().settings.games.puzzle.levelPages[level];

    if (level === 0 && page === 44) {
      User.getCurrentUser().settings.games.puzzle.levelPages[level] = 0;
    } else if (level === 1 && page === 39) {
      User.getCurrentUser().settings.games.puzzle.levelPages[level] = 0;
    } else if (level === 2 && page === 39) {
      User.getCurrentUser().settings.games.puzzle.levelPages[level] = 0;
    } else if (level === 3 && page === 24) {
      User.getCurrentUser().settings.games.puzzle.levelPages[level] = 0;
    } else if (level === 4 && page === 24) {
      User.getCurrentUser().settings.games.puzzle.levelPages[level] = 0;
    } else if (level === 5 && page === 24) {
      User.getCurrentUser().settings.games.puzzle.levelPages[level] = 0;
    } else {
      User.getCurrentUser().settings.games.puzzle.levelPages[level] += 1;
    }
  }

  static init() {
    this.render();
    this.unexploredWords();
    this.learnedWords();
    this.playAudio();
    this.reboot();
    this.postGametStatistic();
    this.rebootStatictic();
  }
}
