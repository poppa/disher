import { join } from 'path'
import { Env } from './lib/decorators'
import { Undefinable } from './utils/types'

export class Options {
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
  @Env('DISHER_PORT', Env.Int)
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
  @Env('DISHER_DB_CONNECT_RETRIES', Env.Int)
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
  @Env('DISHER_SHUTDOWN_GRACETIME', Env.Int)
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
    throw new Error(`The environment variable DISHER_SERVER_SECRET must be set`)
  }

  /**
   * Returns the debugflags as an array if it is set
   * @env DEBUG
   */
  @Env('DEBUG', Env.Array)
  public get debugFlags(): Undefinable<string[]> {
    return undefined
  }

  /**
   * If `true` the Admin UI will not be mounted
   * @env DISHER_NO_ADMIN_UI
   */
  @Env('DISHER_NO_ADMIN_UI', Env.Boolean)
  public get noAdminUi(): boolean {
    return false
  }

  /**
   * Virtual path where the Admin UI will be mounted. This should contain
   * both a leading and ending slash. Default is `/admin/`.
   * @env DISHER_ADMIN_UI_PATH
   */
  @Env('DISHER_ADMIN_UI_PATH')
  public get adminUiPath(): string {
    return '/admin/'
  }

  /**
   * Check is auth is disabled. This only has effect if the server is started
   * in development mode
   * @env DISHER_AUTH_DISABLED
   */
  public get authDisabled(): boolean {
    return !!(this.isDevelopment && process.env.DISHER_AUTH_DISABLED)
  }

  /**
   * Returns true if `process.env.NODE_ENV === 'production'`
   */
  public get isProduction(): boolean {
    return process.env.NODE_ENV === 'production'
  }

  /**
   * Returns true if `process.env.NODE_ENV === 'development'`
   */
  public get isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development'
  }
}

export const config = new Options()
