import Header from 'components/games-savannah/app/components/main/header/header';
// eslint-disable-next-line import/no-cycle
import RusWords from 'components/games-savannah/app/components/main/words/words';

export default class StartGame {
  static init() {
    Header.init();
    RusWords.init();
  }
}
