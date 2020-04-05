import { Loggable, patchLogger } from './loggable'

let _logger: Loggable = patchLogger(console)

export function logger(): Loggable {
  return _logger
}

export function setLogger(log: Loggable): Loggable {
  _logger = log
  return log
}
