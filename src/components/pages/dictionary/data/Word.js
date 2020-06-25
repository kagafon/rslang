export default class VocabularyWord {
  constructor(userWord) {
    this.word = userWord.word;
    this.stat = userWord.optional;
    this.level = userWord.difficulty;
    /* stat structure: repeatTimes, lastRepeatTime, nextRepeatTime, progress */
  }
  render(){
    
  }
}
