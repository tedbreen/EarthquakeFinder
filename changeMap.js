function recenterMap(coords, quakes) {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(coords.lat, coords.lng)
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  if (quakes.length > 0) {
    for(var i in quakes) {
      addMarkers(map, quakes[i]);
    }
  }
}

function addMarkers(map, quake) {
  var loc = new google.maps.LatLng(quake.lat, quake.lng);
  var marker = new google.maps.Marker({
    position: loc,
    map: map,
    animation: google.maps.Animation.DROP
  });
  var infowindow = infoBox(quake);
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
}

function dateFormatter(dateStr) {
  var date = new Date(dateStr);
  var months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  var month = months[ date.getMonth() ];
  var num = date.getDate();
  var year = date.getFullYear();
  var fullDate = month + " " + num + ", " + year;
  return fullDate;
}

function infoBox(quake) {
  var contentStr = '<p>' + dateFormatter(quake.datetime) + '<p>' +
    '<p>Magnitude: ' + quake.magnitude + '</p>' +
    '<p>Depth: ' + quake.depth + '</p>';
  var infoBox = new google.maps.InfoWindow({
    content: contentStr
  });
  return infoBox;
}