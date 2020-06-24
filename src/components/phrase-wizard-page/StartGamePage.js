export default class StartGame {
    static render() {
        const intro = document.createElement('div');
        intro.classList.add('intro');
        intro.innerHTML = `
         <div class="title">
           <span>Аудиовызов</span>
         </div>
         <div class="subTitle">
           <span>Тренировка Аудиовызов развивает словарный запас.
           Чем больше слов ты знаешь, тем больше очков опыта получишь.</span>
         </div>
         <span class="level-select">Выберете уровень</span>
         <div class="level-block">
            <button type="button" class="btn btn-primary start">1</button>
            <button type="button" class="btn btn-primary start">2</button>
            <button type="button" class="btn btn-primary start">3</button>
            <button type="button" class="btn btn-primary start">4</button>
            <button type="button" class="btn btn-primary start">5</button>
            <button type="button" class="btn btn-primary start">6</button>
            <button type="button" class="btn btn-primary start learn">изучаемые слова</button>
         </div>
        `;
        document.body.append(intro);
        
        
      }
    
      static init() {
        this.render();
      }
}