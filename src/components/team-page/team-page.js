/* eslint-disable class-methods-use-this */

export default class componentTeam {
  init() {
    const teamBlock = document.createElement('div');
    teamBlock.innerHTML = `
                        <h1 class="title"><a href="https://github.com/rolling-scopes-school">Наша команда</a></h1>   
                    <div class="team">   
                        <div class="person">
                            <img class="person__image" src="../../assets/images/team-page/konstantin.jpg" alt="Konstantin">
                            <div class="describe-person">
                                <h3 class="person__title"><a href="https://github.com/kagafon">Константин Aгафонов</a></h3>
                                <h5 class="person__position">Team Lead</h5>
                                <p class="person__phrase">Суровый руководитель и "мозг" проекта.</p>
                                <p class="person__contribution">Руководит проектом, весь back-end держится на нём, а также игра "SpeakIt"</p>
                            </div>
                        </div>    
                        <div class="person">
                            <img class="person__image" src="../../assets/images/team-page/ira.jpg" alt="Ira">
                            <div class="describe-person">
                                <h3 class="person__title"><a href="https://github.com/irinainina">Ирина Блоцкая</a></h3>
                                <h5 class="person__position">Дизайнер-разработчик</h5>
                                <p class="person__phrase">Красота стилевых форм и упорядоченность одним взмахом.</p>
                                <p class="person__contribution">Отвечает за весь дизайн проекта. Главная страница полностью на её совести</p>
                            </div>
                        </div>    
                        <div class="person">
                            <img class="person__image" src="../../assets/images/team-page/vlad.jpg" alt="Vlad">
                            <div class="describe-person">
                                <h3 class="person__title"><a href="https://github.com/furrrmanov">Влад Фурманов</a></h3>
                                <h5 class="person__position">Ведущий разработчик</h5>
                                <p class="person__phrase">"Всё быстро, качественно и в срок" - его лозунг.</p>
                                <p class="person__contribution">Отвечает за разработку мини-игр "Саванна" и "Аудиовызов"</p>

                            </div>
                        </div>
                        <div class="person">
                            <img class="person__image" src="../../assets/images/team-page/ura.jpg" alt="Yury">
                            <div class="describe-person">
                                <h3 class="person__title"><a href="https://github.com/KotdenGit">Юрий Вощенчук</a></h3>
                                <h5 class="person__position">Разработчик</h5>
                                <p class="person__phrase">Мастер вопросов и любознательная личность.</p>
                                <p class="person__contribution">Отвечает за разработку мини-игры "Спринт" и "Мастер фраз"</p>
                            </div>
                        </div>    
                        <div class="person">
                            <img class="person__image" src="../../assets/images/team-page/roma.jpg" alt="Roman">
                            <div class="describe-person">
                                <h3 class="person__title"><a href="https://github.com/RamanLiaukovich">Роман Левкович</a></h3>
                                <h5 class="person__position">Разработчик</h5>
                                <p class="person__phrase">Уверенный любитель статистики и анализа</p>
                                <p class="person__contribution">Отвечает за страницу статистики.</p>
                            </div>
                        </div>
                        <div class="person">
                            <img class="person__image" src="../../assets/images/team-page/alex.jpg" alt="Alex">
                            <div class="describe-person">
                                <h3 class="person__title"><a href="https://github.com/AlexeiStel">Алексей Стельмах</a></h3>
                                <h5 class="person__position">Разработчик</h5>
                                <p class="person__phrase">Эксперт по презентабельному виду и системности подхода.</p>
                                <p class="person__contribution">Отвечает за страницы авторизации и "О команде", промо-страницу.</p>
                            </div>
                        </div>
                    </div>`;
    return teamBlock;
  }
}
