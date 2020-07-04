import Service from 'components/phrase-wizard-page/app/service';
import Voice from 'components/phrase-wizard-page/app/voice';
import { createElement } from 'helpers/dom';
import Statisctic from 'components/phrase-wizard-page/app/statisctic';
import Button from 'components/phrase-wizard-page/app/button';

export default class GameWords {
  static init(){
    const words = Service.words;
    this.startPrase = words[this.round];
    this.render(this.startPrase);
    Voice.init();
    Button.init();
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
    imagePhrase.classList.add('ph-wiz-image');
    wrapper.append(imagePhrase);
    this.wordsTranslate = createElement(wrapper, 'div', ['translate', 'ph-wiz'], {}, this.startPrase.textExampleTranslate);
    this.wordsTranslate.classList.remove('show-oneself');

    wordsArray.forEach(template => {
      this.template = template.replace(/[a-zA-Z]/g, "•");
      createElement(wordsBlock, 'span', ['temlate-words'], {style: 'color: black'}, this.template);

    });
    wrapper.append(wordsBlock);
    this.gameWords = wordsArray;
    this.game();
    console.log(this.gameWords);
  }

  static game() {
    this.numberWords = 0;
    this.allWords = this.gameWords.length;
    this.wordsBlock = document.querySelector('.wordsblock');
    this.wordsTranslate = document.querySelector('.translate');
    this.keyListener;
    

    //wordCheck();
    //function wordCheck() {
  
 
  //keyListener(event) {
      this.keyListener = function (event) {
        if (GameWords.allWords > GameWords.numberWords && event.code == `Key${GameWords.gameWords[GameWords.numberWords].charAt(0).toUpperCase()}`) {
          GameWords.wordsBlock.children[GameWords.numberWords].innerText = '';
          GameWords.wordsBlock.children[GameWords.numberWords].innerText = GameWords.gameWords[GameWords.numberWords];
          GameWords.wordsBlock.children[GameWords.numberWords].classList.add('correct');
          ++GameWords.numberWords;
          Statisctic.count(0, 1);
          GameWords.wordsTranslate.classList.remove('show-oneself');
          if(GameWords.numberWords === GameWords.allWords) {
            GameWords.wordsTranslate = document.querySelector('.translate');
            GameWords.wordsTranslate.classList.add('show-oneself');
            document.removeEventListener('keydown', GameWords.keyListener);
          }
        }else if(GameWords.allWords > GameWords.numberWords){
          GameWords.wordsBlock.children[GameWords.numberWords].innerText = '';
          GameWords.wordsBlock.children[GameWords.numberWords].innerText = GameWords.gameWords[GameWords.numberWords];
          GameWords.wordsBlock.children[GameWords.numberWords].classList.add('incorrect'); 
          ++GameWords.numberWords;
          Statisctic.count(1, 0);
          GameWords.wordsTranslate.classList.remove('show-oneself');
          if(GameWords.numberWords === GameWords.allWords) {
            GameWords.wordsTranslate = document.querySelector('.translate');
            GameWords.wordsTranslate.classList.add('show-oneself');
            document.removeEventListener('keydown', GameWords.keyListener);
          }
        }
      }  



     // }; 
    document.addEventListener('keydown', GameWords.keyListener);

     // this.keyListenerOff = function (){
     //   document.removeEventListener('keydown', keyListener);
     //   console.log('listener off')
     // };
    //}

  }

  //static keyListener(event){

  //}

  /*static nextRound() {
    document.removeEventListener('keydown', this.keyListener);
  } 
*/
  //const keyListener = function(event) {
       /* switch (true) {
          case allWords > numberWords && event.code == `Key${gameWords[numberWords].charAt(0).toUpperCase()}`:
            wordsBlock.children[numberWords].innerText = '';
            wordsBlock.children[numberWords].innerText = gameWords[numberWords];
            wordsBlock.children[numberWords].classList.add('correct');
            ++numberWords;
            Statisctic.count(0, 1);
            wordsTranslate.classList.remove('show-oneself');
            break;
          case allWords > numberWords:
            wordsBlock.children[numberWords].innerText = '';
            wordsBlock.children[numberWords].innerText = gameWords[numberWords];
            wordsBlock.children[numberWords].classList.add('incorrect'); 
            ++numberWords;
            Statisctic.count(1, 0);
            wordsTranslate.classList.remove('show-oneself');
            break;
          case numberWords === allWords:
            wordsTranslate.classList.add('show-oneself');
            break;
        } */
}