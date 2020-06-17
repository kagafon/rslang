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
      console.log('click');
    });
  }

  static init() {
    this.render();
    this.btnClick();
  }
}
