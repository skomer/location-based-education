
function progressBar() {

  var nextButton = document.getElementById( 'pretend-next-button' );
  
  
  
  nextButton.onclick = function() {
    draw(10, 6);
  };

  function draw(segments, position) {
    var canvas = document.getElementById('progress-bar');
    var ctx = canvas.getContext('2d');

    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 45, 500);
  };


};

window.onload = progressBar;


