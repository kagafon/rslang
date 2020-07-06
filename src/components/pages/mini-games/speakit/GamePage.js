import { createElement } from 'helpers/dom';
import SpeechRecognitionWrapper from 'services/recognition';
import { User } from 'services/backend';
import WordButton from './WordButton';
import ResultsModal from './Modal';

export default class GamePage {
  constructor(container, startNewGame) {
    this.startNewGame = startNewGame;
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
    this.trainButton = createElement(
      controlsArea,
      'button',
      ['btn', 'btn-warning'],
      { type: 'button' },
      'Начать'
    );
    this.trainButton.addEventListener('click', this.switchTrainMode.bind(this));
    const imagePlaceholder = createElement(this.container, 'div', [
      'game-page__image',
    ]);
    this.image = createElement(imagePlaceholder, 'div');
    this.micImage = createElement(imagePlaceholder, 'div', [], {
      style: 'opacity:0;',
    });
    createElement(this.micImage, 'i', ['material-icons'], {}, 'mic');

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
    this.recognition = new SpeechRecognitionWrapper(this.micImage);
    this.resultsModal = new ResultsModal(
      this.container,
      this.finishRound.bind(this),
      this.playWordSound.bind(this)
    );
  }

  startRound(words) {
    this.failResultCount = 10;
    this.successResultCount = 0;
    this.words = words;
    this.buttons.forEach((x, idx) => {
      x.reset();
      x.setWord(words[idx]);
    });
    this.micImage.style = '';
    this.translation.classList.remove('text-danger', 'text-success');
    this.image.style = `background-image:url(assets/images/speakit-page/background.svg);opacity: 1;`;
    this.translation.innerText = '';
    this.trainMode = true;
    this.trainButton.innerText = 'Начать';
    this.gameStartDate = null;

    this.show();
  }

  finishRound() {
    this.hide();
    this.startNewGame();
  }

  hide() {
    const transitionEnd = (evt) => {
      evt.currentTarget.removeEventListener('transitionend', transitionEnd);
      this.container.classList.add('d-none');
      this.micImage.style = '';
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
      });opacity: 1;`;
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

  switchTrainMode() {
    if (this.trainMode) {
      this.buttons.forEach((x) => x.setReady());
      this.trainMode = false;
      this.recognition.start(
        this.checkResultHandler,
        this.words.map((x) => x.word)
      );
      this.trainButton.innerText = 'Завершить';
      this.image.style = '';
      this.micImage.style = 'opacity:1;';
      this.gameStartDate = new Date().getTime();
    } else {
      this.recognition.stop();
      this.saveStatistics();
      this.resultsModal.show(this.words);
    }
  }

  checkResult(recognizedWords) {
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
          this.words[foundIdx].success = true;
          this.translation.innerText = this.words[foundIdx].word;
          this.translation.classList.remove('text-danger');
          this.translation.classList.add('text-success');
          this.saveStatistics();
        } else {
          [this.translation.innerText] = recognizedWords;
          this.translation.classList.add('text-danger');
          this.translation.classList.remove('text-success');
        }
      }

      if (this.failResultCount !== 0) {
        this.recognition.start(
          this.checkResultHandler,
          this.words.map((x) => x.word)
        );
      } else {
        this.recognition.stop();
        this.saveStatistics();
        this.resultsModal.show(this.words);
      }
    }
  }

  saveStatistics() {
    if (this.gameStartDate) {
      User.saveGameStatistics(
        'speakit',
        this.gameStartDate,
        this.words.filter((x) => x.success).length,
        this.words.length
      );
    }
  }
}
