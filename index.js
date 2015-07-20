'use strict'

var BPromise = require('bluebird')
var isArray = require('is-array')
var named = require('node-postgres-named')
var pgConnect = require('pg-connect')
var pluck = require('lodash.pluck')
var sql = require('./sql')

module.exports = function (config) {
  var getConnection = pgConnect(config)
  var createTables = getConnection.withTransaction(function (query) {
    return BPromise.all([
      sql.createFeatureSegmentsTable({}, query),
      sql.createFeaturesTable({}, query)
    ])
  })

  getConnection.on('client', named.patch)

  return {
    smembersAsync: function (key) {
      return createTables
      .then(function () {
        return BPromise.using(
          getConnection(),
          sql.getFeatures({})
        )
      })
      .then(function (results) {
        return pluck(results.rows, 'name')
      })
    },
    saddAsync: function (key, value) {
      return createTables
      .then(function () {
        return isArray(value) ?
          getConnection.withTransaction(function (query) {
            return BPromise.map(value, function (feature) {
              return sql.addFeature({ name: feature }, query)
            })
          }) :
          BPromise.using(
            getConnection(),
            sql.addFeature({ name: value })
          )
      })
    },
    sremAsync: function (key, value) {
      return createTables
      .then(function () {
        return isArray(value) ?
          getConnection.withTransaction(function (query) {
            return BPromise.map(value, function (feature) {
              return sql.removeFeature({ name: feature }, query)
            })
          }) :
          BPromise.using(
            getConnection(),
            sql.removeFeature({ name: value })
          )
      })
    },
    hmgetAsync: function (hash, keys) {
      return createTables
      .then(function () {
        return BPromise.using(
          getConnection(),
          sql.getFeatureSegments({ keys: keys })
        )
      })
    },
    hsetAsync: function (hash, key, value) {
      return createTables
      .then(function () {
        return getConnection.withTransaction(function (query) {
          // NB This doesn't work if concurrent writes (of the same key) are
          // needed; this scenario is not likey with feature management though
          return sql.updateFeatureSegment({ key: key, value: value }, query)
          .then(function () {
            return sql.addFeatureSegment({ key: key, value: value }, query)
          })
        })
      })
    },
    hdelAsync: function (hash, key) {
      return createTables
      .then(function () {
        return BPromise.using(
          getConnection(),
          sql.removeFeatureSegment({ key: key })
        )
      })
    },
    delAsync: function (hash) {
      var sqlStmt
      switch (hash) {
        case 'DIPSWITCH_FEATURES_SET':
          sqlStmt = sql.removeAllFeatures({})
          break
        case 'DIPSWITCH_FEATURES_HASH':
          sqlStmt = sql.removeAllFeatureSegments({})
          break
        default:
          throw new Error('unknown hash: ' + hash)
      }
      return createTables
      .then(function () {
        return BPromise.using(
          getConnection(),
          sqlStmt
        )
      })
    }
  }
}
