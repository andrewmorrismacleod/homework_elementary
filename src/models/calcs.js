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

Calcs.prototype.numberIsPrime = function (number) {
  if (number <= 1) {
    return false; //Number is either 1 or 0 which aren't primes
  } else if (number < 4){
    return true; //Number is either 2 or 3, both of which are prime
  } else if (number % 2 === 0) {
    return false; //Any number divisible by 2 isn't a prime
  } else if (number < 9) {
    return true; //At this point the number is either 5 or 7, both of which are prime.
  } else if (number % 3 === 0) {
    return false; //Any number divisible by 3 isn't prime
  } else {
    //Prime numbers are always of the form 6n plus or minus 1
    //For any number n, there is only one prime factor greater than sqrt(n) and that is n itself
    //Using these two facts and the fact that we have already checked for divisibility by 2 and 3 we can
    //improve the loop defined in prime_checker by

    //Only checking divisibility of numbers up to sqrt(n)
    //Only checking for prime factors of the form 6n+-1
    //Note: not all numbers of the form 6n+-1 are prime but a prime is always of the form 6n+-1

    for (var i = 6; i <= Math.floor(Math.sqrt(number)); i += 6) {
      if ((number % (i-1) === 0)|| (number % (i+1) === 0)){
        return false;
      }
    }
    return true;
  }
};

module.exports = Calcs;
