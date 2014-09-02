## Bluewolf coding challenge #2
1. Create a web page that takes as input a city/location name.
2. This page should call the GeoNames Recent Earthquake WebService (http://www.geonames.org/export/JSON-webservices.html#earthquakesJSON), with a bounding box dictated by the city entered.
3. Plot the results on a Google Map (https://developers.google.com/maps/). Each marker on this map should display details of the earthquake plotted.

### Bonus:
4. Create a list of the top 10 largest earthquakes in the world for the last 12 months.  This should be displayed somewhere on the page.

---
### Result:
http://earthquakefinder.s3-website-us-west-1.amazonaws.com/

### Notes:
* When the page first loads, the top 10 earthquakes from the past year are marked.  These marks disappear when a city/location is entered and submitted.
* The top 10 earthquakes were found by setting the bounding box to cover the entire globe (latitude limits of -90 and 90, longitude limits of -180 and 180).
* Things to do for the future:
  * In addition to the markers, make an actual list to display the results.
  * Display location data in the marker InfoWindows
  * Clean up earthquake.js script
  * Dates in InfoWindows do not seems to work correctly when page is viewed in Firefox and Safari (fine in Chrome)
