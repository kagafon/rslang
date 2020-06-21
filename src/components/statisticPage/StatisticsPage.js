import { createElement } from 'helpers/dom';
import MainChart from 'components/statisticPage/MainChart.js'
import GameChart from 'components/statisticPage/GameChart.js'
import { controllers } from 'chart.js';
// import { StatisticsPageEvents } from 'components/statisticPage/'

class StatisticsPage {
  create() {
    this.container = createElement(
      '',
      'div',
      [
        'content-container',
      ],
      { id: 'content-container'},
      ''
    );
  }

  todayStatisticCreate() {
    this.todayContainer = createElement(
        this.container,
        'div',
        [
          'today-statistic',
        ],
        { id: 'today-statistic'},
        ''
      );
    this.TodayStatisticTitle = createElement(
        this.todayContainer,
        'h2',
        [
          'today-statistic_title',
        ],
        {},
        'Сегодня'
    );

    this.TodayStatisticContainer = createElement(
        this.todayContainer,
        'div',
        [
          'today-statistic-container',
        ],
        {},
        ''
    );

    this.passedCards = createElement(
        this.TodayStatisticContainer,
        'div',
        [
          'today-statistic_passedCards',
        ],
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
        [
          'today-value',
        ],
        {id: 'today-passedCards'},
        'N/D'
    );
    
    this.bestSeria = createElement(
        this.TodayStatisticContainer,
        'div',
        [
          'today-statistic_bestSeria',
        ],
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
        [
          'today-value',
        ],
        {id: 'today-bestSeria'},
        'N/D'
    );
    
    this.rightAnswers = createElement(
        this.TodayStatisticContainer,
        'div',
        [
          'today-statistic_rightAnswers',
        ],
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
        [
          'today-value',
        ],
        {id: 'today-rightAnswers'},
        'N/D'
    );

    this.newWords = createElement(
        this.TodayStatisticContainer,
        'div',
        [
          'today-statistic_newWords',
        ],
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
        [
          'today-value',
        ],
        {id: 'today-newWords'},
        'N/D'
    );
  
  }

  mainStatisticCreate() {
    this.mainStatisticContainer = createElement(
        this.container,
        'div',
        [
          'main-statistic-container',
        ],
        {},
        ''
    );

    this.mainStatisticTitle = createElement(
        this.mainStatisticContainer,
        'h2',
        [
          'main-statistic_title',
        ],
        {},
        'Общая статистика'
    );

    this.mainStatisticChartContainer = createElement(
        this.mainStatisticContainer,
        'div',
        [
          'main-statistic-chart',
        ],
        {},
        ''
    );

    this.mainStatisticChart = createElement(
      this.mainStatisticChartContainer,
      'canvas',
      [
        'main-chart',
      ],
      {id: 'myChart'},
      ''
    );
    }

    gameStatisticCreate() {
      this.gameStatistic = createElement(
        this.container,
        'div',
        [
          'game-statistic',
        ],
        {},
        ''
      );

      this.gameStatisticHeader = createElement(
        this.gameStatistic,
        'div',
        [
          'game-statistic-header',
        ],
        {},
        ''
      );

      this.gameStatisticTitle = createElement(
        this.gameStatisticHeader,
        'h2',
        [
          'game-statistic-title',
        ],
        {},
        'Статистика мини-игр'
      );

      this.gameStatisticPeriodSwitcher = createElement(
        this.gameStatisticHeader,
        'ul',
        [
          'period-switcher',
        ],
        {},
        ''
      );

      this.gameStatisticPeriod1 = createElement(
        this.gameStatisticPeriodSwitcher,
        'li',
        [
          'period','active'
        ],
        {},
        '7 дней'
      );

      this.gameStatisticPeriod2 = createElement(
        this.gameStatisticPeriodSwitcher,
        'li',
        [
          'period',
        ],
        {},
        '30 дней'
      );

      this.gameStatisticPeriod2 = createElement(
        this.gameStatisticPeriodSwitcher,
        'li',
        [
          'period',
        ],
        {},
        '100 дней'
      );

      this.gameStatisticContainer = createElement(
        this.gameStatistic,
        'div',
        [
          'game-statistic-container',
        ],
        {},
        ''
      );

      this.gamesContainer = createElement(
        this.gameStatisticContainer,
        'div',
        [
          'games-container',
        ],
        {},
        ''
      );

      this.gameSpeakIt = createElement(
        this.gamesContainer,
        'div',
        [
          'game-button', 'active-game-button'
        ],
        { id: 'speakIt'},
        ''
      );

      this.gameSpeakItLogo = createElement(
        this.gameSpeakIt,
        'span',
        [
          'material-icons'
        ],
        {},
        'record_voice_over'
      );

      this.gameSpeakItTitle = createElement(
        this.gameSpeakIt,
        'h3',
        [
          'game-title'
        ],
        {},
        'SpeakIt'
      );

      this.gameEnglishPuzzle = createElement(
        this.gamesContainer,
        'div',
        [
          'game-button',
        ],
        { id: 'englishPuzzle'},
        ''
      );

      this.gameEnglishPuzzleLogo = createElement(
        this.gameEnglishPuzzle,
        'span',
        [
          'material-icons'
        ],
        {},
        'extension'
      );

      this.gameEnglishPuzzleTitle = createElement(
        this.gameEnglishPuzzle,
        'h3',
        [
          'game-title'
        ],
        {},
        'English puzzle'
      );

      this.gameSavanna = createElement(
        this.gamesContainer,
        'div',
        [
          'game-button',
        ],
        { id: 'savanna'},
        ''
      );

      this.gameSavannaLogo = createElement(
        this.gameSavanna,
        'span',
        [
          'material-icons'
        ],
        {},
        'school'
      );

      this.gameSavannaTitle = createElement(
        this.gameSavanna,
        'h3',
        [
          'game-title'
        ],
        {},
        'Саванна'
      );

      this.gameAudioCall = createElement(
        this.gamesContainer,
        'div',
        [
          'game-button',
        ],
        { id: 'audioCall'},
        ''
      );

      this.gameAudioCallLogo = createElement(
        this.gameAudioCall,
        'span',
        [
          'material-icons'
        ],
        {},
        'volume_up'
      );

      this.gameAudioCallTitle = createElement(
        this.gameAudioCall,
        'h3',
        [
          'game-title'
        ],
        {},
        'Аудиовызов'
      );

      this.gameSprint = createElement(
        this.gamesContainer,
        'div',
        [
          'game-button',
        ],
        { id: 'sprint'},
        ''
      );

      this.gameSprintLogo = createElement(
        this.gameSprint,
        'span',
        [
          'material-icons'
        ],
        {},
        'alarm'
      );

      this.gameSprintTitle = createElement(
        this.gameSprint,
        'h3',
        [
          'game-title'
        ],
        {},
        'Спринт'
      );

      this.gameOwnGame = createElement(
        this.gamesContainer,
        'div',
        [
          'game-button',
        ],
        { id: 'ownGame'},
        ''
      );

      this.gameOwnGameLogo = createElement(
        this.gameOwnGame,
        'span',
        [
          'material-icons'
        ],
        {},
        'menu_book'
      );

      this.gameOwnGameTitle = createElement(
        this.gameOwnGame,
        'h3',
        [
          'game-title'
        ],
        {},
        'Своя игра'
      );

      this.gamesChartContainer = createElement(
        this.gameStatisticContainer,
        'div',
        [
          'games-chart-container',
        ],
        {},
        ''
      );

      this.gameStatisticChart = createElement(
        this.gamesChartContainer,
        'canvas',
        [
          'game-chart-canvas',
        ],
        {id: 'gameChart'},
        ''
      );
    }

    addHandlers() {
        this.gameStatisticPeriodSwitcher.addEventListener('click', () => {
        document.querySelectorAll('.period').forEach(element => {
          element.classList.remove('active');
        });
        if (event.target.closest('li')) {
          event.target.closest('li').classList.add('active');
        }
      })

      this.gamesContainer.addEventListener('click', () => {
        document.querySelectorAll('.game-button').forEach(element => {
          element.classList.remove('active-game-button');
        });
        if (event.target.closest('div')) {
          event.target.closest('div').classList.add('active-game-button');
        }
      })
    }

  init() {
    this.create();
    this.todayStatisticCreate();
    this.mainStatisticCreate();
    this.gameStatisticCreate();
    this.addHandlers();
    MainChart.create(this.mainStatisticChart);
    GameChart.create(this.gameStatisticChart);
    return this.container;
  }
}

export default StatisticsPage;