class View {
    static interactionDoughnutItem = document.querySelector('#interactions-place');
    static lastLeadsTable = document.querySelector('#leads');
    static barChartItem = document.querySelector('#barChart');
    static lineChartItem = document.querySelector('#lineChart');
    static goalsItem = document.querySelector('#goal-status');


    constructor(){
        this.interactionDoughnut;
        this.barChart;
        this.lineChart;
        this.goalStatus;
    }

    getBarChart(){
      const data = {
      labels: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
      datasets: [
      {
      label: 'Jardín Plaza',
      data: [100, 200, 300, 400, 500, 600, 700],
      borderColor: 'rgb(0,0,0)',
      backgroundColor: 'rgb(254, 109, 1)',
    },
    {
      label: 'Unicentro',
      data: [100, 200, 300, 400, 500, 600, 700],
      borderColor: 'rgb(0,0,0)',
      backgroundColor: 'rgb(225, 19, 131)',
    }
  ]
};
      const config = {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels:{
                usePointStyle: true
              }
            },
            decimation: false,
            title: {
              display: true,
              text: 'Interacciones por día y lugar'
            }
          }
        },
      };

      this.barChart = new Chart(View.barChartItem, config);
    }

    getLineChart(){
      const data = {
        labels: ['7am-9am', '9am-11am', '11am-1pm', '1pm-3pm', '3pm-5pm', '5pm-7pm', '7pm-9pm', '9pm-11pm'],
        datasets: [
          {
            label: 'Jardín Plaza',
            data: [400, 200, 350, 300, 320, 400, 800, 400],
            backgroundColor: 'rgba(225, 19, 131,0.8)',
            pointBackgroundColor: 'rgba(225, 19, 131,0.8)',
            fill: true
          },
          {
            label: 'Unicentro',
            data: [200, 100, 200, 600, 420, 300, 900, 200],
            backgroundColor: 'rgba(104, 56, 23, 0.7)',
            pointBackgroundColor: 'rgba(104, 56, 23, 1)',
            fill: true
          }
        ]
      };

      const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels:{
                usePointStyle: true
              }
            },
            filler: {
              propagate: false,
            },
            title: {
              display: true,
              text: 'Interacción por hora',
            }
          },
          radius: 5,
          interaction: {
            intersect: false,
          }
        },
      };

      this.lineChart = new Chart(View.lineChartItem, config);
    }

    getInteractionDoughnut(){
          const data = {
            labels: [
              'Unicentro',
              'Jardín Plaza',
            ],
            datasets: [{
              label: '# de Interacciones',
              data: [16000, 32000],
              backgroundColor: [
                'rgb(254, 109, 1)',
                'rgb(225, 19, 131)',
              ],
              hoverOffset: 5
            }]
          };
          const config = {
            type: 'doughnut',
            data: data,
            options: {
              responsive: true,
              plugins: {
                legend: {
                  position: 'bottom',
                  labels:{
                    usePointStyle: true
                  }
                },
                title: {
                  display: true,
                  text: 'Interacción por lugar'
                }
              }
            }
          };
          this.interactionDoughnut = new Chart(View.interactionDoughnutItem, config);
    }

    getGoalChart(){
      const data = {
        labels: [
          'Leads',
          'Meta'
        ],
        datasets: [{
          label: '# de leads',
          data: [20, 100],
          backgroundColor: [
            'rgb(254, 109, 1)',
            'rgba(0,0,0,0.05)'
          ],
          hoverOffset: 5
        }]
      };
      const config = {
        type: 'doughnut',
        data: data,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels:{
                usePointStyle: true
              }
            },
            title: {
              display: true,
              text: 'Número de leads'
            }
          }
        }
      };
      this.goalStatus = new Chart(View.goalsItem, config);
}


  updateTable(usersData){
    if(View.lastLeadsTable){
      View.lastLeadsTable.innerHTML = '';

      usersData.forEach(element => {
        let row = document.createElement('tr');
        row.innerHTML = `
          <td>${element.nombre}</td>
          <td>${element.email}</td>
          <td>${element.celular}</td>
        `
        View.lastLeadsTable.appendChild(row);
      });
    }
    
  }

  updateLocationDoughnut(newDataset){
    this.interactionDoughnut.data.datasets[0].data = newDataset;
    this.interactionDoughnut.update();
  }

  updateGoalsDoughnut(newDataset){
    this.goalStatus.data.datasets[0].data = newDataset;
    this.goalStatus.update();
  }

  updateBarChart(newDatasetOne, newDatasetTwo){
    this.barChart.data.datasets[0].data = newDatasetOne;
    this.barChart.data.datasets[1].data = newDatasetTwo;
    this.barChart.update();
  }

  updateLineChart(newDatasetOne, newDatasetTwo){
    this.lineChart.data.datasets[0].data = newDatasetOne;
    this.lineChart.data.datasets[1].data = newDatasetTwo;
    this.lineChart.update();
  }

    render(){
        this.getInteractionDoughnut();
        this.getBarChart();
        this.getLineChart();
        this.getGoalChart();
    }
}

