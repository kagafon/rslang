import store from 'components/games-savannah/app/components/storage';
import Animation from 'components/games-savannah/app/components/main/animate/animate';

export default class Answer {
  static render() {
    const stage = store.getState();
    const answerBlock = document.querySelector('.answerBlock');
    answerBlock.textContent = stage.word.word;

    // this.animate();
    Animation.playAnimation();
  }

  // static animate() {
  //   const answer = document.querySelector('.answerBlock');
  //   const stage = store.getState();

  //   const keyFrames = new KeyframeEffect(
  //     answer,
  //     [{ transform: 'translateY(0px)' }, { transform: 'translateY(400px)' }],
  //     {
  //       duration: 4500,
  //     }
  //   );
  //   const anim = new Animation(keyFrames);

  //   anim.onfinish = () => {
  //     store.setState({ round: stage.round + 1 });
  //     // RusWords.wordGeneration();
  //   };

  //   anim.play();
  // }

  static init() {
    this.render();
  }
}
