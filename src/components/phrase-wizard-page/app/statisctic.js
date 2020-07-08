
export default class Statisctic {
  static init() {
    this.mistake = 0;
    this.correct = 0;
  }

  static count(mistake, correct) {
    this.mistake = this.mistake + mistake;
    this.correct = this.correct + correct;
  }

}