import Header from 'components/games-savannah/app/components/main/header/header';
import RusWords from 'components/games-savannah/app/components/main/words/words';
import Service from 'components/games-savannah/app/service';

export default class StartGame {
  static init() {
    Header.init();
    RusWords.init();
  }
}
