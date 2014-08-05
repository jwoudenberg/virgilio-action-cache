var hash = require('murmurhash-js').murmur3;

module.exports = function virgilioActionCache() {
    var virgilio = this;
    var Promise = virgilio.Promise;

    virgilio.extend('defineAction', defineCachedAction);

    function defineCachedAction(args, _super) {
        var name = args[0];
        var action = args[1];
        var options = args[2] || {};
        var cacheTime = options.cache;
        if (cacheTime) {
            cacheTime = (typeof cacheTime === 'number' ? cacheTime : void(0));
            action = memoizeAction(action, cacheTime);
        }
        return _super.call(this, name, action, options);
    }

    function memoizeAction(action, cacheTime) {
        return function memoizedAction() {
            var args = Array.prototype.slice.call(arguments);
            var stringifiedArgs = JSON.stringify(args);
            var key = hash(stringifiedArgs);
            return virgilio.cache.get(key)
                .then(function(result) {
                    if (result) {
                        return result;
                    }
                    return Promise.method(action).apply(this, args)
                        .then(function(result) {
                            return virgilio
                                .cache.set(key, result, cacheTime)
                                .return(result);
                        });
                });
        };
    }
};
