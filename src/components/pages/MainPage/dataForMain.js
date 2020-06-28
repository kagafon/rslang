import { User, Words } from 'services/backend';

export async function getSettings() {
  let settings = {
    buttons: {
      gradeWord: true,
      removeWord: true,
      showAnswer: true,
    },
    maxWordsPerDay: 50,
    newWordsPerDay: 10,
    prompts: {
      image: true,
      meaning: true,
      transcription: true,
      translation: true,
      example: true,
    },
  };
  try {
    const user = await dUser.getCurrentUser();
    return user.settings;
  } catch (e) {
    return settings;
  }
}

export async function getUserWords(preloads) {
  try {
    const wordsForRound = await Words.getWordsForRound(3, 1, 40, preloads);
    console.error(wordsForRound);
    return wordsForRound;
  } catch (e) {
    return 'd';
  }
}
