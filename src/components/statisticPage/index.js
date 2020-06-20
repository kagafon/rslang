// import todaystatistic from 'components/statisticPage/'

// window.addEventListener('load', () => {
//   menu.init();
//   todaystatistic.init();
//   router.draw('main-page');
// });

 
import { createElement } from 'helpers/dom';
// import router from 'components/Router/';

class TodayStatistic {
  create() {
    this.container = createElement(
      '',
      'div',
      [
        'd-flex',
        'justify-content-center',
        'align-items-center',
        'flex-column',
        'mx-4',
      ],
      {},
      ''
    );
  }

  init() {
    this.create();
    return this.container;
  }

  // init() {
  //   const TodayStatisticBlock = document.createElement('div');
  //   TodayStatisticBlock.classList.add('today-statistic');
  //   TodayStatisticBlock.setAttribute('id', 'today-statistic');
  //   document.getElementById('main-container').append(TodayStatisticBlock);
  //   const TodayStatisticTitle = document.createElement('h2');
  //   TodayStatisticTitle.classList.add('today-statistic_title');
  //   TodayStatisticTitle.innerText = 'Сегодня';
  //   TodayStatisticBlock.append(TodayStatisticBlock);
  //   }
}

export default new TodayStatistic();