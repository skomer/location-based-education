var values = require( '../values.js' );

var MapHelper = function(container, lat, lng, defaultZoom, helperCallback){

  // load gogle maps api
  var script = document.createElement( 'script' );
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?' +
      'key=' + values.googleMapsApiKey + '&callback=createMap';
  document.body.appendChild( script );

  // global function workaround
  createMap = function( callback ) {
    var defaultCenter = {
      lat: lat,
      lng: lng
    };

    this.map = new google.maps.Map(
      container,
      {
        center: defaultCenter, zoom: defaultZoom
      }
    );
    google.maps.event.addListener(this.map, "click", function(ev){
      var latLng = {
        lat: ev.latLng.lat(),
        lng: ev.latLng.lng()
      }
      console.log("map clicked at", latLng);
    });

    helperCallback();

  };
};

MapHelper.prototype = {



}

module.exports = MapHelper;
