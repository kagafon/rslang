import { createElement } from 'helpers/dom';
import { hideWord } from 'helpers/helpersForMainPage';

export default function createCard(wordInit, buttons, prompts) {
  const {
    word,
    imageSrc,
    textMeaning,
    textExample,
    transcription,
    wordTranslate,
    textMeaningTranslate,
    textExampleTranslate,
    id,
  } = wordInit;

  const card = createElement('', 'div', ['card', 'card_size'], {}, '');
  const cardHeader = createElement(
    card,
    'div',
    ['card-header', 'd-flex', 'justify-content-between'],
    {},
    ``
  );
  const cardHeaderButtons = createElement(
    cardHeader,
    'div',
    ['d-flex', 'justify-content-center', 'btn-group'],
    { role: 'group' },
    ``
  );
  if (buttons.removeWord)
    createElement(
      cardHeaderButtons,
      'button',
      ['btn', 'btn-danger'],
      { 'data-btn': 'delete', type: 'button', tabindex: -1 },
      `удалить слово`
    );
  if (buttons.gradeWord)
    createElement(
      cardHeaderButtons,
      'button',
      ['btn', 'btn-warning'],
      { 'data-btn': 'complex', type: 'button', tabindex: -1 },
      `сложное слово`
    );

  createElement(
    cardHeader,
    'span',
    ['material-icons', 'md-100', 'volume'],
    { 'data-btn': 'volume' },
    `volume_up`
  );
  const cardBody = createElement(
    card,
    'div',
    [
      'card-body',
      'd-flex',
      'justify-content-center',
      'align-items-center',
      'flex-column',
    ],
    {},
    ``
  );
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
  createElement(cardBody, 'p', ['card-text'], {}, `${wordTranslate}`);
  if (prompts.translation) {
    createElement(cardBody, 'p', ['card-text', 'translate'], {}, `${word}`);
  }
  if (prompts.meaning) {
    const sentence = hideWord(word, textMeaning);
    createElement(
      cardBody,
      'p',
      ['card-text', 'card-text-meaning'],
      {},
      `${sentence}`
    );
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
    const sentence = hideWord(word, textExample);
    createElement(
      cardBody,
      'p',
      ['card-text', 'card-text-example'],
      {},
      `${sentence}`
    );
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
    createElement(cardImage, 'img', ['card-img'], { src: `${imageSrc}` }, ``);
  }

  const cardFooter = createElement(
    card,
    'div',
    ['card-footer', 'd-flex', 'justify-content-between'],
    {},
    ``
  );
  createElement(
    cardFooter,
    'button',
    ['btn', 'btn-primary'],
    { value: 1, tabindex: -1, type: 'submit', id: 'submitt1' },
    `Далее`
  );
  if (buttons.showAnswer)
    createElement(
      cardFooter,
      'button',
      ['btn', 'btn-info'],
      {
        value: 1,
        tabindex: -1,
        type: 'submit',
        'data-btn': 'answer',
        id: 'submitt2',
      },
      `Показать ответ`
    );

  const ankibtn = createElement(
    cardFooter,
    'div',
    ['btn-group', 'difficulty-buttons'],
    { role: 'group' },
    ``
  );
  createElement(
    ankibtn,
    'button',
    ['btn', 'btn-sm', 'btn-success'],
    { type: 'button', 'data-btn': 'easy' },
    `Легко`
  );
  createElement(
    ankibtn,
    'button',
    ['btn', 'btn-sm', 'btn-info'],
    { type: 'button', 'data-btn': 'medium' },
    `Хорошо`
  );
  createElement(
    ankibtn,
    'button',
    ['btn', 'btn-sm', 'btn-warning'],
    { type: 'button', 'data-btn': 'hard' },
    `Сложно`
  );
  return card;
}
