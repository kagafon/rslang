import {
  getWords,
  getUserWords,
  addUserWord,
  updateUserWord,
} from './dataBackend';
import { APPLICATION, FILE_BASE_URL } from './config';

const TODAY = Math.floor(Date.now() / (3600 * 1000 * 24));
const USER_ONLY_WORDS_QUERY = '{"userWord":{"$ne":null}}';
const TODAY_WORDS_QUERY = `{"$and": [{"userWord":{"$ne":null}},{"userWord.difficulty":{"$ne":"deleted"}}, {"userWord.optional.nextRepeat" :{"$lte": "${TODAY}"}}]}`;
const WORDS_TOTAL = 3600;

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
};
export default class Words {
  static getWordsForRound(group, page, wordsPerPage, preload) {
    return getWords(group, page, wordsPerPage).then(async (words) => {
      if (preload && preload.length > 0) {
        return preloadData(words, preload);
      }
      return words;
    });
  }

  static addUserWord(wordId) {
    let userInfo = localStorage.getItem(`${APPLICATION}.auth`);
    if (!userInfo) throw Error('Пользователь не найден');
    userInfo = JSON.parse(userInfo);

    return addUserWord(userInfo.userId, userInfo.token, wordId);
  }

  static updateUserWord(word) {
    let userInfo = localStorage.getItem(`${APPLICATION}.auth`);
    if (!userInfo) throw Error('Пользователь не найден');
    userInfo = JSON.parse(userInfo);

    return updateUserWord(userInfo.userId, userInfo.token, word);
  }

  static async addUserWordsFromGroup(group, page, count) {
    const wordsToLoad = await Words.getWordsForRound(group, page, count);
    return Promise.allSettled(wordsToLoad.map((x) => Words.addUserWord(x.id)));
  }

  static getUserWords(query, preload) {
    let userInfo = localStorage.getItem(`${APPLICATION}.auth`);
    if (!userInfo) throw Error('Пользователь не найден');
    userInfo = JSON.parse(userInfo);

    return getUserWords(
      userInfo.userId,
      userInfo.token,
      query,
      WORDS_TOTAL
    ).then(async (words) => {
      const wordsToReturn = words[0].paginatedResults.map((x) => {
        const word = {
          ...x,
          ...x.userWord,
          ...x.userWord.optional,
        };
        delete word.optional;
        delete word.userWord;
        return word;
      });

      if (preload && preload.length > 0) {
        return preloadData(wordsToReturn, preload);
      }
      return wordsToReturn;
    });
  }

  static getAllUserWords(preload) {
    return Words.getUserWords(USER_ONLY_WORDS_QUERY, preload);
  }

  static getTodayUserWords(preload) {
    return Words.getUserWords(TODAY_WORDS_QUERY, preload);
  }
}
