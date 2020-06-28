import {
  getWords,
  getUserWords,
  addUserWord,
  updateUserWord,
  getUserWordById,
} from './dataBackend';
import { APPLICATION, FILE_BASE_URL } from './config';

const WORDS_TOTAL = 3600;
const LEARN_LEVEL_CUP = 20;

const userWordFields = [
  { name: 'difficulty', default: 'new' },
  {
    name: 'creationDate',
    get: (x) => (x ? null : new Date(x)),
    set: (x) => x.getTime(),
    default: `${new Date().getTime()}`,
  },
  {
    name: 'lastRepeat',
    get: (x) => (x ? new Date(x) : null),
    set: (x) => x.getTime(),
    default: 'null',
  },
  { name: 'repeatTimes', default: '0' },
  {
    name: 'nextRepeat',
    get: (x) => (x ? new Date(x) : null),
    set: (x) => x.getTime(),
    default: `${new Date().getTime()}`,
  },
  { name: 'correctAnswers', default: '0' },
  { name: 'totalAnswers', default: '0' },
];

const getUserInfo = () => {
  const userInfo = localStorage.getItem(`${APPLICATION}.auth`);
  if (!userInfo) throw Error('Пользователь не найден');
  return JSON.parse(userInfo);
};

const unwindWord = (word) => {
  const answers = (word.correctAnswers || 0) * 2 - (word.totalAnswers || 0);

  const retValue = {
    ...word.userWord,
    ...word,
    id: word.userWord.word,
    progress:
      answers > LEARN_LEVEL_CUP
        ? 100
        : Math.floor((answers * 100) / LEARN_LEVEL_CUP),
  };
  userWordFields.forEach((x) => {
    if (word.userWord.optional[x.name] === undefined) {
      retValue[x.name] = x.default;
    } else {
      let val = '';
      try {
        val = JSON.parse(word.userWord.optional[x.name]);
      } catch (err) {
        val = word.userWord.optional[x.name];
      }
      retValue[x.name] = x.get ? x.get(val) : val;
    }
  });
  delete retValue.optional;
  delete retValue.userWord;
  return retValue;
};

const preloadData = async (words, preloadFields) => {
  const promises = preloadFields.reduce((acc, y) => {
    return acc.concat(
      words.map((x, idx) =>
        fetch(`${FILE_BASE_URL}${x[y]}`)
          .then((resp) => resp.blob())
          .then((data) => ({
            idx,
            [`${y}Src`]: URL.createObjectURL(data),
          }))
      )
    );
  }, []);
  const data = await Promise.allSettled(promises);
  data.forEach((x) => {
    if (x.status === 'fulfilled') {
      words[x.value.idx] = { ...words[x.value.idx], ...x.value };
    }
  });
  return words;
};
export default class Words {
  static getWordsForRound(group, page, wordsPerPage, preload) {
    return (group >= 0
      ? getWords(group, page, wordsPerPage)
      : Words.getTodayUserWords()
    ).then(async (words) => {
      const wordsToReturn = words
        .sort(() => Math.random() - 0.5)
        .slice(0, wordsPerPage);
      if (preload && preload.length > 0) {
        return preloadData(wordsToReturn, preload);
      }
      return wordsToReturn;
    });
  }

  static addUserWord(wordId, settings) {
    const { userId, token } = getUserInfo();
    return settings
      ? addUserWord(userId, token, wordId, settings)
      : addUserWord(
          userId,
          token,
          wordId,
          userWordFields.reduce(
            (acc, x) => Object.assign(acc, { [x.name]: x.default }),
            {}
          )
        );
  }

  static updateUserWord(word) {
    const { userId, token } = getUserInfo();

    return updateUserWord(
      userId,
      token,
      word.id,
      userWordFields.reduce(
        (acc, x) =>
          Object.assign(acc, {
            [x.name]:
              word[x.name] !== undefined
                ? JSON.stringify(word[x.name])
                : x.default,
          }),
        {}
      )
    );
  }

  static async addUserWordsFromGroup(group, page, count) {
    const wordsToLoad = await Words.getWordsForRound(group, page, count);
    return Promise.allSettled(wordsToLoad.map((x) => Words.addUserWord(x.id)));
  }

  static getUserWords(query, preload) {
    const { userId, token } = getUserInfo();

    return getUserWords(userId, token, query, WORDS_TOTAL).then(
      async (words) => {
        const wordsToReturn = words[0].paginatedResults.map((x) =>
          unwindWord(x)
        );

        if (preload && preload.length > 0) {
          return preloadData(wordsToReturn, preload);
        }
        return wordsToReturn;
      }
    );
  }

  static getAllUserWords(preload) {
    return Words.getUserWords('{"userWord":{"$ne":null}}', preload);
  }

  static getTodayUserWords(preload) {
    return Words.getUserWords(
      `{"$and": [{"userWord":{"$ne":null}},{"userWord.difficulty":{"$ne":"deleted"}}, {"userWord.optional.nextRepeat" :{"$lte": "${new Date().getTime()}"}}]}`,
      preload
    );
  }

  static getUserWordById(wordId, preload) {
    const { userId, token } = getUserInfo();

    return getUserWordById(userId, token, wordId).then(async (words) => {
      if (preload && preload.length > 0) {
        return preloadData(words, preload).then((preloadedWords) =>
          unwindWord(preloadedWords[0])
        );
      }
      return words[0];
    });
  }
}
