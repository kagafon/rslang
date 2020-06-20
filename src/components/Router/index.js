import MainPage from 'components/pages/MainPage';
import Router from 'components/Router/Router';
import StatisticPage from 'components/statisticPage/TodayStatistic';

const routes = [
  {
    name: 'main-page',
    ClassConstructor: MainPage,
  },
  {
    name: 'stasistic-page',
    ClassConstructor: StatisticPage,
  },
];

const container = document.querySelector('#main-container');

export default new Router(routes, container);
