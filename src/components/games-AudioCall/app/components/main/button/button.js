export default class Button {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.textContent = 'Не знаю';
    wrapper.append(button);
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
