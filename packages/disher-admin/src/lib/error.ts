export class DisherError extends Error {
  public static readonly Info = Symbol.for('InfoError')
  public static readonly Warn = Symbol.for('WarnError')
  public static readonly Error = Symbol.for('ErrorError')
  public static readonly Fatal = Symbol.for('FatalError')

  public static isDisherError(e: unknown): e is DisherError {
    return typeof e === 'object' && e !== null && e instanceof DisherError
  }

  public static isInfoError(e: unknown): boolean {
    return DisherError.isDisherError(e) && e.level === DisherError.Info
  }

  public static isWarnError(e: unknown): boolean {
    return DisherError.isDisherError(e) && e.level === DisherError.Warn
  }

  public static isErrorError(e: unknown): boolean {
    return DisherError.isDisherError(e) && e.level === DisherError.Error
  }

  public static isFatalError(e: unknown): boolean {
    return DisherError.isDisherError(e) && e.level === DisherError.Fatal
  }

  public static info(message: string): DisherError {
    return new DisherError(DisherError.Info, message)
  }

  public static warn(message: string): DisherError {
    return new DisherError(DisherError.Warn, message)
  }

  public static error(message: string): DisherError {
    return new DisherError(DisherError.Error, message)
  }

  public static fatal(message: string): DisherError {
    return new DisherError(DisherError.Fatal, message)
  }

  public readonly level: ErrorType

  constructor(level: ErrorType, message: string) {
    super(message)
    this.name = `Disher${Symbol.keyFor(level) ?? level.toString()}`
    this.level = level
  }

  public get severity(): string {
    switch (this.level) {
      case DisherError.Info:
        return 'info'

      case DisherError.Warn:
        return 'warning'

      default:
        return 'error'
    }
  }
}

type ErrorType =
  | typeof DisherError.Info
  | typeof DisherError.Warn
  | typeof DisherError.Error
  | typeof DisherError.Fatal
