import mongoose from 'mongoose'
import { Db } from 'mongodb'
import { Undefinable } from '../utils/types'

/**
 * Returns the `mongoose` connection
 */
export function connection(): mongoose.Connection {
  return mongoose.connection
}

/**
 * Returns the underlying `mongo` db object, or `undefind` if no db
 * connection is established
 */
export function db(): Undefinable<Db> {
  return mongoose.connection.db || undefined
}
