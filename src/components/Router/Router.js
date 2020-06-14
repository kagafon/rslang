export default class Router {
  constructor(routes, container) {
    this.routes = routes;
    this.container = container;
  }

  draw(routeName) {
    const route = this.routes.find((el) => el.name === routeName);
    const page = new route.ClassConstructor();
    this.container.textContent = '';
    this.container.appendChild(page.init());
  }
}
