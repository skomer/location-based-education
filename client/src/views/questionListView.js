var QuestionListView = function() {
  this.questionList = document.getElementById('questions-list');
};

QuestionListView.prototype = {
  addQuestion: function(question) {
    var qLi = document.createElement('li');
    qLi.innerText = question.text;
    this.questionList.appendChild(qLi);
  }


};

module.exports = QuestionListView;