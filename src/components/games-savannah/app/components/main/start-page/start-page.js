import Timer from 'components/games-savannah/app/components/main/start-page/timer';
import Service from 'components/games-savannah/app/service';
import store from 'components/games-savannah/app/components/storage';

export default class StartPage {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const intro = document.createElement('div');
    intro.classList.add('intro');

    intro.innerHTML = `
     <div class="title">
       <span>Саванна</span>
     </div>
     <div class="subTitle">
       <span>Тренировка Саванна развивает словарный запас.
       Чем больше слов ты знаешь, тем больше очков опыта получишь.</span>
     </div>
     <span class="level-select">Выберете уровень</span>
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
    wrapper.append(intro);

    document.querySelectorAll('.start').forEach((item) => {
      item.addEventListener('click', () => {
        store.setState({ groupe: +item.textContent });
        store.setState({ round: 0 });
        store.setState({ correctChoice: 0 });
        intro.remove();
        Timer.init();
      });
    });
  }

  static init() {
    this.render();
  }
}
