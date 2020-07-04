import Statisctic from 'components/phrase-wizard-page/app/statisctic';
import Service from 'components/phrase-wizard-page/app/service';
import { createElement } from 'helpers/dom';
import { User } from 'services/backend';

export default class Results {
  static init() {
    this.sumAnswers = Statisctic.mistake + Statisctic.correct;
    this.accuracy = Math.round(Statisctic.correct / (this.sumAnswers / 100));
    Number.isNaN(this.accuracy) ? this.accuracy = '-' : true;
    
    const resultsBlock = createElement(document.querySelector('.answerBlock'), 'div', ['result-ph-wiz'], );
    createElement(resultsBlock, 'span', ['result-ph-wiz'], {}, `правильных: ${Statisctic.correct}, `);
    createElement(resultsBlock, 'span', ['result-ph-wiz'], {}, `ошибок: ${Statisctic.mistake} `);
    createElement(resultsBlock, 'b', ['result-ph-wiz'], {}, `Точность ${this.accuracy}%`);
    Service.spinnerOff();
    const date = new Date();
    console.log(date.getTime(), Statisctic.correct, Results.sumAnswers);
    User.saveGameStatistics('phrase-wizard', date.getTime(), Statisctic.correct, Results.sumAnswers);
    
  }

}