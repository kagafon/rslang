import constans from 'components/pages/MainPage/constant';
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
      // const audio = new Audio();
      audio.src = `${constans.URL}${audioSrc}`;
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
