/* eslint-disable no-param-reassign */
import { getWords } from './dataBackend';

import { APPLICATION, IMAGE_BASE_URL, AUDIO_BASE_URL } from './config';

export default class Words {
  static getWordsForRound(
    group,
    page,
    wordsPerPage,
    preloadImages,
    preloadAudio
  ) {
    return getWords(group, page, wordsPerPage).then(async (words) => {
      let promises = [];
      if (preloadImages) {
        promises = promises.concat(
          words.map((x, idx) =>
            fetch(`${IMAGE_BASE_URL}${x.image}`)
              .then((resp) => resp.blob())
              .then((image) => ({
                idx,
                imageSrc: URL.createObjectURL(image),
              }))
          )
        );
      }
      if (preloadAudio) {
        promises = promises.concat(
          words.map((x, idx) =>
            fetch(`${AUDIO_BASE_URL}${x.audio}`)
              .then((resp) => resp.blob())
              .then((audio) => ({
                idx,
                audioSrc: URL.createObjectURL(audio),
              }))
          )
        );
      }
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
