import store from 'components/sprint-game/component/storage';

export default class Results {
  static render() {
    const main = document.querySelector('.wrapper');
    const resultBlock = document.createElement('div');
    resultBlock.classList.add('resultBlock');
    resultBlock.innerHTML = `
     <div class='words-img'></div>
      <span class="material-icons md-48 md-light result-audio">volume_up</span>
      <div class='translate-block'></div>
    `;
    main.innerHTML = '';
    main.append(resultBlock);
    console.log(main);
  }

  static showResults() {
    const stage = store.getState();
    // const img = document.querySelector('.words-img');
    // const audioBtn = document.querySelector('.result-audio');
    const translate = document.querySelector('.translate-block');

    translate.textContent = stage.word.word;

    // audioBtn.addEventListener('click', () => {
    //   const audio = document.querySelector('audio');
    //   audio.play();
    // });
  }

  static init() {
    this.render();
    this.showResults();
  }
}
