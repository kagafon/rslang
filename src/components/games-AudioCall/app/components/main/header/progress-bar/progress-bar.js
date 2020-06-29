export default class ProgressBar {
  static render() {
    const header = document.querySelector('.header');
    const navBarBlock = document.createElement('div');
    navBarBlock.classList.add('navBarBlock');

    navBarBlock.innerHTML = `
      <div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
    `;
    header.append(navBarBlock);
  }

  static init() {
    this.render();
  }
}
