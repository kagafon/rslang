import { createElement } from 'helpers/dom';
import StartGame from 'components/phrase-wizard-page/StartGamePage';

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
        intro.innerHTML = `
         <div class="title ph-wiz">
           <span>Мастер фраз</span>
         </div>
         <div class="subTitle ph-wiz">
           <span>Прослушайте фразу и определите слова. 
           Вводите на клавиатуре первые буквы каждого слова, 
           пока вся фраза не будет открыта. Время не важно, важна точность!</span>
         </div>
         <span class="level-select ph-wiz">Выберете уровень</span>
         <div class="level-block">
            <button type="button" class="btn btn-primary start ph-wiz">1</button>
            <button type="button" class="btn btn-primary start ph-wiz">2</button>
            <button type="button" class="btn btn-primary start ph-wiz">3</button>
            <button type="button" class="btn btn-primary start ph-wiz">4</button>
            <button type="button" class="btn btn-primary start ph-wiz">5</button>
            <button type="button" class="btn btn-primary start ph-wiz">6</button>
            <button type="button" class="btn btn-primary start ph-wiz learn">изучаемые слова</button>
         </div>
        `;
        gameBox.append(intro);

    return gameBox;
  } 
}
