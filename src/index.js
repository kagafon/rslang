import 'bootstrap';
import 'stylesheets/main.scss';
import Router from 'components/Router/';

window.addEventListener('load', async () => {
  await Router.init();
  Router.draw('main-page', false);
  document.body.classList.remove('hidden');
});
