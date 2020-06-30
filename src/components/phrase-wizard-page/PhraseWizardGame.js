import { createElement } from 'helpers/dom';
import Service from 'components/phrase-wizard-page/app/service';

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

    createElement(gameBox, 'div', ['header', 'ph-wiz']);
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
    
    createElement(intro, 'div', ['level-select', 'ph-wiz'], {}, 'Выберете уровень');
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
        levelRound = '0';
      }
      Service.wordsRequest(levelRound);
      //console.log(gameWords);
      
      //console.log(await Words.getWordsForRound(0, 0, 10, ['image', 'textMeaning', 'audioMeaning', 'textExampleTranslate']));
            /*Service.wordsRequest(item.textContent);
            store.setState({ groupe: +item.textContent });
            store.setState({ round: 0 });
            store.setState({ correctChoice: 0 });
            Header.init();
            Voice.init();
            RusWords.init();
            Button.init(); */ 
    }
    gameBox.append(intro);

    return gameBox;
  } 
}
