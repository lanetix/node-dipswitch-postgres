dipswitch-postgres
===============
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![Circle CI](https://circleci.com/gh/lanetix/node-dipswitch-postgres.svg?style=svg)](https://circleci.com/gh/lanetix/node-dipswitch-postgres)
[![Dependency Status](https://david-dm.org/lanetix/node-dipswitch-postgres.svg)](https://david-dm.org/lanetix/node-dipswitch-postgres)


A store for [dipswitch](https://www.npmjs.com/package/dipswitch) which is backed by postgres.

Installation
------------

[![NPM](https://nodei.co/npm/dipswitch-postgres.png?downloads=true&stars=true)](https://nodei.co/npm/dipswitch-postgres/)
```bash
npm install --save dipswitch-postgres
```

Usage
-----

Should only be used in conjuction with [dipswitch](https://www.npmjs.com/package/dipswitch).
```javascript
var dipswitchStore = require('dipswitch-postgres')(connectionString)
var Dipswitch = require('dipswitch')
var dipswitch = new Dipswitch({
  store: dipswitchStore
})
...
```
