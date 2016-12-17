var xmlHttpHelper = require('../helpers/xmlHttpHelper');

var CountriesServer = function( callback ) {
  var url = 'http://localhost:3000/countries';
  xmlHttpHelper.makeGetRequest( url, function( countries ) {
    this.countries = countries;
    callback();
  }.bind( this ) );
};

CountriesServer.prototype = {
  nameForCode: function( countryCode ) {
    var foundCountry = this.countries.find( function( country ) {
      return country.code === countryCode;
    });
    return foundCountry.name;
  }
};

module.exports = CountriesServer;
