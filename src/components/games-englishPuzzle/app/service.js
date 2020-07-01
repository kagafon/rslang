/* eslint-disable import/no-cycle */
import { Words } from 'services/backend';
// import { button } from './components/main/button/button';
// import { hints } from './components/main/header/hints/hints';

export default class Service {
  // eslint-disable-next-line consistent-return
  static async wordRequest(level = 0) {
    try {
      // this.spinnerOn();
      // const rndPage = this.randomInteger(0, 29);
      const words = await Words.getWordsForRound(+level, 1, 10, ['audio']);
      return words;
    } catch (error) {
      // Service.spinnerOff();
    }
  }

  async audioRequest() {
    const arrAudioUrl = await this.wordRequest();

    const arrUrl = [];
    arrAudioUrl.forEach((item) => {
      arrUrl.push(item.audioExample);
    });

    return arrUrl;
  }

  async translateRequest() {
    const arrWordTranslate = await this.wordRequest();
    const translate = [];
    arrWordTranslate.forEach((item) => {
      translate.push(item.textExampleTranslate);
    });
    return translate;
  }

  static puzzleMovement() {
    const card = document.querySelectorAll('.words-card');

    card.forEach((item) => {
      item.addEventListener('click', () => {
        if (!item.classList.contains('result-mistake')) {
          const wordsCount = localStorage.getItem('wordsCount');
          const resultLine = document.querySelectorAll('.results-line');
          item.classList.remove('source');
          item.classList.add('result');
          item.classList.add('result-mistake');
          resultLine[+wordsCount].append(item);
          this.bidCounter();
        }
      });

      item.addEventListener('mouseover', () => {
        item.addEventListener('dragstart', () => {
          setTimeout(() => {
            item.classList.add('hide');
          }, 0);
        });

        item.addEventListener('dragend', () => {
          setTimeout(() => {
            item.classList.remove('hide');
          }, 0);
        });
      });
    });
  }

  static puzzleDropRemove() {
    const source = document.querySelector('.source-line');

    source.addEventListener('dragover', (event) => {
      event.preventDefault();
    });

    source.addEventListener('dragenter', () => {
      source.classList.add('hovered');
    });

    source.addEventListener('dragleave', () => {
      source.classList.remove('hovered');
    });

    source.addEventListener('drop', () => {
      source.classList.remove('hovered');
      const card = document.querySelector('.hide');
      card.classList.remove('mistake');
      card.classList.remove('correct');
      card.classList.remove('result');
      card.classList.remove('result-mistake');
      card.classList.add('source');
      source.appendChild(card);
    });
  }

  static puzzleDrop() {
    const results = document.querySelectorAll('.results-line');

    this.puzzleDropRemove();

    results.forEach((item) => {
      item.addEventListener('dragover', (event) => {
        event.preventDefault();
      });

      item.addEventListener('dragenter', ({ target }) => {
        item.classList.add('hovered');
        localStorage.setItem('appendCard', `${target.textContent}`);
        target.classList.add('card-active');
      });

      item.addEventListener('dragleave', ({ target }) => {
        item.classList.remove('hovered');
        target.classList.remove('card-active');
      });

      item.addEventListener('drop', () => {
        item.classList.remove('hovered');
        const card = document.querySelector('.hide');
        if (
          !card.classList.contains('correct') &&
          !card.classList.contains('mistake')
        ) {
          card.classList.add('result');
        }
        card.classList.remove('source');

        card.classList.add('result-mistake');

        const appedWord = localStorage.getItem('appendCard');

        const arrWordss = document.querySelectorAll('.words-card');
        const lineActive = document.querySelector('.line-active');

        if (appedWord === '' && item.classList.contains('line-active')) {
          item.append(card);
          lineActive.classList.remove('card-active');
        } else {
          arrWordss.forEach((item) => {
            if (item.textContent === appedWord) {
              item.after(card);
              item.classList.remove('card-active');
            }
          });
        }

        this.bidCounter();
      });
    });
  }

  static async bitValidation(arrWord) {
    const wordsArray = await this.wordRequest();
    const autoPlay = localStorage.getItem('autoPlay');
    const arrWords = [];

    wordsArray.filter((reading, index) => {
      if (index < 10) {
        arrWords.push(
          reading.textExample
            .replace(/<\/?[^>]+>/g, '')
            .replace(/[.,]/g, '')
            .trim()
            .split(' ')
        );
      }
    });

    const wordsCount = localStorage.getItem('wordsCount');

    for (let i = 0; i < arrWord.length; i++) {
      if (arrWord[i].textContent === arrWords[+wordsCount][i]) {
        arrWord[i].classList.remove('mistake');
        arrWord[i].classList.remove('result');
        arrWord[i].classList.add('correct');
        document.querySelector('.btn-check').style.display = 'none';
        document.querySelector('.btn-continue').style.display = 'block';

        if (autoPlay === 'yes') {
          this.audioPlay();
        }
      } else {
        document.querySelector('.btn-i-dont-know').style.display = 'block';
        document.querySelector('.btn-continue').style.display = 'none';

        document.querySelector('.btn-check').style.display = 'block';

        arrWord[i].classList.remove('result');
        arrWord[i].classList.add('mistake');
      }
    }
    this.cardDisabledDraggable();
  }

  static bidCounter() {
    const sourceLine = document.querySelectorAll('.source');
    const count = localStorage.getItem('wordsCount');
    const word = document.querySelectorAll('.result');

    const arrWord = [];

    word.forEach((item) => {
      arrWord.push(item);
    });

    if (sourceLine.length === 0 && +count < 9) {
      document.querySelector('.btn-i-dont-know').style.display = 'none';
      document.querySelector('.btn-check').style.display = 'block';
    } else if (sourceLine.length === 0 && +count === 9) {
      document.querySelector('.btn-i-dont-know').style.display = 'none';
      document.querySelector('.btn-check').style.display = 'block';
      document.querySelector('.btn-results').style.display = 'block';
    }
  }

  static btnClick() {
    const userLogout = document.querySelector('.btn-logout');
    userLogout.addEventListener('click', () => {
      logout.userLogout();
    });

    const btnSolution = document.querySelector('.btn-i-dont-know');
    btnSolution.addEventListener('click', () => {
      button.btnSolution();
    });

    const btnCheck = document.querySelector('.btn-check');
    btnCheck.addEventListener('click', () => {
      button.btnCheck();
    });

    const btnContinue = document.querySelector('.btn-continue');
    btnContinue.addEventListener('click', () => {
      button.btnContinue();
      btnContinue.style.display = 'none';
      hints.btnTranslate();
      hints.btnAudio();
    });
  }

  static audioPlay() {
    const audio = document.querySelector('audio');
    const btnAudioPlay = document.querySelector('.audio-play');
    btnAudioPlay.classList.add('voice-animation');
    audio.play();
    audio.onended = () => {
      btnAudioPlay.classList.remove('voice-animation');
    };
  }

  static hintsClick() {
    const sound = document.querySelector('.translate-sound');
    sound.addEventListener('click', () => {
      hints.btnAudio();
      hints.hintsActive(sound);
    });

    const translate = document.querySelector('.translate');
    translate.addEventListener('click', () => {
      hints.btnTranslate();
      hints.hintsActive(translate);
    });

    const audioAutoPlay = document.querySelector('.audio');
    audioAutoPlay.addEventListener('click', () => {
      hints.hintsActive(audioAutoPlay);
      if (localStorage.getItem('autoPlay') === 'yes') {
        localStorage.setItem('autoPlay', 'no');
      } else {
        localStorage.setItem('autoPlay', 'yes');
      }
    });

    const backGround = document.querySelector('.background-img');
    backGround.addEventListener('click', () => {
      hints.hintsActive(backGround);
    });

    const audio = document.querySelector('.audio-play');
    audio.addEventListener('click', () => {
      const bntVoicing = document.querySelector('.translate-sound');
      const sourceLine = document.querySelectorAll('.source');
      if (!bntVoicing.classList.contains('hint-disabled')) {
        this.audioPlay();
      }

      const mistake = document.querySelectorAll('.mistake');

      if (
        bntVoicing.classList.contains('hint-disabled') &&
        !mistake.length &&
        !sourceLine.length
      ) {
        this.audioPlay();
      }
    });
  }

  static removeActiveLine() {
    const resultsLine = document.querySelectorAll('.results-line');
    resultsLine.forEach((item) => {
      item.classList.remove('line-active');
    });
    resultsLine[0].classList.add('line-active');
  }

  static cardDisabledDraggable() {
    const word = document.querySelectorAll('.result-mistake');
    const wordMistake = document.querySelectorAll('.mistake');

    if (wordMistake.length === 0) {
      word.forEach((item) => {
        item.removeAttribute('draggable', 'true');
      });
    }
  }
}
