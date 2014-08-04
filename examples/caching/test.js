/* global describe, it, before */
var virgilio = require('./');

describe('caching tests', function() {
    before(function() {
        virgilio.callCounter = 0;
    });

    function equalsSeven(result) {
        result.must.equal(7);
    }

    it('doesn\'t call an action twice with the same args', function(done) {
        virgilio.execute('add', 2, 5)
            .then(equalsSeven)
            .then(function() {
                return virgilio.execute('add', 2, 5);
            })
            .then(equalsSeven)
            .then(function() {
                virgilio.callCounter.must.equal(1);
                done();
            });
    });
});
