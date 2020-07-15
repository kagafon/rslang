import { User, Words } from 'services/backend';
import Toaster from 'components/Toaster';
import GameWords from 'components/pages/phrase-wizard-page/app/words';

export default class Service {
  static async wordsRequest(level) {
    try {
      Service.spinnerOn();
      const page = User.getCurrentUser().settings.games.phraseWizard.levelPages[
        (+level - 1)
      ];
      const words = await Words.getWordsForRound((+level - 1), page, 10, [
          'image',
          'audioExample',
          ])
      Service.words = Object.assign(words);
    } catch (error) {
      Toaster.createToast(
        'Нет доступа к базе слов',
        'danger'
      );
      Service.spinnerOff();
    }
    if (this.words.length == 10) {
      document.querySelector('.intro').remove();
      this.startGame();
    } else{
      this.spinnerOff()
      Toaster.createToast(
        'Недостаточно слов для игры (необходимо минимум 10 слов)',
        'danger'
      );
    } 
  }

  static startGame() {
    GameWords.round = 0;
    GameWords.init();
  }

  static spinnerOn() {
    const spiner = document.querySelector('.spinner');
    spiner.style.display = 'block';
  }

  static spinnerOff() {
    const spiner = document.querySelector('.spinner');
    const end = 'end';
    spiner.style.display = 'none';
  }
}