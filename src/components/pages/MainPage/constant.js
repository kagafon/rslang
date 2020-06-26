const words = [
  {
    word: 'breakfast',
    image: 'files/01_0006.jpg',
    audio: 'files/01_0006.mp3',
    audioMeaning: 'files/01_0006_meaning.mp3',
    audioExample: 'files/01_0006_example.mp3',
    textMeaning: 'Breakfast is the morning meal',
    textExample: 'I ate eggs for breakfast',
    transcription: '[brekfəst]',
    wordTranslate: 'завтрак',
    textMeaningTranslate: 'Завтрак - это утренняя трапеза',
    textExampleTranslate: 'Я ел яйца на завтрак',
    id: 6,
  },
  {
    word: 'set',
    image: 'files/22_0438.jpg',
    audio: 'files/22_0438.mp3',
    audioMeaning: 'files/22_0438_meaning.mp3',
    audioExample: 'files/22_0438_example.mp3',
    textMeaning: 'To set something is to put it somewhere',
    textExample: 'Please set the dice down on the table',
    transcription: '[set]',
    wordTranslate: 'набор',
    textMeaningTranslate: 'Установить что-то - значит положить это куда-то',
    textExampleTranslate: 'Пожалуйста, поставьте кости на стол',
    id: 438,
  },
  {
    word: 'innocence',
    image: 'files/29_0567.jpg',
    audio: 'files/29_0567.mp3',
    audioMeaning: 'files/29_0567_meaning.mp3',
    audioExample: 'files/29_0567_example.mp3',
    textMeaning:
      'Innocence is a lack of experience of difficult or complex things in life',
    textExample: 'Everyone who met her found her innocence to be charming',
    transcription: '[ínəsəns]',
    wordTranslate: 'невинность',
    textMeaningTranslate:
      'Невинность - это недостаток опыта сложных или сложных вещей в жизни',
    textExampleTranslate:
      'Все, кто встречал ее, находили ее невинность очаровательной',
    id: 567,
  },
];

const URL = 'https://raw.githubusercontent.com/CharlieBlbl/rslang-data/master/';
const constans = { words, URL };
export default constans;
