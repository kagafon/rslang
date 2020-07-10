export default class ResultsBlock {
  static render() {
    const wrapper = document.querySelector('.wrapper');
    const results = document.createElement('div');
    results.classList.add('results');
    results.innerHTML = `
      <div data-name="1" class="results-line line-active"></div>
      <div data-name="2" class="results-line"></div>
      <div data-name="3" class="results-line"></div>
      <div data-name="4" class="results-line"></div>
      <div data-name="5" class="results-line"></div>
      <div data-name="6" class="results-line"></div>
      <div data-name="7" class="results-line"></div>
      <div data-name="8" class="results-line"></div>
      <div data-name="9" class="results-line"></div>
      <div data-name="10" class="results-line"></div>
    `;
    wrapper.append(results);
  }

  static activeLine() {
    document.querySelector('.results-line').setAttribute('selected', 1);
  }

  static init() {
    this.render();
    this.activeLine();
  }
}
