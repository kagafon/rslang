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

    const autologinBackdround = createElement(
      parent,
      'div',
      ['autologin-background'],
      {},
      ''
    );

    const autologinSpinner = createElement(
      autologinBackdround,
      'div',
      ['spinner-border', 'spin-autolog'],
      {},
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
      'span',
      ['label', 'material-icons'],
      { for: 'email' },
      'email'
    );
    const inputEmail = createElement(
      divEmail,
      'input',
      ['email'],
      {
        type: 'email',
        placeholder: 'Адрес эл. почты',
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
      'span',
      ['label', 'material-icons'],
      { for: 'username' },
      'person'
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
      'span',
      ['label', 'material-icons'],
      { for: 'psw' },
      'lock'
    );
    const inputPassword = createElement(
      divPassword,
      'input',
      ['password'],
      {
        type: 'password',
        placeholder: 'Пароль',
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
      'span',
      ['label', 'material-icons'],
      { for: 'psw' },
      'lock'
    );
    const inputConfirmPassword = createElement(
      divConfirmPassword,
      'input',
      ['password'],
      {
        type: 'password',
        placeholder: 'Повторите пароль',
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
      'span',
      ['label', 'material-icons'],
      { for: 'email' },
      'email'
    );
    const inputLoginEmail = createElement(
      divLoginEmail,
      'input',
      ['email-login'],
      {
        type: 'email',
        placeholder: 'Адрес эл. почты',
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
      'span',
      ['label', 'material-icons'],
      { for: 'pswLogin' },
      'lock'
    );
    const inputLoginPassword = createElement(
      divLoginPassword,
      'input',
      ['password'],
      {
        type: 'password',
        placeholder: 'Пароль',
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
    this.callAutoLogin(errorLogin, divToast, autologinBackdround);
    this.hideToast(spanToast, divToast);
    this.hideToast(spanToast, divLoginToast);
    button.addEventListener('click', () => {
      event.preventDefault();
      this.checkPassword(inputPassword, inputConfirmPassword, divToast,
        inputEmail,
        inputPassword,
        inputUsername,
        error,
        divSpinner,
        divToast);
    });
    this.toLogin(
      inputLoginEmail,
      inputLoginPassword,
      buttonLogin,
      errorLogin,
      divLoginSpinner,
      divLoginToast
    );
    
    this.addHandlers(formContainerHeader);
    return parent;
  }

  checkPassword(password, confirmPassword, toast, inputEmail,
    inputPassword,
    inputUsername,
    error,
    divSpinner,
    divToast) {
      const regex = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
      if (password.value !== confirmPassword.value) {
        console.log("Пароли не совпадают")
        toast.style.display = 'block';
        toast.innerHTML = `<p>Пароли не совпадают. Введите идентичные пароли!</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" class="span-close">&times;</span></button>`;
      } else if (!regex.test(password.value)) {
        console.log("Символы")
        toast.style.display = 'block';
        toast.innerHTML = `<p>Пароль не соответствует требованию. Введите новый пароль</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" class="span-close">&times;</span></button>`;
      } else {
        this.toRegistrate(
          inputEmail,
          inputPassword,
          inputUsername,
          error,
          divSpinner,
          divToast
        );
      }
  }

  async callAutoLogin(err, toast, background) {
    try {
      await User.autoLogin();
      Router.draw('main-page');
    } catch (error) {
      background.style.display = 'none';
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

  toRegistrate(email, password, name, err, spinner, toast) {
      spinner.style.display = 'block';
      const mail = email.value;
      const pass = password.value;
      if(mail === '' || pass === '' || name.value === '') {
        spinner.style.display = 'none';
        toast.style.display = 'block';
        toast.innerHTML = `<p>Заполните все поля.</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true" class="span-close">&times;</span></button>`;
      } else {
        async function getRegistration() {
          try {
            const userInfo = await User.createUserAndLogin(mail, pass, {
              username: name.value,
            });
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
      }
  }

  hideToast(button, toast) {
    button.addEventListener('click', () => {
      toast.style.display = 'none';
    });
  }
}