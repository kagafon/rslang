import { sourceData } from '../../source-data/source-data.js';
import { service } from '../../../../service.js';
import { button } from '../../button/button.js';
import { hints } from '../hints/hints.js';

class Controls {
  render() {
    const header = document.querySelector('.header');
    const controls = document.createElement('div');
    controls.classList.add('controls');

    controls.innerHTML = `
   <section class="level">
   <span class="level-title">Level</span>
   <div class="dropdown">
     <select name="one" class="dropdown-select">
       <option class="option-level" value="1">1</option>
       <option class="option-level" value="2">2</option>
       <option class="option-level" value="3">3</option>
       <option class="option-level" value="4">4</option>
       <option class="option-level" value="5">5</option>
       <option class="option-level" value="6">6</option>
     </select>
    </div>
   </section>
   <section class="page">
    <span class="level-title">Page</span>
      <div class="dropdown">
        <select name="one" class="dropdown-select dropdown-select-page">
        </select>
      </div>
    </section>
   `;

    header.append(controls);
  }

  optionPageGeneration() {
    const select = document.querySelector('.dropdown-select-page');
    for (let i = 1; i <= 60; i++) {
      const option = document.createElement('option');
      option.setAttribute('value', i);
      option.classList.add('option-page');
      option.textContent = i;
      select.append(option);
    }
  }

  levelSelection() {
    const select = document.querySelector('.dropdown-select');
    if (!localStorage.getItem('level')) {
      localStorage.setItem('level', '0');
    }

    select.addEventListener('change', () => {
      const page = localStorage.getItem('page');
      const sourceBlock = document.querySelectorAll('.source-line');
      const resultsBlock = document.querySelectorAll('.results-line');

      localStorage.setItem('wordsCount', '0');
      localStorage.setItem('appendCard', '');
      localStorage.setItem('level', +select.value - 1 + '');

      this.clearBlock(sourceBlock);
      this.clearBlock(resultsBlock);

      sourceData.cardGeneration(select.value - 1, page);
      service.removeActiveLine();
      button.disabledButtons();
      hints.btnAudio();
      hints.btnTranslate();
    });
  }

  clearBlock(arr) {
    arr.forEach((item) => {
      item.innerHTML = '';
    });
  }

  pageSelection() {
    const select = document.querySelector('.dropdown-select-page');
    if (!localStorage.getItem('page')) {
      localStorage.setItem('page', '0');
    }

    select.addEventListener('change', () => {
      const level = localStorage.getItem('level');
      const sourceBlock = document.querySelectorAll('.source-line');
      const resultsBlock = document.querySelectorAll('.results-line');

      localStorage.setItem('page', +select.value - 1 + '');
      localStorage.setItem('wordsCount', '0');
      localStorage.setItem('appendCard', '');

      sourceBlock.forEach((item) => {
        item.innerHTML = '';
      });
      resultsBlock.forEach((item) => {
        item.innerHTML = '';
      });
      sourceData.cardGeneration(level, select.value - 1);
      service.removeActiveLine();
      button.disabledButtons();
      hints.btnAudio();
      hints.btnTranslate();
    });
  }

  showSelectedLevel() {
    const level = localStorage.getItem('level');
    const page = localStorage.getItem('page');
    const optionLevel = document.querySelectorAll('.option-level');
    const optionPage = document.querySelectorAll('.option-page');

    optionLevel.forEach((item) => {
      if (item.textContent === +level + 1 + '') {
        item.setAttribute('selected', 1);
      }
    });

    optionPage.forEach((item) => {
      if (item.textContent === +page + 1 + '') {
        item.setAttribute('selected', 1);
      }
    });
  }

  init() {
    this.render();
    this.levelSelection();
    this.optionPageGeneration();
    this.pageSelection();
    this.showSelectedLevel();
  }
}

export const controls = new Controls();
