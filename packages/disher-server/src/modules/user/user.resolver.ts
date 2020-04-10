import { Resolver, Query } from 'type-graphql'
import { User } from './user.model'

@Resolver()
export class UserResolver {
  @Query(() => [User])
  public async listUsers(): Promise<User[]> {
    return []
  }
}
