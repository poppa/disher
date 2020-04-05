import mongoose from 'mongoose'
import { logger } from '../utils/log'

export async function disconnectFromDatabase(): Promise<boolean> {
  try {
    await mongoose.disconnect()
    return true
  } catch (e) {
    logger().error({ err: e }, 'Mongo disconnect failed')
    return false
  }
}
