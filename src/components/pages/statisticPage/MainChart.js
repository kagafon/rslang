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
            label: `Изучено новых слов: ${ mainData[mainData.length - 1]}.`,
            data: mainData,
            backgroundColor: ['rgba(255, 255, 255, 0.7)'],
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
