(function() {
  Highcharts.setOptions({
    global: {
      useUTC: false
    }
  });

  $('#cpuSpeed-container').highcharts({
    chart: {
      type: 'spline',
      events: {
        load: function() {
          cpuSpeedChart = $('#cpuSpeed-container').highcharts();
        }
      }
    },
    title: { text: '' },
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 100
    },
    yAxis: {
      title: { text: 'CPU Speed (GHz)' },
      tickInterval: 1,
      endOnTick: false,
      min: 0,
      max: null
    },
    tooltip: {
      xDateFormat: '%A, %b %e, %H:%M:%S'
    },
    series: [{
      id: 'cpuMin',
      name: 'Min. CPU Speed',
      data: initialData()
    }, {
      id: 'cpuAvg',
      name: 'Avg. CPU Speed',
      data: initialData()
    }, {
      id: 'cpuMax',
      name: 'Max. CPU Speed',
      data: initialData()
    }]
  });
})();

var addToCpuSpeedChart = function(currTime, min, avg, max) {
  var cpuMinSer = cpuSpeedChart.get('cpuMin');
  var cpuAvgSer = cpuSpeedChart.get('cpuAvg');
  var cpuMaxSer = cpuSpeedChart.get('cpuMax');

  cpuMinSer.addPoint([currTime, min], false, true);
  cpuAvgSer.addPoint([currTime, avg], false, true);
  cpuMaxSer.addPoint([currTime, max], true, true);
}
