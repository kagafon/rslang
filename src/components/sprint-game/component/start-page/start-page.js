/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */

import store from 'components/sprint-game/component/storage';
import 'stylesheets/sprint-game/sprint-game.scss';

export default class StartPage {
  init() {
    const intro = document.createElement('div');
    intro.classList.add('intro');
    intro.innerHTML = `
     <div class="title">
       <span>Sprint</span>
     </div>
     <div class="subTitle">
       <span>Игра Sprint развивает словарный запас и скорость принятия решений.
       Чем больше слов ты знаешьи чем быстрее принимаешь решение, тем больше очков опыта получишь.</span>
     </div>
     <span class="level-select">Выберите уровень</span>
     <div class="level-block">
        <button type="button" class="btn btn-primary start">1</button>
        <button type="button" class="btn btn-primary start">2</button>
        <button type="button" class="btn btn-primary start">3</button>
        <button type="button" class="btn btn-primary start">4</button>
        <button type="button" class="btn btn-primary start">5</button>
        <button type="button" class="btn btn-primary start">6</button>
        <button type="button" class="btn btn-primary start learn">изучаемые слова</button>
     </div>
    `;
    document.body.append(intro);

    document.querySelectorAll('.start').forEach((item) => {
      console.log(document.querySelectorAll('.start'));
      item.addEventListener('click', () => {
        intro.remove();
        // Service.wordsRequest(item.textContent);
        store.setState({ groupe: +item.textContent });
        store.setState({ round: 0 });
        store.setState({ correctChoice: 0 });
        // Voice.init();
        // RusWords.init();
        // Button.init();
      });
    });
    return intro;
  }
}
