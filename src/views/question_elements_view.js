const PubSub = require('../helpers/pub_sub.js');
const Calcs = require('../models/calcs.js');
const QuestionComponentView = require('./question_component_view.js');
const SymbolView = require('./symbol_view.js');

const QuestionElementsView = function(container){
  this.container = container;
  this.question = null;
}

QuestionElementsView.prototype.bindEvents = function(){
  PubSub.subscribe('Calcs:question-choices-ready', (event) => {
    this.question = event.detail.question;
    this.render();
  });

};

QuestionElementsView.prototype.render = function() {

  this.question.forEach( (questionComponent, index) => {

    if ((index%4) === 0){
      const questionComponentView = new QuestionComponentView(this.container, questionComponent, index);
      questionComponentView.render();
    } else {
      let symbol = "";
      if (index === 2){
        symbol = "?";
      } else {
        symbol = questionComponent;
      }
      const symbolView = new SymbolView(this.container, symbol);
      symbolView.render();
    }
  });
};


module.exports = QuestionElementsView;
