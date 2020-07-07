import { User } from 'services/backend';
import MainChart from 'components/statisticPage/MainChart';

class MainStatisticsCreation {
  create(popCanvas) {
    let arr = [];
    const today = Date.now();
    const labels = [];
    const mainData = [];
    const newWordData = [];
    async function getMainStat() {
      try {
        const response = await User.getMainStatistics(true);
        console.log(response);
        const todayStatistic = response[response.length - 1];
        document.getElementById('today-passedCards').innerText =
          todayStatistic.passedCards;
        document.getElementById('today-bestSeria').innerText =
          todayStatistic.answerSeries;
        document.getElementById('today-rightAnswers').innerText =
          todayStatistic.correctAnswers;
        document.getElementById('today-newWords').innerText =
          todayStatistic.learnedWords;
        let dateFirst = new Date(today);
        if (response.length < 8) {
          for (let i = 0; i < 7; i += 1) {
            dateFirst = new Date(today - (6 - i) * 86400000);
            labels[i] = new Date(dateFirst);
          }
          labels[6] = new Date(today);
        } else {
          const firstDate = response[0].d * 3600 * 1000 * 24;
          newWordData[0] = response[0].learnedWords || 0;
          mainData[0] = newWordData[0];
          labels[0] = new Date(firstDate);
          const period = Math.round((today - firstDate) / 86400000);
          let date = new Date(firstDate);
          for (let i = 0; i < period; i += 1) {
            date = new Date(date.setDate(date.getDate() + 1));
            labels[i + 1] = new Date(date);
          }
        }
        console.log(labels)
        arr = labels.map((e) => e.toLocaleDateString('ru'));
        response.map(
          (e) => (e.d = new Date(e.d).toLocaleString('ru').substring(0, 10))
        );
        console.log(arr);
        for (let i = 1; i < arr.length; i += 1) {
          const dayStat = response.filter((e) => e.d === arr[i]);
          console.log(dayStat);
          if (dayStat.length === 0 || dayStat[0].learnedWords === undefined) {
            newWordData[i] = 0;
            mainData[i] = mainData[i - 1];
          } else {
            newWordData[i] = dayStat[0].learnedWords;
            mainData[i] = mainData[i - 1] + newWordData[i];
          }
        }
        MainChart.create(popCanvas, arr, mainData, newWordData);
      } catch (err) {
        console.log(err);
      }
    }
    getMainStat();
  }
}

export default new MainStatisticsCreation();
