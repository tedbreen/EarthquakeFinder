var button = document.getElementById('submit');

button.addEventListener('click', function () {
  geocode( submitForm() );
});

function submitForm() {
  var city = document.getElementById('city');
  var state = document.getElementById('state');
  var loc = city.value + ', ' + state.value;
  // var loc = encodeURI(city.value + ', ' + state.value);
  city.value = "";
  state.value = "";
  return loc;
}

function geocode(loc) {
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?';
  var query = {
    'key': 'AIzaSyCIbLULWH2kMQyb2oINrSVmSd4530p6tJA',
    'address': loc
  };
  url += $.param(query);
  $.ajax({
    url: url,
    dataType: 'json',
    method: 'GET',
    success: function (resp) {
      var bounds = parseResponse(resp);
      getEarthquakes( bounds );
    }
  });
}

function parseResponse(resp) {
  var bounds = {
    'north': resp.results[0].geometry.bounds.northeast.lat,
    'east': resp.results[0].geometry.bounds.northeast.lng,
    'south': resp.results[0].geometry.bounds.southwest.lat,
    'west': resp.results[0].geometry.bounds.southwest.lng,
    'username': 'tedbreen'
  };
  var coords = {
    'lat': resp.results[0].geometry.location.lat,
    'lng': resp.results[0].geometry.location.lng
  };
  return bounds;
}

function parseResults(result) {
  
  var lat = result.geometry.location.lat;
  var lng = result.geometry.location.lng;
}

function getEarthquakes(bounds) {
  var url = 'http://api.geonames.org/earthquakesJSON?';
  url += $.param(bounds);
  $.ajax({
    url: url,
    dataType: 'json',
    method: 'GET',
    success: function(resp) {
      console.log(resp);
    }
  });
}