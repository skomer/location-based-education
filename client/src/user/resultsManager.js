var ResultsManager = function( quiz ) {

  this.quiz = quiz;

  this.tableBody = document.getElementById( 'results-table-body' );
  this.scoreP = document.getElementById( 'score-p' );
  this.scoreOutOf = this.quiz.length().toString();

  var returnToQuizzesButton = document.getElementById( 'return-to-quizzes-button' );
  returnToQuizzesButton.onclick = function() {
    window.location.replace( '/user/quizzes' );
  };

  this.score = 0;
};

ResultsManager.prototype = {
  scoreQuiz: function() {
    this.populateTable();
    this.runScoringAnimation();
  },
  populateTable: function() {
    var questionNumber = 1;
    this.quiz.questions.forEach( function( question ) {

      var questionTextTd = document.createElement( 'td' );
      questionTextTd.innerText = "Q" + questionNumber + ". " + question.text;

      var userAnswerTd = document.createElement( 'td' );
      userAnswerTd.innerText = question.userAnswer.countryName;
      userAnswerTd.classList.add( 'answer' );
      question.userAnswerTd = userAnswerTd;
      question.number = questionNumber;

      var resultRow = document.createElement( 'tr' );
      resultRow.id = 'question-' + questionNumber;
      resultRow.appendChild( questionTextTd );
      resultRow.appendChild( userAnswerTd );

      this.tableBody.appendChild( resultRow );
      questionNumber++;
    }.bind( this ) );
  },
  runScoringAnimation: function() {
    this.updateScore( 0 );
    var i = 1;
    this.quiz.questions.forEach( function( aQuestion ) {
      (function( question ) {
        console.log("this:", this);
        this.scoreQuestion( question , i * 1000 );
      }.bind( this ) )( aQuestion );
      i++;
    }.bind( this ) );

    // set timeout for scrolling back to top after all questions are marked
    setTimeout( function() {
      window.scrollTo( 0, 0 );
    }, i * 1000 );
  },
  scoreQuestion: function( question, timeoutLength ) {
    setTimeout( function () {
      var td = question.userAnswerTd;

      window.location.href = "#";
      window.location.href = "#question-" + question.questionNumber;

      if ( question.isCorrect() ) {
        td.innerText += " ✔";
        td.classList.add( "correct-answer" );
        this.updateScore( 1 );
      }
      else {
        td.innerText += " ✘";
        td.classList.add( "wrong-answer" );
        td.classList.add( "tooltip" );
        this.createCorrectAnswerFor( td, question.answer.countryName );
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
