## Description
1. Web page takes as input a city/location name.
2. Calls the GeoNames Recent Earthquake WebService (http://www.geonames.org/export/JSON-webservices.html#earthquakesJSON) for earthquake data.
3. Earthquakes are designated with markers on a Google Map (https://developers.google.com/maps/). Each marker will display details of the earthquake when clicked.

### URL:
http://earthquakefinder.s3-website-us-west-1.amazonaws.com/

### Notes:
* When the page first loads, the top 10 earthquakes from the past year are marked.
* The top 10 earthquakes were found by setting the bounding box to cover the entire globe (latitude limits of -90 and 90, longitude limits of -180 and 180).
* Things to do for the future:
  * In addition to the markers, make an actual list to display the results.
  * Display location data in the marker InfoWindows
  * Clean up and refactor earthquake.js script
  * Figure out how to query for earthquakes in a date range.  Currently can only retrieve earthquakes older or equal to a date that is provided.
