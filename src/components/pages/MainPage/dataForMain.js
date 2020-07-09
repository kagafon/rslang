import { User, Words } from 'services/backend';
// import DEFAULT_USER_SETTINGS from 'services/userBackend';

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
    puzzle: { levelPages: new Array(6).fill(0) },
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

export async function getSettings() {
  try {
    const user = await User.getCurrentUser();
    return user.settings;
  } catch (e) {
    return DEFAULT_USER_SETTINGS;
  }
}

export async function getUserWords(preloads) {
  try {
    const settings = await getSettings();
    const data = await Promise.all([
      Words.getNewUserWords(true),
      Words.getLearnedUserWords(true),
      User.getMainStatistics(),
    ]);
    let newWords = data[0];
    const learnedWords = data[1];
    const learnedTodyUserWords = data[2].passedCards || 0;
    let allWords = learnedWords.concat(newWords);
    if (!settings.lastLoginDate && allWords.length === 0) {
      await Promise.all([
        Words.addUserWordsFromGroup(0, Math.floor(Math.random() * 29), 8),
        Words.addUserWordsFromGroup(1, Math.floor(Math.random() * 29), 9),
        Words.addUserWordsFromGroup(2, Math.floor(Math.random() * 29), 8),
        Words.addUserWordsFromGroup(3, Math.floor(Math.random() * 29), 9),
        Words.addUserWordsFromGroup(4, Math.floor(Math.random() * 29), 8),
        Words.addUserWordsFromGroup(5, Math.floor(Math.random() * 29), 8),
      ]);
      allWords = await Words.getTodayUserWords();
      newWords = await Words.getNewUserWords(true);
    } else if (allWords.length === 0) throw new Error();
    const words = [newWords, learnedWords, allWords, learnedTodyUserWords];
    return { words, settings };
  } catch (e) {
    throw new Error(e);
  }
}
