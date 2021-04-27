// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPromise(obj: unknown): obj is Promise<any> {
  return (
    typeof obj === 'object' && obj !== null && 'then' in obj && 'catch' in obj
  )
}
