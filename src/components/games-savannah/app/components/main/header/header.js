import { createElement } from 'helpers/dom';

export default class Header {
  static render() {
    const header = document.querySelector('.header');
    createElement(header, 'div', ['health-bar']);
    const lifeBar = document.querySelector('.health-bar');
    lifeBar.innerHTML = `
    <span class='health'>1<span>
    <span class='health'>2<span>
    <span class='health'>3<span>
    <span class='health'>4<span>
    <span class='health'>5<span>
    `;
  }

  static init() {
    this.render();
  }
}
