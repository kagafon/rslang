import Statisctic from 'components/phrase-wizard-page/app/statisctic';
import Service from 'components/phrase-wizard-page/app/service';
import { createElement } from 'helpers/dom';

export default class Results {
  static init() {
    console.log(Statisctic.mistake, Statisctic.correct);
    createElement( document.querySelector('.answerBlock'), 
    'div', 
    ['result-ph-wiz'],
    {}, 
    `правильных: ${Statisctic.correct}, ошибок: ${Statisctic.mistake}`);

    Service.spinnerOff();
    /*const resultBlock = document.createElement('div');
    resultBlock.classList.add('resultBlock');
    resultBlock.innerHTML = `
     <div class='words-img'></div>
      <span class="material-icons md-48 md-light result-audio">volume_up</span>
      <audio src="#"></audio>
      <div class='translate-block'></div>
    `;
    
    answerBlock.append(resultBlock); */
  }

}