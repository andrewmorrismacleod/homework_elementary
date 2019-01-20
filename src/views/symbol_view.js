const SymbolView = function(container, symbol) {
  this.container = container;
  this.symbol = symbol;
}

SymbolView.prototype.render = function() {
  const symbolContainer = document.createElement('div');
  symbolContainer.textContent = `${this.symbol}`
  symbolContainer.classList.add('question_symbol');
  this.container.appendChild(symbolContainer);

}

module.exports = SymbolView;
