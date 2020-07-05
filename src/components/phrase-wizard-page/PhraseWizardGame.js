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

    const intro = document.createElement('div');
    intro.classList.add('intro');

    const title = createElement(intro, 'div', ['title', 'ph-wiz']);
    createElement(title, 'span', [], {}, 'Мастер фраз');
    
    const subTitle = createElement(intro, 'div', ['subTitle', 'ph-wiz']);
    createElement(
      subTitle, 'span', [], {}, 
      'Прослушайте фразу и определите слова. Вводите на клавиатуре первые буквы каждого слова, пока вся фраза не будет открыта. Время не важно, важна точность!'
    );
    
    createElement(intro, 'div', ['level-select', 'ph-wiz'], {}, 'Выберите уровень');
    const LevelBlock = createElement(intro, 'div', ['level-block']);
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
    
    function clickLevel(levelRound) {
      intro.remove();
      if (levelRound === 'изучаемые слова') {
        levelRound = -1;
      }
      PhraseWizard.levelRound = levelRound;
      Service.wordsRequest(levelRound);
    }
    gameBox.append(intro);
    Statisctic.init();

    return gameBox;
  }
  
}
