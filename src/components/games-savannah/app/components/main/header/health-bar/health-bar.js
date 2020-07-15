import { createElement } from 'helpers/dom';

export default class HealthBar {
  static render() {
    const header = document.querySelector('.header');
    createElement(header, 'div', ['health-bar']);

    const lifeBar = document.querySelector('.health-bar');
    lifeBar.innerHTML = `
    <span class="material-icons health">
    filter_vintage
    </span>
    <span class="material-icons health">
    filter_vintage
    </span>
    <span class="material-icons health">
    filter_vintage
    </span>
    <span class="material-icons health">
    filter_vintage
    </span>
    <span class="material-icons health">
    filter_vintage
    </span>
    `;
  }

  static init() {
    this.render();
  }
}
