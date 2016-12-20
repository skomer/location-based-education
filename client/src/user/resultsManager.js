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

      var correctAnswerTd = document.createElement( 'td' );
      correctAnswerTd.innerText = question.countryName;
      correctAnswerTd.classList.add( 'correct-answer-cell' );

      if ( question.isCorrect() ) {
        correctAnswerTd.classList.add( 'display-none' );
      } else {
        correctAnswerTd.classList.add( 'display-hide' );
      }


      question.userAnswerTd = userAnswerTd;
      question.correctAnswerTd = correctAnswerTd;
      question.number = questionNumber;

      var resultRow = document.createElement( 'tr' );
      resultRow.id = 'question-' + questionNumber;
      resultRow.appendChild( questionTextTd );
      resultRow.appendChild( userAnswerTd );
      resultRow.appendChild( correctAnswerTd );

      this.tableBody.appendChild( resultRow );
      questionNumber++;
    }.bind( this ) );
  },
  runScoringAnimation: function() {
    this.updateScore( 0 );
    var i = 1;
    this.quiz.questions.forEach( function( aQuestion ) {
      console.log("this:", this);
      this.scoreQuestion( aQuestion , i * 1000 );
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
        this.flashScore( 'green' );
      }
      else {
        this.flashScore( 'red' );
        td.innerText += " ✘";
        td.classList.add( "wrong-answer" );
        td.classList.add( "tooltip" );
        question.correctAnswerTd.classList.remove( 'display-hide' );
        console.log( question.correctAnswerTd );
      }
    }.bind( this ), timeoutLength );
  },
  updateScore: function( scoreIncrease ) {
    this.score += scoreIncrease;
    this.scoreP.innerText = this.score.toString() + " / " + this.scoreOutOf;
  },
  flashScore: function( colour ) {
    if( this.lastPulseCssClass ) {
      this.scoreP.classList.remove( this.lastPulseCssClass );
    }
    var cssClass = 'pulse-' + colour;
    setTimeout( function() {
      this.scoreP.classList.add( cssClass );
    }.bind( this ), 100 );
    this.lastPulseCssClass = cssClass;
  }
};

module.exports = ResultsManager;
