$(function() {
  var socket = io.connect('http://localhost:8080/');
  socket.on('onConnection', function(static) {
    $('#host').html(static.osInfo.hostname);
    if(static.userInfo != null) {
      $('#user').html(static.userInfo);
      if(static.userLogin != null) {
        $('#user').append(' logged in at ' + static.userLogin);
      }
    }
    $('#os').html(
      static.osInfo.platform +
        '<br>' + static.osInfo.distro + ' ' + static.osInfo.release +
        ' ' + static.osInfo.codename +
        '<br>' + static.osInfo.kernel + ' ' + static.osInfo.arch + ' ' +
        static.osInfo.logofile
    );
    $('#cpu').html(
      static.cpuInfo.manufacturer + ' ' + static.cpuInfo.brand +
        '<br>Speed: ' + static.cpuInfo.speed + ' GHz<br>Cores: ' +
        static.cpuInfo.cores
    );
  });

  socket.on('heartbeat', function(dynamic) {
    // Current time and Uptime
    $('#currTime').html(formatCurrTime(dynamic.currTime));
    $('#uptime').empty().html("Uptime: " + formatUptime(dynamic.uptime));

    // CPU Information
    $('#cpuLoad').html('Avg Load: ' + dynamic.cpuLoad.avgload +
      ' Current Load: ' + dynamic.cpuLoad.currentload +
      ' Full Load: ' + (dynamic.fullLoad.fullload).toFixed(2));

    addToCpuLoadChart(dynamic.currTime, dynamic.cpuLoad.avgload,
      dynamic.cpuLoad.currentload,
      dynamic.fullLoad.fullload);

    $('#cpuSpeed').html('Min: ' + dynamic.cpuSpeed.min +
      ' Avg: ' + dynamic.cpuSpeed.avg + ' Max: ' + dynamic.cpuSpeed.max
    );

    addToCpuSpeedChart(dynamic.currTime, dynamic.cpuSpeed.min,
      dynamic.cpuSpeed.avg, dynamic.cpuSpeed.max);

    // Memory Information
    $('#mem').html(
      'Total: ' + filesize(dynamic.mem.total) +
        ' free: ' + filesize(dynamic.mem.free) +
        ' used: ' + filesize(dynamic.mem.used) + ' active: ' + dynamic.mem.active +
        ' buffcache: ' + dynamic.mem.buffcache +
        ' available: ' + dynamic.mem.available +
        ' swaptotal: ' + dynamic.mem.swaptotal +
        ' swapused: ' + dynamic.mem.swapused +
        ' swapfree: ' + dynamic.mem.swapfree
    );
  });
});
