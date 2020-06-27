import { Words } from 'services/backend';
import store from 'components/games-savannah/app/components/storage';

export default class Service {
  // eslint-disable-next-line consistent-return
  static async wordsRequest(level = 0) {
    this.spinnerOn();
    const rndPage = this.randomInteger(0, 59);
    const words = await Words.getWordsForRound(+level, 1, 20, [
      'image',
      'audio',
    ]);

    this.spinnerOff();
    return words;
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
    spiner.style.display = 'none';
  }
}
