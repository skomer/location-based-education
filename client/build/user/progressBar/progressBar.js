
function progressBar() {

  var nextButton = document.getElementById( 'pretend-next-button' );
  var canvas = document.getElementById('progress-bar');
  var ctx = canvas.getContext('2d');

  var bgWidth = 50;
  var bgHeight = 500;

  nextButton.onclick = function() {
    draw(10, 8);
  };

  function draw(segments, position) {
    
    var pWidth = bgWidth;
    var pHeight = bgHeight / segments;

    var grd = ctx.createLinearGradient(0, pHeight, 0, pHeight * position);
    grd.addColorStop(0, 'rgb(0, 179, 0)');
    grd.addColorStop(1, 'rgb(230, 255, 230)');

    // background rectangle
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, bgWidth, bgHeight);

    // progress rectangle
    // ctx.lineWidth = 3;
    ctx.fillStyle = grd;
    ctx.fillRect(0, pHeight * (segments - position), pWidth, pHeight * position);

    ctx.fillStyle = 'white';

    for (var i = 0; i < position; i++) {
      ctx.fillRect(0, (i * pHeight) + (pHeight * (segments - position)), pWidth, 2);
      
    }
    

  };


};

window.onload = progressBar;







