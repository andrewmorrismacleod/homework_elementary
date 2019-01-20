const PubSub = require('../helpers/pub_sub.js');

const Calcs = function() {
  this.data = null;
  this.question = null;
  this.choices = null;
}

Calcs.prototype.bindEvents = function() {
  PubSub.subscribe('Elements:data-ready', (event) => {
    this.data = event.detail;
    this.question = this.generateQuestion();
    this.choices = this.generateChoices();
    PubSub.publish('Calcs:question-choices-ready', this);
  });

};

Calcs.prototype.generateQuestion = function () {
  // const arithmeticType = ["+", "-", "*", "/"];
  const arithmeticType = ["+", "-", "*", "/"];
  const index = Math.floor(Math.random() * arithmeticType.length);
  const symbol = arithmeticType[index];

  switch(symbol) {
    case "+":
      return this.AdditionQuestion();
    case "-":
      return this.SubtractionQuestion();
    case "*":
      return this.MultiplicationQuestion();
    case "/":
      return this.DivisionQuestion();
  }


};

Calcs.prototype.AdditionQuestion = function() {

  const no1 = Math.floor(Math.random()*(this.data.length-1));
  const no3 = Math.floor(Math.random()*(this.data.length-1-no1))+no1+1;
  const returnArray = [this.data[no1],"+",this.data[no3-no1-1],"=",this.data[no3]];
  return returnArray;
};

Calcs.prototype.SubtractionQuestion = function() {
  const no3 = Math.floor(Math.random()*(this.data.length-1));
  const no1 = Math.floor(Math.random()*(this.data.length-1-no3))+no3+1;
  const returnArray = [this.data[no1],"-",this.data[no1-no3-1],"=",this.data[no3]];
  return returnArray;
};

Calcs.prototype.MultiplicationQuestion = function() {

  let no1 = Math.floor(Math.random()*this.data.length);
  no1 = Math.floor((no1+1)/12);

  let no2 = Math.floor(Math.random()*Math.floor((this.data.length+1)/no1));
  no2 = no2+1
  let no3 = (no1)*(no2);

  const returnArray = [this.data[no1-1],"*",this.data[no2-1],"=",this.data[no3-1]];
  return returnArray;
};

Calcs.prototype.DivisionQuestion = function() {

  let no3 = Math.floor(Math.random()*this.data.length);
  no3 = Math.floor((no3+1)/12)+1;
  let no2 = Math.floor(Math.random()*Math.floor((this.data.length+1)/no3));
  no2 = no2+1
  let no1 = (no3)*(no2);
  const returnArray = [this.data[no1-1],"/",this.data[no2-1],"=",this.data[no3-1]];
  return returnArray;

};

Calcs.prototype.generateChoices = function () {
  const numberOfOptions = 3;
  const answerPosition = Math.floor(Math.random()*numberOfOptions);
  const return_array = [];
  for (i = 0; i < numberOfOptions; i++) {
    if (i===answerPosition){
      return_array.push(this.question[2]);
    } else {
      let wrongOption = Math.floor(Math.random()*this.data.length);
      while(wrongOption===(this.question[2].number-1)){
        wrongOption = Math.floor(Math.random()*this.data.length);
      }
      return_array.push(this.data[wrongOption]);
    }
  }
  return return_array;

};

module.exports = Calcs;
