import { stopHttpServer } from './http-server'
import { disconnectFromDatabase, Disconnect } from '../db'
import { logger } from '../../utils/log'

const { info, error } = logger()

/**
 * Shut down the serve as gracefully as possible
 * @param code Exit code
 */
export async function shutdown(code = 0): Promise<never> {
  try {
    await Promise.all([
      disconnectFromDatabase()
        .then((r) =>
          r === Disconnect.Success ? info('Database disconnected') : ''
        )
        .catch(() => void 0),
      stopHttpServer()
        .then(() => info('Server totally stopped'))
        .catch(() => void 0),
    ])
  } catch (err) {
    error({ err }, 'Shutdown weeoe')
  }

  process.exit(code)
}
