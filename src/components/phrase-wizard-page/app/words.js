import Service from 'components/phrase-wizard-page/app/service';
import Voice from 'components/phrase-wizard-page/app/voice';
import { createElement } from 'helpers/dom';
import Statisctic from 'components/phrase-wizard-page/app/statistic';
import Button from 'components/phrase-wizard-page/app/button';

export default class GameWords {
  static init(words){
    
    this.startPrase = words[0];
    this.render(this.startPrase);
    Voice.init();
    Button.init();
    Service.spinnerOff();
    console.log(this.startPrase);
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
    createElement(wrapper, 'div', ['translate', 'ph-wiz'], {}, this.startPrase.textExampleTranslate);

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
        }else if(numberWords = gameWords.length) {
          const wordsTranslate = document.querySelector('.translate');
          wordsTranslate.classList.add('show-oneself');
        }
      });  
    } 
    
  }

}