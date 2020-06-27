import { Words } from 'services/backend';
import Popap from 'components/games-AudioCall/app/components/main/popap-error/popap-error';

export default class Service {
  // eslint-disable-next-line consistent-return
  static async wordsRequest(level = 0) {
    this.spinnerOn();
    const rndPage = this.randomInteger(0, 59);
    const words = await Words.getWordsForRound(+level, rndPage, 10, [
      'image',
      'audio',
    ]);

    if (words.length < 10) {
      Popap.init();
      console.log('need 10 words');
    } else {
      return words;
    }
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
