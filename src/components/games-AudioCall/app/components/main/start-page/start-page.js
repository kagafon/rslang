import RusWords from 'components/games-AudioCall/app/components/main/words/words';
import Button from 'components/games-AudioCall/app/components/main/button/button';
import Header from 'components/games-AudioCall/app/components/main/header/header';
import Voice from 'components/games-AudioCall/app/components/main/voiceBlock/voice';

export default class StartPage {
  static render() {
    const wrapper = document.querySelector('.wrapper');
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
     <span class="level-select">Выбирете уровень</span>
     <div class="level-block">
        <button type="button" class="btn btn-primary start">1</button>
        <button type="button" class="btn btn-primary start">2</button>
        <button type="button" class="btn btn-primary start">3</button>
        <button type="button" class="btn btn-primary start">4</button>
        <button type="button" class="btn btn-primary start">5</button>
        <button type="button" class="btn btn-primary start">6</button>
        <button type="button" class="btn btn-primary start">7</button>
     </div>
    `;
    wrapper.append(intro);

    document.querySelectorAll('.start').forEach((item) => {
      item.addEventListener('click', () => {
        localStorage.setItem('level', `${item.textContent}`);
        wrapper.innerHTML = '';
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
