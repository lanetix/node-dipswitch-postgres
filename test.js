var createStore = require('./index')
var tests = require('dipswitch/test')

tests({ store: createStore(process.env.DATABASE_URL || 'postgres://postgres@localhost/pg_connect_test') })
