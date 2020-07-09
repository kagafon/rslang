import Chart from 'chart.js';

class GameChart {
  create(popCanvas, arr, dataGame, gamesResults) {
    const myChart = new Chart(popCanvas, {
      type: 'line',
      data: {
        labels: arr,
        datasets: [
          {
            gamesResults,
            label: 'Результаты мини-игр',
            data: dataGame,
            backgroundColor: ['rgba(255, 255, 255, 1)'],
          },
        ],
      },
      options: {
        legend: {
          labels: {
              fontColor: 'white',
              fontSize: 22,
              fontStyle: 'bold',
          }
        },
        tooltips: {
          backgroundColor: 'rgba(146, 85, 215, 0.8)',
          titleFontSize: 24,
          titleAlign: 'average',
          bodyFontSize: 18,
          cornerRadius: 10,
          callbacks: {
            label(tooltipItem, data) {
              const html = [];
              for (const dataset in data.datasets) {
                html.push('Результат игры' + ':');
                const results =
                  data.datasets[dataset].gamesResults[tooltipItem.index];
                if (results.length === 0) {
                  html.push('Вы не играли в эту игру');
                }
                for (let i = 0; i < results.length; i += 1) {
                  html.push(`${i + 1}: ${results[i]}% правильных ответов;`);
                }
              }
              return html;
            },
          },
        },
      },
    });
  };
}

export default new GameChart();
