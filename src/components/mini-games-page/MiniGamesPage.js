import { createElement } from 'helpers/dom';
import Router from 'components/Router/';

export default class GamesPage {
  init() {
    const miniGames = [
      {
        name: 'SpeakIt',
        link: 'speakit-page',
      },
      {
        name: 'English puzzle',
        link: 'engpuz-page',
      },
      {
        name: 'Саванна',
        link: 'savannah-page',
      },
      {
        name: 'Аудиовызов',
        link: 'audiocall-page',
      },
      {
        name: 'Спринт',
        link: 'sprint-page',
      },
      {
        name: 'Мастер фраз',
        link: 'phrasewizard-page',
      },
    ];

    const gameBox = createElement(
      document.getElementById('main-container'),
      'contaner',
      ['box-games']
    );

    createCards(miniGames);
    function createCards(cardsGames) {
      cardsGames.forEach((element) => {
        const gameItem = createElement(
          document.querySelector('.box-games'),
          'div',
          ['game-card'],
          { style: 'cursor:pointer' },
          element.name
        );
        const imageCard = document.createElement('img');
        imageCard.src = `assets/images/${element.link}.jpg`;
        imageCard.alt = element.name;
        gameItem.append(imageCard);
        gameItem.addEventListener('click', clickGame.bind(null, element.link));
      });
    }
    function clickGame(link) {
      Router.draw(link);
    }
    return gameBox;
  }
}
