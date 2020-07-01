import 'bootstrap';
import 'stylesheets/main.scss';
import router from 'components/Router/';

window.addEventListener('load', () => {
  // router.draw('main-page');
  router.draw('engpuz-page');
  document.body.classList.remove('hidden');
});
