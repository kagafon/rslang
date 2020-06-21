import Chart from 'chart.js';

class GameChart {
    create(popCanvas) {
        var barChart = new Chart(popCanvas, {
          type: 'line',
          data: {
            labels: ["China", "India", "United States", "Indonesia", "Brazil", "Pakistan", "Nigeria", "Bangladesh", "Russia", "Japan"],
            datasets: [{
              label: 'Learning new words',
              data: [1379302771, 1281935911, 326625791, 260580739, 207353391, 204924861, 190632261, 157826578, 142257519, 126451398],
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
  
  
export default new GameChart();