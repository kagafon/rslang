/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */

import store from 'components/sprint-game/component/storage';
import 'stylesheets/sprint-game/sprint-game.scss';
import 'components/sprint-game/component/gamePage/game.scss';
import { Words } from 'services/backend';
import Service from 'components/sprint-game/component/service';
import { createElement } from 'helpers/dom';
import GameBlock from 'components/sprint-game/component/gameBlock/gameBlock';
// import gamePage from 'components/sprint-game/component/gamePage/game-page';

export default class StartPage {
  static render(container) {
    const intro = document.createElement('div');
    intro.classList.add('intro');
    intro.innerHTML = `
     <div class="title">
       <span>Sprint</span>
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
        <button data-num="-1" type="button" class="btn btn-primary start learn-words">изучаемые слова</button>
     </div>
    `;

    container.append(intro);
    document.querySelectorAll('.start').forEach((item) => {
      item.addEventListener('click', async () => {
        const words = await Service.wordsRequest(+item.dataset.num);
        store.setState({ requestWords: words });
        store.setState({ groupe: +item.dataset.num });
        store.setState({ round: 0 });
        store.setState({ correctChoice: 0 });
        store.setState({ volume: 'On' });
        intro.remove();
        GameBlock.init();
      });
    });
  }

  timer(time) {
    function startTimer(from, to) {
      let current = from;

      setTimeout(function go() {
        time.innerHTML = `0${current}`.slice(-2);
        if (current > to) {
          setTimeout(go, 1000);
        } /* else {
          gamePage.init();
        } */
        current -= 1;
      }, 1000);
    }
    startTimer(5, 0);

    return this.time;
  }

  static init(container) {
    this.render(container);
  }
}
