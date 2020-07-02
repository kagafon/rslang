/* eslint-disable consistent-return */
import { Words } from 'services/backend';

export default class Service {
  static async wordsRequest(level = 0) {
    try {
      const rndPage = this.randomInteger(0, 5);
      const words = await Words.getWordsForRound(+level, rndPage, 100, []);
      return words;
    } catch (error) {
      console.error();
    }
  }

  static spinnerOn() {
    const spiner = document.querySelector('.spinner');
    spiner.style.display = 'block';
  }

  static spinnerOff() {
    const spiner = document.querySelector('.spinner');
    spiner.style.display = 'none';
  }

  static randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}
