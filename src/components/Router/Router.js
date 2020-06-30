import { User } from 'services/backend';
import { createElement } from 'helpers/dom';

const DEFAULT_AUTH_ROUTE = 'authorization-page';
const preparedRoutes = {};

export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    this.createLayout();

    this.transitionEndHandler = this.transitionEndCallback.bind(this);

    Promise.allSettled(
      routes.map((x) => {
        preparedRoutes[x.name] = { ...x };
        return fetch(x.image)
          .then((resp) => resp.blob())
          .then((image) => {
            preparedRoutes[x.name].imageSrc = URL.createObjectURL(image);
          });
      })
    );
  }

  draw(routeName) {
    try {
      let route = this.routes.find((el) => el.name === routeName);
      const user = User.getCurrentUser();
      if (route.needAuthorization && !user) {
        route = this.routes.find((el) => el.name === DEFAULT_AUTH_ROUTE);
      }
      if (!this.currentRoute || this.currentRoute.name !== route.name) {
        this.menuItems.forEach((item) => {
          const linkRoute = preparedRoutes[item.dataset.link];
          if (
            (!user && linkRoute.needAuthorization) ||
            (user && linkRoute.hideWhenAuthorized)
          ) {
            item.classList.add('hidden');
          } else {
            item.classList.remove('hidden');
            if (item.dataset.link === (route.menuItem || route.name)) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          }
        });
        this.container.addEventListener(
          'transitionend',
          this.transitionEndHandler
        );
        this.container.style.opacity = '0';

        document.body.style.backgroundImage = `url(${
          preparedRoutes[routeName].imageSrc || preparedRoutes[routeName].image
        })`;
        this.navbar.style.backgroundColor = `${route.color}`;
        this.currentRoute = route;
      }
    } catch (err) {
      this.container.textContent = '';
    }
  }

  async transitionEndCallback() {
    this.container.removeEventListener(
      'transitionend',
      this.transitionEndHandler
    );
    this.container.textContent = '';
    const route = new this.currentRoute.ClassConstructor();
<<<<<<< HEAD
    this.container.appendChild(await route.init());
=======
    this.container.appendChild(route.init());
>>>>>>> develop
    if (route.postInit) route.postInit();
    this.container.style.opacity = '1';
  }

  createLayout() {
    this.navbar = createElement(
      document.body,
      'nav',
      ['navbar', 'navbar-expand-lg', 'navbar-dark', 'navbar-main'],
      { id: 'navbar' }
    );
    createElement(this.navbar, 'a', ['navbar-brand'], {}, 'RS Lang');
    const menuBtn = createElement(
      this.navbar,
      'button',
      ['navbar-toggler'],
      {
        type: 'button',
        'data-toggle': 'collapse',
        'data-target': '#navbarColor01',
        'aria-controls': 'navbarColor01',
        'aria-expanded': 'false',
        'aria-label': 'Toggle navigation',
      },
      'RS Lang'
    );
    createElement(menuBtn, 'span', ['navbar-toggler-icon']);

    const collapseArea = createElement(
      this.navbar,
      'div',
      ['collapse', 'navbar-collapse'],
      { id: 'navbarColor01' }
    );

    const menuItemsArea = createElement(
      collapseArea,
      'ul',
      ['navbar-nav', 'mr-auto'],
      { id: 'menuItems' }
    );

    const onClickHandler = (pageName, event) => {
      event.preventDefault();
      this.draw(pageName);
    };

    this.menuItems = this.routes
      .filter((x) => !x.excludeFromMenu)
      .map((x) => {
        const link = createElement(
          createElement(menuItemsArea, 'li', ['nav-item', 'mr-auto'], {
            id: 'menuItems',
          }),
          'a',
          ['nav-link'],
          { 'data-link': x.name },
          x.title
        );
        link.addEventListener('click', onClickHandler.bind(this, x.name));
        return link;
      });
    this.container = createElement(document.body, 'div', ['main-container'], {
      id: 'main-container',
    });
  }
}
