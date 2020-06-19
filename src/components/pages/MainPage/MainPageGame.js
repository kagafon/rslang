import { createElement } from 'helpers/dom';

class MainPageGame {
  create() {
    this.container = createElement(
      '',
      'div',
      ['d-flex', 'justify-content-center', 'align-items-center', 'flex-column'],
      {},
      ''
    );
  }

  createCarusel() {
    const words = ['hello', 'green', 'winter'];
    const controls = ['prev', 'next'];
    const carousel = createElement(
      this.container,
      'div',
      ['carousel', 'slide', 'carousel-fade', 'carousel-width'],
      {
        id: 'carouselExampleFade',
        'data-ride': 'carousel',
        'data-interval': 'false',
        'data-touch': 'true',
        'data-wrap': 'false',
      },
      ''
    );
    const carouselInner = createElement(
      carousel,
      'div',
      ['carousel-inner'],
      {},
      ''
    );
    words.forEach((word, index) => {
      const item = '';
      if (index === 0) {
        const item = createElement(
          carouselInner,
          'div',
          ['carousel-item', 'active'],
          {},
          ''
        );
        item.appendChild(this.createCard(word));
      } else {
        const item = createElement(
          carouselInner,
          'div',
          ['carousel-item'],
          {},
          ''
        );
        item.appendChild(this.createCard(word));
      }
    });
    controls.forEach((control) => {
      const arrow = createElement(
        carousel,
        'a',
        [`carousel-control-${control}`],
        {
          href: '#carouselExampleFade',
          role: 'button',
          'data-slide': `${control}`,
        },
        ''
      );
      createElement(
        arrow,
        'span',
        [`carousel-control-${control}-icon`],
        {
          'aria-hidden': 'true',
        },
        ''
      );
      createElement(arrow, 'span', [`sr-only`], {}, `${control}`);
    });
  }

  createCard(word) {
    const card = createElement('', 'div', ['card', 'card_size'], {}, '');
    createElement(card, 'div', ['card-header'], {}, `${word}`);
    const cardBody = createElement(card, 'div', ['card-body'], {}, ``);
    createElement(cardBody, 'h5', ['card-title'], {}, `Hello`);
    createElement(cardBody, 'p', ['card-text'], {}, `Hello world`);
    createElement(cardBody, 'button', ['btn', 'btn-primary'], {}, `go`);
    return card;
  }

  init() {
    this.create();
    this.createCarusel();
    return this.container;
  }
}

export default MainPageGame;
