import GameWords from 'components/phrase-wizard-page/app/words';

export default class Voice {
  static render() {
    const answerBlock = document.querySelector('.answerBlock');

    const audio = document.createElement('div');
    audio.classList.add('audio');
    audio.innerHTML = `
      <span class="material-icons md-100 md-light">
       volume_up
      </span>
      <audio data-id='' src="#"></audio>
    `;
    answerBlock.append(audio);
  }

  static autoPlayAudio() {
    const btnAudio = document.querySelector('.audio');
    const playAudio = document.querySelector('audio');

    btnAudio.classList.add('audio-animation');
    playAudio.src = GameWords.startPrase.audioExampleSrc;
    
    playAudio.play();

    playAudio.onended = () => {
      btnAudio.classList.remove('audio-animation');
    };
  }

  static audioBtn() {
    const btnAudio = document.querySelector('.audio');

    btnAudio.addEventListener('click', () => {
      btnAudio.classList.add('audio-animation');
      const playAudio = document.querySelector('audio');
      playAudio.src = GameWords.startPrase.audioExampleSrc;
      playAudio.play();

      playAudio.onended = () => {
        btnAudio.classList.remove('audio-animation');
      };
    });
  }

  static init() {
    this.render();
    this.autoPlayAudio();
    this.audioBtn();
    
  }
}