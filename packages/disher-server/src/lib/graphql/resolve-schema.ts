import { GraphQLSchema } from 'graphql'
import { buildSchema } from 'type-graphql'
import { makeAbsolutePath } from '../../utils'
import { authMiddleware } from './auth-middleware'

export async function resolveSchemas(path: string[]): Promise<GraphQLSchema> {
  const schema = await buildSchema({
    resolvers: path.map(makeAbsolutePath),
    validate: false,
    authChecker: authMiddleware,
  })

  return schema
}
