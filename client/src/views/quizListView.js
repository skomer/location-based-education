var QuizListView = function(container){
  this.container = container;
};

QuizListView.prototype = {
  populate: function(items){
    var numberPerRow = 3;
    var i = 0;
    var rowCount = 0;

    while( i < items.length ) {
      var rowDiv = document.createElement( 'div' );
      rowDiv.classList.add( 'quiz-row' );
      while( rowCount < numberPerRow && i < items.length ) {

        var item = items[i];
        var div = document.createElement( 'div' );
        div.innerText = item.title;
        div.classList.add( 'quiz-item' );
        if ( item.id ) {
          div.id = item.id;
        }
        if ( item.href ) {
          div.onclick = createClickHandler( item.href );
        }
        rowDiv.appendChild( div );
        rowCount++;
        i++;
      }
      this.container.appendChild( rowDiv );
      rowCount = 0;
    }
  }
};

var createClickHandler = function( url ) {
  return function() {
    window.location.href = url;
  }
};

module.exports = QuizListView;
