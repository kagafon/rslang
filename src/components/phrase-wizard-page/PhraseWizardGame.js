import { createElement } from 'helpers/dom';
/*import StartGame from 'components/phrase-wizard-page/StartGamePage';
import RusWords from 'components/games-AudioCall/app/components/main/words/words';
import Button from 'components/games-AudioCall/app/components/main/button/button';
import Header from 'components/games-AudioCall/app/components/main/header/header';
import Voice from 'components/games-AudioCall/app/components/main/voiceBlock/voice';
import Service from 'components/games-AudioCall/app/service';
import store from 'components/games-AudioCall/app/components/storage';
*/
export default class PhraseWizard {
  init() {
    const gameBox = createElement(
      document.getElementById('main-container'),
      'contaner',
      ['box-games']
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

    createElement(gameBox, 'div', ['header']);
    createElement(gameBox, 'div', ['wrapper']);
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
      console.log(levelRound);
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
