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
        name: 'Саванна',
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
        const gameItem = createElement(
            document.querySelector('.box-games'),
            'a',
            ['game-card'],
            { style: 'cursor:pointer'},
            element.name
        );
        const imageCard = document.createElement("img");
        imageCard.src = 'assets/images/' + element.link + '.jpg';
        imageCard.alt = element.name;
        gameItem.append(imageCard);
      });
    }
    return gameBox; 
  }
}

export default GamesPage;