import Service from 'components/games-AudioCall/app/service';
import { createElement } from 'helpers/dom';
import store from 'components/games-AudioCall/app/components/storage';
import statisticStore from 'components/games-AudioCall/app/components/statistic-storage';
// eslint-disable-next-line import/no-cycle
import App from 'components/games-AudioCall/app/app';

export default class Statisctic {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const header = document.querySelector('.header');
    const stage = store.getState();
    const description = this.gradationResult(stage.correctChoice);

    header.innerHTML = '';
    wrapper.innerHTML = '';
    createElement(wrapper, 'div', ['statistic-block']);
    const statisticBlock = document.querySelector('.statistic-block');
    statisticBlock.innerHTML = `
     <div class="statistic">
        <span class="statistic-title">${description}</span>
        <span class="statistic-subtitle">${stage.correctChoice} слов изучено, ${
      10 - stage.correctChoice
    } не изучено</span>
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
    const learnedWords = statisticStore.getState();

    learnedWords.unexplored.forEach((item) => {
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
      description = 'попробуйте пройти обучение и повторить!';
    } else if (mistake > 4 && mistake <= 6) {
      description = 'есть куда стремиться!';
    } else if (mistake > 6 && mistake < 9) {
      description = 'хороший результат!';
    } else if (mistake >= 9) {
      description = 'отличный результат!';
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
      document.body.innerHTML = '';
      App.run();
    });
  }

  static init() {
    this.render();
    this.unexploredWords();
    this.learnedWords();
    this.playAudio();
    this.reboot();
  }
}
