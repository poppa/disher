type LogFn = (...args: unknown[]) => void

const noop: LogFn = (..._) => {
  //
}

export interface PartialLogger {
  debug: LogFn
  info: LogFn
  warn: LogFn
  error: LogFn
  trace?: LogFn
  fatal?: LogFn
}

export interface Loggable extends PartialLogger {
  trace: LogFn
  fatal: LogFn
}

export function isLoggable(obj: unknown): obj is Loggable {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'debug' in obj &&
    'info' in obj &&
    'warn' in obj &&
    'error' in obj &&
    'trace' in obj &&
    'fatal' in obj
  )
}

export function patchLogger<T extends PartialLogger>(logger: T): Loggable {
  if (!logger.fatal) {
    logger.fatal = noop
  }

  if (!logger.trace) {
    logger.trace = noop
  }

  if (isLoggable(logger)) {
    return logger
  }

  throw new Error('Logger does not implement `PartialLogger`')
}
