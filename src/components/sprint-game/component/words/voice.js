/* eslint-disable class-methods-use-this */
import Service from 'components/sprint-game/component/service';
import store from 'components/sprint-game/component/storage';

export default class Voice {
  init() {
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
    this.audioBtn()();
    return answerBlock;
  }

  async audioBtn() {
    try {
      const stage = await store.getState();
      const audio = await Service.wordsRequest(stage.groupe);

      audio.sort(() => {
        return Math.random() - 0.5;
      });

      const btnAudio = document.querySelector('.audio');

      btnAudio.addEventListener('click', () => {
        const stageRound = store.getState();
        const playAudio = document.querySelector('audio');

        if (stageRound.round <= 9) {
          playAudio.dataset.text = stageRound.word.wordTranslate;
          playAudio.src = stageRound.word.audioSrc;
          playAudio.play();
        }
      });
    } catch (error) {}
  }

  autoPlayAudio() {
    const btnAudio = document.querySelector('.audio');

    setTimeout(() => {
      const stageRound = store.getState();
      const playAudio = document.querySelector('audio');
      playAudio.src = '';
      if (stageRound.round <= 9) {
        playAudio.dataset.text = stageRound.word.wordTranslate;
        playAudio.src = stageRound.word.audioSrc;
        playAudio.play();
        btnAudio.classList.add('audio-animation');

        playAudio.onended = () => {
          btnAudio.classList.remove('audio-animation');
        };
      }
    }, 500);
  }

  static init() {
    this.render();
    this.audioBtn();
  }
}