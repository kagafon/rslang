// eslint-disable-next-line no-restricted-imports
import Results from '../results/results';

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
      console.log('click');
    });
  }

  static init() {
    this.render();
    this.btnClick();
  }
}
