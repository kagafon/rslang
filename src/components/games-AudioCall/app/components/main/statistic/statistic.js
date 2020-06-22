import Service from 'components/games-AudioCall/app/service';

export default class Statisctic {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const header = document.querySelector('.header');
    header.innerHTML = '';
    wrapper.innerHTML = '';
    Service.spinnerOff();
  }

  static init() {
    this.render();
  }
}
