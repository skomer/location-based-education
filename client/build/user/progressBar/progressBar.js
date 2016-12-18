
function progressBar() {

  var nextButton = document.getElementById( 'pretend-next-button' );
  
  var bgWidth = 50;
  var bgHeight = 500;

  nextButton.onclick = function() {
    draw(10, 8);
  };

  function draw(segments, position) {
    var canvas = document.getElementById('progress-bar');
    var ctx = canvas.getContext('2d');

    var pWidth = bgWidth;
    var pHeight = bgHeight / segments;

    var grd = ctx.createLinearGradient(0, pHeight, 0, pHeight * position);
    grd.addColorStop(0, 'green');
    grd.addColorStop(1, 'white');

    // background rectangle
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, bgWidth, bgHeight);

    // progress rectangle
    ctx.fillStyle = grd;
    ctx.fillRect(0, pHeight * (segments - position), pWidth, pHeight * position);

  };


};

window.onload = progressBar;







