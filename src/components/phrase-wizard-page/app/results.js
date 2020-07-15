import Statisctic from 'components/phrase-wizard-page/app/statisctic';
import Service from 'components/phrase-wizard-page/app/service';
import PhraseWizard from 'components/phrase-wizard-page/PhraseWizardGame';
import { createElement } from 'helpers/dom';
import { User } from 'services/backend';
import Toaster from 'components/Toaster';

export default class Results {
  static init() {
    this.sumAnswers = Statisctic.mistake + Statisctic.correct;
    this.accuracy = Math.round(Statisctic.correct / (this.sumAnswers / 100));
    Number.isNaN(this.accuracy) ? this.accuracy = '-' : true;
    
    const resultsBlock = createElement(document.querySelector('.answerBlock'), 'div', ['result-ph-wiz'], );
    createElement(resultsBlock, 'span', ['result-ph-wiz'], {}, `правильных: ${Statisctic.correct}, `);
    createElement(resultsBlock, 'span', ['result-ph-wiz'], {}, `ошибок: ${Statisctic.mistake} `);
    createElement(resultsBlock, 'b', ['result-ph-wiz'], {}, `Точность ${this.accuracy}%`);
    const oneMore = createElement(document.querySelector('.wrapper'), 'button', ['btn', 'btn-primary', 'ph-wiz', 'result'], {}, 'Ёщё раз');
    oneMore.addEventListener('click', () => {
      oneMore.remove();
      resultsBlock.remove();
      Statisctic.init();
      createElement(document.querySelector('.box-games'), 'span', ['intro']);
      Service.wordsRequest(PhraseWizard.levelRound);
    });
    const date = new Date();
    async function writeResult() {
      try {
        await User.saveGameStatistics('phraseWizard', date.getTime(), Statisctic.correct, Results.sumAnswers);
      } catch (error) {
        Toaster.createToast(`Ошибка сохранения результата: ${error}`, 'warning');
      }
    }
    writeResult().then(Service.spinnerOff());
  }

}