import store from 'components/games-savannah/app/components/storage';
// eslint-disable-next-line import/no-cycle
import RusWords from 'components/games-savannah/app/components/main/words/words';
// eslint-disable-next-line import/no-cycle
import Statistic from 'components/games-savannah/app/components/main/statistic/statistic';

export default class Animate {
  static playAnimation() {
    const answer = document.querySelector('.answerBlock');
    const stage = store.getState();
    const arrWords = document.querySelectorAll('.wrapper-words');

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
      store.setState({ health: stage.health - 1 });

      const health = document.querySelector('.health');
      health.remove();
      answer.textContent = '';

      const audio = new Audio();
      audio.src =
        'https://zvukipro.com/uploads/files/2018-10/1540309251_jg-032316-sfx-feedback-incorrect-25.mp3';
      audio.play();

      // if (stage.round === 9) {
      //   Statistic.init();
      // }
      RusWords.wordGeneration();
    };

    anim.play();

    arrWords.forEach((item) => {
      item.addEventListener('click', () => {
        anim.cancel();
      });
    });
  }
}
