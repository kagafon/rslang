/* eslint-disable class-methods-use-this */
import { Words } from 'services/backend';

export default class Service {
  // eslint-disable-next-line consistent-return
  async getUserWords(level, preloads) {
    try {
      const rndPage = this.randomInteger(0, 59);
      const wordsForRound = await Words.getWordsForRound(
        level,
        rndPage,
        10,
        preloads
      );
      console.log(wordsForRound);
      return wordsForRound;
    } catch (e) {
      console.error('error');
      return 'd';
    }
  }

  randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}
