export const EnvString = Symbol('string')
export const EnvNumber = Symbol('number')
export const EnvBoolean = Symbol('boolean')
export const EnvJson = Symbol('json')
export const EnvArray = Symbol('array')
export type EnvType =
  | typeof EnvString
  | typeof EnvNumber
  | typeof EnvBoolean
  | typeof EnvJson
  | typeof EnvArray
export type EnvDefaults = string | number | boolean

function isString(s: unknown): s is string {
  return typeof s === 'string' && s !== null
}

/**
 * Method accessor decorator that will return the value of `process.env[name]`
 * if that exists, and will be casted to `type`
 * @param name - Environment variable name to return. If `name` is an array
 *  the first found environment variable will be used
 * @param type - Type to cast the environment variable to
 * @param defaultValue - Default value to set if the `name` argument isn't
 *  found in `process.env`
 */
export function Env(
  name: string | string[],
  type: EnvType = EnvString,
  defaultValue?: EnvDefaults | [EnvDefaults]
): Function {
  return function (
    _target: object,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ): void {
    if (!Array.isArray(name)) {
      name = [name]
    }

    const resolveEnv = (key: string): boolean => {
      const value: string | undefined = process.env[key]

      if (descriptor.get && value !== undefined) {
        switch (type) {
          case EnvBoolean: {
            descriptor.get = (): boolean => {
              return !!value
            }

            break
          }

          case EnvNumber: {
            descriptor.get = (): number => {
              return parseInt(value, 10)
            }

            break
          }

          case EnvJson: {
            descriptor.get = (): { [key: string]: unknown } => {
              return JSON.parse(value)
            }

            break
          }

          case EnvArray: {
            descriptor.get = (): string[] => {
              let ret: string[] = []

              if (value.includes(',')) {
                ret = value.split(',').map((s) => s.trim())
              } else {
                ret = [value]
              }

              if (defaultValue && isString(defaultValue)) {
                ret.unshift(defaultValue)
              } else if (Array.isArray(defaultValue)) {
                defaultValue.filter(isString).forEach((s) => ret.unshift(s))
              }

              return ret
            }

            break
          }

          default: {
            descriptor.get = (): string => {
              return value
            }
          }
        }

        return true
      }

      return false
    }

    for (const n of name) {
      if (resolveEnv(n)) {
        break
      }
    }
  }
}
