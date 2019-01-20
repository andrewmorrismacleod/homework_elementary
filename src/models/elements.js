const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');
const elementsTemp = require('../data/elementsTemp.js');

const Elements = function () {
  this.data = [];
}

Elements.prototype.getData = function() {

  const url = 'https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json';
  const request = new RequestHelper(url);
  request.get().then( (data) => {
    this.data = data.elements;
    PubSub.publish('Elements:data-ready', this.data);
  });

    // this.data = elementsTemp.elements;
    // PubSub.publish('Elements:data-ready', this.data);

};

module.exports = Elements;
