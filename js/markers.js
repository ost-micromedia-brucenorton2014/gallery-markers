//markers.js for typo gallery
//vars
console.log("markers.js");
var mapLatitude;
var mapLongitude;
var myLatlng;
var markersMap;
var markersArray = [];

function getMarkers() {
  console.log("getMarkers");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showMarkersPosition);
    } else {
        markersCanvas.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showMarkersPosition(position) {
  
    mapLatitude = position.coords.latitude;
    mapLongitude = position.coords.longitude;
    console.log("showMarkersPosition"+mapLatitude, mapLongitude);
    myLatlng = new google.maps.LatLng(mapLatitude,mapLongitude);
    getMarkersMap(myLatlng);
}

function getMarkersMap(markersLatlng) {
  console.log("getMarkersMap: "+ markersLatlng );
  var mapOptions = {
    zoom: 12,
    center: new google.maps.LatLng(mapLatitude, mapLongitude)
  };
  markersMap = new google.maps.Map(document.getElementById('markers-canvas'),
      mapOptions);

  var marker = new google.maps.Marker({
      position: markersLatlng,
      map: markersMap,
      title:"one marker"
  });
    markersArray.push(marker);
    var locations = [
      ['Bondi Beach', 45.590542, -73.674856, 4],
      ['Coogee Beach', 45.523036, -73.659052, 5],

    ];
    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: markersMap,
        title: locations[i][0]
      });
      markersArray.push(marker);
    }
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markersArray.length; i++) {
      console.log(markersArray[i].getPosition());
     bounds.extend(markersArray[i].getPosition());
    }

    markersMap.fitBounds(bounds);
}
getMarkers();
