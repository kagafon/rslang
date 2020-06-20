class StatisticsPageEvents {
  init() {
    console.log('111');
    const period = document.querySelector('.period');
    period.addEventListener('click', () => {
      document.querySelectorAll('.period').forEach(element => {
        element.classList.remove('active');
      });
      event.target.classList.add('active');
    })
    
  }
}


export default new StatisticsPageEvents();