import { createElement } from 'helpers/dom';

class MainPage {
  init() {
    return createElement(
      document.body,
      'h3',
      ['class1', 'class2'],
      { style: 'width:100%' },
      'Main Page'
    );
  }
}

export default MainPage;
