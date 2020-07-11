import { User } from 'services/backend';
import { createElement } from 'helpers/dom';

const DEFAULT_AUTH_ROUTE = 'authorization-page';
const preparedRoutes = {};

export default class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;

    this.transitionEndHandler = this.transitionEndCallback.bind(this);
  }

  async init() {
    await Promise.allSettled(
      this.routes.map((x) => {
        preparedRoutes[x.name] = { ...x };
        return x.image
          ? fetch(x.image)
              .then((resp) => resp.blob())
              .then((image) => {
                preparedRoutes[x.name].imageSrc = URL.createObjectURL(image);
              })
          : null;
      })
    );
    this.createLayout();
  }

  draw(routeName, useTransition = true) {
    try {
      let route = preparedRoutes[routeName];
      const user = User.getCurrentUser();
      if (route.needAuthorization && !user) {
        route = preparedRoutes[DEFAULT_AUTH_ROUTE];
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

        this.currentRoute = route;

        if (useTransition) {
          this.container.addEventListener(
            'transitionend',
            this.transitionEndHandler
          );
          if (this.pageObject && this.pageObject.beforeClose) {
            this.pageObject.beforeClose();
          }
          this.container.style.opacity = '0';
        } else {
          this.transitionEndHandler();
        }
        document.body.style.backgroundImage = `url(${
          route.imageSrc || route.image
        })`;
        this.navbar.style.backgroundColor = `${route.color}`;
        this.navbar.classList.add(`navbar-opacity_${route.name}`);
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
    this.pageObject = new this.currentRoute.ClassConstructor();
    this.container.appendChild(await this.pageObject.init());
    if (this.pageObject.postInit) this.pageObject.postInit();
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
      ''
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
      if (pageName === 'logout') {
        User.logout();
        this.draw(DEFAULT_AUTH_ROUTE);
      } else {
        this.draw(pageName);
      }
      collapseArea.classList.remove('show');
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
