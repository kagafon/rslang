import { createElement } from 'helpers/dom';

export default class App {
  static render() {
    createElement(document.body, 'div', ['wrapper']);
  }

  static run() {
    this.render();
  }
}
