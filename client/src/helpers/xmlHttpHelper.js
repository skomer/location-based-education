var xmlHttpHelper = {
  makeGetRequest: function( url, callback ) {
    var request = new XMLHttpRequest();
    request.open( 'GET', url );
    request.onload = function() {
      if ( this.status === 200 ) {
        var dataObject = JSON.parse( this.responseText );
        callback( dataObject );
      }
      else {
        console.error( "GET request to", url, "failed with status", this.status );
      }
    }
    request.send();
  },
  makePostRequest: function( url, dataObject ) {
    var request = new XMLHttpRequest();
    request.open( 'POST', url );
    request.setRequestHeader( 'Content-Type', 'application/json' );
    request.onload = function() {
      if ( this.status !== 200 ) {
        console.error( "POST request to", url, "failed with status", this.status );
      }
    }
    request.send( JSON.stringify( dataObject ) );
  },
  makePutRequest: function( url, dataObject ) {
    var request = new XMLHttpRequest();
    request.open( 'PUT', url );
    request.setRequestHeader( 'Content-Type', 'application/json' );
    request.onload = function() {
      if ( this.status !== 200 ) {
        console.error( "PUT request to", url, "failed with status", this.status );
      }
    }
    request.send( JSON.stringify( dataObject ) );
  }
};

module.exports = xmlHttpHelper;
