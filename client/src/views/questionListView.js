var CountriesServer = require('../models/countriesServer');

var QuestionListView = function() {
  this.questionList = document.getElementById('questions-list');
  this.selectCountry = document.getElementById('countries-select');
  this.archiveList = document.getElementById('archive-list');
};

QuestionListView.prototype = {
  addQuestion: function(question) {
    var listItem = this.buildListItem();
    if (question === null) {
      this.questionList.appendChild(listItem)
    } else {
      var eQuestion = this.buildPopulatedQuestionLi(listItem, question);
      eQuestion.getAttribute("archived") === "true" ? this.archiveList.appendChild(eQuestion) : this.questionList.appendChild(eQuestion);
    }
  },
  buildListItem: function() {
    var qLi = document.createElement('li');
    var quizQuestionInput = document.createElement('input');
    quizQuestionInput.type = 'text';
    quizQuestionInput.placeholder = "Please enter your question:"
    qLi.setAttribute("archived", "false");
    qLi.appendChild(quizQuestionInput);

    var answerSelect = document.createElement('select');
    this.populateSelect(answerSelect);
    // 
    // console.log(answerSelect.value = "AL");

    qLi.appendChild(answerSelect);
    return this.buildArchiveButton(qLi);
  },
  buildArchiveButton: function(qLi) {
    var archiveButton = document.createElement('div');
    archiveButton.quizQuestionInput = qLi.quizQuestionInput;
    archiveButton.className = 'archive-button-div';
    archiveButton.innerText = "Archive this question";
    archiveButton.onclick = function() {
      if (qLi.getAttribute("archived") === "false") {
        this.archiveList.appendChild(archiveButton.parentNode);
        qLi.setAttribute("archived", "true");
        archiveButton.innerText = "Unarchive this question";
      } else {
        this.questionList.appendChild(archiveButton.parentNode);
        qLi.setAttribute("archived", "false");
        archiveButton.innerText = "Archive this question";
      };
    }.bind(this);
    qLi.appendChild(archiveButton);
    return qLi;
  },
  buildPopulatedQuestionLi: function(listItem, question) {
    listItem.children[0].value = question.text;
    listItem.setAttribute("archived", question.archived);
    return listItem;
  },
  populateSelect: function( elementId ) {
    var countriesServer = new CountriesServer( function() {
      this.addCountries( elementId, countriesServer.countries );
    }.bind(this) );
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





