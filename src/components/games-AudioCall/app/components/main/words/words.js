export default class Words {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const wordsBlock = document.createElement('div');
    wordsBlock.classList.add('wordsblock');

    for (let i = 1; i < 6; i += 1) {
      const wrapperWords = document.createElement('div');
      wrapperWords.classList.add('wrapper-words');
      wrapperWords.innerHTML = `
      <span class="number-words">${i}</span>
      <span class="material-icons md-correct correct">
      check_circle
      </span>
      <span class="material-icons md-cancel cancel">
      cancel
      </span>
      <button class='words'>Hello</button>
      `;
      wordsBlock.append(wrapperWords);
    }
    wrapper.append(wordsBlock);
  }

  static wordChoice() {
    const arrWords = document.querySelectorAll('.words');
    arrWords.forEach((item) => {
      item.addEventListener('click', () => {
        const progress = document.querySelector('.progress-bar');
        const width = String(progress.style.width).slice(0, -1);
        progress.style.width = `${+width + 10}%`;
      });
    });
  }

  static init() {
    this.render();
    this.wordChoice();
  }
}
