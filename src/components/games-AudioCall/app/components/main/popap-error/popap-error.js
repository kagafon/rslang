import Service from 'components/games-AudioCall/app/service';
// eslint-disable-next-line import/no-cycle
import App from 'components/games-AudioCall/app/app';

export default class Popap {
  static render() {
    const popap = document.createElement('div');
    popap.classList.add('popap');
    popap.innerHTML = `
     <span class="popap-title">Минимальное количество изучаемых слов 10</span>
     <button data-num="4" type="button" class="btn btn-primary popap-btn">закрыть</button>
    `;
    document.body.append(popap);
    Service.spinnerOff();
  }

  static popapBtn() {
    const popapBtn = document.querySelector('.popap-btn');

    popapBtn.addEventListener('click', () => {
      document.body.innerHTML = '';
      App.run();
    });
  }

  static init() {
    this.render();
    this.popapBtn();
  }
}
