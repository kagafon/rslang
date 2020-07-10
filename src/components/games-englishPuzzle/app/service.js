/* eslint-disable import/no-duplicates */
/* eslint-disable import/no-cycle */
import { Words } from 'services/backend';
import store from 'components/games-englishPuzzle/app/storage';
import { User } from 'services/backend';
import Button from './components/main/button/button';
import Hints from './components/main/header/hints/hints';

export default class Service {
  // eslint-disable-next-line consistent-return
  static async wordRequest(level = 0) {
    try {
      this.spinnerOn();
      const page = User.getCurrentUser().settings.games.puzzle.levelPages[0];
      const words = await Words.getWordsForRound(+level, page, 10, [], 10);
      return words;
    } catch (error) {
      Service.spinnerOff();
    }
  }

  static spinnerOn() {
    const spiner = document.querySelector('.spinner');
    spiner.style.display = 'block';
  }

  static spinnerOff() {
    const spiner = document.querySelector('.spinner');
    spiner.style.display = 'none';
  }

  static async audioRequest() {
    const arrAudioUrl = await this.wordRequest();
    const arrUrl = [];
    arrAudioUrl.forEach((item) => {
      arrUrl.push(item.audioExample);
    });

    return arrUrl;
  }

  static puzzleMovement() {
    const card = document.querySelectorAll('.words-card');
    const stage = store.getState();

    card.forEach((item) => {
      item.addEventListener('click', () => {
        if (!item.classList.contains('result-mistake')) {
          const { wordsCount } = stage;
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
        if (target === document.querySelector('.line-active')) {
          store.setState({ appendCard: '' });
        } else {
          store.setState({
            appendCard: target.closest('.words-card').textContent,
          });
        }

        item.classList.add('hovered');
        target.classList.add('card-active');
      });

      item.addEventListener('dragleave', ({ target }) => {
        item.classList.remove('hovered');
        target.classList.remove('card-active');
      });

      item.addEventListener('drop', () => {
        item.classList.remove('hovered');
        const card = document.querySelector('.hide');
        const stage = store.getState();

        const appednWord = stage.appendCard;

        if (
          !card.classList.contains('correct') &&
          !card.classList.contains('mistake')
        ) {
          card.classList.add('result');
        }
        card.classList.remove('source');

        card.classList.add('result-mistake');

        const arrWordss = document.querySelectorAll('.words-card');
        const lineActive = document.querySelector('.line-active');

        if (appednWord === '' && item.classList.contains('line-active')) {
          item.append(card);
          lineActive.classList.remove('card-active');
        } else {
          arrWordss.forEach((item) => {
            const state = store.getState();
            if (item.textContent === state.appendCard) {
              item.after(card);
              item.classList.remove('card-active');
            }
          });
        }

        this.bidCounter();
      });
    });
  }

  static bitValidation(arrWord) {
    const stage = store.getState();
    const wordsArray = stage.requestWords;
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

    const { wordsCount } = stage;

    for (let i = 0; i < arrWord.length; i += 1) {
      if (arrWord[i].textContent === arrWords[+wordsCount][i]) {
        arrWord[i].classList.remove('mistake');
        arrWord[i].classList.remove('result');
        arrWord[i].classList.add('correct');
        document.querySelector('.btn-check').style.display = 'none';
        document.querySelector('.btn-continue').style.display = 'block';
      } else {
        document.querySelector('.btn-i-dont-know').style.display = 'block';
        document.querySelector('.btn-continue').style.display = 'none';

        document.querySelector('.btn-check').style.display = 'block';

        arrWord[i].classList.remove('result');
        arrWord[i].classList.add('mistake');
      }
    }

    const mistake = document.querySelectorAll('.mistake');
    if (wordsCount < 9) {
      this.cardDisabledDraggable();
    } else if (wordsCount === 9 && mistake.length === 0) {
      document.querySelector('.btn-i-dont-know').style.display = 'none';
      document.querySelector('.btn-check').style.display = 'none';
      document.querySelector('.btn-continue').style.display = 'none';
      document.querySelector('.btn-results').style.display = 'block';
      const results = document.querySelector('.results');

      setTimeout(() => {
        results.innerHTML = '';
        results.style.backgroundImage = `url("${stage.img}")`;
        results.style.backgroundSize = 'cover';
        const description = document.querySelector('.source-line');
        description.textContent = stage.imgDescription;
      }, 1500);
    }
  }

  static bidCounter() {
    const stage = store.getState();
    const sourceLine = document.querySelectorAll('.source');
    const count = stage.wordsCount;
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
      document.querySelector('.btn-results').style.display = 'none';
    }
  }

  static btnClick() {
    const btnSolution = document.querySelector('.btn-i-dont-know');
    btnSolution.addEventListener('click', () => {
      Button.btnSolution();
    });

    const btnCheck = document.querySelector('.btn-check');
    btnCheck.addEventListener('click', () => {
      Button.btnCheck();
    });

    const btnContinue = document.querySelector('.btn-continue');
    btnContinue.addEventListener('click', () => {
      Button.btnContinue();
      btnContinue.style.display = 'none';
      Hints.btnTranslate();
      Hints.btnAudio();
    });

    const btnResults = document.querySelector('.btn-results');
    btnResults.addEventListener('click', () => {
      Button.btnResults();
    });
  }

  static audioPlay() {
    const audio = document.querySelector('audio');
    const btnAudioPlay = document.querySelector('.audio-play');
    const hintSound = document.querySelector('.translate-sound');
    if (!hintSound.classList.contains('hint-disabled')) {
      btnAudioPlay.classList.add('voice-animation');
      audio.play();
    }

    audio.onended = () => {
      btnAudioPlay.classList.remove('voice-animation');
    };
  }

  static hintsClick() {
    const sound = document.querySelector('.translate-sound');
    sound.addEventListener('click', () => {
      Hints.hintsActive(sound);
      Hints.btnAudio();
    });

    const translate = document.querySelector('.translate');
    translate.addEventListener('click', () => {
      Hints.hintsActive(translate);
      Hints.btnTranslate();
    });

    const audioAutoPlay = document.querySelector('.audio');
    audioAutoPlay.addEventListener('click', () => {
      const stage = store.getState();
      if (stage.autoPlay === 'yes') {
        store.setState({ autoPlay: 'no' });
      } else {
        store.setState({ autoPlay: 'yes' });
      }
      Hints.hintsActive(audioAutoPlay);
    });

    const backGround = document.querySelector('.background-img');
    backGround.addEventListener('click', () => {
      Hints.hintsActive(backGround);
      Hints.btnBackGround();
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
