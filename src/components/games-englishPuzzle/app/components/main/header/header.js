// eslint-disable-next-line import/no-unresolved
import Hints from 'components/games-englishPuzzle/app/components/main/header/hints/hints';
import HintsBlock from 'components/games-englishPuzzle/app/components/main/hints-block/hints-block';

export default class Header {
  static init() {
    HintsBlock.init();
    Hints.init();
  }
}
