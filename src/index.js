import 'bootstrap';
import 'stylesheets/main.scss';
import Router from 'components/Router/';

window.addEventListener('load', () => {
  Router.draw('main-page');
  document.body.classList.remove('hidden');
});
