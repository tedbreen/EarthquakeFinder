// var api_key = 

var button = document.getElementById('submit');

// button.addEventListener('click', function () {
//   geocode( encodeLocation() );
// });

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
  }
  url += $.param(query);  
  $.ajax({
    url: url,
    dataType: 'json',
    method: 'GET',
    success: function(resp) { console.log(resp); }
  });
}