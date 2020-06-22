import Chart from 'chart.js';

class MainChart {
    create(popCanvas) {
        var barChart = new Chart(popCanvas, {
          type: 'line',
          data: {
            labels: ["Data", "Data", "Data", "Data", "Data", "Data", "Data", "Data", "Data", "Data"],
            datasets: [{
              label: 'Новых слов',
              data: [33, 44, 10, 22, 32, 13, 53],
              backgroundColor: [
                'rgba(255, 255, 255, 1)',
                // 'rgba(54, 162, 235, 0.6)',
                // 'rgba(255, 206, 86, 0.6)',
                // 'rgba(75, 192, 192, 0.6)',
                // 'rgba(153, 102, 255, 0.6)',
                // 'rgba(255, 159, 64, 0.6)',
                // 'rgba(255, 99, 132, 0.6)',
                // 'rgba(54, 162, 235, 0.6)',
                // 'rgba(255, 206, 86, 0.6)',
                // 'rgba(75, 192, 192, 0.6)',
                // 'rgba(153, 102, 255, 0.6)'
              ]
            }]
          }
        });
        
        
    }
  }
  
  
export default new MainChart();
