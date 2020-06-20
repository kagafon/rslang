import { createElement } from 'helpers/dom';
// import router from 'components/Router/';


class TodayStatistic {
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

    this.mainStatisticCart = createElement(
        this.mainStatisticContainer,
        'div',
        [
          'main-statistic-chart',
        ],
        {},
        ''
    );
  }

  init() {
    this.create();
    this.todayStatisticCreate();
    this.mainStatisticCreate()
    return this.container;
  }
}
export default TodayStatistic;

/* <div id="today-statistic" class="today-statistic">
    <h2 class="today-statistic_title">Сегодня</h2>
    <div class="today-statistic-container">
        <div class="today-statistic_passedCards">
            <h3>Пройдено карточек</h3>
            <h3 id="today-passedCards" class="today-value">33</h3>
        </div>
        <div class="today-statistic_bestSeria">
        <   h3>Лучшая серия</h3>
            <h3 id="today-bestSeria" class="today-value">15</h3>
        </div>
        <div class="today-statistic_rightAnswers">
            <h3>Правильные ответы</h3>
            <h3 id="today-rightAnswers" class="today-value">100%</h3>
        </div>
        <div class="today-statistic_rightAnswers">
            <h3>Изучено новых слов</h3>
            <h3 id="today-rightAnswers" class="today-value">25</h3>
        </div>
    </div>
</div> */