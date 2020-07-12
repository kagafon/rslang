import { createElement } from 'helpers/dom';
import { User } from 'services/backend';

import Toaster from 'components/Toaster';
import { LEVELS_COUNT } from 'services/config';
import ControlBlock from './ControlBlock';
import TextControl from './TextControl';
import ToggleControl from './ToggleControl';
import RangeControl from './RangeControl';
import GroupControl from './GroupControl';
import ControlsContainer from './ControlsContainer';
import LabelControl from './LabelControl';
import Modal from './Modal';
import ButtonControl from './ButtonControl';

export default class SettingsPage {
  constructor() {
    this.user = JSON.parse(JSON.stringify(User.getCurrentUser()));
    this.modal = new Modal(this.container);
    this.controls = [
      {
        name: 'Общие настройки',
        items: [
          {
            label: 'Учетная запись',
            ClassName: ControlsContainer,
            items: [
              {
                label: 'Имя',
                name: 'username',
                source: this.user.settings,
                ClassName: TextControl,
              },
              {
                label: 'Email',
                name: 'email',
                source: this.user,
                ClassName: TextControl,
                readonly: true,
              },
              {
                label: 'Дата регистрации',
                name: 'creationDate',
                source: this.user.settings,
                readonly: true,
                ClassName: TextControl,
                value: (
                  new Date(this.user.settings.creationDate) || new Date()
                ).toLocaleString(),
              },
            ],
          },
          {
            label: 'Подсказки',
            ClassName: ControlsContainer,
            items: [
              {
                label: 'Перевод',
                name: 'translation',
                source: this.user.settings.prompts,
                ClassName: ToggleControl,
              },
              {
                label: 'Пример',
                name: 'example',
                source: this.user.settings.prompts,
                ClassName: ToggleControl,
              },
              {
                label: 'Значение',
                name: 'meaning',
                source: this.user.settings.prompts,
                ClassName: ToggleControl,
              },
              {
                label: 'Транскрипция',
                name: 'transcription',
                source: this.user.settings.prompts,
                ClassName: ToggleControl,
              },
              {
                label: 'Изображение',
                name: 'image',
                source: this.user.settings.prompts,
                ClassName: ToggleControl,
              },
            ],
          },
          {
            label: 'Управление',
            ClassName: ControlsContainer,
            items: [
              {
                label: 'Показать ответ',
                name: 'showAnswer',
                source: this.user.settings.buttons,
                ClassName: ToggleControl,
              },
              {
                label: 'Удалить слово',
                name: 'removeWord',
                source: this.user.settings.buttons,
                ClassName: ToggleControl,
              },
              {
                label: 'Изменить сложность',
                name: 'gradeWord',
                source: this.user.settings.buttons,
                ClassName: ToggleControl,
              },
            ],
          },
        ],
      },
      {
        name: 'Обучение',
        items: [
          {
            label: 'Карточек в день',
            name: 'maxCardsPerDay',
            source: this.user.settings.learning,
            max: 80,
            min: 5,
            ClassName: RangeControl,
          },
          {
            label: 'Новых слов в день',
            ClassName: ControlsContainer,
            items: this.user.settings.learning.levels.map((x, idx) => ({
              label: `Группа ${idx + 1}`,
              source: this.user.settings.learning.levels[idx],
              max: 30,
              min: 0,
              ClassName: GroupControl,
              showModal: this.modal.show.bind(this.modal),
            })),
          },
        ],
      },
      {
        name: 'Мини-игры',
        items: [
          {
            label: 'Спринт',
            ClassName: ControlsContainer,
            items: [
              {
                label: 'Рекорд',
                value: this.user.settings.games.sprint.maxScore,
                ClassName: LabelControl,
              },
            ],
          },
          {
            label: 'Раунды',
            ClassName: ControlsContainer,
            items: Object.keys(this.user.settings.games)
              .filter((x) => this.user.settings.games[x].levelPages)
              .map((x) => ({
                label: this.user.settings.games[x].name,
                onClick: this.modal.show.bind(
                  this.modal,
                  `Раунды ${this.user.settings.games[x].name}`,
                  [
                    'Сложность 1',
                    'Сложность 2',
                    'Сложность 3',
                    'Сложность 4',
                    'Сложность 5',
                    'Сложность 6',
                  ],
                  [0, 1, 2, 3, 4, 5],
                  this.user.settings.games[x].levelPages,
                  this.user.settings.games[x].max ||
                    new Array(LEVELS_COUNT).fill(60),
                  new Array(LEVELS_COUNT).fill(1),
                  -1
                ),
                ClassName: ButtonControl,
              })),
          },
        ],
      },
    ];
    this.settingValueMap = [];
    this.container = createElement(null, 'form', [
      'settings-page',
      'container-fluid',
    ]);

    const controlsArea = createElement(this.container, 'div', [
      'controls-area',
    ]);

    this.controls.forEach((x) => {
      ControlBlock.render(
        controlsArea,
        x.name,
        x.items.map((item) => {
          const control = new item.ClassName(item);
          if (!item.readonly) {
            this.settingValueMap.push({
              name: item.name,
              source: item.source,
              control,
              preprocessValue: item.preprocessValue,
            });
          }
          return control;
        })
      );
    });

    createElement(
      createElement(this.container, 'div', ['control-block']),
      'button',
      ['btn', 'btn-primary'],
      { type: 'submit' },
      'Сохранить'
    );

    this.spinner = createElement(null, 'div', ['spinner-container']);
    createElement(this.spinner, 'div', ['modal-backdrop', 'fade', 'show']);
    createElement(
      createElement(this.spinner, 'div', ['spinner-border'], {
        role: 'status',
      }),
      'span',
      ['sr-only']
    );
    this.spinner.addEventListener('transitionend', (evt) => {
      if (!this.spinnerShown) evt.currentTarget.remove();
    });

    this.container.addEventListener('submit', async (evt) => {
      evt.preventDefault();

      if (
        ['translation', 'meaning', 'example'].every(
          (x) => !this.user.settings.prompts[x]
        )
      ) {
        Toaster.createToast(
          'Хотя бы одна следующих подсказок должна быть выбрана: Перевод, Значение, Пример',
          'warning'
        );
        return;
      }

      this.showSpinner();
      try {
        await User.saveSettings(this.user.settings);
        Toaster.createToast(`Сохранено!`, 'success');
      } catch (err) {
        Toaster.createToast(`Ошибка сохранения: ${err}`, 'danger');
      }
      this.hideSpinner();
    });
  }

  init() {
    return this.container;
  }

  showSpinner() {
    if (!this.spinnerShown) {
      this.spinnerShown = true;
      this.spinner.classList.add('hidden');
      this.container.appendChild(this.spinner);
      this.spinner.classList.remove('hidden');
    }
  }

  hideSpinner() {
    this.spinnerShown = false;
    this.spinner.classList.add('hidden');
  }
}
