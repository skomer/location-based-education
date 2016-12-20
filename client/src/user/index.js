var quizServer = require('../models/quizServer');
var QuizListView = require('../views/quizListView');
var IconListView = require('../views/iconListView');
var iconImage = require('../models/iconImage');

var selectIconButton;

window.onload = function() {

  var iconImageUrl = iconImage.getIconImageUrl();
  var iconListView = new IconListView( iconSelected );
  selectIconButton = document.getElementById( 'select-icon-button' );
  selectIconButton.onclick = function() {
    iconListView.show();
  };
  setButtonImage(iconImageUrl);

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
  setButtonImage(iconUrl);
  iconImage.setIconImageUrl(iconUrl);
};

var setButtonImage = function( iconUrl ){
  var imageSetting = "url('" + iconUrl + "')";
  selectIconButton.style.backgroundImage = imageSetting;
};
