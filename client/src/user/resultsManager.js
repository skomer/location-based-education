var ResultsManager = function() {
  var returnToQuizzesButton = document.getElementById( 'return-to-quizzes-button' );
  returnToQuizzesButton.onclick = function() {
    window.location.replace( '/user/quizzes' );
  };
};

ResultsManager.prototype = {

};

module.exports = ResultsManager;
