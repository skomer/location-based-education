

window.onload = function() {

  var canvas = document.getElementById('progress-bar');
  var ctx = canvas.getContext('2d');

  var progressBar = function() {

    ctx.lineWidth = 3;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 45, 500);

  }

  var draw = function() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    progressBar.draw();
  }

  canvas.onclick = progressBar;

}




