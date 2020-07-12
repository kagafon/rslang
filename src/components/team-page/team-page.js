/* eslint-disable class-methods-use-this */

export default class componentTeam {
  init() {
    const teamBlock = document.createElement('div');
    teamBlock.classList.add('team-page');
    teamBlock.innerHTML = `
                    <div class="team">   
                        <div class="person">
                            <img class="person__image" src="../../assets/images/team-page/1.svg" alt="Konstantin">
                            <div class="describe-person">
                                <h3 class="person__title">Константин Aгафонов</h3>
                                <h5 class="person__position">Team Lead</h5>
                                <p class="person__phrase">Суровый руководитель и "мозг" проекта.</p>
                                <p class="person__contribution">Руководитель проекта. Отвечает за back-end приложения. Разработчик игры "SpeakIt".</p>
                            </div>
                            <a class="git-link" href="https://github.com/kagafon"><img src="../../assets/images/team-page/GitHub-Mark-Light-32px.png"><img src="../../assets/images/team-page/GitHub_Logo_White.png"></a>

                        </div>    
                        <div class="person">
                            <img class="person__image" src="../../assets/images/team-page/2.svg" alt="Ira">
                            <div class="describe-person">
                                <h3 class="person__title">Ирина Блоцкая</h3>
                                <h5 class="person__position">Дизайнер-разработчик</h5>
                                <p class="person__phrase">Красота стилевых форм и упорядоченность одним взмахом.</p>
                                <p class="person__contribution">Отвечает за дизайн проекта. Разработчик основной игры приложения "Учить слова".</p>
                            </div>
                            <a class="git-link" href="https://github.com/CharlieBlbl"><img src="../../assets/images/team-page/GitHub-Mark-Light-32px.png"><img src="../../assets/images/team-page/GitHub_Logo_White.png"></a>
                        </div>    
                        <div class="person">
                            <img class="person__image" src="../../assets/images/team-page/3.svg" alt="Vlad">
                            <div class="describe-person">
                                <h3 class="person__title">Владислав Фурманов</h3>
                                <h5 class="person__position">Ведущий разработчик</h5>
                                <p class="person__phrase">"Всё быстро, качественно и в срок" - его лозунг.</p>
                                <p class="person__contribution">Отвечает за разработку мини-игр "Саванна", "Аудиовызов" и "English Puzzle".</p>
                            </div>
                            <a class="git-link" href="https://github.com/furrrmanov"><img src="../../assets/images/team-page/GitHub-Mark-Light-32px.png"><img src="../../assets/images/team-page/GitHub_Logo_White.png"></a>
                        </div>
                        <div class="person">
                            <img class="person__image" src="../../assets/images/team-page/4.svg" alt="Yury">
                            <div class="describe-person">
                                <h3 class="person__title">Юрий Вощенчук</h3>
                                <h5 class="person__position">Разработчик</h5>
                                <p class="person__phrase">Мастер вопросов и любознательная личность.</p>
                                <p class="person__contribution">Отвечает за разработку мини-игры "Мастер фраз" и промежуточной страницы мини-игр, а также презентацию приложения.</p>
                            </div>
                            <a class="git-link" href="https://github.com/KotdenGit"><img src="../../assets/images/team-page/GitHub-Mark-Light-32px.png"><img src="../../assets/images/team-page/GitHub_Logo_White.png"></a>
                        </div>    
                        <div class="person">
                            <img class="person__image" src="../../assets/images/team-page/5.svg" alt="Roman">
                            <div class="describe-person">
                                <h3 class="person__title">Роман Левкович</h3>
                                <h5 class="person__position">Разработчик</h5>
                                <p class="person__phrase">Уверенный любитель статистики и анализа.</p>
                                <p class="person__contribution">Отвечает за страницу статистики и стилизацию страниц "О команде", "Промо", "Авторизация".</p>
                            </div>
                            <a class="git-link" href="https://github.com/RamanLiaukovich"><img src="../../assets/images/team-page/GitHub-Mark-Light-32px.png"><img src="../../assets/images/team-page/GitHub_Logo_White.png"></a>
                        </div>
                        <div class="person">
                            <img class="person__image" src="../../assets/images/team-page/6.svg" alt="Alex">
                            <div class="describe-person">
                                <h3 class="person__title">Алексей Стельмах</h3>
                                <h5 class="person__position">Разработчик</h5>
                                <p class="person__phrase">Эксперт по презентабельному виду и системности подхода.</p>
                                <p class="person__contribution">Отвечает за создание страниц  "О команде", "Промо", "Авторизация". Создатель игры "Спринт".</p>
                            </div>
                            <a class="git-link" href="https://github.com/AlexeiStel"><img src="../../assets/images/team-page/GitHub-Mark-Light-32px.png"><img src="../../assets/images/team-page/GitHub_Logo_White.png"></a>
                        </div>
                    </div>
                    <div class="footer">
                    <h4 class="footer-title"><a href="https://rollingscopes.com/">© 2020 The Rolling Scopes</a></h4>
                    </div>`;
    return teamBlock;
  }
}
