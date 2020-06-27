import store from 'components/games-savannah/app/components/storage';
// eslint-disable-next-line import/no-cycle
import RusWords from 'components/games-savannah/app/components/main/words/words';

export default class Answer {
  static render() {
    const stage = store.getState();
    const answerBlock = document.querySelector('.answerBlock');
    answerBlock.textContent = stage.word.word;

    this.animate();
  }

  static animate() {
    const answer = document.querySelector('.answerBlock');
    const stage = store.getState();

    const keyFrames = new KeyframeEffect(
      answer,
      [{ transform: 'translateY(0px)' }, { transform: 'translateY(400px)' }],
      {
        duration: 4500,
      }
    );
    const anim = new Animation(keyFrames);
    anim.onfinish = () => {
      store.setState({ round: stage.round + 1 });
      RusWords.wordGeneration();
    };

    anim.play();
  }

  static init() {
    this.render();
  }
}
