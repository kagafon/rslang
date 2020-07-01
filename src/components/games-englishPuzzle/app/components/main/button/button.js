/* eslint-disable import/no-unresolved */
// import Service from 'components/games-englishPuzzle/app/service';
// import SourceData from 'components/games-englishPuzzle/app/main/source-data/source-data';

export default class Button {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const buttonBlock = document.createElement('div');
    buttonBlock.classList.add('button-block');

    buttonBlock.innerHTML = `
     <button class="btn btn-primary btn-i-dont-know">I dont now</button>
     <button class ="btn btn-primary btn-check">Check</button>
     <button class ="btn btn-primary btn-continue">Continue</button>
     <button class ="btn btn-primary btn-results">Results</button>
    `;
    wrapper.append(buttonBlock);
  }

  static async btnSolution() {
    // const wordsArray = await service.wordRequest();
    // const arrWord = [];
    // wordsArray.filter((reading, index) => {
    //   if (index < 10) {
    //     arrWord.push(
    //       reading.textExample
    //         .replace(/<\/?[^>]+>/g, '')
    //         .replace(/[.,]/g, '')
    //         .trim()
    //         .split(' ')
    //     );
    //   }
    // });
    // const wordsCount = localStorage.getItem('wordsCount');
    // const resultLine = document.querySelectorAll('.results-line');
    // const sourceLine = document.querySelector('.source-line');
    // const arrWordResult = document.querySelectorAll('.result');
    // if (
    //   document.querySelectorAll('.mistake').length > 0 ||
    //   arrWordResult.length > 0
    // ) {
    //   resultLine[+wordsCount].innerHTML = '';
    //   arrWord[+wordsCount].forEach((item) => {
    //     const card = document.createElement('div');
    //     card.classList.add('words-card');
    //     card.classList.add('result');
    //     card.textContent = item;
    //     resultLine[+wordsCount].append(card);
    //     sourceLine.innerHTML = '';
    //   });
    //   document.querySelector('.btn-i-dont-know').style.display = 'none';
    // } else if (arrWord) {
    //   arrWord[+wordsCount].forEach((item) => {
    //     const card = document.createElement('div');
    //     card.classList.add('words-card');
    //     card.classList.add('result');
    //     card.textContent = item;
    //     resultLine[+wordsCount].append(card);
    //     sourceLine.innerHTML = '';
    //   });
    //   service.bidCounter();
    // }
    // this.btnCheck();
  }

  static btnCheck() {
    // const count = localStorage.getItem('wordsCount');
    // const word = document.querySelectorAll('.result');
    // const wordMistake = document.querySelectorAll('.result-mistake');
    // const arrWord = [];
    // if (word.length === 0 && +count !== 9) {
    //   wordMistake.forEach((item) => {
    //     arrWord.push(item);
    //   });
    // } else {
    //   word.forEach((item) => {
    //     arrWord.push(item);
    //   });
    // }
    // service.bitValidation(arrWord);
  }

  static btnContinue() {
    // const count = localStorage.getItem('wordsCount');
    // localStorage.setItem('wordsCount', `${+count + 1}`);
    // const resultLine = document.querySelectorAll('.results-line');
    // const sourceLine = document.querySelector('.source-line');
    // const wordMistake = document.querySelectorAll('.result-mistake');
    // localStorage.setItem('appendCard', '');
    // wordMistake.forEach((item) => {
    //   item.removeAttribute('draggable', 'true');
    //   item.classList.remove('result-mistake');
    // });
    // if (+count === 9) {
    //   const level = localStorage.getItem('level');
    //   const select = document.querySelector('.dropdown-select-page');
    //   const sourceBlock = document.querySelectorAll('.source-line');
    //   const resultsBlock = document.querySelectorAll('.results-line');
    //   localStorage.setItem('page', +select.value);
    //   localStorage.setItem('wordsCount', '0');
    //   sourceBlock.forEach((item) => {
    //     item.innerHTML = '';
    //   });
    //   resultsBlock.forEach((item) => {
    //     item.innerHTML = '';
    //   });
    //   controls.showSelectedLevel();
    //   const page = localStorage.getItem('page');
    //   sourceData.cardGeneration(level, page);
    //   document.querySelector('.btn-results').style.display = 'none';
    //   document.querySelector('.btn-i-dont-know').style.display = 'block';
    // } else {
    //   resultLine.forEach((item) => {
    //     item.classList.remove('line-active');
    //   });
    //   sourceLine.innerHTML = '';
    //   resultLine[+count + 1].classList.add('line-active');
    //   sourceData.cardGeneration();
    //   document.querySelector('.btn-i-dont-know').style.display = 'block';
    // }
  }

  static disabledButtons() {
    document.querySelector('.btn-i-dont-know').style.display = 'block';
    document.querySelector('.btn-results').style.display = 'none';
    document.querySelector('.btn-check').style.display = 'none';
    document.querySelector('.btn-continue').style.display = 'none';
  }

  static init() {
    this.render();
    // Service.btnClick();
  }
}
