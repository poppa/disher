import {
  modelOptions as ModelOptions,
  prop as Prop,
  getModelForClass,
  Ref,
} from '@typegoose/typegoose'
import { Types, Document } from 'mongoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from '../user'
import { Undefinable, hashSha512 } from '../../utils'

export type AccessTokenDocument = AccessToken & Pick<Document, '_id'>

const getIt = (str: string): string => str
const hashIt = (str: string): string => hashSha512(str)

@ObjectType()
@ModelOptions({ schemaOptions: { collection: 'AccessToken' } })
export class AccessToken {
  @Field(() => ID, { name: 'id' })
  @Prop()
  public _id?: string | Types.ObjectId

  @Field(() => String)
  @Prop({ unique: true, required: true, get: getIt, set: hashIt })
  public token!: string

  @Field(() => User)
  @Prop({ required: true, ref: 'User' })
  public user!: Ref<User>

  @Field(() => Date, { nullable: true })
  @Prop()
  public expires?: Undefinable<Date>
}

export default getModelForClass(AccessToken)
