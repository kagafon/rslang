import { createElement } from 'helpers/dom';
import GameWords from 'components/pages/phrase-wizard-page/app/words';
import Service from 'components/pages/phrase-wizard-page/app/service';
import Results from 'components/pages/phrase-wizard-page/app/results';
import Voice from 'components/pages/phrase-wizard-page/app/voice';

export default class Button {
  static render() {
    const btnBlock = document.querySelector('.top-block.ph-wiz');
    createElement(btnBlock, 'button', ['btn', 'btn-primary', 'ph-wiz'], {}, 'Дальше');
  }

  static btnClick() {
    const nextButton = document.querySelector('.btn-primary.ph-wiz');
    nextButton.addEventListener('click', () => { 
      Service.spinnerOn();
      Voice.playAudio.pause();
      ++GameWords.round;
      document.removeEventListener('keydown', GameWords.keyListener);
      document.querySelector('.top-block.ph-wiz').textContent = '';
      document.querySelector('.wordsblock').remove();
      document.querySelector('.answerBlock').textContent = '';
      document.querySelector('.ph-wiz-image').remove();
      document.querySelector('.translate').remove();
      document.querySelector('.input.ph-wiz').remove();
      if (GameWords.round < 10) {
          GameWords.init(); 
      }else if (GameWords.round === 10) {
        Results.init();
      }
    }); 
  } 

  static init() {
    this.render();
    this.btnClick();
  }
}