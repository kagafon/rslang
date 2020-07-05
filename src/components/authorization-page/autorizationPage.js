/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
import { User } from 'services/backend';
import Router from 'components/Router';

export default class authorizationPage {
  init() {
    const parent = createElement(
      null,
      'div',
      ['form', 'authorization-page'],
      { style: 'width:100%' },
      ''
    );

    const formContainer = createElement(
      parent,
      'div',
      ['form-container'],
      {},
      ''
    );

    const formContainerHeader = createElement(
      formContainer,
      'div',
      ['form-container-header'],
      {},
      ''
    );

    const LoginBookmark = createElement(
      formContainerHeader,
      'div',
      ['login-bookmark', 'active'],
      {},
      ''
    );
    createElement(LoginBookmark, 'h3', ['login-bookmark-title'], {}, 'Вход');

    const SigninBookmark = createElement(
      formContainerHeader,
      'div',
      ['signin-bookmark'],
      {},
      ''
    );
    createElement(SigninBookmark, 'h3', ['signin-bookmark-title'], {}, 'Регистрация')

    const form = createElement(
      formContainer,
      'form',
      ['registration'],
      {},
      ''
    );
    const divEmail = createElement(form, 'div', ['group'], { style: '' }, '');
    const labelEmail = createElement(
      divEmail,
      'label',
      ['label'],
      { for: 'email' },
      'Адрес эл. почты'
    );
    const inputEmail = createElement(
      divEmail,
      'input',
      ['email'],
      {
        type: 'email',
        placeholder: 'email@gmail.com',
        autocomplete: 'off',
        autofocus: 'false',
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
      'Имя пользователя'
    );
    const inputUsername = createElement(
      divUsername,
      'input',
      ['username'],
      {
        type: 'text',
        placeholder: 'Имя Фамилия',
        autocomplete: 'off',
        autofocus: 'false',
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
      'Пароль'
    );
    const inputPassword = createElement(
      divPassword,
      'input',
      ['password'],
      {
        type: 'password',
        placeholder: '********',
        autocomplete: 'off',
        autofocus: 'false',
        id: 'psw',
        title:
          'Пароль должен содержать не менее одной цифры и одной заглавной и прописной буквы, а также спец. символ. Пароль должен быть не короче восьми символов.',
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
      'Повторите пароль'
    );
    const inputConfirmPassword = createElement(
      divConfirmPassword,
      'input',
      ['password'],
      {
        type: 'password',
        placeholder: '********',
        autocomplete: 'off',
        autofocus: 'false',
        id: 'confirmPsw',
        title:
          'Пароль должен содержать не менее одной цифры и одной заглавной и прописной буквы, а также спец. символ. Пароль должен быть не короче восьми символов.',
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
      ['button', 'btn-reg'],
      { style: '' },
      'Зарегистрироваться'
    );
    const formLogin = createElement(
      formContainer,
      'form',
      ['login', 'active'],
      { action: '' },
      ''
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
      'Адрес эл. почты'
    );
    const inputLoginEmail = createElement(
      divLoginEmail,
      'input',
      ['email-login'],
      {
        type: 'email',
        placeholder: 'email@gmail.com',
        autocomplete: 'off',
        autofocus: 'false',
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
      'Пароль'
    );
    const inputLoginPassword = createElement(
      divLoginPassword,
      'input',
      ['password'],
      {
        type: 'password',
        placeholder: '********',
        autocomplete: 'off',
        autofocus: 'false',
        id: 'pswLogin',
        title:
          'Пароль должен содержать не менее одной цифры и одной заглавной и прописной буквы, а также спец. символ. Пароль должен быть не короче восьми символов.',
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
      ['button', 'btn-log'],
      { style: '' },
      'Войти'
    );
    const errorLogin = createElement(
      divLoginPassword,
      'p',
      ['error-login'],
      { id: 'error-login' },
      ''
    );
    const divSpinner = createElement(
      center,
      'div',
      ['spinner-border', 'spin-reg'],
      { role: 'status' },
      ''
    );
    const spanSpinner = createElement(
      divSpinner,
      'span',
      ['sr-only'],
      { id: 'spinner' },
      'Loading...'
    );
    const divLoginSpinner = createElement(
      centerLogin,
      'div',
      ['spinner-border', 'spin-log'],
      { role: 'status' },
      ''
    );
    const spanLoginSpinner = createElement(
      divLoginSpinner,
      'span',
      ['sr-only'],
      { id: 'spinner' },
      'Loading...'
    );
    const divToast = createElement(
      form,
      'div',
      ['alert', 'alert-warning', 'alert-dismissible', 'fade', 'show'],
      { role: 'alert' },
      ''
    );
    const divLoginToast = createElement(
      formLogin,
      'div',
      ['alert', 'alert-warning', 'alert-dismissible', 'fade', 'show'],
      { role: 'alert' },
      ''
    );

    const buttonToast = createElement(
      divToast,
      'button',
      ['close'],
      {
        type: 'button',
        'data-dismiss': 'alert',
        'aria-label': 'Close',
      },
      ''
    );
    const spanToast = createElement(
      buttonToast,
      'span',
      ['span-close'],
      { 'aria-hidden': 'true' },
      '&times;'
    );
    this.hideToast(spanToast, divToast);
    this.hideToast(spanToast, divLoginToast);
    this.checkPassword(inputPassword, inputConfirmPassword, button, divToast);
    this.toLogin(
      inputLoginEmail,
      inputLoginPassword,
      buttonLogin,
      errorLogin,
      divLoginSpinner,
      divLoginToast
    );
    this.toRegistrate(
      inputEmail,
      inputPassword,
      inputUsername,
      button,
      error,
      divSpinner,
      divToast
    );
    this.callAutoLogin(errorLogin, divToast);
    this.addHandlers(formContainerHeader);
    return parent;
  }

  checkPassword(password, confirmPassword, button, toast) {
    button.addEventListener('click', () => {
      const regex = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
      if (password.value !== confirmPassword.value) {
        toast.innerHTML = `<p>Пароли не совпадают. Введите идентичные пароли!</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" class="span-close">&times;</span></button>`;
      } else if (!regex.test(password.value)) {
        toast.innerHTML = `<p>Пароль не соответствует требованию. Введите новый пароль</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" class="span-close">&times;</span></button>`;
      }
    });
  }

  async callAutoLogin(err, toast) {
    try {
      const login = await User.autoLogin();
      Router.draw('main-page');
    } catch (error) {
      console.log(error);
    }
  }

  addHandlers(e) {
    e.addEventListener('click', () => {
      const targetBookmark = event.target.closest('div');
      if(!targetBookmark.classList.contains('active')) {
        if(targetBookmark.classList.contains('signin-bookmark')) {
          document.querySelector("#main-container > div > div > form.login").classList.remove('active');
          document.querySelector("#main-container > div > div > form.registration").classList.add('active');
        } else {
          document.querySelector("#main-container > div > div > form.registration").classList.remove('active');
          document.querySelector("#main-container > div > div > form.login").classList.add('active');
        }
      }
      e.childNodes.forEach(element => {
        element.classList.remove('active');
      });
      targetBookmark.classList.add('active');
      console.log(targetBookmark);
    })
  }

  toLogin(email, password, button, err, spinner, toast) {
    button.addEventListener('click', function send(event) {
      event.preventDefault();
      spinner.style.display = 'block';
      const mail = email.value;
      const pass = password.value;
      async function getLogin() {
        try {
          const userInfo = await User.login(mail, pass);
          Router.draw('main-page');
        } catch (error) {
          spinner.style.display = 'none';
          toast.style.display = 'block';
          toast.innerHTML = `<p>Введён неправильный пароль или адрес электронной почты. Введите данные ещё раз или пройдите процедуру регистрации.</p>
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" class="span-close">&times;</span></button>`;
        }
      }
      getLogin();
    });
  }

  toRegistrate(email, password, name, button, err, spinner, toast) {
    button.addEventListener('click', function sendFormRegistrate(event) {
      event.preventDefault();
      spinner.style.display = 'block';
      const mail = email.value;
      const pass = password.value;
      async function getRegistration() {
        try {
          const userInfo = await User.createUserAndLogin(mail, pass, {
            username: name.value,
          });
          console.log(userInfo);
          Router.draw('main-page');
        } catch (error) {
          spinner.style.display = 'none';
          toast.style.display = 'block';
          toast.innerHTML = `<p>Что-то пошло не так. Повторите процедуру регистрации</p>
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" class="span-close">&times;</span></button>`;
        }
      }
      getRegistration();
    });
  }

  hideToast(button, toast) {
    button.addEventListener('click', () => {
      toast.style.display = 'none';
    });
  }
}