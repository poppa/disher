import { Loggable, patchLogger } from './loggable'

let _logger: Loggable = patchLogger(console)

/**
 * Returns the _global_ `logger` instance
 */
export function logger(): Loggable {
  return _logger
}

/**
 * Set the _global_ logger instance
 */
export function setLogger(log: Loggable): Loggable {
  _logger = log
  return log
}
