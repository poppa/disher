import { prop as Prop, getModelForClass } from '@typegoose/typegoose'
import { Types } from 'mongoose'
import { bcryptSync } from '../../utils'

const getIt = (s: string): string => s
const hashIt = (s: string): string => bcryptSync(s)

/**
 * User database model
 */
export class User {
  @Prop()
  public _id?: string | Types.ObjectId

  @Prop({ required: true })
  public name!: string

  @Prop({ required: true, unique: true })
  public handle!: string

  @Prop({ get: getIt, set: hashIt })
  public password?: string

  @Prop()
  public federatedIdentity?: object

  @Prop({ required: true, default: true })
  public enabled!: boolean

  @Prop({ required: true, default: ['user'] })
  public scope!: string[]
}

export default getModelForClass(User)
