import { Words } from 'services/backend';

export default class Service {
  static async wordsRequest(level) {
    this.spinnerOn();
    const words = await Words.getWordsForRound(+level - 1, 1, 10, [
      'image',
      'audio',
    ]);
    this.spinnerOff();
    return words;
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
