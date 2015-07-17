'use strict'

var BPromise = require('bluebird')
var pgConnect = require('pg-connect')
var pluck = require('lodash.pluck')
var sql = require('./sql')

module.exports = function (config) {
  var getConnection = pgConnect(config)
  return {
    smembersAsync: function (key) {
      return BPromise.using(
        getConnection(),
        sql.getFeatures({})
      )
        .then(function (results) {
          return pluck(results.rows, 'name')
        })
    },
    saddAsync: function (key, value) {
      return BPromise.using(
        getConnection(),
        sql.addFeature({ name: value })
      )
    },
    sremAsync: function (key, value) {
      return BPromise.using(
        getConnection(),
        sql.removeFeature({ name: value })
      )
    },
    //hmgetAsync: function (hash, keys) {
    //  var self = this
    //  return BPromise.bind(this)
    //    .return(keys.map(function (key) {
    //      return self.data[key]
    //    }))
    //},
    //hsetAsync: function (hash, key, value) {
    //  this.data[key] = value
    //  return BPromise.resolve()
    //},
    //hdelAsync: function (hash, key) {
    //  delete this.data[key]
    //  return BPromise.resolve()
    //},
    //delAsync: function () {
    //  // not implemented. this is only used by the test suite to clear out the database
    //  return BPromise.resolve()
    //}
  }
}
