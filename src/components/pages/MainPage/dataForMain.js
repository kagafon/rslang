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
    const data = await Promise.all([
      Words.getNewUserWords(true, preloads),
      Words.getLearnedUserWords(true, preloads),
    ]);
    const learnedWords = data[0];
    const newWords = data[1];
    let allWords = learnedWords.concat(newWords);
    // if(allWords.length === 0) throw new Error();
    if (allWords.length === 0) {
      await Words.addUserWordsFromGroup(0, 1, 9);
      await Words.addUserWordsFromGroup(1, 1, 8);
      await Words.addUserWordsFromGroup(2, 1, 9);
      await Words.addUserWordsFromGroup(3, 1, 8);
      await Words.addUserWordsFromGroup(4, 1, 9);
      await Words.addUserWordsFromGroup(5, 1, 8);
      allWords = await Words.getTodayUserWords(preloads);
    }
    let words = [newWords, learnedWords, allWords];
    return { words, settings };
  } catch (e) {
    throw new Error(e);
  }
}
