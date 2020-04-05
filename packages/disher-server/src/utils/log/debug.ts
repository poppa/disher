import debug from 'debug'

/**
 * Returns a debug logger with the name `ns`. This logger will only output
 * if the env variable `DEBUG=[ns]` is set.
 */
export function getDebugLogger(ns: string): debug.Debugger {
  return debug(ns)
}
