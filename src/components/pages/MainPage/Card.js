import { createElement } from 'helpers/dom';
import { hideWord } from 'helpers/helpersForMainPage';

export default function createCard(wordInit, buttons, prompts) {
  const {
    word,
    textMeaning,
    textExample,
    transcription,
    wordTranslate,
    textMeaningTranslate,
    textExampleTranslate,
    id,
  } = wordInit;

  const card = createElement('', 'div', ['card', 'card_size'], {}, '');
  const cardHeader = createElement(card, 'div', [
    'card-header',
    'd-flex',
    'justify-content-between',
  ]);
  createElement(
    cardHeader,
    'span',
    ['material-icons', 'md-100', 'volume'],
    { 'data-btn': 'volume' },
    `volume_up`
  );
  const cardBody = createElement(card, 'div', [
    'card-body',
    'd-flex',
    'justify-content-center',
    'align-items-center',
    'flex-column',
  ]);
  createElement(
    cardBody,
    'span',
    ['input-background', 'input-background_back'],
    {},
    `${word}`
  );
  createElement(cardBody, 'span', ['input-word', 'form-control'], {}, ``);
  createElement(
    cardBody,
    'input',
    ['form-control'],
    {
      type: 'text',
      autocomplete: 'off',
      id: `${id}`,
      'aria-label': `${word}`,
      'aria-describedby': 'basic-addon1',
      tabindex: -1,
    },
    `${word}`
  );
  createElement(cardBody, 'hr', ['my-3'], {}, ``);

  if (prompts.translation) {
    createElement(cardBody, 'p', ['card-text'], {}, `${wordTranslate}`);
  }
  if (prompts.meaning) {
    const sentenceTextMeaning = createElement(cardBody, 'p', [
      'card-text',
      'card-text-meaning',
    ]);
    sentenceTextMeaning.innerHTML = hideWord(word, textMeaning);
    if (prompts.translation) {
      createElement(
        cardBody,
        'p',
        ['card-text', 'translate'],
        {},
        `${textMeaningTranslate}`
      );
    }
  }

  if (prompts.example) {
    const sentenceTextExample = createElement(cardBody, 'p', [
      'card-text',
      'card-text-example',
    ]);
    sentenceTextExample.innerHTML = hideWord(word, textExample);
    if (prompts.translation) {
      createElement(
        cardBody,
        'p',
        ['card-text', 'translate'],
        {},
        `${textExampleTranslate}`
      );
    }
  }
  if (prompts.transcription)
    createElement(cardBody, 'p', ['card-text'], {}, `${transcription}`);
  if (prompts.image) {
    const cardImage = createElement(cardBody, 'div', ['card-img_div'], {}, ``);
    createElement(cardImage, 'img', ['card-img'], { src: `` });
  }

  const cardFooter = createElement(card, 'div', [
    'card-footer',
    'd-flex',
    'justify-content-between',
  ]);
  createElement(
    cardFooter,
    'button',
    ['btn', 'btn-primary', 'btn-sm'],
    { value: 1, tabindex: -1, type: 'submit', id: 'submitt1' },
    `Далее`
  );

  if (buttons.showAnswer)
    createElement(
      cardFooter,
      'button',
      ['btn', 'btn-info', 'btn-sm'],
      {
        value: 1,
        tabindex: -1,
        type: 'submit',
        'data-btn': 'answer',
        id: 'submitt2',
      },
      `Показать ответ`
    );
  if (buttons.removeWord)
    createElement(
      cardFooter,
      'button',
      ['btn', 'btn-danger', 'btn-sm'],
      { 'data-btn': 'delete', type: 'button', tabindex: -1 },
      `удалить`
    );

  if (buttons.gradeWord) {
    const ankibtn = createElement(
      cardFooter,
      'div',
      ['btn-group', 'difficulty-buttons'],
      { role: 'group' }
    );
    createElement(
      ankibtn,
      'button',
      ['btn', 'btn-sm', 'btn-success', 'button-size'],
      { type: 'button', 'data-btn': 'easy' },
      `Легко`
    );
    createElement(
      ankibtn,
      'button',
      ['btn', 'btn-sm', 'btn-info', 'button-size'],
      { type: 'button', 'data-btn': 'medium' },
      `Хорошо`
    );
    createElement(
      ankibtn,
      'button',
      ['btn', 'btn-sm', 'btn-warning', 'button-size'],
      { type: 'button', 'data-btn': 'hard' },
      `Сложно`
    );
  }

  return card;
}
