class Store {
  constructor(initialState = {}) {
    this.state = initialState;
  }

  getState() {
    return this.state;
  }

  setState(state) {
    this.state = {
      ...this.state,
      ...state,
    };
  }
}

const state = {
  isAudioPlay: false,
  isAudioPlayButton: true,
  againWords: [],
  complexWords: [],
  easyWords: [],
  correctAnswersThisCards: true,
};

export default new Store(state);
