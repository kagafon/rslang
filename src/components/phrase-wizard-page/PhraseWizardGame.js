import { createElement } from 'helpers/dom';
import Service from 'components/phrase-wizard-page/app/service';
import Statisctic from 'components/phrase-wizard-page/app/statisctic';

export default class PhraseWizard {
  init() {
    const gameBox = createElement(
      document.getElementById('main-container'),
      'contaner',
      ['box-games', 'ph-wiz']
      );

    createElement(gameBox, 'div', ['spinner']);
    createElement(
      document.querySelector('.spinner'),
      'div',
      ['spinner-border', 'text-warning'],
      { role: 'status' }
    );
    createElement(
      document.querySelector('.spinner-border'),
      'span',
      ['sr-only'],
      {},
      'Loading...'
    );

    createElement(gameBox, 'div', ['top-block', 'ph-wiz']);
    createElement(gameBox, 'div', ['wrapper', 'ph-wiz']);
    createElement(document.querySelector('.wrapper'), 'div', ['answerBlock']);

    this.intro = document.createElement('div');
    this.intro.classList.add('intro');

    const title = createElement(this.intro, 'div', ['title', 'ph-wiz']);
    createElement(title, 'span', [], {}, 'Мастер фраз');
    
    const subTitle = createElement(this.intro, 'div', ['subTitle', 'ph-wiz']);
    createElement(
      subTitle, 'span', [], {}, 
      'Прослушайте фразу и определите слова. Вводите на клавиатуре первые буквы каждого слова, пока вся фраза не будет открыта. Время не важно, важна точность!'
    );
    
    createElement(this.intro, 'div', ['level-select', 'ph-wiz'], {}, 'Выберите уровень');
    const LevelBlock = createElement(this.intro, 'div', ['level-block']);
    const level = [ '1', '2', '3', '4', '5', '6', 'изучаемые слова'];

    createButton(level);
    function createButton (buttons) {
      buttons.forEach(level => {
        const buttonItem = createElement(
          LevelBlock,
          'button',
          ['btn', 'btn-primary', 'start', 'ph-wiz'],
          {},
          level
        );
        buttonItem.addEventListener('click', clickLevel.bind(null, level));
      });
    }
    gameBox.append(this.intro);
    Statisctic.init();
    
    function clickLevel(levelRound) {
      if (levelRound === 'изучаемые слова') {
        levelRound = 0;
      }
      PhraseWizard.levelRound = levelRound;
      Service.wordsRequest(levelRound);
    }

    return gameBox;
  }
  
}
