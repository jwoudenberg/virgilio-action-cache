# virgilio-cache

Easy memoization of virgilio actions.

## Goal
The goal of this extension is to make caching in virgilio very easy.
It should only be a matter of providing an additional cache-timeout value to a defineAction call.
From that point on, each response from that action is cached for that duration, keyed with a hash of the input arguments.
In other words: calling the same action twice with the same arguments should only result in a single execution of the action itself.

Because the concept of cache timeouts is a core of this idea, supporting an in-memory is not worth the effort because of the huge amount of timeouts that would entail. An external solution like redis or memcached should be used then, preferably a generic interface to make sure the user can choose between the two.

Because this virgilio-extension extends one of virgilio's base functions, it is also a good testcase of virgilio's extension mechanism.
