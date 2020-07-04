export default class BaseControl {
  render(container) {
    container.appendChild(this.container);
    return this.control || this.container;
  }
}
