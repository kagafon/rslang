import router from 'components/Router/';
import menu from 'components/menu/'
import 'stylesheets/main.scss';





window.addEventListener('load', () => {
  menu.init()
  router.draw('main-page');
});
