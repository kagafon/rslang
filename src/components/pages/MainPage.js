/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';

class MainPage {
  init() {
    return createElement(
      document.body,
      'div',
      ['class1', 'class2'],
      { style: 'width:100%' },
      'Main Page'
    );
  }
}

export default MainPage;
