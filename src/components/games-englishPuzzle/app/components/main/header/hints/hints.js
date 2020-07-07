// eslint-disable-next-line import/no-cycle
import Service from 'components/games-englishPuzzle/app/service';
import store from 'components/games-englishPuzzle/app/storage';

export default class Hints {
  static render() {
    const header = document.querySelector('.header');
    const hint = document.createElement('div');

    hint.classList.add('hints');
    hint.innerHTML = `
    <button data-name="auto-play" type="button" class="btn btn-primary audio">
       <span class="material-icons md-100 md-light">
          volume_up
        </span>
    </button>
    <button data-name="translate" type="button" class="btn btn-primary translate">
       <span class="material-icons">
          insert_comment
       </span>
    </button>
    <button data-name="audio" type="button" class="btn btn-primary translate-sound">
        <span class="material-icons">
          library_music
        </span>
    </button>
    <button data-name="background" type="button" class="btn btn-primary background-img hint-disabled">
        <span class="material-icons">
          insert_photo
        </span>
    </button>
    `;
    header.append(hint);
  }

  static hintsActive(hint) {
    hint.classList.toggle('hint-disabled');
  }

  static async btnAudio() {
    const stage = store.getState();
    const count = stage.wordsCount;
    const audioUrl = stage.requestWords[count].audioExample.replace(
      'files/',
      ''
    );

    const src = `https://raw.githubusercontent.com/furrrmanov/rslang-data/master/files/${audioUrl}`;

    const hintsSound = document.querySelector('.translate-sound');

    const audio = document.querySelector('audio');
    if (!hintsSound.classList.contains('hint-disabled')) {
      audio.src = src;
    } else {
      audio.src = '';
    }
  }

  static btnTranslate() {
    const stage = store.getState();
    const count = stage.wordsCount;

    const translate = stage.requestWords[count].textExampleTranslate;
    const hintsTranslate = document.querySelector('.translate');
    const translateBlock = document.querySelector('.translate-show');

    if (!hintsTranslate.classList.contains('hint-disabled')) {
      translateBlock.innerHTML = translate;
    } else {
      translateBlock.innerHTML = '';
    }
  }

  static btnBackGround() {
    const stage = store.getState();

    const background = document.querySelector('.background-img');

    if (!background.classList.contains('hint-disabled')) {
      store.setState({ background: 'yes' });

      const arrWords = document.querySelectorAll('.bg');
      arrWords.forEach((item) => {
        item.style.opacity = '50%';
      });
    } else {
      store.setState({ background: 'none' });

      const arrWords = document.querySelectorAll('.bg');
      arrWords.forEach((item) => {
        item.style.opacity = '0';
      });
    }
  }

  static init() {
    this.render();
    this.btnAudio();
  }
}
