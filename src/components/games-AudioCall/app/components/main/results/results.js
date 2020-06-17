export default class Results {
  static render() {
    const answerBlock = document.querySelector('.answerBlock');
    const resultBlock = document.createElement('div');
    resultBlock.classList.add('resultBlock');
    resultBlock.innerHTML = `
     <div class='words-img'>
     </div>
        <div class='about-word'>
          <span class="material-icons md-48 md-dark result-audio">volume_up
          </span>
          <audio src="#"></audio>
          <div class='translate-block'>
          Привет
          </div>
     </div>
    `;
    answerBlock.append(resultBlock);
  }

  static init() {
    this.render();
  }
}
