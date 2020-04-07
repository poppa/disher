import { stopHttpServer } from './http-server'
import { disconnectFromDatabase, Disconnect } from './db'
import { logger } from './utils/log'

const { info } = logger()

/**
 * Shut down the serve as gracefully as possible
 * @param code Exit code
 */
export async function shutdown(code = 0): Promise<never> {
  await Promise.all([
    disconnectFromDatabase().then((r) =>
      r === Disconnect.Success ? info('Database disconnected') : ''
    ),
    stopHttpServer().then(() => info('Server totally stopped')),
  ])

  process.exit(code)
}
