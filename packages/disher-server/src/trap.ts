import { logger } from './utils/log'
import { getDebugLogger } from './utils/log'
import { shutdown } from './shutdown'

const { info } = logger()
const debug = getDebugLogger('trap')

function trapExit(signal: string): void {
  debug('trapExit(%s)', signal)
  shutdown()
}

/**
 * Traps `SIGINT` and `SIGTERM`
 */
export function trap(): void {
  process.on('SIGINT', trapExit)
  process.on('SIGTERM', trapExit)
  process.on('exit', () => {
    info('Bye bye ... see you next time')
  })
}
