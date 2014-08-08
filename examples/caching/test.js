/* global describe, it, before */
var virgilio = require('./');

describe('caching tests', function() {
    before(function(done) {
        virgilio.callCounter = 0;
        virgilio.execute('redis.flushdb').then(function() {
            done();
        });
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
            })
            .catch(done);
    });
});
