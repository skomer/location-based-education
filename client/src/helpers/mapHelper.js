var MapHelper = function(container, lat, lng, defaultZoom){
  var center = {
    lat: lat,
    lng: lng
  };

  this.map = new google.maps.Map(
    container,
    {
      center: center,
      zoom: defaultZoom
    }
  );
};

module.exports = MapHelper;