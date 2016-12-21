var CountriesServer = require('../models/countriesServer');


var QuestionListView = function() {
 this.questionList = document.getElementById('questions-list');
 this.selectCountry = document.getElementById('countries-select');
 this.archiveList = document.getElementById('archive-list');
};

QuestionListView.prototype = {
  addQuestion: function(question) {
    var selectedCountryCode = question ? question.countryCode : null;

   var listItem = this.buildListItem( selectedCountryCode );
   if (question === null) {
     this.questionList.appendChild(listItem)
   } else {
     var eQuestion = this.buildPopulatedQuestionLi(listItem, question);
     eQuestion.getAttribute("archived") === "true" ? this.archiveList.appendChild(eQuestion) : this.questionList.appendChild(eQuestion);
   }
 },
 buildListItem: function( selectedCountryCode ) {
   var qLi = document.createElement('li');
   var quizQuestionInput = document.createElement('input');
   quizQuestionInput.type = 'text';
   quizQuestionInput.placeholder = "Please enter your question:"
   qLi.setAttribute("archived", "false");
   qLi.appendChild(quizQuestionInput);

   var answerSelect = document.createElement('select');
   answerSelect.onchange = function() {
     console.log( "select value changed to:", answerSelect.value );
   }
   qLi.appendChild(answerSelect);

   this.populateSelect(answerSelect, selectedCountryCode );

   return this.buildArchiveButton(qLi);
 },
 buildArchiveButton: function(qLi) {
   var archiveButton = document.createElement('button');
   archiveButton.quizQuestionInput = qLi.quizQuestionInput;
   archiveButton.className = 'archive-button';
   archiveButton.onclick = function() {
     if (qLi.getAttribute("archived") === "false") {
       this.archiveList.appendChild(archiveButton.parentNode);
       qLi.setAttribute("archived", "true");
     } else {
       this.questionList.appendChild(archiveButton.parentNode);
       qLi.setAttribute("archived", "false");
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
 populateSelect: function( elementId, selectedCountryCode ) {
   var countriesServer = new CountriesServer( function() {
     this.addCountries( elementId, countriesServer.countries, selectedCountryCode );
   }.bind(this) );
 },
 addCountries: function(elementId, countries, selectedCountryCode) {
   countries.forEach( function( country ) {
     var option = document.createElement('option');
     option.value = country.code;
     option.innerText = country.name;
     if ( option.value === selectedCountryCode ) {
       option.selected = true;
     }
     elementId.appendChild(option);
   }.bind( this ) );
 }
};

module.exports = QuestionListView;
