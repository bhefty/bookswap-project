const bodyParser = require('body-parser')
const graphqlExpress = require('apollo-server-express').graphqlExpress
const graphiqlExpress = require('apollo-server-express').graphiqlExpress
const compression = require('compression')
const ApolloEngine = require('apollo-engine').Engine
const port = require('../port')

const schema = require('../schema')

module.exports = (app) => {
  const engine = new ApolloEngine({
    engineConfig: {
      apiKey: process.env.APOLLO_ENGINE_API_KEY,
      stores: [
        {
          name: 'inMemEmbeddedCache',
          inMemory: {
            cacheSize: 20971520 // 20 MB
          }
        }
      ],
      queryCache: {
        publicFullQueryStore: 'inMemEmbeddedCache'
      }
    },
    graphqlPort: port
  })

  engine.start()
  // This must be the first middleware
  app.use(engine.expressMiddleware())

  app.use(compression())
  app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema,
    tracing: true,
    cacheControl: true
  }))
  app.use('/graphiql', graphiqlExpress({ endpointURL: 'graphql' }))

  return app
}
