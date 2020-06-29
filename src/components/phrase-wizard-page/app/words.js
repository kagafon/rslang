/*import Service from 'components/games-AudioCall/app/service';
import store from 'components/games-AudioCall/app/components/storage';
import Results from 'components/games-AudioCall/app/components/main/results/results';
import Statisctic from 'components/games-AudioCall/app/components/main/statistic/statistic';
import Voice from 'components/games-AudioCall/app/components/main/voiceBlock/voice';
import statiscticStore from 'components/games-AudioCall/app/components/statistic-storage'; */
import Service from 'components/phrase-wizard-page/app/service';
import { createElement } from 'helpers/dom';

export default class GameWords {
  static init(words){
    console.log(words[0]);
    this.render(words[0]);
    Service.spinnerOff();
  }

  static render(word) {
    const wrapper = document.querySelector('.wrapper');
    const wordsBlock = createElement(wrapper, 'div', ['wordsblock']);
    let phraseRound = word.textExample.replace(/[/]/, "");

    phraseRound = phraseRound.replace(/<b>/g, "");
    phraseRound.substring(phraseRound.length - 1, phraseRound.length) == "." ? phraseRound = phraseRound.substring(0, phraseRound.length - 1) : true;
    const wordsArray = phraseRound.split(' ');

    const imagePhrase = document.createElement("img");
    imagePhrase.src = word.imageSrc;
    imagePhrase.alt = word.word;
    wrapper.append(imagePhrase);

    wordsArray.forEach(template => {
      this.template = template.replace(/[a-zA-Z]/g, "•");
      createElement(wordsBlock, 'span', ['temlate-words'], {style: 'color: black'}, this.template);

    });
    wrapper.append(wordsBlock);
    this.game(wordsArray);
    console.log(wordsArray);
  }

  static game(gameWords) {
    let correctWord = 0;
    let incorrectWord = 0;
    let numberWords = 0;
    const wordsBlock = document.querySelector('.wordsblock');

    wordCheck();
    function wordCheck() {
      document.addEventListener('keydown', function(event) {
        if (gameWords.length > numberWords && event.code == `Key${gameWords[numberWords].charAt(0).toUpperCase()}`) {
          wordsBlock.children[numberWords].innerText = '';
          wordsBlock.children[numberWords].innerText = gameWords[numberWords];
          wordsBlock.children[numberWords].classList.add('correct');
          ++numberWords;
          ++correctWord;
        }else if(gameWords.length > numberWords){
          wordsBlock.children[numberWords].innerText = '';
          wordsBlock.children[numberWords].innerText = gameWords[numberWords];
          wordsBlock.children[numberWords].classList.add('incorrect'); 
          ++numberWords;
          ++incorrectWord;
        }else {
          return
        }
      });  
    } 
    
  }

  static rightChoice(item) {
    const arrWordsCard = document.querySelectorAll('.words');
    const arrWordsNumber = document.querySelectorAll('.number-words');

    item.children[0].style.display = 'none';
    item.children[1].style.display = 'block';

    document.querySelector('.hint').style.display = 'none';
    document.querySelector('.next').style.display = 'block';

    arrWordsNumber.forEach((i) => {
      if (i.textContent !== item.children[0].textContent) {
        i.classList.add('words-opacity');
      }
    });

    arrWordsCard.forEach((i) => {
      if (i.textContent !== item.children[3].textContent) {
        i.classList.add('words-opacity');
      }
    });
  }

  static incorrectChoice(item) {
    const arrWordsCard = document.querySelectorAll('.words');
    const arrWordsNumber = document.querySelectorAll('.number-words');
    const stage = store.getState();

    item.children[0].style.display = 'none';
    item.children[2].style.display = 'block';

    document.querySelector('.hint').style.display = 'none';
    document.querySelector('.next').style.display = 'block';

    arrWordsNumber.forEach((i) => {
      if (i.textContent !== item.children[0].textContent) {
        i.classList.add('words-opacity');
      }
    });

    arrWordsCard.forEach((i) => {
      if (i.textContent !== item.children[3].textContent) {
        i.classList.add('words-opacity');
      } else {
        stage.correct.children[0].style.display = 'none';
        stage.correct.children[1].style.display = 'block';
      }
    });
  }

  static wordChoice() {
    const arrWords = document.querySelectorAll('.wrapper-words');
    arrWords.forEach((item) => {
      item.addEventListener('click', () => {
        const state = store.getState();
        const progress = document.querySelector('.progress-bar');

        const width = String(progress.style.width).slice(0, -1);
        progress.style.width = `${+width + 10}%`;

        store.setState({ round: state.round + 1 });

        if (item.children[3].textContent === state.word.wordTranslate) {
          store.setState({ correctChoice: state.correctChoice + 1 });
          statiscticStore.setLearnedState([state.word]);

          this.rightChoice(item);
          Results.init();
        } else {
          statiscticStore.setUnexploredState([state.word]);

          this.incorrectChoice(item);
          Results.init();
        }

        setTimeout(() => {
          if (state.round === 9) {
            Service.spinnerOn();
            Statisctic.init();
          }
        }, 2000);
      });
    });
  }

  static wordsTranslate(text) {
    const wordsCard = document.querySelectorAll('.words');
    const cardsWrapper = document.querySelectorAll('.wrapper-words');

    const randNum = this.randomInteger(0, 4);
    wordsCard[randNum].textContent = text;
    store.setState({ correct: cardsWrapper[randNum] });
  }

  static async wordGeneration() {
    const stage = store.getState();
    const arrWords = await Service.wordsRequest(stage.groupe);
    const wordsCard = document.querySelectorAll('.words');

    store.setState({ word: arrWords[stage.round] });
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
    Service.spinnerOff();
    Voice.autoPlayAudio();
  }

  static randomInteger(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  //static init() {
    //this.render();
    //this.wordChoice();
    //this.wordGeneration();
  //}
}