import { ApolloServer } from 'apollo-server-express'
import { Application } from 'express'
import { resolveSchemas, context } from '../graphql'
import { config } from '../../options'

export async function setupGraphQl(app: Application): Promise<ApolloServer> {
  const schema = await resolveSchemas(['dist/modules/**/*.resolver.js'])
  const apolloServer = new ApolloServer({
    schema,
    context,
    playground: config.isDevelopment,
  })

  apolloServer.applyMiddleware({ app, cors: true })

  return apolloServer
}
