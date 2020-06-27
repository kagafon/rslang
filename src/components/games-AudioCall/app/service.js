import { Words } from 'services/backend';

export default class Service {
  // eslint-disable-next-line consistent-return
  static async wordsRequest(level = 0) {
    try {
      this.spinnerOn();
      const rndPage = this.randomInteger(0, 59);
      const words = await Words.getWordsForRound(+level, rndPage, 10, [
        'image',
        'audio',
      ]);

      return words;
    } catch (error) {}
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
