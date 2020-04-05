import { format } from 'util'

export class OptionNotSetError extends Error {
  constructor(...args: unknown[]) {
    super(args ? format('Options not set:', ...args) : 'Options not set')
    this.name = 'OptionNotSetError'
  }
}
