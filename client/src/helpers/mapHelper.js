var values = require( '../values.js' );

var MapHelper = function(container, lat, lng, defaultZoom, mapClickCallback){
  this.geocoder = new google.maps.Geocoder();
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
    };
    console.log("map clicked at", latLng);
    console.log(this);
    this.decodeCountry(latLng, function( countryCode, countryName){
      mapClickCallback(countryCode, countryName);
    });
  }.bind(this));
};

MapHelper.prototype = {

  decodeCountry: function(latLng, callback){
    this.geocoder.geocode({
      location: latLng
    }, function(results, status){
      if(status === "OK"){
        if(results[0]){
          var lastResult = results[results.length -1 ];
          var countryCode = lastResult.address_components[0].short_name;
          var countryName = lastResult.address_components[0].long_name; 
          console.log("country clicked: ", countryName, countryCode);
          callback(countryCode, countryName);
        } else {
          console.error("No reverse geocoding results found");
        }
      } else {
        console.error("Geocoder failed due to:", status);
      }
    });

  }

}

module.exports = MapHelper;
