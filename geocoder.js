// var api_key = 

var button = document.getElementById('submit');

button.addEventListener('click', function () {
  geocode( getLoc() );
});

function getLoc() {
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
    success: function(resp) {
      if (resp.status === 'OK') {
        return resp.results[0];
      } else {
        return "that didn't work";
      }
    }
  });
}

function parseResults(result) {
  var north = result.geometry.bounds.northeast.lat;
  var east = result.geometry.bounds.northeast.lng;
  var south = result.geometry.bounds.southwest.lat;
  var west = result.geometry.bounds.southwest.lng;
  var lat = result.geometry.location.lat;
  var lng = result.geometry.location.lng;
}