dipswitch-redis
===============
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Circle CI](https://circleci.com/gh/lanetix/node-dipswitch-redis.svg?style=svg)](https://circleci.com/gh/lanetix/node-dipswitch-redis)
[![Dependency Status](https://david-dm.org/lanetix/node-dipswitch-redis.svg)](https://david-dm.org/lanetix/node-dipswitch-redis)


A store for [dipswitch](https://www.npmjs.com/package/dipswitch) which is backed by redis.

Installation
------------

[![NPM](https://nodei.co/npm/dipswitch-redis.png?downloads=true&stars=true)](https://nodei.co/npm/dipswitch-redis/)
```bash
npm install --save dipswitch-redis
```

Usage
-----

Should only be used in conjuction with [dipswitch](https://www.npmjs.com/package/dipswitch).
```javascript
var redisClient = require('redis').createClient()
var dipswitchStore = require('dipswitch-redis')(redisClient)
var Dipswitch = require('dipswitch')
var dipswitch = new Dipswitch({
  store: dipswitchStore
})
...
```
