import MainPage from 'components/pages/MainPage';
import Router from 'components/Router/Router';
import StatisticsPage from 'components/statisticPage/StatisticsPage';

const routes = [
  {
    name: 'main-page',
    ClassConstructor: MainPage,
  },
  {
    name: 'statistics-page',
    ClassConstructor: StatisticsPage,
  },
];

const container = document.querySelector('#main-container');

export default new Router(routes, container);
