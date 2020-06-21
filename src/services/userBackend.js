import {
  authUser,
  addUser,
  getSettings,
  setSettings,
  setStatistics,
  getUser,
  getStatistics,
} from './dataBackend';

import { APPLICATION } from './config';

let user = null;

export default class User {
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
        try {
          const settings = await getSettings(userInfo.userId, userInfo.token);
          user = {
            id: userInfo.userId,
            email,
            settings: settings.optional.user
              ? JSON.parse(settings.optional.user)
              : {},
          };
        } catch (err) {
          if (err.code === 404) {
            user = {
              id: userInfo.userId,
              email,
              settings: {},
            };
          } else {
            localStorage.setItem(`${APPLICATION}.auth`, '');
            user = null;
            throw err;
          }
        }
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

  static createUserAndLogin(
    email,
    password,
    settings = {
      newWordsPerDay: 10,
      maxWordsPerDay: 50,
      prompts: {
        translation: true,
        meaning: true,
        transcription: true,
        image: true,
      },
      buttons: {
        showAnswer: true,
        removeWord: true,
        gradeWord: true,
      },
    }
  ) {
    return addUser(email, password)
      .then(() => authUser(email, password))
      .then(async (userInfo) => {
        await Promise.allSettled([
          setSettings(userInfo.userId, userInfo.token, {
            wordsPerDay: 1,
            optional: { user: JSON.stringify(settings) },
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

  static async saveGameStatistics(game, date, correct, total) {
    let userInfo = localStorage.getItem(`${APPLICATION}.auth`);
    if (!userInfo) throw Error('Пользователь не найден');
    userInfo = JSON.parse(userInfo);
    let stats = {};
    try {
      stats = await getStatistics(userInfo.userId, userInfo.token, game);
    } catch (err) {
      if (err.code === 404) {
        stats = { learnedWords: 0, optional: { results: '[]' } };
      } else throw err;
    }

    stats.optional.results = JSON.stringify([
      ...JSON.parse(stats.optional.results),
      { [date]: { correct, total } },
    ]);
    return setStatistics(userInfo.userId, userInfo.token, game, {
      learnedWords: stats.learnedWords,
      optional: stats.optional,
    });
  }
}
