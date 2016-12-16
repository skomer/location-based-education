var QuestionListView = function() {
  this.questionList = document.getElementById('questions-list');
  this.selectCountry = document.getElementById('countries-select');
};

QuestionListView.prototype = {
  addQuestion: function(question) {
    var qLi = document.createElement('li');
    qLi.innerText = question.text;
    this.questionList.appendChild(qLi);
  },
  addAnswer: function() {
    console.log("bla");
  },
  populateSelect: function() {
    var url = "http://localhost:3000/countries";
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function(event) {
      if (event.target.status !== 200) {
        console.log("load countries error");
        return;
      }
      var countries = JSON.parse(event.target.responseText);
      this.addCountries(countries);
    }.bind(this);
    request.send();
  },
  addCountries: function(countries) {
    for (country of countries) {
      var option = document.createElement('option');
      option.innerText = country.name;
      this.selectCountry.appendChild(option);
    }
  }
};

module.exports = QuestionListView;