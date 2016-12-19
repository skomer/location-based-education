var ResultsManager = function( questions, userAnswers ) {

  this.questions = questions;
  this.userAnswers = userAnswers;

  this.tableBody = document.getElementById( 'results-table-body' );
  this.scoreP = document.getElementById( 'score-p' );
  this.scoreOutOf = questions.length.toString();

  var returnToQuizzesButton = document.getElementById( 'return-to-quizzes-button' );
  returnToQuizzesButton.onclick = function() {
    window.location.replace( '/user/quizzes' );
  };

  this.score = 0;
  this.marks = [];
};

ResultsManager.prototype = {
  scoreQuiz: function() {
    this.populateTable();
    this.runScoringAnimation();
  },
  populateTable: function() {
    this.questions.forEach( function( question, index ) {
      var questionText = question.text;
      var userCountryCode = this.userAnswers[index].countryCode;
      var userCountryName = this.userAnswers[index].countryName;
      var correctCountryCode = question.countryCode;
      var correctCountryName = question.countryName;
      var questionNumber = index + 1;

      var resultsRow = this.createResultsRow( questionNumber, questionText, userCountryName );
      var userAnaswerTd = resultsRow.querySelector( '.answer' );
      this.tableBody.appendChild( resultsRow );

      this.marks[index] = {
        questionNumber: questionNumber,
        td: userAnaswerTd,
        correct: userCountryCode === correctCountryCode,
        correctAnswer: correctCountryName
      };
    }.bind( this ) );
  },
  createResultsRow: function( questionNumber, questionText, userAnswer ) {
    var questionTextTd = document.createElement( 'td' );
    questionTextTd.innerText = "Q" + questionNumber + ". " + questionText;

    var userAnswerTd = document.createElement( 'td' );
    userAnswerTd.innerText = userAnswer;
    userAnswerTd.classList.add( 'answer' );

    var resultRow = document.createElement( 'tr' );
    resultRow.id = 'question-' + questionNumber;
    resultRow.appendChild( questionTextTd );
    resultRow.appendChild( userAnswerTd );
    return resultRow;
  },
  runScoringAnimation: function() {
    this.updateScore( 0 );
    var i = 1;

    for ( aMark of this.marks ) {
      (function( mark ) {
        console.log("this:", this);
        this.scoreQuestion( mark , i * 1000 );
      }.bind( this ) )( aMark );
      i++;
    }

    // set timeout for scrolling back to top after all questions are marked
    setTimeout( function() {
      window.scrollTo( 0, 0 );
    }, i * 1000 );
  },
  scoreQuestion: function( mark, timeoutLength ) {
    setTimeout( function () {
      var td = mark.td;

      window.location.href = "#";
      window.location.href = "#question-" + mark.questionNumber;

      if ( mark.correct ) {
        td.innerText += " ✔";
        td.classList.add( "correct-answer" );
        this.updateScore( 1 );
      }
      else {
        td.innerText += " ✘";
        td.classList.add( "wrong-answer" );
        td.classList.add( "tooltip" );
        this.createCorrectAnswerFor( td, mark.correctAnswer );
      }
    }.bind( this ), timeoutLength );
  },
  createCorrectAnswerFor( td, correctAnswer ) {
    var correctAnswerSpan = document.createElement( 'span' );
    correctAnswerSpan.innerText = correctAnswer;
    correctAnswerSpan.classList.add( 'tooltip-text' );
    td.appendChild( correctAnswerSpan );
  },
  updateScore: function( scoreIncrease ) {
    this.score += scoreIncrease;
    this.scoreP.innerText = this.score.toString() + " / " + this.scoreOutOf;
    if ( scoreIncrease > 0 ) {
      this.scoreP.classList.remove( 'pulse-green' );
      setTimeout( function() {
        this.scoreP.classList.add( 'pulse-green' );
      }.bind( this ), 100 );
    }
  }
};

module.exports = ResultsManager;
