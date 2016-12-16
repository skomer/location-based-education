var fs = require('fs');

var buffer = fs.readFileSync('all_countries_data.json');

var bufferString = buffer.toString();

var allCountriesData = JSON.parse(bufferString);

var countries = allCountriesData.map(function(allCountryData){
  return {
    name: allCountryData.name,
    code: allCountryData.alpha2Code,
    latLng: {
      lat: allCountryData.latlng[0],
      lng: allCountryData.latlng[1]
    }
  };
});

var writeStream = fs.createWriteStream('countries.json');
writeStream.write(JSON.stringify(countries));
writeStream.end();