import { User, Words } from 'services/backend';

export async function getSettings() {
  const settings = {
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
    const user = await User.getCurrentUser();
    return user.settings;
  } catch (e) {
    return settings;
  }
}

export async function getUserWords(preloads) {
  try {
    const settingsForWords = await getSettings();
    const { maxWordsPerDay, newWordsPerDay } = settingsForWords;
    const wordsToday = await Words.getTodayUserWords(preloads);
    if (wordsToday.length === 0) throw new Error();
    // console.error(wordsToday);
    return wordsToday;
  } catch (e) {
    const group = 0;
    const page = 1;
    const wordsPerPage = 30;
    const fieldsToCache = ['image', 'audio'];
    const words = await Words.addUserWordsFromGroup(
      group,
      page,
      wordsPerPage,
      fieldsToCache
    );

    return words;
  }
}
