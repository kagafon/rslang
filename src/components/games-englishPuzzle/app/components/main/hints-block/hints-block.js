export default class HintsBlock {
  static render() {
    const hintsBlock = document.querySelector('.hints-block');
    hintsBlock.innerHTML = `
      <span class="material-icons md-36 md-light audio-play">
          volume_up
      </span>
      <audio src=""></audio> 
      <div class="translate-show"></div>
    `;
  }

  static init() {
    this.render();
  }
}
