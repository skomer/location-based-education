var QuestionListView = function() {
  this.questionList = document.getElementById('questions-list');
  this.selectCountry = document.getElementById('countries-select');
};

QuestionListView.prototype = {
  addQuestion: function() {
    var quizQuestionInput = document.createElement('input');
    quizQuestionInput.type = 'text';
    quizQuestionInput.placeholder = "Please enter your question:"
    var qLi = document.createElement('li');
    qLi.appendChild(quizQuestionInput);

    var answerSelect = document.createElement('select');
    this.populateSelect(answerSelect);
    qLi.appendChild(answerSelect);

    this.questionList.appendChild(qLi);
  },
  populateSelect: function(elementId) {
    var url = "http://localhost:3000/countries";
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function(event) {
      if (event.target.status !== 200) {
        console.log("load countries error");
        return;
      }
      var countries = JSON.parse(event.target.responseText);
      this.addCountries(elementId, countries);
    }.bind(this);
    request.send();
  },
  addCountries: function(elementId, countries) {
    countries.forEach( function( country ) {
      var option = document.createElement('option');
      option.value = country.code;
      option.innerText = country.name;
      elementId.appendChild(option);
    });
  }
};

module.exports = QuestionListView;
