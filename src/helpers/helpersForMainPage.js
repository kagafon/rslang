import constans from 'components/pages/MainPage/constant';

export function showWord(word, sentence) {
  return sentence.replace('[...]', word);
}

export function hideWord(word, sentence) {
  return sentence.toLowerCase().replace(word, '[...]');
}

export const playAudio = (audioSrc) =>
  new Promise((resolve, reject) => {
    try {
      const audio = new Audio();
      audio.src = `${constans.URL}${audioSrc}`;
      audio.play();
      audio.onended = () => resolve();
    } catch (e) {
      reject(e);
    }
  });
