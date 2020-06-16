export default class ProgressBar {
  static render() {
    const header = document.querySelector('.header');
    const navBarBlock = document.createElement('div');
    navBarBlock.classList.add('navBarBlock');
    navBarBlock.innerHTML = `
      <div class="navBar"></div>
      <div class="navBar"></div>
      <div class="navBar"></div>
      <div class="navBar"></div>
      <div class="navBar"></div>
      <div class="navBar"></div>
      <div class="navBar"></div>
      <div class="navBar"></div>
      <div class="navBar"></div>
      <div class="navBar"></div>
    `;
    header.append(navBarBlock);
  }

  static init() {
    this.render();
  }
}
