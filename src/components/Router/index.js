import MainPage from 'components/pages/MainPage';
import Router from 'components/Router/Router';
import GamesPage from 'components/mini-games-page/MiniGamesPage';

const routes = [
  {
    name: 'main-page',
    ClassConstructor: MainPage,
  },
  {
    name: 'game-page',
    ClassConstructor: GamesPage,
  },
];

const container = document.querySelector('#main-container');

export default new Router(routes, container);
