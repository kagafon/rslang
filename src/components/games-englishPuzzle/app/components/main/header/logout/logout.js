import { authorization } from '../../../authorize/authorize.js.js';

class Logout {
  render() {
    const header = document.querySelector('.hints')
    const logout = document.createElement('div')
    logout.classList.add('logout')

    logout.innerHTML = `
      <button data-name="logout" class="btn-logout">
        <img src="./app/components/img/logout.png">
      </button>
    `
    header.append(logout)
  }

  userLogout() {
    authorization.init()
  }

  init() {
    this.render()
  }
}

export const logout = new Logout()