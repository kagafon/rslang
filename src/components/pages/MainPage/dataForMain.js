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
    const settings = await getSettings();
    const data = await Promise.all([
      Words.getNewUserWords(true),
      Words.getLearnedUserWords(true),
      User.getMainStatistics(),
    ]);
    let newWords = data[0];
    const learnedWords = data[1];
    const learnedTodyUserWords = data[2].passedCards || 0;
    // data[2].filter((word) => {
    //   const now = new Date();
    //   const wordDate = new Date(word.lastRepeat);
    //   if (
    //     now.getDate() === wordDate.getDate() &&
    //     now.getMonth() === wordDate.getMonth() &&
    //     now.getFullYear() === wordDate.getFullYear()
    //   ) {
    //     return true;
    //   }
    // });
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
      // const newData = await Promise.all([
      //   Words.getTodayUserWords(),
      //   Words.getNewUserWords(true),
      // ]);
      allWords = await Words.getTodayUserWords();
      newWords = await Words.getNewUserWords(true);
    } else if (allWords.length === 0) throw new Error();
    const words = [newWords, learnedWords, allWords, learnedTodyUserWords];
    return { words, settings };
  } catch (e) {
    throw new Error(e);
  }
}
