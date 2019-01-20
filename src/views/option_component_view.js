const ElectronShell = require('../models/electron_shell.js');

const OptionComponentView = function(container, element, index){
  this.container = container;
  this.element = element;
  this.index = index;
}

OptionComponentView.prototype.render = function () {
  const optionContainer = document.createElement('div');
  optionContainer.textContent = ``;
  optionContainer.classList.add('choice_element');
  optionContainer.id = this.element.name;
  this.container.appendChild(optionContainer);

  const nameHolder = document.createElement('p');
  nameHolder.textContent = `${this.element.name}`;
  nameHolder.classList.add('question_p_name');
  optionContainer.appendChild(nameHolder);

  const chartContainer = document.createElement('div');
  chartContainer.id = `choice${this.index}`;
  optionContainer.appendChild(chartContainer);

  const electronShell = new ElectronShell(`choice${this.index}`, this.element.shells);
  electronShell.myFirstChart();

}

module.exports = OptionComponentView;
