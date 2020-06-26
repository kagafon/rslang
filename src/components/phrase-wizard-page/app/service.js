import { Words } from 'services/backend';
import GameWords from 'components/phrase-wizard-page/app/words';

export default class Service {
  static async wordsRequest(level) {
    this.spinnerOn();
    const rndPage = this.randomInteger(0, 59);
     
      const words = Object.assign(await Words.getWordsForRound((+level - 1), rndPage, 10, [
          'image',,
          'audioMeaning',
          ])
      ); 
    await Promise.all(words);
    GameWords.init(words);
    //this.spinnerOff();
  }

  static randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
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