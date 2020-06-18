export default class Results {
  static render() {
    const answerBlock = document.querySelector('.answerBlock');
    const resultBlock = document.createElement('div');
    resultBlock.classList.add('resultBlock');
    resultBlock.innerHTML = `
     <div class='words-img'></div>
      <span class="material-icons md-48 md-light result-audio">volume_up</span>
      <audio src="#"></audio>
      <div class='translate-block'>Привет</div>
    `;
    answerBlock.append(resultBlock);
  }

  static init() {
    this.render();
  }
}
