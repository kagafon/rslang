/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
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
    this.getUserWords();
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

  async getUserWords(level, preloads) {
    try {
      const rndPage = this.randomInteger(0, 59);
      const wordsForRound = await Words.getWordsForRound(
        4,
        rndPage,
        10,
        preloads
      );
      console.log(wordsForRound);
      for (let i = 0; i < wordsForRound.length; i += 1) {
        document.querySelector('.engWord').textContent = wordsForRound[i].word;
        document.querySelector('.rusWord').textContent =
          wordsForRound[i].wordTranslate;
      }
      return wordsForRound;
    } catch (e) {
      console.error('error');
      return 'd';
    }
  }

  randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  /*
  async wordGeneration(preload) {
    try {
      // const stage = store.getState();
      const arrWords = await Service.getUserWords(0, preload);

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
      Voice.autoPlayAudio(); 
    } catch (error) {}
  } */
}
