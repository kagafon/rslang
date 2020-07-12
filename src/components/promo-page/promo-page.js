/* eslint-disable class-methods-use-this */
import { createElement } from 'helpers/dom';
import Router from 'components/Router';
import Swiper from 'swiper';
import optionsForSwiper from './optionsForSwiper';

export default class promoPage {
  init() {
    this.parent = createElement(null, 'div', ['parent', 'promo-page'], {}, '');
    // this.swiperContainer = createElement(
    //   this.parent,
    //   'div',
    //   ['swiper-container'],
    //   {},
    //   ''
    // );
    // this.swiperWrapper = createElement(
    //   this.swiperContainer,
    //   'div',
    //   ['swiper-wrapper'],
    //   {},
    //   ''
    // );
    // const item1 = createElement(
    //   this.swiperWrapper,
    //   'img',
    //   ['swiper-slide'],
    //   {
    //     src: 'assets/images/promo-page/29d246cc8954f12113b3b86b0051464e.jpg',
    //   },
    //   ''
    // );
    // const item2 = createElement(
    //   this.swiperWrapper,
    //   'img',
    //   ['swiper-slide'],
    //   {
    //     src: 'assets/images/promo-page/0_ef4fa_320c2e95_orig-640x360.jpg',
    //   },
    //   ''
    // );
    // const item3 = createElement(
    //   this.swiperWrapper,
    //   'img',
    //   ['swiper-slide'],
    //   {
    //     src: 'assets/images/promo-page/1519728910159193202.jpg',
    //   },
    //   ''
    // );
    // const item4 = createElement(
    //   this.swiperWrapper,
    //   'img',
    //   ['swiper-slide'],
    //   {
    //     src: 'assets/images/promo-page/3643a446463165.585530c44d950.jpg',
    //   },
    //   ''
    // );
    // const item5 = createElement(
    //   this.swiperWrapper,
    //   'img',
    //   ['swiper-slide'],
    //   {
    //     src: 'assets/images/promo-page/57d92f3657b3a.jpg',
    //   },
    //   ''
    // );
    // const item6 = createElement(
    //   this.swiperWrapper,
    //   'img',
    //   ['swiper-slide'],
    //   {
    //     src: 'assets/images/promo-page/priroda-gory-utki-ozero-peizazh.jpg',
    //   },
    //   ''
    // );
    // const item7 = createElement(
    //   this.swiperWrapper,
    //   'img',
    //   ['swiper-slide'],
    //   {
    //     src: 'assets/images/promo-page/russia-flag-button-square-xs.png',
    //   },
    //   ''
    // );
    // const item8 = createElement(
    //   this.swiperWrapper,
    //   'img',
    //   ['swiper-slide'],
    //   {
    //     src:
    //       'assets/images/promo-page/united-states-of-america-flag-button-square-xs.png',
    //   },
    //   ''
    // );
    // const item9 = createElement(
    //   this.swiperWrapper,
    //   'img',
    //   ['swiper-slide'],
    //   {
    //     src:
    //       'assets/images/promo-page/viaduk-poezd-transport-zvezdy-liudi-peizazh-minimalizm-gory.jpg',
    //   },
    //   ''
    // );
    // const item10 = createElement(
    //   this.swiperWrapper,
    //   'video',
    //   ['swiper-slide'],
    //   {
    //     style: 'width: 400; height: 300',
    //     controls: 'controls',
    //     preload: 'true',
    //     poster: 'assets/images/russia-flag-button-square-xs.png',
    //   },
    //   ''
    // );
    // const source = createElement(
    //   item10,
    //   'source',
    //   ['source'],
    //   {
    //     src: 'assets/images/promo-page/videoplayback.mp4',
    //     type: 'video/mp4;',
    //   },
    //   ''
    // );
    // const btnPrev = createElement(
    //   this.swiperContainer,
    //   'div',
    //   ['swiper-button-prev'],
    //   {},
    //   ''
    // );
    // const btnNext = createElement(
    //   this.swiperContainer,
    //   'div',
    //   ['swiper-button-next'],
    //   {},
    //   ''
    // );
    // const headerPromo = createElement(
    //   this.parent,
    //   'div',
    //   ['promo-header'],
    //   {},
    //   ''
    // );

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
      'Ты расширишь свой словарный запас на 4000 слов, используя современную методику обучения!'
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
      'Посмотри как это выглядит.'
    );

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
      'Узнать подробнее'
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
      'Лучшее приложение 2020 года!'
    );
    const TeamPageLink = createElement(
      advantageContainer4,
      'h4',
      ['our-team'],
      { id: 'our-team-link'},
      'по мнению нашей команды'
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

    createElement(
      videoContainer,
      'video',
      ['video-player'],
      {},
      ''
    );




    const divRule = createElement(describeGame, 'div', ['learn-r'], {}, '');
    const intervaRuleContainer = createElement(divRule, 'div', ['interval-container'], {}, '');
    const titleRule = createElement(
      intervaRuleContainer,
      'h3',
      ['rule-title'],
      {},
      'Правило интервального повторения'
    );
    const pRule = createElement(
      intervaRuleContainer,
      'p',
      ['rule-describe'],
      {},
      'Изучение новых слов.'
    );
    const olRule = createElement(intervaRuleContainer, 'ul', ['describe'], {}, '');
    const liRule = createElement(
      olRule,
      'li',
      ['describe'],
      { type: 'circle' },
      'Если Вы угадали слово, то оно повторится повториться(для закрепления материала):'
    );
    const olliRule = createElement(liRule, 'ol', ['describe'], {}, '');
    const olliRule1 = createElement(
      olliRule,
      'li',
      ['describe'],
      { type: 'square' },
      'Сложное слово - через день'
    );
    const olliRule3 = createElement(
      olliRule,
      'li',
      ['describe'],
      { type: 'square' },
      'Среднее - через три дня'
    );
    const olliRule5 = createElement(
      olliRule,
      'li',
      ['describe'],
      { type: 'square' },
      'Легкое - через семь дней'
    );
    const olliRule4 = createElement(
      olRule,
      'li',
      ['describe'],
      { type: 'circle' },
      'Не угадали - слово повториться через час.'
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
      'На стартовой странице каждой игры пользователь выбирает уровень сложности. В "изучаемые слова" можно играть только, если количество изученных слов больше 10.'
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
      'В настройках приложения пользователь указывает интенсивность ежедневного обучения. Карточки с обучающими словами содержат перевод слова, произношение и пример использования.'
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
      `Игрок нажимает на слово, чтобы услышать его звучание. Затем произносит это слово в микрофон до достижения правильного варианта.`
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
      'Игроку дано предложение на русском языке. Необходимо сделать его перевод из приведенных слов на английском.'
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
      'Составьте фразу по первым буквам произнесенных слов.'
    );
    const divSprint = createElement(gamesContainer, 'div', ['game', 'hidden'], {}, '');
    const titleSprint = createElement(divSprint, 'h3', ['game-title'], {}, 'Sprint');
    const pSprint = createElement(
      divSprint,
      'p',
      ['game-describe'],
      {},
      'Дано слово и перевод, а также два варианта ответа - верно или нет. Игрок выбирает один из них.'
    );
    // this.swiper = new Swiper(this.swiperContainer, optionsForSwiper);
    // this.slideNext(btnNext);
    // this.slidePrev(btnPrev);
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
      document.querySelector("#main-container > div > div.discribe-game > div.learn-r").scrollIntoView({block: "center", behavior: "smooth"});
    })
    headerArrow.addEventListener('click', () => {
      document.querySelector("#main-container > div > div.discribe-game > div.advantages-container").scrollIntoView({block: "center", behavior: "smooth"});
    })

    return this.parent;
  }


  // postInit() {
  //   this.swiper.update();
  // }

  // slidePrev(btn) {
  //   btn.addEventListener('click', () => {
  //     this.swiper.slidePrev();
  //   });
  // }

  // slideNext(button) {
  //   button.addEventListener('click', () => {
  //     this.swiper.slideNext();
  //   });
  // }
}
