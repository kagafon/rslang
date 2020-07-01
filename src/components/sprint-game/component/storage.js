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

const store = new Store();
export default store;
