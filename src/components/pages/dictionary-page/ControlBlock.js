import { createElement } from 'helpers/dom';
import classMap from './wordTypes';

export default class ControlBlock {
  constructor(container, refreshView) {
    const area = createElement(container, 'div', ['control-block']);
    const btnGroup = createElement(
      area,
      'div',
      ['btn-group', 'btn-group-toggle'],
      { 'data-toggle': 'buttons' }
    );
    Object.keys(classMap).forEach((x) => {
      const val = classMap[x];
      const label = createElement(
        btnGroup,
        'label',
        val.selected
          ? ['btn', 'btn-sm', `btn-${val.class}`, 'active']
          : ['btn', 'btn-sm', `btn-${val.class}`],
        { id: x }
      );
      createElement(label, 'input', [], {
        type: 'checkbox',
        autocomplete: 'off',
      });
      label.addEventListener('click', (evt) => {
        classMap[
          evt.currentTarget.id
        ].selected = !evt.currentTarget.classList.contains('active');
        refreshView();
      });
      label.appendChild(document.createTextNode(val.title));
    });
  }
}
