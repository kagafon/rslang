import { createElement } from 'helpers/dom';

export function showWord(word, sentence) {
  return sentence.replace('[...]', word);
}

export function hideWord(word, sentence) {
  return sentence.toLowerCase().replace(word, '[...]');
}

export const playAudio = (audio, audioSrc) =>
  new Promise((resolve, reject) => {
    try {
      audio.src = `${audioSrc}`;
      audio.play();
      audio.onended = () => resolve();
    } catch (e) {
      reject(e);
    }
  });

export function letters(word, answer, wordContainer) {
  let inputAnswer = answer.split('');
  let correctLetter = [];
  let correctAnswer = word.split('');
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

export function volumeOff(volumeBtn) {
  volumeBtn.classList.add('off');
  volumeBtn.textContent = 'volume_off';
}
export function volumeUp(volumeBtn) {
  volumeBtn.classList.remove('off');
  volumeBtn.textContent = 'volume_up';
}

export function changeProgressBar(progressBar, pagination) {
  const current = pagination.querySelector('.swiper-pagination-current')
    .textContent;
  const total = pagination.querySelector('.swiper-pagination-total')
    .textContent;
  const pres = (Number(current) / Number(total)) * 100;
  progressBar.style.width = `${pres}%`;
}

export function createLoader() {
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
