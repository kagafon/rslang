import { User, Words } from 'services/backend';

export async function getSettings() {
  try {
    const user = await User.getCurrentUser();
    return user.settings;
  } catch (e) {
    return User.getDefaultUserSettings();
  }
}

export async function getUserWords(preloads) {
  try {
    const settings = await getSettings();
    const data = await Promise.all([
      Words.getNewUserWords(true),
      Words.getLearnedUserWords(true),
      User.getMainStatistics(),
      Words.getUserWordsByDifficulty(true, 'hard'),
    ]);
    let newWords = data[0];
    const learnedWords = data[1];
    const learnedTodyUserWords = data[2].passedCards || 0;
    const hardWords = data[3];
    let allWords = learnedWords.concat(newWords);
    if (!settings.lastLoginDate && allWords.length === 0) {
      await Promise.all([
        Words.addNextUserWordsFromGroup(0, 8),
        Words.addNextUserWordsFromGroup(1, 9),
        Words.addNextUserWordsFromGroup(2, 8),
        Words.addNextUserWordsFromGroup(3, 9),
        Words.addNextUserWordsFromGroup(4, 8),
        Words.addNextUserWordsFromGroup(5, 8),
      ]);
      allWords = await Words.getTodayUserWords();
      newWords = await Words.getNewUserWords(true);
    } else if (allWords.length === 0) throw new Error();
    // newWords =
    console.error(settings);
    const words = {
      newWords,
      learnedWords,
      allWords,
      learnedTodyUserWords,
      hardWords,
    };
    return { words, settings };
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
}
