import Chart from 'chart.js';

class MainChart {
  create(popCanvas, arr, mainData, newWordData) {
    const myChart = new Chart(popCanvas, {
      type: 'line',
      data: {
        labels: arr,
        datasets: [
          {
            newWordData,
            label: 'Изучено новых слов',
            data: mainData,
            backgroundColor: ['rgba(255, 255, 255, 1)'],
          },
        ],
      },
      options: {
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              const html = [];
              for (const dataset in data.datasets) {
                const results =
                  data.datasets[dataset].newWordData[tooltipItem.index];
                html.push('Изучено ' + `${results}` + ' новых слов!');
              }
              return html;
            },
          },
        },
      },
    });
  }
}

export default new MainChart();
