import MainPage from 'components/pages/MainPage';
import Router from 'components/Router/Router';

const routes = [
  {
    name: 'main-page',
    ClassConstructor: MainPage,
    
  },
];

const container = document.querySelector('#main-container');

export default new Router(routes, container);
