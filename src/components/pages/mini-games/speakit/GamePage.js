import { createElement } from 'helpers/dom';
import SpeechRecognitionWrapper from 'services/recognition';
import { Words, User } from 'services/backend';
import WordButton from './WordButton';

export default class GamePage {
  constructor(container, newGame) {
    this.checkResultHandler = this.checkResult.bind(this);

    this.container = createElement(container, 'div', [
      'game-page',
      'hidden',
      'd-none',
    ]);
    this.words = [];
    const controlsArea = createElement(this.container, 'div', [
      'game-page__controls',
    ]);
    createElement(
      controlsArea,
      'button',
      ['btn', 'btn-info'],
      { type: 'button' },
      'Тренировка'
    ).addEventListener('click', () => {
      this.switchTrainMode(true);
    });

    createElement(
      controlsArea,
      'button',
      ['btn', 'btn-info'],
      { type: 'button' },
      'Новая игра'
    ).addEventListener('click', () => {
      this.hide();
      newGame();
    });

    createElement(
      controlsArea,
      'button',
      ['btn', 'btn-info'],
      { type: 'button' },
      'Заново'
    ).addEventListener('click', () => {
      this.words.sort(() => Math.random() - 0.5);
      this.startRound(this.words);
    });

    this.image = createElement(this.container, 'div', ['game-page__image']);
    this.translation = createElement(this.container, 'h4', [
      'h4',
      'game-page__translation',
      'd-flex',
      'align-items-center',
    ]);
    const buttonsArea = createElement(this.container, 'div', [
      'game-page__buttons-area',
    ]);
    this.buttons = [];
    for (let i = 0; i < 10; i += 1) {
      this.buttons.push(
        new WordButton(buttonsArea, this.selectWord.bind(this, i))
      );
    }
    this.trainMode = true;
    this.audio = new Audio();
    this.recognition = new SpeechRecognitionWrapper(
      document.querySelector('#mic')
    );
  }

  startRound(words) {
    this.failResultCount = 10;
    this.successResultCount = 0;
    this.words = words;
    this.buttons.forEach((x, idx) => x.setWord(words[idx]));
    this.image.style = `background-image:url(assets/images/speakit-page/background.svg)`;
    this.translation.innerText = '';
    this.trainMode = true;
    this.show();
  }

  hide() {
    const transitionEnd = (evt) => {
      evt.currentTarget.removeEventListener('transitionend', transitionEnd);
      this.container.classList.add('d-none');
    };
    this.container.addEventListener('transitionend', transitionEnd);
    this.container.classList.add('hidden');
  }

  show() {
    this.container.classList.remove('hidden', 'd-none');
  }

  selectWord(idx) {
    if (this.trainMode) {
      this.resetButtonsState();
      this.buttons[idx].setActive(true);
      this.translation.innerText = this.words[idx].wordTranslate;
      this.image.style = `background-image:url(${
        this.words[idx].imageSrc || this.words[idx].image
      })`;
      this.playWordSound(this.words[idx].audioSrc || this.words[idx].audio);
    }
  }

  playWordSound(audioSrc) {
    this.audio.src = audioSrc;
    this.audio.play();
  }

  resetButtonsState() {
    this.buttons.forEach((x) => x.setActive(false));
  }

  switchTrainMode(enable) {
    if (enable) {
      this.buttons.forEach((x) => x.setReady());
      this.trainMode = false;
      this.recognition.start(
        this.checkResultHandler,
        this.words.map((x) => x.word)
      );
    } else {
      this.buttons.forEach((x) => x.reset());
      this.trainMode = true;
    }
  }

  checkResult(recognizedWords) {
    console.log(recognizedWords);
    if (!this.trainMode) {
      if (recognizedWords && recognizedWords.length > 0) {
        const wordsToUse = recognizedWords.map((x) => x.toLowerCase());
        const foundIdx = this.words.findIndex((x) =>
          wordsToUse.includes(x.word.toLowerCase())
        );
        if (foundIdx >= 0) {
          this.buttons[foundIdx].setSuccess();
          this.failResultCount -= 1;
          this.successResultCount += 1;
        }
      }

      // this.successResultCount.innerText = this.wordPlaceholders.filter((x) =>
      //   x.button.classList.contains('active')
      // ).length;
      // this.failResultCount.innerText = this.wordPlaceholders.filter(
      //   (x) => !x.button.classList.contains('active')
      // ).length;
      // updateGameStatistics(
      //   this.gameStartDate,
      //   this.currentLevel,
      //   this.successResultCount.innerText,
      //   this.failResultCount.innerText
      // );
      if (this.failResultCount !== 0) {
        this.recognition.start(
          this.checkResultHandler,
          this.words.map((x) => x.word)
        );
      } else {
        this.showResult();
      }
    }
  }
}
