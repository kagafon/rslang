class StatisticStore {
  constructor(initialState = []) {
    this.learned = initialState;
    this.unexplored = initialState;
  }

  getState() {
    return {
      learned: this.learned,
      unexplored: this.unexplored,
    };
  }

  setUnexploredState(unexplored) {
    this.unexplored = [...this.unexplored, ...unexplored];
  }

  setLearnedState(learned) {
    this.learned = [...this.learned, ...learned];
  }
}

const statisticStore = new StatisticStore();
export default statisticStore;
