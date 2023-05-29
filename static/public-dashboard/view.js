class View {
    static interactionDoughnutItem = document.querySelector('#interactions-place');
    static interactionCompletedDoughnutItem = document.querySelector('#interactions-completed');
    static lastLeadsTable = document.querySelector('#leads');
    static barChartItem = document.querySelector('#barChart');
    static lineChartItem = document.querySelector('#lineChart');


    constructor(){
        this.interactionDoughnut;
        this.interactionCompletedDoughnut;
        this.barChart;
        this.lineChart;
    }

    getBarChart(){
      const data = {
      labels: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
      datasets: [
      {
      label: 'Jardín Plaza',
      data: [100, 200, 300, 400, 500, 600, 700],
      borderColor: 'rgb(0,0,0)',
      backgroundColor: 'rgb(0,0,200)',
    },
    {
      label: 'Unicentro',
      data: [100, 200, 300, 400, 500, 600, 700],
      borderColor: 'rgb(0,0,0)',
      backgroundColor: 'rgb(200,0,200)',
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
              position: 'top',
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
        labels: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
        datasets: [
          {
            label: 'Jardín Plaza',
            data: [400, 200, 350, 300, 320, 400, 800],
            backgroundColor: 'rgba(200,0,0, 0.8)',
            fill: true
          },
          {
            label: 'Unicentro',
            data: [200, 100, 200, 600, 420, 300, 900],
            backgroundColor: 'rgba(200,0,200, 0.8)',
            fill: true
          }
        ]
      };

      const config = {
        type: 'line',
        data: data,
        options: {
          plugins: {
            filler: {
              propagate: false,
            },
            title: {
              display: true,
              text: 'Title'
            }
          },
          pointBackgroundColor: '#fff',
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
          };
          this.interactionDoughnut = new Chart(View.interactionDoughnutItem, config);
    }

    getInteractionCompletedDoughnut(){
        const data = {
          labels: [
            'Interacción completada',
            'No completada',
          ],
          datasets: [{
            label: 'Porcentaje %',
            data: [75, 25],
            backgroundColor: [
              'rgb(225, 19, 131)',
              'rgb(104, 56, 23)',
            ],
            hoverOffset: 5
          }]
        };
        const config = {
          type: 'doughnut',
          data: data,
        };
        this.interactionCompletedDoughnut = new Chart(View.interactionCompletedDoughnutItem, config);
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
    //Im only human after all
    this.interactionDoughnut.data.datasets[0].data = newDataset;
    this.interactionDoughnut.update();
  }

  updateBarChart(newDatasetOne, newDatasetTwo){
    this.barChart.data.datasets[0].data = newDatasetOne;
    this.barChart.data.datasets[1].data = newDatasetTwo;
    this.barChart.update();
  }

    render(){
        this.getInteractionDoughnut();
        this.getInteractionCompletedDoughnut();
        this.getBarChart();
        this.getLineChart();
    }
}

