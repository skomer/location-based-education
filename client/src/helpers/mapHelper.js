var values = require( '../values.js' );
var iconImage = require('../models/iconImage');
var latLng;


var MapHelper = function(container, lat, lng, defaultZoom, mapClickCallback){
  this.iconImageUrl = iconImage.getIconImageUrl();
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
    latLng = {
      lat: ev.latLng.lat(),
      lng: ev.latLng.lng()
    };
    var icon = {
      url: this.iconImageUrl,
      size: new google.maps.Size(128, 128),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(10, 10),
      scaledSize: new google.maps.Size(20, 20)
    };
    if ( this.marker ) this.marker.setMap( null );
    this.marker = new google.maps.Marker({
      // scaledSize: new google.maps.Size(20, 20),
      position: latLng,
      map: this.map,
      icon: icon
    });

    console.log("map clicked at", latLng);
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
          callback( null, null );
        }
      } else {
        console.error("Geocoder failed due to:", status);
        callback( null, null );
      }
    });

  }

}

module.exports = MapHelper;
