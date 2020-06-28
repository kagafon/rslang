/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
// import Service from 'components/sprint-game/component/service';
// import Voice from 'components/sprint-game/component/words/voice';
// import store from 'components/sprint-game/component/storage';
import { Words } from 'services/backend';
import './game.scss';

export default class gamePage {
  init() {
    const main = createElement(null, 'div', ['main'], {}, '');
    const points = createElement(main, 'div', ['points'], {}, '0');
    const gameWithTimer = createElement(main, 'div', ['game-timer'], {}, '');
    const gameBlock = createElement(
      gameWithTimer,
      'div',
      ['game-block'],
      {},
      ''
    );
    const timer = createElement(gameWithTimer, 'div', ['timer'], {}, '');
    const dots = createElement(gameBlock, 'div', ['dot'], {}, '');
    const dots1 = createElement(dots, 'div', ['dots', 'dots1'], {}, '');
    const dots2 = createElement(dots, 'div', ['dots', 'dots2'], {}, '');
    const dots3 = createElement(dots, 'div', ['dots', 'dots3'], {}, '');
    const img = createElement(
      gameBlock,
      'img',
      ['game-img'],
      { src: 'assets/images/sprint-game/dog.png' },
      ''
    );
    const engWord = createElement(gameBlock, 'div', ['engWord'], {}, 'dog');
    const rusWord = createElement(gameBlock, 'div', ['rusWord'], {}, 'собака');
    const button = createElement(gameBlock, 'div', ['button'], {}, '');
    const buttonF = createElement(
      button,
      'button',
      ['button-false'],
      { type: 'button' },
      'Неверно'
    );
    const buttonT = createElement(
      button,
      'button',
      ['button-true'],
      { type: 'button' },
      'Верно'
    );
    const btn = createElement(main, 'div', ['btn-key'], {}, '');
    const btnF = createElement(
      btn,
      'btn',
      ['btn-false'],
      { type: 'button' },
      ''
    );
    const btnT = createElement(
      btn,
      'btn',
      ['btn-true'],
      { type: 'button' },
      ''
    );
    const volume = createElement(
      btn,
      'span',
      ['material-icons', 'md-100', 'md-light', 'volume'],
      {
        style: 'font-size: 40px; position: relative; right: -130px; top: 13px',
      },
      'volume_up'
    );
    this.timer(timer);
    this.wordsRequest(0);
    this.wordGeneration();
    return main;
  }

  timer(timer) {
    timer.innerHTML = `<div class="countdown" id="countdown">
        <div class="countdown-number">
            <span class="countdown-time seconds">
        </div>
    </div>
  `;

    function startTimer(from, to) {
      let current = from;

      setTimeout(function go() {
        document.querySelector('.seconds').innerHTML = `0${current}`.slice(-2);
        if (current > to) {
          setTimeout(go, 1000);
        } else {
          document.querySelector('.seconds').style.color = 'red';
          document.querySelector('.seconds').innerHTML = `Time is Up`;
        }
        current -= 1;
      }, 1000);
    }
    startTimer(60, 0);
    return this.timer;
  }

  async wordsRequest(level = 0) {
    try {
      // this.spinnerOn();
      const rndPage = this.randomInteger(0, 59);
      const words = await Words.getWordsForRound(+level, rndPage, 10, [
        'image',
        'audio',
      ]);
      console.log(words);
    } catch (error) {}
  }

  async wordGeneration() {
    try {
      // const stage = store.getState();
      const arrWords = await this.wordsRequest(0);

      console.log(arrWords);
      /*
      const wordsCard = document.querySelectorAll('.words');
      arrWords.length = 3;
      if (arrWords.length < 10) {
        Popap.init();
      } 

      store.setState({ word: arrWords[0 /* stage.round ] });
      this.wordsTranslate(arrWords[stage.round].wordTranslate);

      const wordsCardFilter = arrWords.filter(function filter(item) {
        return item.wordTranslate !== arrWords[stage.round].wordTranslate;
      });

      wordsCard.forEach((item) => {
        const rndNum = this.randomInteger(0, wordsCardFilter.length - 1);

        if (item.textContent !== arrWords[stage.round].wordTranslate) {
          item.textContent = wordsCardFilter[rndNum].wordTranslate;
          wordsCardFilter.splice(rndNum, 1);
        }
      });
      Voice.autoPlayAudio(); */
    } catch (error) {}
  }
}
