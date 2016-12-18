
function progressBar() {

  var nextButton = document.getElementById( 'pretend-next-button' );
  
  var bgWidth = 45;
  var bgHeight = 500;

  nextButton.onclick = function() {
    draw(10, 6);
  };

  function draw(segments, position) {
    var canvas = document.getElementById('progress-bar');
    var ctx = canvas.getContext('2d');

    var pWidth = bgWidth;
    var pHeight = bgHeight / segments;

    // background rectangle
    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, bgWidth, bgHeight);

    // progress rectangle
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 0 + bgHeight - pHeight, pWidth, pHeight);




  };


};

window.onload = progressBar;


