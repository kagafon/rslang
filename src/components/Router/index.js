import MainPage from 'components/pages/MainPage/MainPage';
import MainPageGame from 'components/pages/MainPage/MainPageGame';
import Router from 'components/Router/Router';

const routes = [
  {
    name: 'main-page',
    ClassConstructor: MainPage,
  },
  {
    name: 'main-page-game',
    ClassConstructor: MainPageGame,
  },
];

const container = document.querySelector('#main-container');

export default new Router(routes, container);
