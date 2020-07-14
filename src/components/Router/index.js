/* eslint-disable import/no-cycle */
import MainPage from 'components/pages/MainPage/MainPage';
import MainPageGame from 'components/pages/MainPage/MainPageGame';
import Router from 'components/Router/Router';
import StatisticsPage from 'components/statisticPage/StatisticsPage';
import promoPage from 'components/promo-page/promo-page';
import authorizationPage from 'components/authorization-page/autorizationPage';
import teamPage from 'components/team-page/team-page';
import GamesPage from 'components/mini-games-page/MiniGamesPage';
import AppSprint from 'components/pages/mini-games/sprint/app';
import PhraseWizard from 'components/phrase-wizard-page/PhraseWizardGame';
import DictionaryPage from 'components/pages/dictionary-page';
import SettingsPage from 'components/pages/settings-page';
import App from 'components/games-AudioCall/app/app';
import AppPuzzle from 'components/games-englishPuzzle/app/app';
import AppSavannah from 'components/games-savannah/app/app';
import SpeakIt from 'components/pages/mini-games/speakit';

const routes = [
  {
    name: 'authorization-page',
    title: 'Вход/Регистрация',
    ClassConstructor: authorizationPage,
    needAuthorization: false,
    hideWhenAuthorized: true,
    image: '/assets/images/backgrounds/authorization-page.jpg',
    color: 'rgba(182, 74, 90, 0.66)',
  },
  {
    name: 'main-page',
    title: 'Учить слова',
    ClassConstructor: MainPage,
    needAuthorization: true,
    image: '/assets/images/backgrounds/main-page.jpg',
    color: 'rgba(83, 140, 173, 0.49)',
  },
  {
    name: 'main-page-game',
    title: 'Main Game',
    excludeFromMenu: true,
    ClassConstructor: MainPageGame,
    needAuthorization: false,
    image: '/assets/images/backgrounds/main-page.jpg',
    color: 'rgba(83, 140, 173, 0.49)',
  },
  {
    name: 'game-page',
    title: 'Мини-игры',
    ClassConstructor: GamesPage,
    needAuthorization: true,
    image: '/assets/images/backgrounds/game-page.jpg',
    color: 'rgba(69, 28, 78, 0.66)',
  },
  {
    name: 'speakit-page',
    title: 'Speak It',
    ClassConstructor: SpeakIt,
    needAuthorization: true,
    excludeFromMenu: true,
    menuItem: 'game-page',
    image: '/assets/images/backgrounds/speakit-page.jpg',
    color: 'rgba(69, 28, 78, 0.66)',
  },
  {
    name: 'engpuz-page',
    title: 'English puzzle',
    ClassConstructor: AppPuzzle,
    needAuthorization: true,
    excludeFromMenu: true,
    menuItem: 'game-page',
    image: '/assets/images/backgrounds/engpuz-page.jpg',
    color: 'rgba(255, 108, 64, 0.57)',
  },
  {
    name: 'savannah-page',
    title: 'Саванна',
    ClassConstructor: AppSavannah,
    needAuthorization: true,
    excludeFromMenu: true,
    menuItem: 'game-page',
    image: '/assets/images/backgrounds/savannah-page.jpg',
    color: 'rgba(69, 28, 78, 0.66)',
  },
  {
    name: 'audiocall-page',
    title: 'Аудиовызов',
    ClassConstructor: App,
    needAuthorization: true,
    excludeFromMenu: true,
    menuItem: 'game-page',
    image: '/assets/images/backgrounds/audiocall-page.jpg',
    color: 'rgba(124, 55, 73, 0.79)',
  },
  {
    name: 'sprint-page',
    title: 'Спринт',
    ClassConstructor: AppSprint,
    needAuthorization: true,
    excludeFromMenu: true,
    menuItem: 'game-page',
    image: '/assets/images/backgrounds/sprint-page.jpg',
    color: 'rgba(146, 85, 215, 0.57)',
  },
  {
    name: 'phrasewizard-page',
    title: 'Мастер фраз',
    ClassConstructor: PhraseWizard,
    needAuthorization: true,
    excludeFromMenu: true,
    menuItem: 'game-page',
    image: '/assets/images/backgrounds/phrasewizard-page.jpg',
    color: 'rgba(83, 140, 173, 0.49)',
  },
  {
    name: 'statistics-page',
    title: 'Статистика',
    ClassConstructor: StatisticsPage,
    needAuthorization: true,
    image: '/assets/images/backgrounds/statistics-page.jpg',
    color: 'rgba(146, 85, 215, 0.57)',
  },
  {
    name: 'dictionary-page',
    title: 'Словарь',
    image: '/assets/images/backgrounds/dictionary-page.jpg',
    color: 'rgba(101, 99, 209, 0.78)',
    ClassConstructor: DictionaryPage,
    needAuthorization: true,
  },
  {
    name: 'settings-page',
    title: 'Настройки',
    ClassConstructor: SettingsPage,
    needAuthorization: true,
    image: '/assets/images/backgrounds/settings-page.jpg',
    color: 'rgba(121, 42, 121, 0.69)',
  },
  {
    name: 'promo-page',
    title: 'Промо',
    ClassConstructor: promoPage,
    needAuthorization: false,
    image: '/assets/images/backgrounds/promo-page.jpg',
    color: 'rgba(124, 55, 73, 0.79)',
  },
  {
    name: 'team-page',
    title: 'О команде',
    ClassConstructor: teamPage,
    needAuthorization: false,
    image: '/assets/images/backgrounds/team-page.jpg',
    color: 'rgba(255, 108, 64, 0.57)',
  },
  {
    name: 'logout',
    title: 'Выйти',
    needAuthorization: true,
  },
];

export default new Router(routes);
