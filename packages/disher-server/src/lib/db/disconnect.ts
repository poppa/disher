import mongoose from 'mongoose'
import { logger } from '../../utils/log'
import { db } from './connection'

export enum Disconnect {
  NotConnected,
  Success,
  Failure,
}

/**
 * Disconnect from the database
 */
export async function disconnectFromDatabase(): Promise<Disconnect> {
  try {
    if (db()) {
      await mongoose.disconnect()
      return Disconnect.Success
    }

    return Disconnect.NotConnected
  } catch (e) {
    logger().error({ err: e }, 'Mongo disconnect failed')
    return Disconnect.Failure
  }
}
