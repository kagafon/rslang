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
     <button type="button" class="btn btn-primary start">Начать</button>
    `;
    wrapper.append(intro);
  }

  static init() {
    this.render();
  }
}
