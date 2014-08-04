var hash = require('murmurhash-js').murmur3;
var hashSeed = (new Date()).getTime();

module.exports = function virgilioCache() {
    var virgilio = this;
    var Promise = virgilio.Promise;

    virgilio.extend('defineAction', defineCachedAction);

    function defineCachedAction(args, _super) {
        var name = args[0];
        var action = args[1];
        var options = args[2] || {};
        var cacheTime = options.cache;
        if (cacheTime) {
            action = memoizeAction(action);
        }
        return _super.call(this, name, action, options);
    }

    function memoizeAction(action) {
        var cache = {};

        return function memoizedAction() {
            var args = Array.prototype.slice.call(arguments);
            var stringifiedArgs = JSON.stringify(args);
            var key = hash(hashSeed, stringifiedArgs);
            var result = cache[key];
            if (result) {
                return result;
            }
            return Promise.method(action).apply(this, arguments)
                .then(function(result) {
                    cache[key] = result;
                    return result;
                });
        };
    }
};
