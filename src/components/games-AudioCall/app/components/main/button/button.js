import Results from 'components/games-AudioCall/app/components/main/results/results';
import Service from 'components/games-AudioCall/app/service';

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
    const btn = document.querySelector('.btn');
    btn.addEventListener('click', () => {
      document.querySelector('.answerBlock').innerHTML = '';
      Results.init();
      document.querySelector('.hint').style.display = 'none';
      document.querySelector('.next').style.display = 'block';
      Service.localStage();
    });
  }

  static init() {
    this.render();
    this.btnClick();
  }
}
