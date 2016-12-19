var ProgressBarView = function( totalSegments ) {
  this.totalSegments = totalSegments;
  this.currentQuestion = 1;
  this.canvas = document.getElementById('progress-bar');
  this.ctx = this.canvas.getContext('2d');
};

ProgressBarView.prototype = {
  nextQuestion: function() {
    this.currentQuestion++;
    this.draw(this.currentQuestion);
  },
  draw: function( position ) {

    var bgWidth = this.canvas.width;
    var bgHeight = this.canvas.height;

    var pWidth = bgWidth;
    var pHeight = bgHeight / this.totalSegments;

    // var grd = this.ctx.createLinearGradient(0, pHeight, 0, pHeight * position);
    // grd.addColorStop(0, 'rgb(0, 179, 0)');
    // grd.addColorStop(1, 'rgb(230, 255, 230)');

    // background rectangle
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, bgWidth, bgHeight);

    // progress rectangle
    // ctx.lineWidth = 3;
    // this.ctx.fillStyle = grd;
    this.ctx.fillStyle = 'limegreen';
    this.ctx.fillRect(0, pHeight * (this.totalSegments - position), pWidth, pHeight * position);

    // this.ctx.fillStyle = 'white';
    this.ctx.fillStyle = 'limegreen';

    for (var i = 0; i < position; i++) {
      this.ctx.fillRect(0, (i * pHeight) + (pHeight * (this.totalSegments - position)), pWidth, 2);

    }
  }
};

module.exports = ProgressBarView;
