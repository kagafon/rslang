import Service from 'components/games-AudioCall/app/service';
import { createElement } from 'helpers/dom';
import store from 'components/games-AudioCall/app/components/storage';

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
    } не изучено<span>
     </div>
     
    `;
    Service.spinnerOff();
  }

  static gradationResult(mistake) {
    let description = '';
    if (mistake <= 4) {
      description = 'попробуйте пройти обучение и повторить!';
    } else if (mistake > 4 && mistake <= 6) {
      description = 'есть куда стремиться!';
    } else if (mistake > 6 && mistake < 9) {
      description = 'хороший результат!';
    } else if ( mistake >= 9) {
      description = 'отличный результат!';
    }

    return description;
  }

  static init() {
    this.render();
  }
}
