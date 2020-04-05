import { logger } from './utils/log'
import { stopHttpServer } from './http-server'
import { disconnectFromDatabase } from './db'
import { getDebugLogger } from './utils/log'

const { info } = logger()
const debug = getDebugLogger('trap')

function trapExit(signal: string): void {
  debug('trapExit(%s)', signal)
  disconnectFromDatabase().then(() => info('Database disconnected'))
  stopHttpServer().then(() => info('Server totally stopped'))
}

export function trap(): void {
  process.on('SIGINT', trapExit)
  process.on('SIGTERM', trapExit)
  process.on('exit', () => {
    info('Bye bye ... see you next time')
  })
}
