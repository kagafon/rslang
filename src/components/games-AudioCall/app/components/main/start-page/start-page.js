import RusWords from 'components/games-AudioCall/app/components/main/words/words';
import Button from 'components/games-AudioCall/app/components/main/button/button';
import Header from 'components/games-AudioCall/app/components/main/header/header';
import Voice from 'components/games-AudioCall/app/components/main/voiceBlock/voice';
import Service from 'components/games-AudioCall/app/service';
import store from 'components/games-AudioCall/app/components/storage';

export default class StartPage {
  static render() {
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
    document.body.append(intro);

    document.querySelectorAll('.start').forEach((item) => {
      item.addEventListener('click', () => {
        intro.remove();
        Service.wordsRequest(item.textContent);
        store.setState({ groupe: +item.textContent });
        store.setState({ round: 0 });
        store.setState({ correctChoice: 0 });
        Header.init();
        Voice.init();
        RusWords.init();
        Button.init();
      });
    });
  }

  static init() {
    this.render();
  }
}
