import { createElement } from 'helpers/dom';
import GameStatisticsCreation from 'components/pages/statisticPage/GameStatisticsCreation';
import MainStatisticsCreation from 'components/pages/statisticPage/MainStatisticsCreation';

class StatisticsPage {
  create() {
    this.container = createElement(
      '',
      'div',
      ['statistic-page', 'content-container'],
      { id: 'content-container' },
      ''
    );
  }

  todayStatisticCreate() {
    this.todayContainer = createElement(
      this.container,
      'div',
      ['statistic-page', 'today-statistic'],
      { id: 'today-statistic' },
      ''
    );
    this.TodayStatisticTitle = createElement(
      this.todayContainer,
      'h2',
      ['statistic-page', 'today-statistic_title'],
      {},
      'Сегодня'
    );

    this.TodayStatisticContainer = createElement(
      this.todayContainer,
      'div',
      ['statistic-page', 'today-statistic-container'],
      {},
      ''
    );

    this.passedCards = createElement(
      this.TodayStatisticContainer,
      'div',
      ['statistic-page', 'today-statistic_passedCards'],
      {},
      ''
    );

    this.passedCardsTitle = createElement(
      this.passedCards,
      'h3',
      [],
      {},
      'Пройдено карточек'
    );

    this.passedCardsValue = createElement(
      this.passedCards,
      'h3',
      ['statistic-page', 'today-value'],
      { id: 'today-passedCards' },
      '0'
    );

    this.bestSeria = createElement(
      this.TodayStatisticContainer,
      'div',
      ['statistic-page', 'today-statistic_bestSeria'],
      {},
      ''
    );

    this.bestSeriaTitle = createElement(
      this.bestSeria,
      'h3',
      [],
      {},
      'Лучшая серия'
    );

    this.bestSeriaValue = createElement(
      this.bestSeria,
      'h3',
      ['statistic-page', 'today-value'],
      { id: 'today-bestSeria' },
      '0'
    );

    this.rightAnswers = createElement(
      this.TodayStatisticContainer,
      'div',
      ['statistic-page', 'today-statistic_rightAnswers'],
      {},
      ''
    );

    this.rightAnswersTitle = createElement(
      this.rightAnswers,
      'h3',
      [],
      {},
      'Правильные ответы'
    );

    this.rightAnswersValue = createElement(
      this.rightAnswers,
      'h3',
      ['statistic-page', 'today-value'],
      { id: 'today-rightAnswers' },
      '0'
    );

    this.newWords = createElement(
      this.TodayStatisticContainer,
      'div',
      ['statistic-page', 'today-statistic_newWords'],
      {},
      ''
    );

    this.newWordsTitle = createElement(
      this.newWords,
      'h3',
      [],
      {},
      'Изучено новых слов'
    );

    this.newWordsValue = createElement(
      this.newWords,
      'h3',
      ['statistic-page', 'today-value'],
      { id: 'today-newWords' },
      '0'
    );
  }

  mainStatisticCreate() {
    this.mainStatisticContainer = createElement(
      this.container,
      'div',
      ['statistic-page', 'main-statistic-container'],
      {},
      ''
    );

    this.mainStatisticTitle = createElement(
      this.mainStatisticContainer,
      'h2',
      ['statistic-page', 'main-statistic-title'],
      {},
      'Общая статистика'
    );

    this.mainStatisticChartContainer = createElement(
      this.mainStatisticContainer,
      'div',
      ['statistic-page', 'main-statistic-chart'],
      {},
      ''
    );

    this.mainStatisticChart = createElement(
      this.mainStatisticChartContainer,
      'canvas',
      ['statistic-page', 'main-chart'],
      { id: 'myChart' },
      ''
    );
  }

  gameStatisticCreate() {
    this.gameStatistic = createElement(
      this.container,
      'div',
      ['statistic-page', 'game-statistic'],
      {},
      ''
    );

    this.gameStatisticHeader = createElement(
      this.gameStatistic,
      'div',
      ['statistic-page', 'game-statistic-header'],
      {},
      ''
    );

    this.gameStatisticTitle = createElement(
      this.gameStatisticHeader,
      'h2',
      ['statistic-page', 'game-statistic-title'],
      {},
      'Статистика мини-игр'
    );

    this.gameStatisticPeriodSwitcher = createElement(
      this.gameStatisticHeader,
      'ul',
      ['statistic-page', 'period-switcher'],
      {},
      ''
    );

    this.gameStatisticPeriod1 = createElement(
      this.gameStatisticPeriodSwitcher,
      'li',
      ['statistic-page', 'period', 'active'],
      { id: 'seven-days', 'data-period': 7 },
      '7 дней'
    );

    this.gameStatisticPeriod2 = createElement(
      this.gameStatisticPeriodSwitcher,
      'li',
      ['statistic-page', 'period'],
      { id: 'thirty-days', 'data-period': 14 },
      '14 дней'
    );

    this.gameStatisticPeriod2 = createElement(
      this.gameStatisticPeriodSwitcher,
      'li',
      ['statistic-page', 'period'],
      { id: 'hundred-days', 'data-period': 30 },
      '30 дней'
    );

    this.gameStatisticContainer = createElement(
      this.gameStatistic,
      'div',
      ['statistic-page', 'game-statistic-container'],
      {},
      ''
    );

    this.gamesContainer = createElement(
      this.gameStatisticContainer,
      'div',
      ['statistic-page', 'games-container'],
      {},
      ''
    );

    this.gameSpeakIt = createElement(
      this.gamesContainer,
      'div',
      ['statistic-page', 'game-button', 'active-game-button'],
      { id: 'speakIt', 'data-game-name': 'speakit' },
      ''
    );

    this.gameSpeakItLogo = createElement(
      this.gameSpeakIt,
      'span',
      ['statistic-page', 'material-icons'],
      {},
      'record_voice_over'
    );

    this.gameSpeakItTitle = createElement(
      this.gameSpeakIt,
      'h3',
      ['statistic-page', 'game-title'],
      {},
      'SpeakIt'
    );

    this.gameEnglishPuzzle = createElement(
      this.gamesContainer,
      'div',
      ['statistic-page', 'game-button'],
      { id: 'englishPuzzle', 'data-game-name': 'engpuz' },
      ''
    );

    this.gameEnglishPuzzleLogo = createElement(
      this.gameEnglishPuzzle,
      'span',
      ['statistic-page', 'material-icons'],
      {},
      'extension'
    );

    this.gameEnglishPuzzleTitle = createElement(
      this.gameEnglishPuzzle,
      'h3',
      ['statistic-page', 'game-title'],
      {},
      'English puzzle'
    );

    this.gameSavanna = createElement(
      this.gamesContainer,
      'div',
      ['statistic-page', 'game-button'],
      { id: 'savanna', 'data-game-name': 'savannah' },
      ''
    );

    this.gameSavannaLogo = createElement(
      this.gameSavanna,
      'span',
      ['statistic-page', 'material-icons'],
      {},
      'school'
    );

    this.gameSavannaTitle = createElement(
      this.gameSavanna,
      'h3',
      ['statistic-page', 'game-title'],
      {},
      'Саванна'
    );

    this.gameAudioCall = createElement(
      this.gamesContainer,
      'div',
      ['statistic-page', 'game-button'],
      { id: 'audioCall', 'data-game-name': 'audiocall' },
      ''
    );

    this.gameAudioCallLogo = createElement(
      this.gameAudioCall,
      'span',
      ['statistic-page', 'material-icons'],
      {},
      'volume_up'
    );

    this.gameAudioCallTitle = createElement(
      this.gameAudioCall,
      'h3',
      ['statistic-page', 'game-title'],
      {},
      'Аудиовызов'
    );

    this.gameSprint = createElement(
      this.gamesContainer,
      'div',
      ['statistic-page', 'game-button'],
      { id: 'sprint', 'data-game-name': 'sprint' },
      ''
    );

    this.gameSprintLogo = createElement(
      this.gameSprint,
      'span',
      ['statistic-page', 'material-icons'],
      {},
      'alarm'
    );

    this.gameSprintTitle = createElement(
      this.gameSprint,
      'h3',
      ['statistic-page', 'game-title'],
      {},
      'Спринт'
    );

    this.gamephraseWizard = createElement(
      this.gamesContainer,
      'div',
      ['statistic-page', 'game-button'],
      { id: 'phraseWizard', 'data-game-name': 'phraseWizard' },
      ''
    );

    this.gamephraseWizardLogo = createElement(
      this.gamephraseWizard,
      'span',
      ['statistic-page', 'material-icons'],
      {},
      'menu_book'
    );

    this.gamephraseWizardTitle = createElement(
      this.gamephraseWizard,
      'h3',
      ['statistic-page', 'game-title'],
      {},
      'Мастер фраз'
    );

    this.gamesChartContainer = createElement(
      this.gameStatisticContainer,
      'div',
      ['statistic-page', 'games-chart-container'],
      { id: 'gameChart-container' },
      ''
    );

    this.gameStatisticChart = createElement(
      this.gamesChartContainer,
      'canvas',
      ['statistic-page', 'game-chart-canvas'],
      { id: 'gameChart' },
      ''
    );
  }

  addHandlers() {
    this.gameStatisticPeriodSwitcher.addEventListener('click', () => {
      document.querySelectorAll('.period').forEach((element) => {
        element.classList.remove('active');
      });
      if (event.target.closest('li')) {
        const game = document.querySelector('div.active-game-button').dataset
          .gameName;
        event.target.closest('li').classList.add('active');
        this.gameStatisticChart.remove();
        this.gameStatisticChart = createElement(
          this.gamesChartContainer,
          'canvas',
          ['statistic-page', 'game-chart-canvas'],
          { id: 'gameChart' },
          ''
        );
        GameStatisticsCreation.create(
          this.gameStatisticChart,
          event.target.closest('li').dataset.period,
          game
        );
      }
    });

    this.gamesContainer.addEventListener('click', () => {
      document.querySelectorAll('.game-button').forEach((element) => {
        element.classList.remove('active-game-button');
      });
      if (event.target.closest('div')) {
        const { period } = document.querySelector('li.active').dataset;
        event.target.closest('div').classList.add('active-game-button');
        this.gameStatisticChart.remove();
        this.gameStatisticChart = createElement(
          this.gamesChartContainer,
          'canvas',
          ['statistic-page', 'game-chart-canvas'],
          { id: 'gameChart' },
          ''
        );

        GameStatisticsCreation.create(
          this.gameStatisticChart,
          period,
          event.target.closest('div').dataset.gameName
        );
      }
    });
  }

  init() {
    this.create();
    this.todayStatisticCreate();
    this.mainStatisticCreate();
    this.gameStatisticCreate();
    this.addHandlers();
    GameStatisticsCreation.create(this.gameStatisticChart, 7, 'speakit');
    MainStatisticsCreation.create(this.mainStatisticChart);
    return this.container;
  }
}

export default StatisticsPage;
