var InfoBoxView = function() {
  this.div = document.getElementById( 'infobox-div' );
  this.textP = document.getElementById( 'infobox-text' );

  this.closeButton = document.getElementById( 'infobox-close-button' );
  this.closeButton.onclick = function() {
    this.div.style.display = 'none';
  }.bind( this );
};

InfoBoxView.prototype = {
  showWithText: function( text ) {
    this.textP.innerText = text;
    this.div.style.display = 'flex';
  }
}

module.exports = InfoBoxView;
