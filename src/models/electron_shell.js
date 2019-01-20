const HighChart = require('highcharts');

const ElectronShell = function(container, shell){
  this.shell = shell;
  this.container = container;
  this.series = [];
}

ElectronShell.prototype.generateCircleObject = function() {

  const series = [];

  this.shell.forEach( (ring, index) => {
    const circle = {

        data: [[0, 0]],
        marker: {
          radius: 10.75*(index+1),
          lineColor: 'lime',
          fillColor: 'transparent',
          lineWidth: 1,
          symbol: 'circle',
        },
        showInLegend: false
      };
    this.series.push(circle)
  })
};

ElectronShell.prototype.generateShellPoints = function() {

  const series = [];
  const data = [];
  this.shell.forEach( (ring, index) => {

    const radius = 12*(index+1);
    for (i = 0; i < ring; i++){

      const angle = 2 * Math.PI * i / ring;
      const xCoord = radius * Math.cos(angle);
      const yCoord = radius * Math.sin(angle);
      data.push([xCoord, yCoord]);

    }
  })
  const dataInfo = {

      data: data,
      marker: {
          radius:2,
          fillColor: 'yellow'
      },
      showInLegend: false
  };

  this.series.push(dataInfo);

};


ElectronShell.prototype.myFirstChart = function () {

  this.generateCircleObject();
  this.generateShellPoints();

    var chart = Highcharts.chart(this.container, {
        chart: {
          type: 'scatter',
          zoomType: 'xy',
          backgroundColor: 'transparent'
        },
        credits: {
          enabled: false
        },

         plotOptions: {
           series: {
             enableMouseTracking: false
           }
         },
         title: {
            text: ''
          },
          xAxis: {
            min: -100,
            max: 100,
            title: false,
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            labels: {
              enabled: false
            },
            minorTickLength: 0,
            tickLength: 0
          },
          yAxis: {
            min: -100,
            max: 100,
            title: false,
            lineWidth: 0,
            minorGridLineWidth: 0,
            lineColor: 'transparent',
            labels: {
              enabled: false
            },
            minorTickLength: 0,
            tickLength: 0,
            gridLineColor:' transparent'
          },
          series: this.series
    });
};

module.exports = ElectronShell;
