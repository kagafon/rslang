import Router from 'components/Router/Router';
import MainPage from 'components/pages/MainPage';

import 'stylesheets/main.scss';

const routes = [
  {
    name: 'main-page',
    ClassConstructor: MainPage,
  },
];

const container = document.querySelector('#main-container');

window.addEventListener('load', () => {
  new Router(routes, container).draw('main-page');
});
