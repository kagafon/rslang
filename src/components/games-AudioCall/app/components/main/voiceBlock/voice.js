export default class Voice {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const answerBlock = document.querySelector('.answerBlock');

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

  static audioBtn() {
    const btnAudio = document.querySelector('.audio');
    btnAudio.addEventListener('click', () => {
      console.log('play audio');
    });
  }

  static init() {
    this.render();
    this.audioBtn();
  }
}
