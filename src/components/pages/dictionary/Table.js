import { createElement } from 'helpers/dom';

export default class Table {
  constructor(container, columnsToShow, actions) {
    this.columnsToShow = columnsToShow;
    this.actions = actions;
    const tableDiv = createElement(container, 'div', [
      'overflow-auto',
      'd-flex',
      'align-center',
      'justify-content-center',
      'table-container',
    ]);
    this.table = createElement(tableDiv, 'table', [
      'table',
      'table-striped',
      'table-hover',
      'table-sm',
      'text-center',
      'text-white',
    ]);
    this.thead = createElement(this.table, 'thead');
    columnsToShow.forEach((x) => {
      const th = createElement(this.thead, 'th', x.className, {}, x.title);
      if (x.sort) {
        th.classList.add('sortable');
        th.addEventListener('click', (evt) => {
          const newSortOrder = evt.target.classList.contains('sort-asc')
            ? -1
            : 1;
          this.words.sort((a, b) => newSortOrder * x.sort(a, b));
          this.reloadRows();
          this.thead
            .querySelectorAll('th')
            .forEach((head) => head.classList.remove('sort-desc', 'sort-asc'));
          evt.target.classList.add(newSortOrder > 0 ? 'sort-asc' : 'sort-desc');
        });
      }
    });
    this.tbody = createElement(this.table, 'tbody');
  }

  reloadRows(words) {
    if (words) this.words = words;
    this.tbody.innerHTML = '';
    this.words.forEach((x) => {
      const row = createElement(this.tbody, 'tr');
      this.columnsToShow.forEach((col) => {
        if (x[col.name]) {
          const td = createElement(row, 'td', col.className, {});
          if (col.element) {
            col.element(td, x);
          } else {
            td.innerText = x[col.name];
          }
        }
      });
      const actionsCell = createElement(row, 'td');
      const buttonGroup = createElement(actionsCell, 'div', ['btn-group'], {
        role: 'group',
      });
      this.actions.forEach((btn) => {
        const btnElement = createElement(
          buttonGroup,
          'button',
          ['btn', 'btn-sm', ...btn.className],
          { type: 'button' },
          btn.text
        );
        createElement(btnElement, 'i', ['material-icons'], {}, btn.icon);
        btnElement.addEventListener('click', (evt) => {
          evt.preventDefault();
          btn.action(x, evt.currentTarget);
        });
      });
    });
  }
}
