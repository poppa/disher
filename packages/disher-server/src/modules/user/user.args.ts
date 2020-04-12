import { ArgsType, Field } from 'type-graphql'
import { User } from './user.model'
import { Scope } from '../../lib/scope'
import { Types } from 'mongoose'

@ArgsType()
export class AddUserArgs implements Partial<User> {
  public _id?: string | Types.ObjectId

  @Field(() => String, { description: 'The name of the user' })
  public name!: string

  @Field(() => String, { description: 'The user handle, e.g username' })
  public handle!: string

  @Field(() => String, { description: 'The user password' })
  public password!: string

  @Field(() => [String], {
    nullable: true,
    description: 'Scopes the user has access to',
  })
  public scope?: Scope[]

  @Field(() => Boolean, {
    nullable: true,
    description: 'Should the user be enabled by default (true by default)',
  })
  public enabled?: boolean
}
