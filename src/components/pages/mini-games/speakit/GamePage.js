import { createElement } from 'helpers/dom';
import { Words, User } from 'services/backend';
import WordButton from './WordButton';

export default class GamePage {
  constructor(container, newGame) {
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
  }

  startRound(words) {
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
    } else {
      this.buttons.forEach((x) => x.reset());
      this.trainMode = true;
    }
  }
}
