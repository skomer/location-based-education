window.onload = function() {
  var lastSlashIndex = window.location.href.lastIndexOf( '/' );
  var quizIdString = window.location.href.substr( lastSlashIndex + 1 );
  var quizId = parseInt( quizIdString );
  console.log("ready to take quiz", quizId);

};
