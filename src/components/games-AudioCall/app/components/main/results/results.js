import store from 'components/games-AudioCall/app/components/storage';

export default class Results {
  static render() {
    const answerBlock = document.querySelector('.answerBlock');
    const resultBlock = document.createElement('div');
    resultBlock.classList.add('resultBlock');
    resultBlock.innerHTML = `
     <div class='words-img'></div>
      <span class="material-icons md-48 md-light result-audio">volume_up</span>
      <audio src="#"></audio>
      <div class='translate-block'></div>
    `;
    answerBlock.innerHTML = '';
    answerBlock.append(resultBlock);
  }

  static showResults() {
    const stage = store.getState();
    const img = document.querySelector('.words-img');
    const audioBtn = document.querySelector('.result-audio');
    const translate = document.querySelector('.translate-block');

    img.style.backgroundImage = `url(${stage.word.imageSrc})`;
    translate.textContent = stage.word.word;

    audioBtn.addEventListener('click', () => {
      const audio = document.querySelector('audio');
      audio.src = stage.word.audioSrc;
      audio.play();
    });
  }

  static init() {
    this.render();
    this.showResults();
  }
}
