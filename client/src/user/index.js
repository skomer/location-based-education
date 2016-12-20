var quizServer = require('../models/quizServer');
var QuizListView = require('../views/quizListView');
var IconListView = require('../views/iconListView');
var iconImage = require('../models/iconImage');

window.onload = function() {

  var iconImageUrl = iconImage.getIconImageUrl();
  var iconListView = new IconListView( iconSelected );
  var selectIconButton = document.getElementById( 'select-icon-button' );
  var imageSetting = "url('" + iconImageUrl + "')";
  console.log( "imageSetting;", imageSetting );
  selectIconButton.style.backgroundImage = imageSetting;
  selectIconButton.onclick = function() {
    iconListView.show();
  };

  var allQuizzes;
  quizServer.getPublishedQuizzes( function( allQuizzes ) {
    var listItems = allQuizzes.map(function(quiz){
      return {
        title: quiz.title,
        href: "http://localhost:3000/user/quizzes/" + quiz.id
      };
    });
    var quizzesContainer = document.getElementById('quizzes-container');
    var quizListView = new QuizListView(quizzesContainer);
    quizListView.populate(listItems);
  });
};

var iconSelected = function( iconUrl ) {
  console.log( "icon selected:", iconUrl );
};
