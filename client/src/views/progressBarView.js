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

    // draw backgroud
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, bgWidth, bgHeight);

    //draw bars
    for (var i = 0; i < position; i++) {
      if ( i === position - 1 ) {
        this.ctx.fillStyle = 'rgb(40, 121, 78)';
      }
      else {
        this.ctx.fillStyle = 'darkseagreen';
      }
      this.ctx.fillRect( 0, bgHeight - ( (i + 1) * pHeight), pWidth, pHeight);
    }

    //draw lines
    for (var i = 0; i < this.totalSegments; i++ ) {
      this.ctx.fillStyle = 'skyblue';
      this.ctx.fillRect( 0, i * pHeight, pWidth, 4 );
    }
  }
};

module.exports = ProgressBarView;
