import { createElement } from 'helpers/dom';
import Service from 'components/games-AudioCall/app/service';
import store from 'components/games-AudioCall/app/components/storage';

export default class Voice {
  static render() {
    const wrapper = document.querySelector('.wrapper');

    const answerBlock = createElement(wrapper, 'div', ['answerBlock']);

    const audio = document.createElement('div');
    audio.classList.add('audio');
    audio.innerHTML = `
      <span class="material-icons md-100 md-light">
       volume_up
      </span>
      <audio data-id='' src="#"></audio>
    `;
    answerBlock.append(audio);
    wrapper.append(answerBlock);
  }

  static async audioBtn() {
    const stage = await store.getState();
    const audio = await Service.wordsRequest(stage.groupe);

    audio.sort(() => {
      return Math.random() - 0.5;
    });

    const btnAudio = document.querySelector('.audio');

    setTimeout(() => {
      const stageRound = store.getState();
      const playAudio = document.querySelector('audio');

      if (stageRound.round <= 9) {
        playAudio.dataset.text = stageRound.word.wordTranslate;
        playAudio.src = stageRound.word.audioSrc;
        playAudio.play();
      }
    }, 0);

    btnAudio.addEventListener('click', () => {
      const stageRound = store.getState();
      const playAudio = document.querySelector('audio');

      if (stageRound.round <= 9) {
        playAudio.dataset.text = stageRound.word.wordTranslate;
        playAudio.src = stageRound.word.audioSrc;
        playAudio.play();
      }
      console.log(stageRound);
    });
  }

  static init() {
    this.render();
    this.audioBtn();
  }
}
