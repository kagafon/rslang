/* eslint-disable new-cap */
export default class SpeechRecognitionWrapper {
  constructor(micControl) {
    this.micControl = micControl;
    // eslint-disable-next-line no-undef
    this.recognition = new webkitSpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.continuous = false;
    this.recognition.maxAlternatives = 95;
    this.endRecognitionCallbacks = [];
    this.recognition.addEventListener('result', this.endRecognition.bind(this));
    this.recognition.addEventListener('start', this.setState.bind(this, true));
    this.recognition.addEventListener('end', this.setState.bind(this, false));
  }

  setState(state) {
    this.started = state;
    if (this.micControl) {
      if (state) {
        this.micControl.classList.remove('mic_muted');
      } else {
        this.micControl.classList.add('mic_muted');
      }
    }
    if (!state && !this.hasResult && this.endRecognitionCallbacks.length > 0) {
      this.start();
    }
  }

  endRecognition(evt) {
    const currentRunCallbacks = [...this.endRecognitionCallbacks];
    this.endRecognitionCallbacks = [];
    const resultsArray = [];
    for (let i = 0; i < evt.results.length; i += 1) {
      for (let j = 0; j < evt.results[i].length; j += 1) {
        resultsArray.push(evt.results[i][j].transcript);
      }
    }

    while (currentRunCallbacks.length > 0) {
      currentRunCallbacks.pop()(resultsArray);
    }
    this.hasResult = true;
    this.currentWords = [];
  }

  start(cb, words) {
    if (this.started) {
      this.timeout = setTimeout(this.start.bind(this, cb, words), 1000);
    } else {
      this.timeout = -1;
      this.hasResult = false;
      if (words) this.currentWords = words;
      if (cb) this.endRecognitionCallbacks.push(cb);
      const grammar = `#JSGF V1.0; grammar vxmlgram; public <s> = ${this.currentWords.join(
        ' | '
      )};`;
      // eslint-disable-next-line no-undef
      const speechRecognitionList = new webkitSpeechGrammarList();
      speechRecognitionList.addFromString(grammar, 1);
      this.recognition.grammars = speechRecognitionList;
      this.recognition.start();
    }
  }

  stop() {
    this.recognition.stop();
    this.endRecognitionCallbacks = [];
    this.hasResult = true;
    if (this.timeout >= 0) {
      clearTimeout(this.timeout);
    }
  }
}
