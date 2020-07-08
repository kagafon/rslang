import { createElement } from 'helpers/dom';

export default class WordButton {
  constructor(container, onClick) {
    this.uiElement = createElement(
      container,
      'button',
      ['btn', 'btn-primary', 'word-button'],
      { type: 'button' }
    );
    this.icon = createElement(
      this.uiElement,
      'i',
      ['material-icons', 'word-button__image'],
      {},
      'volume_up'
    );
    const textArea = createElement(this.uiElement, 'div', [
      'word-button__text-area',
    ]);
    this.word = createElement(textArea, 'div');
    this.transcription = createElement(textArea, 'div', ['text-lowercase']);
    this.uiElement.addEventListener('click', () => onClick());
    this.reset();
  }

  setWord(word) {
    this.word.innerText = word.word;
    this.transcription.innerText = word.transcription;
  }

  setActive(active) {
    if (active) {
      this.uiElement.classList.add('active');
    } else {
      this.uiElement.classList.remove('active');
    }
  }

  reset() {
    this.uiElement.className = 'btn btn-primary word-button';
  }

  setReady() {
    this.uiElement.classList.remove('btn-primary');
    this.uiElement.classList.remove('btn-secondary');
    this.uiElement.classList.remove('btn-success');
  }

  setSuccess() {
    this.uiElement.classList.remove('btn-primary');
    this.uiElement.classList.remove('btn-secondary');
    this.uiElement.classList.add('btn-success');
  }
}
