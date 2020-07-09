// eslint-disable-next-line import/no-cycle
import RusWords from 'components/games-AudioCall/app/components/main/words/words';
// eslint-disable-next-line import/no-cycle
import Button from 'components/games-AudioCall/app/components/main/button/button';
import Header from 'components/games-AudioCall/app/components/main/header/header';
import Voice from 'components/games-AudioCall/app/components/main/voiceBlock/voice';
import Service from 'components/games-AudioCall/app/service';
import store from 'components/games-AudioCall/app/components/storage';
import Toaster from 'components/Toaster';

export default class StartPage {
  static render(container) {
    const intro = document.createElement('div');
    intro.classList.add('intro');
    intro.innerHTML = `
     <div class="title">
         <span>Аудиовызов</span>
     </div>
     <div class="subTitle">
         <span>Тренировка Аудиовызов развивает словарный запас.
         Чем больше слов ты знаешь, тем больше очков опыта получишь.</span>
     </div>
     <span class="level-select">Выберите уровень</span>
     <div class="level-block">
         <button data-num="0" type="button" class="btn btn-primary start">1</button>
         <button data-num="1" type="button" class="btn btn-primary start">2</button>
         <button data-num="2" type="button" class="btn btn-primary start">3</button>
         <button data-num="3" type="button" class="btn btn-primary start">4</button>
         <button data-num="4" type="button" class="btn btn-primary start">5</button>
         <button data-num="5" type="button" class="btn btn-primary start">6</button>
         <button data-num="-1" type="button" class="btn btn-primary start learn">Изучаемые слова</button>
     </div>
    `;
    container.append(intro);

    document.querySelectorAll('.start').forEach((item) => {
      item.addEventListener('click', async () => {
        try {
          const words = await Service.wordsRequest(+item.dataset.num);
          store.setState({ requestWords: words });

          store.setState({ groupe: item.dataset.num });
          store.setState({ round: 0 });
          store.setState({ correctChoice: 0 });

          if (words.length < 10) {
            Toaster.createToast(
              'Недостаточно слов для игры (необходимо минимум 10 слов)',
              'danger'
            );
            Service.spinnerOff();
          } else {
            intro.remove();
            Header.init();
            Voice.init();
            RusWords.init();
            Button.init();
          }
        } catch (error) {
          if (
            error.message === 'Failed to fetch' ||
            error.message === 'NetworkError when attempting to fetch resource.'
          ) {
            Toaster.createToast('отсутсвует соединение с интернетом', 'danger');
          } else {
            Toaster.createToast('необходимо авторизоваться', 'danger');
          }
        }
      });
    });
  }

  static init(container) {
    this.render(container);
  }
}
