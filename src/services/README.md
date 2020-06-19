# Backends wrapper

## Usage

```js
import { User, Words } from 'services/backend';

const user1 = await User.login('email@mail.test', 'Passw0rd!');
const user2 = await User.createUserAndLogin('email@mail.test', 'Passw0rd!', {
  name: 'Some name',
});

const group = 0;
const page = 1;
const wordsPerPage = 40;
const fieldsToCache = ['image', 'audio'];

const wordsForRound = await Words.getWordsForRound(
  group,
  page,
  wordsPerPage,
  fieldsToCache
);
```

## User

Все методы асинхронные, возвращают либо полученные значения, либо throw Error с описанием ошибки на русском языке.

`getCurrentUser()` - возвращает текущего пользователя с его настройками из кэша

`logout()` - выходит текущего пользователя (чистит localStorage)

`login(email, password)` - пытается войти в систему с логином и паролем, возвращает пользователя

`createUserAndLogin(email, password, settings)` - пытается создать пользователя с email и паролем, сохранив его настройки (имя, например), возвращает пользователя

## Words

Все методы асинхронные, возвращают либо полученные значения, либо throw Error с описанием ошибки на русском языке.

`getWordsForRound(group, page, wordsPerPage, arrayOfFields)` - возвращает _wordsPerPage_ слов из группы номер _group_ и с предзагруженными полями из массива _arrayOfFields_. Предзагруженные картинки/звуки размещаются в виде локальных ссылок в полях вида _%имяПоля%Src_ (например, _imageSrc_ для _image_, _audioSrc_ для _audio_, т.д.).
Каждое слово выглядит как объект вида:

```js
{
  "id": "5e9f5ee35eb9e72bc21af4a1",
  "group": 0,
  "page": 0,
  "word": "agree",
  "image": "files/01_0001.jpg",
  "audio": "files/01_0001.mp3",
  "audioMeaning": "files/01_0001_meaning.mp3",
  "audioExample": "files/01_0001_example.mp3",
  "textMeaning": "To <i>agree</i> is to have the same opinion or belief as another person.",
  "textExample": "The students <b>agree</b> they have too much homework.",
  "transcription": "[əgríː]",
  "textExampleTranslate": "Студенты согласны, что у них слишком много домашней работы",
  "textMeaningTranslate": "Согласиться - значит иметь то же мнение или убеждение, что и другой человек",
  "wordTranslate": "согласна",
  "wordsPerExampleSentence": 8
}
```

С предзаруженными полями (последние 2 строчки):

```js
{
  "id": "5e9f5ee35eb9e72bc21af4a1",
  "group": 0,
  "page": 0,
  "word": "agree",
  "image": "files/01_0001.jpg",

  "audio": "files/01_0001.mp3",

  "audioMeaning": "files/01_0001_meaning.mp3",
  "audioExample": "files/01_0001_example.mp3",
  "textMeaning": "To <i>agree</i> is to have the same opinion or belief as another person.",
  "textExample": "The students <b>agree</b> they have too much homework.",
  "transcription": "[əgríː]",
  "textExampleTranslate": "Студенты согласны, что у них слишком много домашней работы",
  "textMeaningTranslate": "Согласиться - значит иметь то же мнение или убеждение, что и другой человек",
  "wordTranslate": "согласна",
  "wordsPerExampleSentence": 8,
  "imageSrc": "http://sdkjhdkf123jkdfksdlkfhlkds",
  "audioSrc": "http://sdkjhdk56456fhjkdfksdlkfhlkds"
}
```

