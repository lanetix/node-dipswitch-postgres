var createStore = require('./index')
var tests = require('dipswitch/test')

tests({ store: createStore(process.env.DATABASE_URL || 'postgres://postgres@localhost/dipswitch_postgres_test') })
