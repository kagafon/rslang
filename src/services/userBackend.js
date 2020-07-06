import {
  authUser,
  addUser,
  getSettings,
  setSettings,
  setStatistics,
  getUser,
  getStatistics,
} from './dataBackend';

import { APPLICATION, LEVELS_COUNT } from './config';

let user = null;

const getToday = () => {
  return Math.floor(new Date().getTime() / (3600 * 1000 * 24));
};

const DEFAULT_USER_SETTINGS = {
  username: '',
  creationDate: new Date().getTime(),
  lastLoginDate: null,
  prompts: {
    translation: true,
    example: true,
    meaning: true,
    transcription: true,
    image: true,
  },
  buttons: {
    showAnswer: true,
    removeWord: true,
    gradeWord: true,
  },
  games: {
    puzzle: { levelPages: new Array(LEVELS_COUNT).fill(0) },
    sprint: { maxScore: 0 },
  },
  learning: {
    maxCardsPerDay: 50,
    levels: Array(LEVELS_COUNT)
      .fill(null)
      .map(() => ({
        newWordsPerDay: 10,
        currentWordNumber: 0,
        baseInterval: { new: 60, easy: 60, medium: 60, hard: 60 },
      })),
  },
};

const DEFAULT_STATISTICS = {
  learnedWords: 0,
};

export default class User {
  static getCurrentUser() {
    return user;
  }

  constructor(id, email, settings) {
    this.id = id;
    this.email = email;
    this.settings = JSON.parse(JSON.stringify(settings));
  }

  getBaseInterval(group, difficulty) {
    return this.settings.levels[group].baseInterval[difficulty];
  }

  static logout() {
    localStorage.setItem(`${APPLICATION}.auth`, '');
    user = null;
  }

  static login(email, password) {
    return authUser(email, password)
      .then(async (userInfo) => {
        localStorage.setItem(`${APPLICATION}.auth`, JSON.stringify(userInfo));
        await User.fillUser({ ...userInfo, email });
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
      await User.fillUser({ ...userInfo, email: userData.email });
      return user;
    });
  }

  static createUserAndLogin(email, password, settings = {}) {
    localStorage.setItem(`${APPLICATION}.auth`, '');
    return addUser(email, password)
      .then(() => authUser(email, password))
      .then(async (userInfo) => {
        localStorage.setItem(`${APPLICATION}.auth`, JSON.stringify(userInfo));
        const settingsToUse = {
          ...DEFAULT_USER_SETTINGS,
          ...settings,
        };

        await Promise.allSettled([
          setSettings(userInfo.userId, userInfo.token, {
            wordsPerDay: 1,
            optional: Object.keys(settingsToUse).reduce(
              (acc, x) => ({ ...acc, [x]: JSON.stringify(settingsToUse[x]) }),
              {}
            ),
          }),
        ]);
        user = new User(userInfo.userId, email, settingsToUse);
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

  static async saveMainStatistics(newStats) {
    let userInfo = localStorage.getItem(`${APPLICATION}.auth`);
    if (!userInfo) throw Error('Пользователь не найден');
    userInfo = JSON.parse(userInfo);
    let stats = {};
    const today = getToday();

    try {
      stats = await getStatistics(userInfo.userId, userInfo.token);
    } catch (err) {
      if (err.code === 404) {
        stats = {
          ...DEFAULT_STATISTICS,
          optional: {},
        };
      } else throw err;
    }
    if (!stats.optional.main) {
      stats.optional.main = [{ d: today }];
    } else {
      stats.optional.main = JSON.parse(stats.optional.main);
    }
    if (!user.stats) user.stats = {};
    Object.assign(user.stats, newStats);

    const foundDate = stats.optional.main.find((x) => x.d === today);

    if (!foundDate) stats.optional.main.push({ d: today, ...newStats });
    else Object.assign(foundDate, newStats);

    stats.optional.main = JSON.stringify(stats.optional.main);
    delete stats.id;
    delete stats.date;
    return setStatistics(userInfo.userId, userInfo.token, stats);
  }

  static getMainStatistics(isGetAll = false) {
    const today = getToday();
    const defaultValue = [
      {
        d: today,
        ...DEFAULT_STATISTICS,
      },
    ];
    if (isGetAll) {
      return User.getGameStatistics('main', defaultValue);
    }

    return User.getGameStatistics('main', defaultValue).then((mainStat) => {
      if (mainStat) {
        const foundItem = mainStat.find((x) => x.d === today);
        if (foundItem) return foundItem;
      }
      return defaultValue[0];
    });
  }

  static async saveGameStatistics(game, d, c, t) {
    let userInfo = localStorage.getItem(`${APPLICATION}.auth`);
    if (!userInfo) throw Error('Пользователь не найден');
    userInfo = JSON.parse(userInfo);
    let stats = {};
    try {
      stats = await getStatistics(userInfo.userId, userInfo.token);
    } catch (err) {
      if (err.code === 404) {
        stats = {
          learnedWords: 0,
          optional: {},
        };
      } else throw err;
    }
    if (!stats.optional[game]) {
      stats.optional[game] = { r: [] };
    } else {
      stats.optional[game] = JSON.parse(stats.optional[game]);
    }

    stats.optional[game].r.push({ d, c, t });

    stats.optional[game] = JSON.stringify(stats.optional[game]);
    delete stats.id;
    return setStatistics(userInfo.userId, userInfo.token, stats);
  }

  static getGameStatistics(game, defaultValue = { r: [] }) {
    let userInfo = localStorage.getItem(`${APPLICATION}.auth`);
    if (!userInfo) throw Error('Пользователь не найден');
    userInfo = JSON.parse(userInfo);
    return getStatistics(userInfo.userId, userInfo.token)
      .then((stats) => {
        return stats.optional[game]
          ? JSON.parse(stats.optional[game])
          : defaultValue;
      })
      .catch((err) => {
        if (err.code === 404) {
          return defaultValue;
        }
        throw err;
      });
  }

  static async saveSettings(settings) {
    let userInfo = localStorage.getItem(`${APPLICATION}.auth`);
    if (!userInfo || !user) throw Error('Пользователь не найден');
    userInfo = JSON.parse(userInfo);

    const settingsToSave = {
      ...DEFAULT_USER_SETTINGS,
      ...user.settings,
      ...settings,
    };

    await setSettings(userInfo.userId, userInfo.token, {
      wordsPerDay: 1,
      optional: Object.keys(settingsToSave).reduce(
        (acc, x) => ({ ...acc, [x]: JSON.stringify(settingsToSave[x]) }),
        {}
      ),
    });
    user.settings = settingsToSave;
  }

  static async loadSettings() {
    let userInfo = localStorage.getItem(`${APPLICATION}.auth`);
    if (!userInfo || !user) throw Error('Пользователь не найден');
    userInfo = JSON.parse(userInfo);

    const settings = await getSettings(userInfo.userId, userInfo.token);
    Object.keys(settings.optional).forEach((x) => {
      settings.optional[x] = JSON.parse(settings.optional[x]);
    });
    user.settings = settings;
  }

  static async fillUser(userInfo) {
    try {
      const settings = await getSettings(userInfo.userId, userInfo.token);
      user = new User(
        userInfo.userId,
        userInfo.email,
        settings.optional
          ? Object.keys(settings.optional).reduce(
              (acc, x) => ({ ...acc, [x]: JSON.parse(settings.optional[x]) }),
              {}
            )
          : DEFAULT_USER_SETTINGS
      );
    } catch (err) {
      if (err.code === 404) {
        user = new User(userInfo.userId, userInfo.email, DEFAULT_USER_SETTINGS);
      } else {
        localStorage.setItem(`${APPLICATION}.auth`, '');
        user = null;
        throw err;
      }
    }
    try {
      user.stats = await User.getMainStatistics();
    } catch (err) {
      if (err.code === 404) {
        user.stats = { ...DEFAULT_STATISTICS };
      } else {
        localStorage.setItem(`${APPLICATION}.auth`, '');
        user = null;
        throw err;
      }
    }
  }
}
