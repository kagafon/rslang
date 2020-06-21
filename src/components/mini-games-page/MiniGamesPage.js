import { createElement } from 'helpers/dom';

class GamesPage {

  init() {
    const miniGames = [
      {
        name: 'SpeakIt',
        link: 'speakIt-page'
      },
      {
        name: 'English puzzle',
        link: 'engPuz-page'
      },
      {
        name: 'Савана',
        link: 'savannah-page'
      },
      {
        name: 'Аудиовызов',
        link: 'audioCall-page'
      },
      {
        name: 'Спринт',
        link: 'sprint-page'
      },
      {
        name: 'Мастер фраз',
        link: 'phraseWizard-page'
      }
    ]
    
    const gameBox = createElement(
      document.getElementById('main-container'),
      'contaner',
      ['box-games']
      );
     
    createCards(miniGames);
    function createCards (cardsGames) {
      cardsGames.forEach(element => {
        createElement(
          document.querySelector('.box-games'),
          'a',
          ['game-card'],
          { style: 'cursor:pointer'},
          element.name
        );
      });
    }
    return gameBox; 
  }
}

export default GamesPage;