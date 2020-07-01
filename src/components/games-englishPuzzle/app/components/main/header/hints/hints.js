import Service from 'components/games-englishPuzzle/app/service';

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
    // const arrAudioUrl = await service.audioRequest();
    // const wordCount = localStorage.getItem('wordsCount');
    // const hintsSound = document.querySelector('.translate-sound');
    // const sourceLine = document.querySelectorAll('.source');
    // const mistake = document.querySelectorAll('.mistake');
    // // let src = `https://raw.githubusercontent.com/furrrmanov/rslang-data/master/files/${arrAudioUrl[
    // //   +wordCount
    // // ].replace('files/', '')}`;
    // const audio = document.querySelector('audio');
    // if (
    //   !hintsSound.classList.contains('hint-disabled') ||
    //   (sourceLine.length !== 0 && mistake.length === 0)
    // ) {
    //   audio.src = src;
    // } else {
    //   audio.src = src;
    // }
  }

  static async btnTranslate() {
    // const translate = await service.translateRequest();
    // const count = localStorage.getItem('wordsCount');
    // const hintsTranslate = document.querySelector('.translate');
    // const translateBlock = document.querySelector('.translate-show');
    // if (!hintsTranslate.classList.contains('hint-disabled')) {
    //   translateBlock.innerHTML = translate[+count];
    // } else {
    //   translateBlock.innerHTML = '';
    // }
  }

  static init() {
    this.render();
    this.btnAudio();
    this.btnTranslate();
  }
}

export const hints = new Hints();
