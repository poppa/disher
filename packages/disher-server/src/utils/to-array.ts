/**
 * Turn `input` into an array if it's not one already
 *
 * @example
 * toArray('value')   // --> ['value']
 * toArray(['value']) // --> ['value']
 */
export function toArray<T>(input: T): T extends unknown[] ? T : T[] {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  return Array.isArray(input) ? input : [input]
}
