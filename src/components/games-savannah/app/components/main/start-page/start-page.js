// eslint-disable-next-line import/no-cycle
import Timer from 'components/games-savannah/app/components/main/start-page/timer';
import store from 'components/games-savannah/app/components/storage';
import Service from 'components/games-savannah/app/service';
import Toaster from 'components/Toaster';

export default class StartPage {
  static render(container) {
    const intro = document.createElement('div');
    intro.classList.add('intro');

    intro.innerHTML = `
    <div class="intro-placeholder">
     <div class="title">
       <span>Саванна</span>
     </div>
     <div class="subTitle">
       <span>Тренировка Саванна развивает словарный запас.
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
     </div>
     <button data-num="-1" type="button" class="btn btn-primary start learn-words">Изучаемые слова</button>
     </div>
    `;
    container.append(intro);

    document.querySelectorAll('.start').forEach((item) => {
      item.addEventListener('click', async () => {
        try {
          const words = await Service.wordsRequest(+item.dataset.num);

          store.setState({ requestWords: words });
          store.setState({ groupe: +item.dataset.num });
          store.setState({ level: +item.dataset.num });
          store.setState({ round: 0 });
          store.setState({ correctChoice: 0 });
          store.setState({ health: 5 });
          store.setState({ volume: 'on' });

          if (words.length < 10) {
            Toaster.createToast(
              'Недостаточно слов для игры (необходимо минимум 10 слов)',
              'danger'
            );
            Service.spinnerOff();
          } else {
            intro.remove();
            Timer.init();
          }
        } catch (error) {
          if (error.message.search('fetch') > -1) {
            Toaster.createToast('отсутсвует соединение с интернетом', 'danger');
          } else {
            Toaster.createToast('необходимо авторизоваться', 'danger');
          }

          Service.spinnerOff();
        }
      });
    });
  }

  static init(container) {
    this.render(container);
  }
}
