/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import store from 'components/pages/mini-games/sprint/component/storage';
import Timer from 'components/pages/mini-games/sprint/component/timer/timer';
import Service from 'components/pages/mini-games/sprint/component/service';
import Toaster from 'components/Toaster/index';

export default class StartPage {
  static render(container) {
    const intro = document.createElement('div');
    intro.classList.add('intro');
    intro.innerHTML = `
     <div class="title">
       <span>Спринт</span>
     </div>
     <div class="subTitle">
       <span>Игра Sprint развивает словарный запас и скорость принятия решений.
       Чем больше слов ты знаешь и чем быстрее принимаешь решение, тем больше очков опыта получишь.</span>
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
      <div class="level-block">
        <button data-num="-1" type="button" class="btn btn-primary start learn-words">Изучаемые слова</button>
      </div>
    `;

    container.append(intro);
    document.querySelectorAll('.start').forEach((item) => {
      item.addEventListener('click', async () => {
        try {
          Service.spinnerOn();
          const words = await Service.wordsRequest(+item.dataset.num);
          store.setState({
            requestWords: words,
            groupe: +item.dataset.num,
            round: 0,
            correctChoice: 0,
            points: 0,
          });

          if (words.length < 50) {
            Toaster.createToast(
              'Недостаточно слов для игры (необходимо минимум 50 слов)',
              'danger'
            );
            Service.spinnerOff();
          } else {
            intro.remove();
            Service.spinnerOff();
            Timer.init();
          }
        } catch (error) {
          Toaster.createToast(`Проверьте соединение с интернетом`, 'danger');
          Service.spinnerOff();
        }
      });
    });
  }

  static init(container) {
    this.render(container);
  }
}
