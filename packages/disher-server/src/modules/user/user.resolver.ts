import {
  Resolver,
  Query,
  Authorized,
  Arg,
  Ctx,
  Mutation,
  Args,
} from 'type-graphql'
import { User, UserDocument } from './user.model'
import { Maybe } from '../../utils'
import { Context } from '../../lib/graphql'
import { logger } from '../../utils/log'
import { findUser, addUser } from './user.methods'
import { AddUserArgs } from './user.args'

const { error } = logger()

@Resolver()
export class UserResolver {
  @Authorized('admin')
  @Query(() => [User])
  public async listUsers(): Promise<UserDocument[]> {
    return []
  }

  @Query(() => User, { nullable: true })
  public async login(
    @Arg('handle') handle: string,
    @Arg('password') password: string,
    @Ctx() ctx: Context
  ): Promise<Maybe<UserDocument>> {
    try {
      if (!ctx.req.session) {
        error({ err: new Error('No session in request') }, 'login()')
        return undefined
      }

      const u = await findUser({ handle, password })

      if (u) {
        ctx.req.session.user = u
      }

      return u || undefined
    } catch (err) {
      error(err, 'login')
      return undefined
    }
  }

  @Mutation(() => User)
  public async addUser(
    @Args() args: AddUserArgs
  ): Promise<Maybe<UserDocument>> {
    try {
      const u = await addUser(args)
      return u || undefined
    } catch (err) {
      error({ err }, 'addUser')
    }

    return undefined
  }
}
