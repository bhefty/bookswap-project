const bodyParser = require('body-parser')
const graphqlExpress = require('apollo-server-express').graphqlExpress
const graphiqlExpress = require('apollo-server-express').graphiqlExpress

const schema = require('../schema')

module.exports = (app) => {
  app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
  app.use('/graphiql', graphiqlExpress({ endpointURL: 'graphql' }))

  return app
}
