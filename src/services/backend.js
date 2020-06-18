import { encodeRoundResults, decodeRoundResults } from 'helpers/resultsCoder';
import {
  authUser,
  addUser,
  getSettings,
  setSettings,
  getUser,
  getStatistics,
  setStatistics,
} from './dataBackend';

const APPLICATION = 'rslang';
let user = null;

export default class Backend {
  static getCurrentUser() {
    return user;
  }

  static logout() {
    localStorage.setItem(`${APPLICATION}.auth`, '');
    user = null;
  }

  static login(email, password) {
    return authUser(email, password)
      .then(async (userInfo) => {
        localStorage.setItem(`${APPLICATION}.auth`, JSON.stringify(userInfo));
        const settings = await getSettings(userInfo.userId, userInfo.token);
        user = {
          id: userInfo.userId,
          email,
          settings: settings.optional.user
            ? JSON.parse(settings.optional.user)
            : {},
        };
        return user;
      })
      .catch((err) => {
        localStorage.setItem(`${APPLICATION}.auth`, '');
        user = null;
        const msg = 'Вход не удался: ';
        if (err.code) {
          switch (err.code) {
            case 401:
            case 403:
            case 404:
              throw Error(`${msg}неверный логин или пароль`);
            default:
              throw err;
          }
        }
        throw err;
      });
  }

  static autoLogin() {
    let userInfo = localStorage.getItem(`${APPLICATION}.auth`);
    if (!userInfo) throw Error('Нет информации для авто-логина');
    userInfo = JSON.parse(userInfo);
    return getUser(userInfo.userId, userInfo.token).then(async (userData) => {
      const settings = await getSettings(userInfo.userId, userInfo.token);
      user = {
        id: userInfo.userId,
        email: userData.email,
        settings: JSON.parse(settings.optional.user),
      };
      return user;
    });
  }

  static createUserAndLogin(email, password, settings) {
    return addUser(email, password)
      .then(() => authUser(email, password))
      .then(async (userInfo) => {
        await Promise.allSettled([
          setSettings(userInfo.userId, userInfo.token, {
            wordsPerDay: 1,
            optional: { user: JSON.stringify(settings) },
          }),
          setStatistics(userInfo.userId, userInfo.token, {
            learnedWords: 0,
            optional: {},
          }),
        ]);
        user = { id: userInfo.userId, email, settings };
        return user;
      })
      .catch((err) => {
        localStorage.setItem(`${APPLICATION}.auth`, '');
        user = null;
        const msg = 'Регистрация не удалась: ';
        if (err.code) {
          switch (err.code) {
            case 417:
              throw Error(`${msg}пользователь уже существует`);
            case 422:
              if (err.body) {
                const { errors } = err.body.error;
                if (errors.find((x) => x.path.includes('email')))
                  throw Error(`${msg}указан невалидный почтовый адрес`);
                else if (errors.find((x) => x.path.includes('password')))
                  throw Error(`${msg}пароль не соответствует требованиям`);
              }
              throw Error(`${msg}ошибка сервера`);
            default:
              throw err;
          }
        }
        throw err;
      });
  }
}
