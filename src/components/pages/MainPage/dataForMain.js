import { User, Words } from 'services/backend';

export async function getSettings() {
  const settings = {
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
    learning: {
      maxCardsPerDay: 50,
      levels: Array(6)
        .fill(null)
        .map(() => ({
          newWordsPerDay: 10,
          baseInterval: { new: 1800, easy: 1800, medium: 1800, hard: 1800 },
        })),
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
    let preloads = [];
    const settings = await getSettings();
    const { image, example, meaning } = settings.prompts;
    if (image) preloads.push('image');
    preloads.push('audio');
    if (example) preloads.push('audioExample');
    if (meaning) preloads.push('audioMeaning');
    const wordsToday = await Words.getTodayUserWords(preloads);
    if (wordsToday.length === 0) {
      wordsToday = await Words.addUserWordsFromGroup(1, 1, 10, preloads);
    }
    // if (wordsToday.length === 0) throw new Error();
    return { wordsToday, settings };
  } catch (e) {
    throw new Error();
  }
}
