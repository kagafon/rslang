import { createElement } from 'helpers/dom';
import store from 'components/games-savannah/app/components/storage';

export default class VolumeBtn {
  static render() {
    const header = document.querySelector('.header');
    createElement(header, 'div', ['volume-block']);

    const volume = document.querySelector('.volume-block');

    volume.innerHTML = `
    <span class="material-icons vol volume-on">
    volume_up
    </span>
    <span class="material-icons vol volume-off">
    volume_off
    </span>
    `;
  }

  static btnClick() {
    const btn = document.querySelectorAll('.vol');
    btn.forEach((item) => {
      item.addEventListener('click', () => {
        if (item.classList.contains('volume-on')) {
          item.style.display = 'none';
          store.setState({ volume: 'off' });
          document.querySelector('.volume-off').style.display = 'block';
        } else {
          item.style.display = 'none';
          store.setState({ volume: 'on' });
          document.querySelector('.volume-on').style.display = 'block';
        }
      });
    });
  }

  static init() {
    this.render();
    this.btnClick();
  }
}
