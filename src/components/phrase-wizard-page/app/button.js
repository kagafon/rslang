import Results from 'components/games-AudioCall/app/components/main/results/results';
import RusWords from 'components/games-AudioCall/app/components/main/words/words';
import store from 'components/games-AudioCall/app/components/storage';
import Voice from 'components/games-AudioCall/app/components/main/voiceBlock/voice';
import Statisctic from 'components/games-AudioCall/app/components/main/statistic/statistic';
import Service from 'components/games-AudioCall/app/service';
import statisticStore from 'components/games-AudioCall/app/components/statistic-storage';

export default class Button {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const btnBlock = document.createElement('div');
    btnBlock.classList.add('btnBlock');
    btnBlock.innerHTML = `
     <button class='btn btn-primary hint'>Не знаю</button>
     <button class='btn btn-primary next'>Дальше</button>
    `;
    wrapper.append(btnBlock);
  }

  static btnClick() {
    const answerBlock = document.querySelector('.answerBlock');

    const btnHint = document.querySelector('.hint');
    btnHint.addEventListener('click', () => {
      document.querySelector('.answerBlock').innerHTML = '';
      Results.init();
      document.querySelector('.hint').style.display = 'none';
      document.querySelector('.next').style.display = 'block';
      const state = store.getState();

      store.setState({ round: state.round + 1 });
      statisticStore.setUnexploredState([state.word]);

      const progress = document.querySelector('.progress-bar');
      const width = String(progress.style.width).slice(0, -1);
      progress.style.width = `${+width + 10}%`;
      RusWords.rightChoice(state.correct);

      setTimeout(() => {
        if (state.round === 9) {
          Service.spinnerOn();
          Statisctic.init();
        }
      }, 2000);
    });

    const btnNext = document.querySelector('.next');
    btnNext.addEventListener('click', () => {
      const stage = store.getState();
      if (stage.round <= 9) {
        const correctIcon = document.querySelectorAll('.icon');

        correctIcon.forEach((item) => {
          item.style.display = 'none';
        });

        const numberWords = document.querySelectorAll('.number-words');
        const arrWordsCard = document.querySelectorAll('.words');

        arrWordsCard.forEach((item) => {
          item.textContent = '';
          item.classList.remove('words-opacity');
        });

        numberWords.forEach((item) => {
          item.style.display = 'block';
          item.classList.remove('words-opacity');
        });

        answerBlock.innerHTML = '';
        RusWords.wordGeneration();
        Voice.init();

        document.querySelector('.hint').style.display = 'block';
        document.querySelector('.next').style.display = 'none';
      }
    });
  }

  static init() {
    this.render();
    this.btnClick();
  }
}