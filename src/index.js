import 'bootstrap';
import router from 'components/Router/';
import menu from 'components/menu/'
import todaystatistic from 'components/statisticPage/'
import 'stylesheets/main.scss';

window.addEventListener('load', () => {
  menu.init()
  router.draw('main-page');
  todaystatistic.init();
  menu.init();
});
