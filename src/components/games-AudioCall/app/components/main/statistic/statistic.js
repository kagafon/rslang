// eslint-disable-next-line import/no-cycle
import Service from 'components/games-AudioCall/app/service';
import { createElement } from 'helpers/dom';
import store from 'components/games-AudioCall/app/components/storage';
import statisticStore from 'components/games-AudioCall/app/components/statistic-storage';
// eslint-disable-next-line import/no-cycle
import StartPage from 'components/games-AudioCall/app/components/main/start-page/start-page';
// eslint-disable-next-line import/no-cycle
import { User } from 'services/backend';

export default class Statisctic {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const header = document.querySelector('.header');
    const stage = store.getState();
    const description = this.gradationResult(stage.correctChoice);

    header.innerHTML = '';
    wrapper.innerHTML = '';

    const statisticBlock = createElement(wrapper, 'div', ['statistic-block']);

    statisticBlock.innerHTML = `
     <div class="statistic">
         <span class="statistic-title">${description}</span>
         <span class="statistic-subtitle">${
           stage.correctChoice
         } слов изучено, ${10 - stage.correctChoice} не изучено</span>
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
     
    `;
    Service.spinnerOff();
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
      const invalidBlock = document.querySelector('.invalid');
      const itemBlock = document.createElement('div');
      itemBlock.classList.add('final-answer');
      itemBlock.innerHTML = `
      <div class="final-audio">
        <span class="material-icons md-22 md-light">
          volume_up
        </span>
        <audio src=${item.audioSrc}></audio>
      </div>
      <div class='final-answer-eng'>${item.word}</div>
      <span class='final-answer-tr'>-</span>
      <div class='final-answer-ru'>${item.wordTranslate}</div>
      `;
      invalidBlock.append(itemBlock);
    });
  }

  static learnedWords() {
    const learnedWords = statisticStore.getState();

    learnedWords.learned.forEach((item) => {
      const validBlock = document.querySelector('.valid');
      const itemBlock = document.createElement('div');
      itemBlock.classList.add('final-answer');
      itemBlock.innerHTML = `
      <div class="final-audio">
        <span class="material-icons md-22 md-light">
          volume_up
        </span>
        <audio src=${item.audioSrc}></audio>
      </div>
      <div class='final-answer-eng'>${item.word}</div>
      <span class='final-answer-tr'>-</span>
      <div class='final-answer-ru'>${item.wordTranslate}</div>
      `;
      validBlock.append(itemBlock);
    });
  }

  static gradationResult(mistake) {
    let description = '';
    if (mistake <= 4) {
      description = 'Попробуйте пройти обучение и повторить!';
    } else if (mistake > 4 && mistake <= 6) {
      description = 'Есть куда стремиться!';
    } else if (mistake > 6 && mistake < 9) {
      description = 'Хороший результат!';
    } else if (mistake >= 9) {
      description = 'Отличный результат!';
    }

    return description;
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
      createElement(document.querySelector('.wrapper'), 'div', ['answerBlock']);
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

  static postGametStatistic() {
    const stage = store.getState();
    const date = new Date();
    const { correctChoice } = stage;

    this.userPage();
    User.saveSettings();
    User.saveGameStatistics('audiocall', date.getTime(), +correctChoice, 10);
  }

  static userPage() {
    const stage = store.getState();

    const { level } = stage;
    const page = User.getCurrentUser().settings.games.audioCall.levelPages[
      level
    ];

    if (level === 0 && page === 29) {
      User.getCurrentUser().settings.games.audioCall.levelPages[level] = 0;
    } else if (level === 1 && page === 29) {
      User.getCurrentUser().settings.games.audioCall.levelPages[level] = 0;
    } else if (level === 2 && page === 29) {
      User.getCurrentUser().settings.games.audioCall.levelPages[level] = 0;
    } else if (level === 3 && page === 29) {
      User.getCurrentUser().settings.games.audioCall.levelPages[level] = 0;
    } else if (level === 4 && page === 29) {
      User.getCurrentUser().settings.games.audioCall.levelPages[level] = 0;
    } else if (level === 5 && page === 29) {
      User.getCurrentUser().settings.games.audioCall.levelPages[level] = 0;
    } else {
      User.getCurrentUser().settings.games.audioCall.levelPages[level] += 1;
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
