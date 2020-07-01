import store from 'components/sprint-game/component/storage';
// eslint-disable-next-line import/no-cycle
// import Animation from 'components/games-savannah/app/components/main/animate/animate';

export default class Answer {
  static render() {
    const stage = store.getState();
    const answerBlock = document.querySelector('.answerBlock');
    answerBlock.textContent = stage.word.word;
    Animation.playAnimation();
  }

  static init() {
    this.render();
  }
}
