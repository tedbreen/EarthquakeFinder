function initializeMap() {
  var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(0, 0)
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'callback=initializeMap';
  document.body.appendChild(script);
}

window.onload = function () {
 loadScript();
 var button = document.getElementById('submit');
 button.addEventListener('click', function () {
   geocode( submitForm() );
 });
}