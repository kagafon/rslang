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
         <div class="title">
           <span>Аудиовызов</span>
         </div>
         <div class="subTitle">
           <span>Тренировка Аудиовызов развивает словарный запас.
           Чем больше слов ты знаешь, тем больше очков опыта получишь.</span>
         </div>
         <span class="level-select">Выберете уровень</span>
         <div class="level-block">
            <button type="button" class="btn btn-primary start">1</button>
            <button type="button" class="btn btn-primary start">2</button>
            <button type="button" class="btn btn-primary start">3</button>
            <button type="button" class="btn btn-primary start">4</button>
            <button type="button" class="btn btn-primary start">5</button>
            <button type="button" class="btn btn-primary start">6</button>
            <button type="button" class="btn btn-primary start learn">изучаемые слова</button>
         </div>
        `;
        gameBox.append(intro);

    return gameBox;
  } 
}