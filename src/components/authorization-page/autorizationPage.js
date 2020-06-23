/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
import 'stylesheets/autorization-page/style.scss';
import { User } from 'services/backend';
import Router from 'components/Router/Router';

export default class authorizationPage {
  init() {
    const parent = createElement(
      null,
      'div',
      ['form'],
      { style: 'width:100%' },
      ''
    );
    const form = createElement(
      parent,
      'form',
      ['registration'],
      { action: '' },
      ''
    );
    const title = createElement(
      form,
      'h1',
      ['title'],
      { title: 'Форма регистрации на сайте' },
      'Регистрация'
    );
    const divEmail = createElement(form, 'div', ['group'], { style: '' }, '');
    const labelEmail = createElement(
      divEmail,
      'label',
      ['label'],
      { for: 'email' },
      'Email'
    );
    const inputEmail = createElement(
      divEmail,
      'input',
      ['email'],
      {
        type: 'email',
        placeholder: 'email@gmail.com',
        autocomplete: 'off',
        required: 'true',
      },
      ''
    );
    const divUsername = createElement(
      form,
      'div',
      ['group'],
      { style: '' },
      ''
    );
    const labelUsername = createElement(
      divUsername,
      'label',
      ['label'],
      { for: 'username' },
      'Username'
    );
    const inputUsername = createElement(
      divUsername,
      'input',
      ['username'],
      {
        type: 'text',
        placeholder: 'Username',
        autocomplete: 'off',
        required: 'true',
      },
      ''
    );
    const divPassword = createElement(
      form,
      'div',
      ['group'],
      { style: '' },
      ''
    );
    const labelPassword = createElement(
      divPassword,
      'label',
      ['label'],
      { for: 'psw' },
      'Password'
    );
    const inputPassword = createElement(
      divPassword,
      'input',
      ['password'],
      {
        type: 'password',
        placeholder: '********',
        autocomplete: 'off',
        id: 'psw',
        title:
          'Must contain at least one number and one uppercase and lowercase letter, and one special character, and at least 8 or more characters',
        required: 'true',
      },
      ''
    );
    const divConfirmPassword = createElement(
      form,
      'div',
      ['group'],
      { style: '' },
      ''
    );
    const labelConfirmPassword = createElement(
      divConfirmPassword,
      'label',
      ['label'],
      { for: 'psw' },
      'Confirm Password'
    );
    const inputConfirmPassword = createElement(
      divConfirmPassword,
      'input',
      ['password'],
      {
        type: 'password',
        placeholder: '********',
        autocomplete: 'off',
        id: 'confirmPsw',
        title:
          'Must contain at least one number and one uppercase and lowercase letter, and one special character, and at least 8 or more characters',
        required: 'true',
      },
      ''
    );
    const error = createElement(
      divPassword,
      'p',
      ['error'],
      { id: 'error' },
      ''
    );
    const center = createElement(form, 'center', ['button'], { style: '' }, '');
    const button = createElement(
      center,
      'button',
      ['button'],
      { style: '' },
      'Sign Up'
    );
    const formLogin = createElement(
      parent,
      'form',
      ['login'],
      { action: '' },
      ''
    );
    const titleLogin = createElement(
      formLogin,
      'h1',
      ['title'],
      { title: 'Форма входа на сайт' },
      'Вход'
    );
    const divLoginEmail = createElement(
      formLogin,
      'div',
      ['group'],
      { style: '' },
      ''
    );
    const labelLoginEmail = createElement(
      divLoginEmail,
      'label',
      ['label'],
      { for: 'email' },
      'Email'
    );
    const inputLoginEmail = createElement(
      divLoginEmail,
      'input',
      ['email-login'],
      {
        type: 'email',
        placeholder: 'email@gmail.com',
        autocomplete: 'off',
        required: 'true',
      },
      ''
    );
    const divLoginPassword = createElement(
      formLogin,
      'div',
      ['group'],
      { style: '' },
      ''
    );
    const labelLoginPassword = createElement(
      divLoginPassword,
      'label',
      ['label'],
      { for: 'pswLogin' },
      'Password'
    );
    const inputLoginPassword = createElement(
      divLoginPassword,
      'input',
      ['password'],
      {
        type: 'password',
        placeholder: '********',
        autocomplete: 'off',
        id: 'pswLogin',
        title:
          'Must contain at least one number and one uppercase and lowercase letter, and one special character, and at least 8 or more characters',
        required: 'true',
      },
      ''
    );
    const centerLogin = createElement(
      formLogin,
      'center',
      ['button'],
      { style: '' },
      ''
    );
    const buttonLogin = createElement(
      centerLogin,
      'button',
      ['button'],
      { style: '' },
      'Log In'
    );
    const errorLogin = createElement(
      divLoginPassword,
      'p',
      ['error-login'],
      { id: 'error-login' },
      ''
    );
  }
}
