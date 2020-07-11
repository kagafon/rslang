import { Words, User } from 'services/backend';

export default class Service {
  // eslint-disable-next-line consistent-return
  static async wordsRequest(level = 0) {
    try {
      this.spinnerOn();
      const page = User.getCurrentUser().settings.games.audioCall.levelPages[
        level
      ];

      const words = await Words.getWordsForRound(+level, page, 20, [
        'image',
        'audio',
      ]);

      return words;
    } catch (error) {
      Service.spinnerOff();
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
}
