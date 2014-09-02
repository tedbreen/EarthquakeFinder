var zoom = 2; // initial map zoom setting
var openWindow; // used with marker click event

window.onload = function () {
 loadScript();
 var button = document.getElementById('submit');
 button.addEventListener('click', function () {
   if (zoom !== 8) {
     zoom = 8;
   }
   geocode( submitForm() );
 });
};

function initializeMap() {  //callback parameter for loadScript()
  var dateToday = new Date();
  var lastYr = dateToday.getFullYear() - 1;
  var yearAgo = lastYr + '-' + (dateToday.getMonth() + 1) + '-' + dateToday.getDate();
  var coords = {
    'lat': 0,
    'lng': 10
  };
  var bounds = {
    'north': 90,
    'south': -90,
    'west': -180,
    'east': 180,
    'username': 'tedbreen',
    'date': yearAgo
  };
  getEarthquakes(coords, bounds);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'callback=initializeMap';
  document.body.appendChild(script);
}

function getEarthquakes(coords, bounds) {
  var url = 'http://api.geonames.org/earthquakesJSON?';
  url += $.param(bounds);
  $.ajax({
    url: url,
    dataType: 'json',
    method: 'GET',
    success: function(resp) {
      var allQuakes = resp.earthquakes;
      recenterMap( coords, allQuakes );
    }
  });
}

function recenterMap(coords, quakes) {
  var mapOptions = {
    zoom: zoom,
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
  var infowindow = createInfoWindow(quake);
  google.maps.event.addListener(marker, 'click', function() {
    if (openWindow !== undefined) {
      openWindow.close();      
    }
    openWindow = infowindow;
    infowindow.open(map, marker);
  });
}

function createInfoWindow(quake) {
  var contentStr = '<p><strong>' + dateFormatter(quake.datetime) + '</strong></p>' +
    '<p>Magnitude: ' + quake.magnitude + '</p>' +
    '<p>Depth: ' + quake.depth + '</p>';
  var infoBox = new google.maps.InfoWindow({
    content: contentStr
  });
  return infoBox;
}

function submitForm() {
  var city = document.getElementById('city');
  var loc = city.value
  changeMsg("You searched for: " + loc);
  city.value = "";
  return loc;
}

function geocode(loc) {
  var url = 'https://maps.googleapis.com/maps/api/geocode/json?';
  var query = {
    'address': loc
  };
  url += $.param(query);
  $.ajax({
    url: url,
    dataType: 'json',
    method: 'GET',
    success: function (resp) {
      var bounds = parseResponse(resp).bounds;
      var coords = parseResponse(resp).coords;
      getEarthquakes( coords, bounds );
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
  var data = {
    'bounds': bounds,
    'coords': coords
  };
  return data;
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

function changeMsg(msg) {
  var divMsg = document.getElementById('div-msg');
  var oldMsg = document.getElementById('span-msg');
  var msgContent = document.createTextNode(msg);
  var newMsg = document.createElement('span');
  newMsg.setAttribute('id', 'span-msg');
  newMsg.appendChild(msgContent);
  divMsg.replaceChild(newMsg, oldMsg);
}

