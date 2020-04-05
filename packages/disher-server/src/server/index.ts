import { Options } from '../options'
import { EventEmitter } from 'events'
import { Undefinable } from '../types'
import { OptionNotSetError } from './error'
import { yellow } from 'chalk'
import { Loggable, patchLogger } from '../log'

export class DisherServer<O extends Options> extends EventEmitter {
  private _options: Undefinable<O>
  public log: Loggable = patchLogger(console)

  public init(options: O): this {
    this._options = options
    return this
  }

  public get<K extends keyof O>(key: K): O[K] {
    if (!this._options) {
      throw new OptionNotSetError()
    }

    return this._options[key]
  }

  public async start(): Promise<void> {
    if (!this._options) {
      throw new OptionNotSetError(
        `${yellow('init()')} must be called prior to ${yellow('start()')}`
      )
    }
  }

  public panic(code = 1): never {
    process.exit(code)
  }
}
