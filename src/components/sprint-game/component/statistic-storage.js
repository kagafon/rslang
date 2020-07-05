class StatisticStore {
  constructor(initialState = []) {
    this.learned = initialState;
    this.unexplored = initialState;
    this.points = initialState;
  }

  getState() {
    return {
      learned: this.learned,
      unexplored: this.unexplored,
      points: this.points,
    };
  }

  clearState() {
    this.learned.length = 0;
    this.unexplored.length = 0;
    this.points = 0;
  }


  setUnexploredState(unexplored) {
    this.unexplored = [...this.unexplored, ...unexplored];
  }

  setLearnedState(learned) {
    this.learned = [...this.learned, ...learned];
  }

  setPointsState(points) {
    this.points = [...this.points, ...points];
  }
}

const statisticStore = new StatisticStore();
export default statisticStore;
