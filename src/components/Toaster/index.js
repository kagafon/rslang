import { Toast } from 'bootstrap';

import { createElement } from 'helpers/dom';

const darkTextTypes = ['warning'];

class Toaster {
  constructor(container) {
    this.container = createElement(container, 'div', ['toaster-container']);
  }

  createToast(message, type, title) {
    const toast = createElement(this.container, 'div', ['toast'], {
      role: 'alert',
      'aria-live': 'assertive',
      'aria-atomic': 'true',
      'data-delay': 2000,
    });
    if (type)
      toast.classList.add(
        `bg-${type}`,
        darkTextTypes.includes(type) ? 'text-dark' : 'text-white'
      );
    if (title) {
      createElement(
        createElement(toast, 'div', ['toast-header']),
        'strong',
        ['mr-auto'],
        {},
        title
      );
    }
    createElement(toast, 'div', ['toast-body'], {}, message);
    const opts = {
      attributeFilter: ['class'],
    };
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          mutation.target.classList.contains('hide')
        ) {
          mo.disconnect();
          toast.remove();
        }
      });
    });
    mo.observe(toast, opts);
    new Toast(toast).show();
  }
}

export default new Toaster(document.body);
