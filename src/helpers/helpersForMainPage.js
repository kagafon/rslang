import { createElement } from 'helpers/dom';
import { User, Words } from 'services/backend';
import modal from 'components/pages/MainPage/modal';
import store from 'components/pages/MainPage/Store';

function showWord(word, sentence) {
  return sentence.replace('[...]', word);
}

function hideWord(word, sentence) {
  return sentence.toLowerCase().replace(word, '[...]');
}

const playAudio = (audioMain, audioSrc) =>
  new Promise((resolve, reject) => {
    try {
      const audio = audioMain;
      audio.src = `${audioSrc}`;
      audio.play();
      audio.onended = () => resolve();
    } catch (e) {
      reject(e);
    }
  });

function letters(word, answer, wordContainer) {
  let inputAnswer = answer.split('');
  let correctLetter = [];
  const correctAnswer = word.split('');
  correctAnswer.forEach((letter) => {
    inputAnswer.forEach((el) => {
      if (letter === el) {
        inputAnswer = inputAnswer.join('').replace(el, '').split('');
        correctLetter.push(letter);
      }
    });
  });
  correctAnswer.forEach((letter) => {
    if (correctLetter.includes(letter)) {
      createElement(wordContainer, 'span', ['letter_success'], {}, `${letter}`);
      correctLetter = correctLetter.join('').replace(letter, '').split('');
    } else {
      createElement(wordContainer, 'span', ['letter_error'], {}, `${letter}`);
    }
  });
}

function volumeOff(volumeBtn) {
  const btn = volumeBtn;
  btn.classList.add('off');
  btn.textContent = 'volume_off';
}
function volumeUp(volumeBtn) {
  const btn = volumeBtn;
  btn.classList.remove('off');
  btn.textContent = 'volume_up';
}

function changeProgressBar(progressBarMain, pagination) {
  const progressBar = progressBarMain;
  const current = pagination.querySelector('.swiper-pagination-current')
    .textContent;
  const total = pagination.querySelector('.swiper-pagination-total')
    .textContent;
  const pres = (Number(current) / Number(total)) * 100;
  progressBar.style.width = `${pres}%`;
}

function createLoader() {
  const divLoad = createElement(
    document.querySelector('body'),
    'div',
    ['d-flex', 'justify-content-center', 'align-items-center', 'mt-5'],
    {},
    ''
  );
  const loader = createElement(
    divLoad,
    'div',
    ['spinner-border', 'text-primary'],
    { role: 'status' },
    ''
  );
  createElement(loader, 'span', ['sr-only'], {}, 'Loading...');

  return divLoad;
}

function showStat(head, stat) {
  modal.init(head, stat);
}

async function checkWordResult(word, result, showAnswer) {
  const stat = await User.getMainStatistics();
  const settings = store.getState().userSettings;
  stat.passedCards = stat.passedCards || 0;
  stat.correctAnswers = stat.correctAnswers || 0;
  stat.learnedWords = stat.learnedWords || 0;
  stat.answerSeries = stat.answerSeries || 0;
  stat.answerCount = stat.answerCount || 0;
  if (result === 'no') {
    word.totalAnswers += 1;
    word.correctAnswerSeries = 0;
    if (showAnswer) {
      stat.passedCards += 1;
    }
    stat.answerSeries =
      stat.answerSeries > stat.answerCount
        ? stat.answerSeries
        : stat.answerCount;
    stat.answerCount = 0;
  } else if (result === 'yes') {
    if (!word.lastRepeat) {
      stat.learnedWords += 1;
    }
    if (
      word.correctAnswers === 0 ||
      word.correctAnswers === word.totalAnswers
    ) {
      stat.correctAnswers += 1;
    }
    stat.passedCards += 1;
    stat.answerCount += 1;
    word.correctAnswers += 1;
    word.totalAnswers += 1;
    word.correctAnswerSeries += 1;
  }
  // if (word.correctAnswers === word.totalAnswers) {
  //   word.difficulty = 'easy';
  // } else if (word.correctAnswers === 0) {
  //   word.difficulty = 'new';
  // } else {
  //   word.difficulty = 'medium';
  // }

  word.lastRepeat = new Date();
  const min =
    word.correctAnswerSeries *
    settings.learning.levels[word.group].baseInterval[word.difficulty];
  word.nextRepeat = new Date(new Date().getTime() + min * 60 * 1000);
  User.saveMainStatistics(stat);
  return { word, stat };
}

export {
  showWord,
  hideWord,
  playAudio,
  letters,
  volumeOff,
  volumeUp,
  changeProgressBar,
  createLoader,
  checkWordResult,
  showStat,
};
