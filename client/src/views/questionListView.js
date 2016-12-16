var QuestionListView = function() {
  this.questionList = document.getElementById('questions-list');
  this.selectCountry = document.getElementById('countries-select');
};

QuestionListView.prototype = {
  addQuestion: function(question) {
    var qLi = document.createElement('li');
    var qP = document.createElement('p');
    qP.innerText = question.text;
    qLi.appendChild(qP);

    var answerSelect = document.createElement('select');
    this.populateSelect(answerSelect);
    qLi.appendChild(answerSelect);

    this.questionList.appendChild(qLi);
  },
  addAnswer: function() {
    console.log("bla");
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
    for (country of countries) {
      var option = document.createElement('option');
      option.innerText = country.name;
      elementId.appendChild(option);
    }
  }
};

module.exports = QuestionListView;