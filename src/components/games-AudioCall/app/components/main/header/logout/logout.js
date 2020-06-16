export default class Logout {
  static render() {
    const header = document.querySelector('.header');
    const btnLogout = document.createElement('div');
    btnLogout.classList.add('btn-logout');
    btnLogout.innerHTML = `
      <button class="logout"></button>
    `;
    header.append(btnLogout);
  }

  static init() {
    this.render();
  }
}
