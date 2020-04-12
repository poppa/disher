import {
  prop as Prop,
  getModelForClass,
  modelOptions as ModelOptions,
} from '@typegoose/typegoose'
import { Types, Document } from 'mongoose'
import { ObjectType, ID, Field } from 'type-graphql'
import { hashSha512 } from '../../utils'

export type UserDocument = User & Pick<Document, '_id'>

const getIt = (s: string): string => s
const hashIt = (s: string): string => hashSha512(s)

class FederatedIdentity {
  public name!: string
}

/**
 * User database model
 */
@ObjectType()
@ModelOptions({ schemaOptions: { collection: 'User' } })
export class User {
  @Field(() => ID, { name: 'id' })
  @Prop()
  public _id?: string | Types.ObjectId

  @Field(() => String)
  @Prop({ required: true })
  public name!: string

  @Field(() => String)
  @Prop({ required: true, unique: true })
  public handle!: string

  @Field(() => String)
  @Prop({ get: getIt, set: hashIt, minlength: 8 })
  public password!: string

  // @Field(() => Object)
  @Prop()
  public federatedIdentity?: FederatedIdentity

  @Field(() => Boolean)
  @Prop({ required: true, default: true })
  public enabled!: boolean

  @Field(() => [String])
  @Prop({ required: true, default: ['user'] })
  public scope!: string[]
}

export default getModelForClass(User)
