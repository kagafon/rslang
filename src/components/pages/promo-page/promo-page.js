/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
import Router from 'components/Router';

export default class promoPage {
  init() {
    this.parent = createElement(null, 'div', ['parent', 'promo-page'], {style: 'max-height: calc(100vh - 80px); overflow-y: auto;'}, '');

    const headerArrow = createElement(
      this.parent,
      'div',
      ['learn-more'],
      {},
      ''
    );

    createElement(
      headerArrow,
      'h3',
      ['learn-more-title'],
      {},
      'Узнать больше'
    );
    createElement(headerArrow, 'span', ['material-icons'], {}, 'expand_more');

    const headerPromoTitle = createElement(
      this.parent,
      'div',
      ['promo-title'],
      {},
      ''
    );

    createElement(
      headerPromoTitle,
      'h3',
      ['promo-text'],
      {},
      'Изучи английский язык не выходя из дома!'
    );
    createElement(
      headerPromoTitle,
      'h4',
      ['promo-text-small'],
      {},
      'Ты расширишь свой словарный запас на 4000 слов, используя современную методику обучения.'
    );

    const GetStartButton = createElement(
      headerPromoTitle,
      'button',
      ['get-start-button'],
      { id: 'get-start-button'},
      'Начни прямо сейчас!'
    );
    const videoLink = createElement(
      headerPromoTitle,
      'div',
      ['video-link-container'],
      {},
      ''
    );
    createElement(
      videoLink,
      'span',
      ['material-icons'],
      {},
      'play_circle_filled'
    );
    createElement(
      videoLink,
      'h4',
      ['video-link'],
      {},
      'Посмотри как это выглядит'
    );

    const headerPromoVideo = createElement(
      this.parent,
      'video',
      ['promo-header-video'],
      {autoplay: '', muted: '', loop: '', preload: 'true',},
      ''
    );

    createElement(
      headerPromoVideo,
      'source',
      [],
      {src: 'assets/images/promo-page/video.mp4',
       type: 'video/mp4;'},
      ''
    );

    const describeGame = createElement(
      this.parent,
      'div',
      ['discribe-game'],
      {},
      ''
    );

    const advantages = createElement(
      describeGame,
      'div',
      ['advantages-container'],
      {},
      ''
    );

    createElement(
      advantages,
      'h3',
      ['advantages-title'],
      {},
      'Наши преимущества:'
    );

    const advantagesCont = createElement(
      advantages,
      'div',
      ['advantages-wrapper'],
      {},
      ''
    );
    const advantageContainer1 = createElement(
      advantagesCont,
      'div',
      ['advantage-container'],
      {},
      ''
    );

    createElement(
      advantageContainer1,
      'img',
      ['advantage-img'],
      {src: 'assets/images/promo-page/promo1.png'},
      ''
    );

    createElement(
      advantageContainer1,
      'h3',
      ['advantage-title'],
      {},
      'Эффективная методика интервального повторения'
    );
    const intarvalMoreInfo = createElement(
      advantageContainer1,
      'h4',
      ['interval-more-info'],
      {},
      'Подробнее'
    );

    const advantageContainer2 = createElement(
      advantagesCont,
      'div',
      ['advantage-container'],
      {},
      ''
    );

    createElement(
      advantageContainer2,
      'img',
      ['advantage-img'],
      {src: 'assets/images/promo-page/promo2.png'},
      ''
    );

    createElement(
      advantageContainer2,
      'h3',
      ['advantage-title'],
      {},
      'Ты сам устанавливаешь интенсивность обучения'
    );

    const advantageContainer3 = createElement(
      advantagesCont,
      'div',
      ['advantage-container'],
      {},
      ''
    );

    createElement(
      advantageContainer3,
      'img',
      ['advantage-img'],
      {src: 'assets/images/promo-page/promo3.png'},
      ''
    );

    createElement(
      advantageContainer3,
      'h3',
      ['advantage-title'],
      {},
      'Повторение и изучение слов в игровой форме.'
    );

    const advantageContainer4 = createElement(
      advantagesCont,
      'div',
      ['advantage-container'],
      {},
      ''
    );

    createElement(
      advantageContainer4,
      'img',
      ['advantage-img'],
      {src: 'assets/images/promo-page/promo4.png'},
      ''
    );

    createElement(
      advantageContainer4,
      'h3',
      ['advantage-title'],
      {},
      'Лучшее приложение 2020 года!*'
    );
    const TeamPageLink = createElement(
      advantageContainer4,
      'h4',
      ['our-team'],
      { id: 'our-team-link'},
      '*по мнению разработчиков'
    );


    const videoContainer = createElement(
      describeGame,
      'div',
      ['video-container'],
      {},
      ''
    );

    createElement(
      videoContainer,
      'h3',
      ['video-title'],
      {},
      'Видео о работе приложения'
    );

    const videoPlayer = createElement(
      videoContainer,
      'div',
      ['video-player'],
      {},
      ''
    );
    videoPlayer.innerHTML = `<iframe src="https://www.youtube.com/embed/dtqjQ1Qupww" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    const divRule = createElement(describeGame, 'div', ['learn-r'], {}, '');
    const intervaRuleContainer = createElement(divRule, 'div', ['interval-container'], {}, '');
    const titleRule = createElement(
      intervaRuleContainer,
      'h3',
      ['rule-title'],
      {},
      'Методика интервального повторения'
    );
    const pRule = createElement(
      intervaRuleContainer,
      'p',
      ['rule-describe'],
      {},
      'Для более качественного заучивания применяется динамическое определение цикла повторения, в зависимости от выбранного пользователем в настройках базового интервала для каждой группы слов и для каждого уровня сложности слова (так же определяемого пользователем). Слово будет повторно предложено к изучению через промежуток времени N*T, где N - длина серии правильных ответов для слова, T - базовый интервал, зависящий от группы слова и его сложности. Если слово не угадано, то оно будет повторно предложено к изучению на ближайшей тренировке.'
    );
    const GamesRule = createElement(divRule, 'div', ['games-rule'], {}, '');
    const titleAllRule = createElement(
      GamesRule,
      'h3',
      ['rule-title'],
      {},
      'Общее правило мини-игр'
    );
    const pAllRule = createElement(
      GamesRule,
      'p',
      ['rule-describe'],
      {},
      'На стартовой странице каждой игры пользователь может выбирать уровень сложности либо использование изучаемых в основном приложении слов. Последний режим может быть использован только если количество изучаемых слов больше количества необходимых для одного раунда.'
    );
    const divLearn = createElement(divRule, 'div', ['new-words-rule'], {}, '');
    const titleLearn = createElement(
      divLearn,
      'h3',
      ['rule-title'],
      {},
      'Изучение новых слов'
    );
    const pLearn = createElement(
      divLearn,
      'p',
      ['rule-describe'],
      {},
      'В настройках приложения пользователь может выбрать интенсивность ежедневного обучения. Карточки с обучающими словами содержат подсказки: перевод слова, произношение и пример использования. Отображение подсказок так же настраивается пользователем.'
    );
    const gamesContainer = createElement(describeGame, 'div', ['games-container'], {}, '');
    const gamesContainerHeader = createElement(gamesContainer, 'div', ['games-container-header'], {id: 'games-container-header'}, '');
    createElement(gamesContainerHeader, 'h3', ['games-container-title'], {}, 'Правила мини-игр');
    createElement(gamesContainerHeader, 'span', ['material-icons', 'hidden'], {id: 'games-container-arrow'}, 'expand_more');
    const divSpeakit = createElement(gamesContainer, 'div', ['game', 'hidden'], {}, '');
    createElement(
      divSpeakit,
      'h3',
      ['game-title'],
      {},
      'SpeakIt'
    );
    const pSpeakIt = createElement(
      divSpeakit,
      'p',
      ['game-describe'],
      {},
      `Игра поддерживает два режима: изучение произношения и тренировка. В первом пользователь может прослушать звучание слов, получить их перевод и ассоциативное изображение. Во втором - должен правильно произнести слова. Корректность произношения определяется встроенным алгоритмом распознавания речи.`
    );
    const divPuzzle = createElement(gamesContainer, 'div', ['game', 'hidden'], {}, '');
    const titlePuzzle = createElement(
      divPuzzle,
      'h3',
      ['game-title'],
      {},
      'English Puzzle'
    );
    const pPuzzle = createElement(
      divPuzzle,
      'p',
      ['game-describe'],
      {},
      'Дано предложение на английском языке, где слова находятся в случайном порядке. необходимо составить эти слова в верном порядке.'
    );
    const divSavanna = createElement(gamesContainer, 'div', ['game', 'hidden'], {}, '');
    const titleSavanna = createElement(
      divSavanna,
      'h3',
      ['game-title'],
      {},
      'Саванна'
    );
    const pSavanna = createElement(
      divSavanna,
      'p',
      ['game-describe'],
      {},
      'Дано слово. Игрок должен выбрать правильный перевод за определенное время.'
    );
    const divCall = createElement(gamesContainer, 'div', ['game', 'hidden'], {}, '');
    const titleCall = createElement(divCall, 'h3', ['game-title'], {}, 'Аудиовызов');
    const pCall = createElement(
      divCall,
      'p',
      ['game-describe'],
      {},
      'В игре подбираем произнесённому на английском языке слову русский перевод.'
    );
    const divMaster = createElement(gamesContainer, 'div', ['game', 'hidden'], {}, '');
    const titleMaster = createElement(
      divMaster,
      'h3',
      ['game-title'],
      {},
      'Мастер фраз'
    );
    const pMaster = createElement(
      divMaster,
      'p',
      ['game-describe'],
      {},
      'Игра рассчитана на тренировку восприятия английского языка на слух, даже если вы не уверены как именно пишется слово, главное понимать с какой буквы оно начинается. Даже в случае ошибки вы сможете увидеть слово полностью. Нажимая на клавиатуре первую букву каждого слова в загаданной фразе будет выводиться соответствующее по очереди слово. Всегда можно прослушать фразу ещё раз нажав на кнопку-динамик. Если часть предложения кажется трудной можно перейти к следующему - это не будет ошибкой.'
    );
    const divSprint = createElement(gamesContainer, 'div', ['game', 'hidden'], {}, '');
    const titleSprint = createElement(divSprint, 'h3', ['game-title'], {}, 'Спринт');
    const pSprint = createElement(
      divSprint,
      'p',
      ['game-describe'],
      {},
      'В игре необходимо выбрать соответствует ли перевод показанному слову на английском.  За правильные ответы начисляются баллы. Чем  длиннее цепочка правильных ответов - тем больше баллов.'
    );

    const gitHubLink = createElement(describeGame, 'a', ['github-link'], {href: 'https://github.com/kagafon/rslang'}, '');
    gitHubLink.innerHTML = `<img src="../../assets/images/team-page/GitHub-Mark-Light-32px.png"><img src="../../assets/images/team-page/GitHub_Logo_White.png">`
    GetStartButton.addEventListener('click', () => {
      Router.draw('authorization-page');
    });
    TeamPageLink.addEventListener('click', () => {
      Router.draw('team-page');
    });
    gamesContainerHeader.addEventListener('click', () => {
      document.querySelectorAll('.game').forEach(element => {
        element.classList.toggle('hidden');
      });
      document.getElementById('games-container-arrow').classList.toggle('hidden');
    });
    videoLink.addEventListener('click', () => {
      document.querySelector("#main-container > div > div.discribe-game > div.video-container").scrollIntoView({block: "center", behavior: "smooth"});
    });
    intarvalMoreInfo.addEventListener('click', () => {
      document.querySelector("#main-container > div > div.discribe-game > div.learn-r").scrollIntoView({block: "start", behavior: "smooth"});
    })
    headerArrow.addEventListener('click', () => {
      document.querySelector("#main-container > div > div.discribe-game > div.advantages-container").scrollIntoView({block: "start", behavior: "smooth"});
    })

    return this.parent;
  }
}
