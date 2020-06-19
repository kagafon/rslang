import { createElement } from 'helpers/dom';
import Service from 'components/games-AudioCall/app/service';

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
      <audio src="#"></audio>
    `;
    answerBlock.append(audio);
    wrapper.append(answerBlock);
  }

  static async audioBtn() {
    const audio = await Service.wordsRequest();
    const btnAudio = document.querySelector('.audio');
    btnAudio.addEventListener('click', () => {
      const playAudio = document.querySelector('audio');
      playAudio.src = audio[0].audioSrc;
      playAudio.play();
    });
  }

  static init() {
    this.render();
    this.audioBtn();
  }
}
