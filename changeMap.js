function recenterMap(coords) {
  var mapOptions = {
    zoom: 11,
    center: new google.maps.LatLng(coords.lat, coords.lng)
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}
