export interface StatusInfo {
  name: string
  message: string
}

export interface StatusCodeInfo {
  [key: number]: StatusInfo
}

/**
 * HTTP error class
 */
export class HttpError extends Error {
  public static BadRequest = 400
  public static Unauthorized = 401
  public static PaymentRequired = 402
  public static Forbidden = 403
  public static NotFound = 404
  public static MethodNotAllowed = 405
  public static NotAcceptable = 406
  public static ProxyAuthenticationRequired = 407
  public static RequestTimeout = 408
  public static Conflict = 409
  public static Gone = 410
  public static LengthRequired = 411
  public static PreconditionFailed = 412
  public static PayloadTooLarge = 413
  public static URITooLong = 414
  public static InternalServerError = 500
  public static NotImplemented = 501
  public static BadGateway = 502
  public static ServiceUnavailable = 503

  public static readonly Codes: StatusCodeInfo = {
    [HttpError.BadRequest]: { name: 'BadRequest', message: 'Bad Request' },
    [HttpError.Unauthorized]: { name: 'Unauthorized', message: 'Unauthorized' },
    [HttpError.PaymentRequired]: {
      name: 'PaymentRequired',
      message: 'Payment Required',
    },
    [HttpError.Forbidden]: { name: 'Forbidden', message: 'Forbidden' },
    [HttpError.NotFound]: { name: 'NotFound', message: 'Not Found' },
    [HttpError.MethodNotAllowed]: {
      name: 'MethodNotAllowed',
      message: 'Method Not Allowed',
    },
    [HttpError.NotAcceptable]: {
      name: 'NotAcceptable',
      message: 'Not Acceptable',
    },
    [HttpError.ProxyAuthenticationRequired]: {
      name: 'ProxyAuthenticationRequired',
      message: 'Proxy Authentication Required',
    },
    [HttpError.RequestTimeout]: {
      name: 'RequestTimeout',
      message: 'Request Timeout',
    },
    [HttpError.Conflict]: { name: 'Conflict', message: 'Conflict' },
    [HttpError.Gone]: { name: 'Gone', message: 'Gone' },
    [HttpError.LengthRequired]: {
      name: 'LengthRequired',
      message: 'Length Required',
    },
    [HttpError.PreconditionFailed]: {
      name: 'PreconditionFailed',
      message: 'Precondition Failed',
    },
    [HttpError.PayloadTooLarge]: {
      name: 'PayloadTooLarge',
      message: 'Payload Too Large',
    },
    [HttpError.URITooLong]: { name: 'URITooLong', message: 'URI Too Long' },
    // And the rest...
    [HttpError.InternalServerError]: {
      name: 'InternalServerError',
      message: 'Internal Server Error',
    },
    [HttpError.NotImplemented]: {
      name: 'NotImplemented',
      message: 'Not Implemented',
    },
    [HttpError.BadGateway]: { name: 'BadGateway', message: 'Bad Gateway' },
    [HttpError.ServiceUnavailable]: {
      name: 'ServiceUnavailable',
      message: 'Service Unavailable',
    },
    // And the rest...
  }

  /**
   * Returns the `StatusCodeInfo` for HTTP status code `code`.
   */
  public static getError(code: number): StatusInfo {
    return (
      HttpError.Codes[code] || { name: 'Unknown', message: 'Unknown Error' }
    )
  }

  /**
   * If `message` is omitted, the default status description for `code` will be
   * set as error message
   */
  constructor(public statusCode: number, message?: string) {
    super(message || HttpError.getError(statusCode).message)
    this.name = HttpError.getError(statusCode).name
  }
}

/**
 * Check if `err` is a `HttpError`.
 */
export function isHttpError(err: unknown): err is HttpError {
  return typeof err === 'object' && err instanceof HttpError
}

/**
 * Returns the http status code from an HttpError object
 * or from an arbitrary error object by educated guessing.
 *
 * @param err
 */
export function getStatusCode(err: unknown): number | undefined {
  const e = err as { [key: string]: unknown }

  if (typeof e === 'object' && e !== null) {
    if ('statusCode' in e && e.statusCode && typeof e.statusCode === 'number') {
      return e.statusCode
    } else if (e.status && typeof e.status === 'number') {
      return e.status
    }
  }

  return undefined
}
