/* eslint-disable no-restricted-imports */
import { createElement } from '../../helpers/dom';
import componentTeam from './component-team';

export default class teamPage {
  static render() {
    createElement(document.body, 'div', ['wrapper']);
  }

  static run() {
    this.render();
    componentTeam.init();
  }
}
