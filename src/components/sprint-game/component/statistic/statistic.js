/* eslint-disable class-methods-use-this */
import Service from 'components/sprint-game/component/service';
import { createElement } from 'helpers/dom';
import store from 'components/sprint-game/component/storage';
import statisticStore from 'components/sprint-game/component/statistic-storage';
// eslint-disable-next-line import/no-cycle
import StartPage from 'components/sprint-game/component/start-page/start-page';
// eslint-disable-next-line import/no-cycle
import { User } from 'services/backend';

export default class Statistic {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const stage = store.getState();
    const description = this.gradationResult(stage.correctChoice);
    const record = this.getRecord();
    const state = store.getState();
    wrapper.innerHTML = '';

    const statisticBlock = createElement(wrapper, 'div', ['statistic-block']);

    statisticBlock.innerHTML = `
     <div class="statistic">
         <p class="statistic-title"> Ваш результат: ${state.points} баллов.</p>
         <p class="statistic-title"> Ваш рекорд: ${record} баллов!</p>
         <span class="statistic-title">${description}</span>
         <span class="statistic-subtitle">${
           stage.correctChoice
         } слов изучено, ${stage.round - stage.correctChoice} не изучено.</span>
         <div class="final-slider">
         <div class="final-error">
         <span> ОШИБОК: </span>
        ${stage.round - stage.correctChoice}
        </div>
        <div class="final invalid"></div>
        <div class="final-line"></div>
        <div class="final-correct">ЗНАЮ: 
          <span> ${stage.correctChoice}</span>
        </div>
        <div class="final valid"></div>
        </div>
        <button type="button" class="btn btn-primary final-btn">Начать заново</button>
     </div>
     
    `;
    Service.spinnerOff();
    wrapper.append(statisticBlock);
  }

  static unexploredWords() {
    const learned = statisticStore.getState();

    const unexploredWords = learned.unexplored;

    unexploredWords.forEach((item) => {
      const invalidBlock = document.querySelector('.invalid');
      const itemBlock = document.createElement('div');
      itemBlock.classList.add('final-answer');
      itemBlock.innerHTML = `
      <div class='final-answer-eng'>${item.word}</div>
      <span class='final-answer-tr'>-</span>
      <div class='final-answer-ru'>${item.wordTranslate}</div>
      `;
      invalidBlock.append(itemBlock);
    });
  }

  static learnedWords() {
    const learned = statisticStore.getState();
    const learnedWords = learned.learned;

    learnedWords.forEach((item) => {
      const validBlock = document.querySelector('.valid');
      const itemBlock = document.createElement('div');
      itemBlock.classList.add('final-answer');
      itemBlock.innerHTML = `
      <div class='final-answer-eng'>${item.word}</div>
      <span class='final-answer-tr'>-</span>
      <div class='final-answer-ru'>${item.wordTranslate}</div>
      `;
      validBlock.append(itemBlock);
    });
  }

  static gradationResult() {
    const stage = store.getState();
    let description = '';
    if (stage.correctChoice / stage.round <= 0.35) {
      description = 'Попробуйте пройти обучение и повторить!';
    } else if (
      stage.correctChoice / stage.round > 0.35 &&
      stage.correctChoice / stage.round <= 0.6
    ) {
      description = 'Есть куда стремиться!';
    } else if (
      stage.correctChoice / stage.round > 0.6 &&
      stage.correctChoice / stage.round < 0.9
    ) {
      description = 'Хороший результат!';
    } else if (stage.correctChoice / stage.round >= 0.9) {
      description = 'Отличный результат!';
    }

    return description;
  }

  static getRecord() {
    const state = store.getState();
    const record = User.getCurrentUser().settings.games.sprint.maxScore;
    if (+state.points > record) {
      User.getCurrentUser().settings.games.sprint.maxScore = state.points;
      User.saveSettings();
    }
    return record;
  }

  static reboot() {
    const bntReboot = document.querySelector('.final-btn');

    bntReboot.addEventListener('click', () => {
      statisticStore.clearState();
      document.querySelector('.wrapper').innerHTML = '';
      createElement(document.querySelector('.wrapper'), 'div', ['main']);
      StartPage.render(document.querySelector('.game-container'));
    });
  }

  static sendGameStatistic() {
    const stage = store.getState();
    const date = new Date();
    const { correctChoice } = stage;
    User.saveGameStatistics(
      'sprint',
      date.getTime(),
      +correctChoice,
      stage.round
    );
  }

  static init() {
    this.render();
    this.unexploredWords();
    this.learnedWords();
    this.reboot();
    this.sendGameStatistic();
  }
}
