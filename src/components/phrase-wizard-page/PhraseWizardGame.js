import { createElement } from 'helpers/dom';

class PhraseWizard {
  init() {
    return createElement(
      document.body,
      'h2',
      ['class1', 'class2'],
      { style: 'width:100%' },
      'Phrase Wizard Game'
    );
  }
}

export default PhraseWizard;
