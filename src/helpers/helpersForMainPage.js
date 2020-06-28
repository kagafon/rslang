import { createElement } from 'helpers/dom';

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
    ['d-flex', 'justify-content-center', 'align-items-center'],
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

  return loader;
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
};
