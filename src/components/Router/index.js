import MainPage from 'components/pages/MainPage';
import Router from 'components/Router/Router';
import TodayStatistic from 'components/statisticPage/TodayStatistic';

const routes = [
  {
    name: 'main-page',
    ClassConstructor: MainPage,
  },
  {
    name: 'today-statistic',
    ClassConstructor: TodayStatistic,
  },
];

const container = document.querySelector('#main-container');

export default new Router(routes, container);
