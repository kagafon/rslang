import Service from 'components/phrase-wizard-page/app/service';
import Voice from 'components/phrase-wizard-page/app/voice';
import { createElement } from 'helpers/dom';
import Statisctic from 'components/phrase-wizard-page/app/statistic';

export default class GameWords {
  static init(words){
    Voice.init();
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
          Statisctic.count(0, 1);
        }else if(gameWords.length > numberWords){
          wordsBlock.children[numberWords].innerText = '';
          wordsBlock.children[numberWords].innerText = gameWords[numberWords];
          wordsBlock.children[numberWords].classList.add('incorrect'); 
          ++numberWords;
          Statisctic.count(1, 0);
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

}