// import { createElement } from 'helpers/dom';
import images from 'components/menu/backgroundImages';
import router from 'components/Router/';
class Menu {
  init() {
    const container = document.querySelector('#main-container');
    const links = document.querySelector('#links');
    const navbar = document.querySelector('#navbar');
    const aLinks = [...links.querySelectorAll('a')];
    links.addEventListener('click', (event) => {
      event.preventDefault();
      aLinks.forEach((a) => a.classList.remove('active'));
      document.body.style.backgroundImage = `url(${
        images[event.target.dataset.link].image
      })`;
      navbar.style.backgroundColor = `${
        images[event.target.dataset.link].color
      }`;
      this.handler = () => {
        router.draw(`${event.target.dataset.link}`);
        container.style.opacity = '1';
        container.removeEventListener('transitionend', this.handler);
      };
      container.style.opacity = '0';
      container.addEventListener('transitionend', this.handler);
      event.target.classList.add('active');
    });
  }
}

export default new Menu();
