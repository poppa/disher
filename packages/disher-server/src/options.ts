import { join } from 'path'
import { Express } from 'express'
import { Server } from 'http'
import { Env, EnvNumber } from './decorators'
import { Undefinable } from './types'
import { sha256 } from './utils'

interface InternalOptions {
  serverSecret: Undefinable<string>
}

export class Options {
  private options: InternalOptions = {
    serverSecret: undefined,
  }

  /**
   * The Express application. This is set internally and should only be used
   * as a getter.
   */
  public app: Undefinable<Express>

  /**
   * The HTTP server instance. This is set internally and should only be used
   * as a getter
   */
  public ['http server']: Undefinable<Server>

  /**
   * The host name the server should listen on. Default is `localhost`
   * @env DISHER_HOST
   */
  @Env('DISHER_HOST')
  public get host(): string {
    return 'localhost'
  }

  /**
   * The port the server should listen on. Default is `9999`
   * @env DISHER_PORT
   */
  @Env('DISHER_PORT', EnvNumber)
  public get port(): number {
    return 9999
  }

  /**
   * The MongoDB connection string. Default is `mongodb://localhost/disher`
   * @env DISHER_DB
   */
  @Env('DISHER_DB')
  public get db(): string {
    return 'mongodb://localhost/disher'
  }

  /**
   * Number of times the server will try to connect to the database if it
   * failes. Default is `20`.
   *
   * @env DISHER_DB_CONNECT_RETRIES
   */
  @Env('DISHER_DB_CONNECT_RETRIES', EnvNumber)
  public get ['db connect retries'](): number {
    return 20
  }

  /**
   * The path to the `etc` directory. This is where the server will store
   * persitent data. If it doesn't exist when the server is started for the
   * first time it will be created. Default is `[cwd]/etc`
   * @env DISHER_ETC_PATH
   */
  @Env('DISHER_ETC_PATH')
  public get ['etc path'](): string {
    return join(process.cwd(), 'etc')
  }

  /**
   * When the server is stopped with SIGINT or SIGTERM the server will be
   * gracefully shut down, e.g. we will try to close various services before
   * exiting the process. But if this takes to long the server process will
   * be forcefully closed after this many milliseconds.
   *
   * So, number of milliseconds before the server is forcefully terminated.
   * Default is `5000`
   *
   * @env DISHER_SHUTDOWN_GRACETIME
   */
  @Env('DISHER_SHUTDOWN_GRACETIME', EnvNumber)
  public get ['shutdown gracetime'](): number {
    return 5000
  }

  /**
   * The server secret is used to hash various things. If not set via env
   * a random string will be generated the first time the server is started
   * and then written to disk in `[etc path]/server-secret`
   *
   * @env DISHER_SERVER_SECRET
   */
  @Env('DISHER_SERVER_SECRET')
  public get ['server secret'](): string {
    if (!this.options.serverSecret) {
      const s = Math.random().toString(36)
      this.options.serverSecret = sha256(s)
    }

    return this.options.serverSecret
  }

  public set ['server secret'](s: string) {
    if (s && s.length) {
      this.options.serverSecret = s
    } else {
      throw new Error('server secret must be defined and have a length')
    }
  }
}
