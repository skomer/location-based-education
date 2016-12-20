var IconListView = function( onChangeListener ) {
  this.div = document.getElementById( 'icon-select-div' );
  iconUrls.forEach( function( iconUrl ) {
    var iconImage = document.createElement( 'img' );
    iconImage.src = '/images/' + iconUrl;
    iconImage.classList.add( 'icon-select' );
    iconImage.onclick = function( ev ) {
      this.div.style.display = 'none';
      onChangeListener( ev.target.src );
    }.bind( this );
    this.div.appendChild( iconImage );
  }.bind( this ) );
  this.div.style.display = 'none';
};

IconListView.prototype = {
  show: function() {
    this.div.style.display = 'inline-block';
  }
};

var iconUrls = [
  'anchor.png',
  'bikewheel.png',
  'bolt.png',
  'circlecompass.png',
  'compass.png',
  'crossroads.png',
  'cruise.png',
  'flag.png',
  'flame.png',
  'flower.png',
  'global.png',
  'globe.png',
  'heart.png',
  'hotair.png',
  'location.png',
  'map.png',
  'pin.png',
  'pin2.png',
  'rainbow.png',
  'rocket.png',
  'shipwheel.png',
  'shoeprints.png',
  'star.png'
];

module.exports = IconListView;
