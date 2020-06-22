import MainPage from 'components/pages/MainPage/MainPage';
import MainPageGame from 'components/pages/MainPage/MainPageGame';
import Router from 'components/Router/Router';

const routes = [
  {
    name: 'main-page',
    title: 'Учить слова',
    ClassConstructor: MainPage,
    needAuthorization: false,
    image: 'assets/images/backgrounds/main-page.jpg',
    color: 'rgba(83, 140, 173, 0.49)',
  },
  {
    name: 'main-page-game',
    title: 'Main Game',
    excludeFromMenu: true,
    ClassConstructor: MainPageGame,
    needAuthorization: false,
    image: 'assets/images/backgrounds/main-page.jpg',
    color: 'rgba(83, 140, 173, 0.49)',
  },
  {
    name: 'game-page',
    title: 'Мини-игры',
    ClassConstructor: MainPage,
    needAuthorization: false,
    image: 'assets/images/backgrounds/game-page.jpg',
    color: 'rgba(69, 28, 78, 0.66)',
  },
  {
    name: 'speakit-page',
    title: 'Speak It',
    ClassConstructor: MainPage,
    needAuthorization: false,
    excludeFromMenu: true,
    menuItem: 'game-page',
    image: 'assets/images/backgrounds/game-page.jpg',
    color: 'rgba(69, 28, 78, 0.66)',
  },
  {
    name: 'statistics-page',
    title: 'Статистика',
    ClassConstructor: MainPage,
    needAuthorization: false,
    image: 'assets/images/backgrounds/statistics-page.jpg',
    color: 'rgba(146, 85, 215, 0.57)',
  },
  {
    name: 'authorization-page',
    title: 'Вход/Регистрация',
    ClassConstructor: MainPage,
    needAuthorization: false,
    hideWhenAuthorized: true,
    image: 'assets/images/backgrounds/authorization-page.jpg',
    color: 'rgba(182, 74, 90, 0.66)',
  },
  {
    name: 'settings-page',
    title: 'Настройки',
    ClassConstructor: MainPage,
    needAuthorization: false,
    image: 'assets/images/backgrounds/settings-page.jpg',
    color: 'rgba(121, 42, 121, 0.69)',
  },
  {
    name: 'promo-page',
    title: 'Промо',
    ClassConstructor: MainPage,
    needAuthorization: false,
    image: 'assets/images/backgrounds/promo-page.jpg',
    color: 'rgba(124, 55, 73, 0.79)',
  },
  {
    name: 'team-page',
    title: 'О команде',
    ClassConstructor: MainPage,
    needAuthorization: false,
    image: 'assets/images/backgrounds/team-page.jpg',
    color: 'rgba(255, 108, 64, 0.57)',
  },

  {
    name: 'dictionary-page',
    title: 'Словарь',
    image: 'assets/images/backgrounds/dictionary-page.jpg',
    color: 'rgba(101, 99, 209, 0.78)',
    ClassConstructor: MainPage,
    needAuthorization: false,
  },
];

export default new Router(routes);
