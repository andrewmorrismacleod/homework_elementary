const AppendElement = require('../helpers/append_Element.js')
const ElectronShell = require('../models/electron_shell.js');

const QuestionComponentView = function(container, element, index){
  this.container = container;
  this.element = element;
  this.index = index;
};

QuestionComponentView.prototype.render = function () {

  const blockContainer = document.createElement(`div`);
  blockContainer.classList.add('question_element');
  this.container.appendChild(blockContainer);

  const nameContent = `Name: ${this.element.name}`
  AppendElement.appendElement('p', 'question_p_name', nameContent, blockContainer);

  const numberContent = `Atomic Number: ${this.element.number}`
  AppendElement.appendElement('p', 'question_p_number', numberContent, blockContainer);

  const chartContainer = document.createElement('div');
  chartContainer.id = `question${this.index}`;
  blockContainer.appendChild(chartContainer);

  const electronShell = new ElectronShell(`question${this.index}`, this.element.shells);
  electronShell.myFirstChart();

};

module.exports = QuestionComponentView;
