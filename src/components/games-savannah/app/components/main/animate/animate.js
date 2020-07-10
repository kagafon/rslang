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
      try {
        health.remove();
        answer.textContent = '';
      } catch (error) {}

      if (stage.volume !== 'off') {
        const audio = new Audio();
        audio.src = './assets/audio/savannah/error.mp3';
        audio.play();
      }

      const correctWord = document.querySelectorAll('.wrapper-words');

      correctWord.forEach((item) => {
        if (item.children[0].textContent === stage.word.wordTranslate) {
          item.classList.add('correct');
        }
      });

      if (stage.round === 9 || stage.health === 1) {
        Statistic.init();
      }
      setTimeout(() => {
        RusWords.clearWords();
        RusWords.wordGeneration();
      }, 1000);
    };

    anim.play();

    arrWords.forEach((item) => {
      item.addEventListener('click', () => {
        anim.cancel();
      });
    });

    document.addEventListener('keypress', () => {
      anim.cancel();
    });
  }
}
