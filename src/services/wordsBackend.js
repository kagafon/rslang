/* eslint-disable no-param-reassign */
import { getWords } from './dataBackend';

import { FILE_BASE_URL } from './config';

export default class Words {
  static getWordsForRound(group, page, wordsPerPage, preload) {
    return getWords(group, page, wordsPerPage).then(async (words) => {
      const promises = preload.reduce((acc, y) => {
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
      const preloadData = await Promise.allSettled(promises);
      preloadData.forEach((x) => {
        if (x.status === 'fulfilled') {
          words[x.value.idx] = { ...words[x.value.idx], ...x.value };
        }
      });
      return words;
    });
  }
}
