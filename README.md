# virgilio-cache
[![wercker
status](https://app.wercker.com/status/3dff116cb954656b48bf20494aba1d2f/s/master
"wercker
status")](https://app.wercker.com/project/bykey/3dff116cb954656b48bf20494aba1d2f)
[![Test
Coverage](https://codeclimate.com/github/jwoudenberg/virgilio-action-cache/badges/coverage.svg)](https://codeclimate.com/github/jwoudenberg/virgilio-action-cache)
[![NPM version](https://badge.fury.io/js/virgilio-action-cache.svg)](http://badge.fury.io/js/virgilio-action-cache)

Easy memoization of virgilio actions.

## Goal
The goal of this extension is to make caching in virgilio very easy.
It should only be a matter of providing an additional cache-timeout value to a defineAction call.
From that point on, each response from that action is cached for that duration, keyed with a hash of the input arguments.
In other words: calling the same action twice with the same arguments should only result in a single execution of the action itself.

Because this virgilio-extension extends one of virgilio's base functions, it is also a good testcase of virgilio's extension mechanism.
