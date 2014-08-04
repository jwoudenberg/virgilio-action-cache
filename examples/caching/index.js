var virgilioCache = require('../../');

var options = {
    logger: {
        name: 'virgilio',
        streams: []
    }
};

var Virgilio = require('virgilio');
var virgilio = new Virgilio(options);

virgilio
    .loadModule(virgilioCache)
    .defineAction('add', add, { cache: true });

virgilio.callCounter = 0;

function add(number1, number2) {
    virgilio.callCounter++;
    return number1 + number2;
}

module.exports = virgilio;
