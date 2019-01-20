const PubSub = require('../helpers/pub_sub.js');
const OptionComponentView = require('./option_component_view.js');

const OptionElementsView = function(container){
  this.container = container;
  this.choices = [];
  this.question = [];
}

OptionElementsView.prototype.bindEvents = function(){
  PubSub.subscribe('Calcs:question-choices-ready', (event) => {
    this.choices = event.detail.choices;
    this.question = event.detail.question;
    this.render();
  });
};

OptionElementsView.prototype.render = function() {

  this.choices.forEach( (choice, index) => {
      const optionComponentView = new OptionComponentView(this.container, choice, index);
      optionComponentView.render();
  });

  this.container.addEventListener('click', (event) => {
    event.preventDefault();
    let selectedElement = event.target;
    let choiceIDFound = false;

    while(!choiceIDFound){
      this.choices.forEach( (choice) => {


        if (choice.name===selectedElement.id) {

          choiceIDFound = true;
        }
      });

      if (!choiceIDFound) {
        selectedElement = selectedElement.parentElement

      }

    };

    if (selectedElement.id === this.question[2].name) {
        // selectedElement.id = "choice_correct";

        selectedElement.style['border-color'] = 'green';

    } else {
        // selectedElement.id = "choice_incorrect";
        selectedElement.style['border-color'] = 'red';
        this.choices.forEach( (choice) => {
            if (choice.name===this.question[2].name) {
              const correctAnswer = document.querySelector(`#${choice.name}`);
              correctAnswer.style['border-color'] = 'green';

              // correctAnswer.id = "choice_correct";
            }
        });
    }

      setTimeout(()=>location.reload(),1000);
  });


};

module.exports = OptionElementsView;
