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
    const wordsToday = await ыWords.getTodayUserWords(preloads);
    return wordsToday;
  } catch (e) {
    return null;
  }
}
