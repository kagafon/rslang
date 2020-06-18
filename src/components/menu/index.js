// import { createElement } from 'helpers/dom';
import images from 'components/menu/backgroundImages';

class Menu {
  init() {
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
      event.target.classList.add('active');
    });
  }
}

export default new Menu();
