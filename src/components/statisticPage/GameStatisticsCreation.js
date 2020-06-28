import { User } from 'services/backend';
import GameChart from 'components/statisticPage/GameChart';

class GameStatisticsCreation {
  create(popCanvas, period, game) {
    let arr = [];
    const dataGame = [];
    const gamesResults = [];
    async function getGameStat() {
      try {
        await User.login('roman@te.st', '!Qazxsw2');
        await User.autoLogin();
        const response = await User.getGameStatistics(game);
        const gameStat = response.r;
        gameStat.map(
          (e) => (e.d = new Date(e.d).toLocaleString('ru').substring(0, 10))
        );
        for (let i = 0; i < arr.length; i += 1) {
          const dayStat = gameStat.filter((e) => e.d === arr[i]);
          if (dayStat === []) {
            dataGame[i] = 0;
          } else {
            dataGame[i] = dayStat.length;
            gamesResults[i] = dayStat.map((e) => Math.round((e.c / e.t) * 100));
          }
        }
        GameChart.create(popCanvas, arr, dataGame, gamesResults);
      } catch (err) {
        console.log(err);
      }
    }
    function setPeriod(days) {
      const today = new Date();
      const day = new Date();
      const labels = [];
      labels[0] = new Date(day.setDate(today.getDate() - days + 1));
      for (let i = 1; i < days; i += 1) {
        labels[i] = new Date(day.setDate(labels[i - 1].getDate() + 1));
      }
      arr = labels.map((e) => e.toLocaleDateString('ru'));
      getGameStat();
    }
    setPeriod(period);
  }
}

export default new GameStatisticsCreation();
