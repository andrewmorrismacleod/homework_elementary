const Elements = require('./models/elements.js');
const QuestionElementsView = require('./views/question_elements_view.js');
const OptionElementsView = require('./views/option_elements_view.js');
const Calcs = require('./models/calcs.js');

document.addEventListener('DOMContentLoaded', () => {

  const calcs = new Calcs();
  calcs.bindEvents();

  const questionElementsContainer = document.querySelector('#elements_questions');
  const questionElementsView = new QuestionElementsView(questionElementsContainer);
  questionElementsView.bindEvents();

  const optionElementsContainer = document.querySelector('#elements_choices');
  const optionElementsView = new OptionElementsView(optionElementsContainer);
  optionElementsView.bindEvents();





  const elements = new Elements();
  elements.getData();



});
