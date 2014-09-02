function recenterMap(coords, quakes) {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(coords.lat, coords.lng)
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  if (quakes.length > 0) {
    for(var i in quakes) {
      addMarkers(map, quakes[i]);
    }
  } else {
    alert('no quakes here');
  }
}

function addMarkers(map, quake) {
  var loc = new google.maps.LatLng(quake.lat, quake.lng);
  var marker = new google.maps.Marker({
    position: loc,
    map: map,
    title: 'QUAKE!!!'
  });
}